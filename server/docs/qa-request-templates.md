# QA Request Templates (cURL)

Dokumen ini berisi template request untuk verifikasi kontrol keamanan pasca-upgrade.

## 0) Setup Variable

PowerShell:

```powershell
$BASE_URL = "http://localhost:4000"
$ALLOWED_REDIRECT = "http://localhost:5173/reset-password"
$BLOCKED_REDIRECT = "https://evil.example/reset"
$TEST_EMAIL = "qa.user@example.com"
$VALID_SESSION_COOKIE = "your_session_cookie"
$ADMIN_SESSION_COOKIE = "your_admin_session_cookie"
$NON_ADMIN_SESSION_COOKIE = "your_non_admin_session_cookie"
$VALID_REFRESH_TOKEN = "your_refresh_token"
$INVALID_REFRESH_TOKEN = "invalid_refresh_token"
$STRIPE_SIGNATURE_VALID = "replace_with_generated_valid_signature"
$STRIPE_SIGNATURE_INVALID = "invalid_signature"
```

## 1) Health Check

```bash
curl -i "$BASE_URL/api/health"
```

## 2) Forgot Password - Allowlist Redirect

### 2.1 Redirect allowed (harus diterima)

```bash
curl -i -X POST "$BASE_URL/api/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\",\"redirectTo\":\"$ALLOWED_REDIRECT\"}"
```

### 2.2 Redirect blocked (harus ditolak)

```bash
curl -i -X POST "$BASE_URL/api/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\",\"redirectTo\":\"$BLOCKED_REDIRECT\"}"
```

## 3) Forgot Password - Rate Limit 3x per Email per Jam

Jalankan 4 kali berurutan untuk email yang sama; request ke-4 harus `429`.

```bash
curl -i -X POST "$BASE_URL/api/auth/forgot-password" -H "Content-Type: application/json" -d "{\"email\":\"$TEST_EMAIL\",\"redirectTo\":\"$ALLOWED_REDIRECT\"}"
curl -i -X POST "$BASE_URL/api/auth/forgot-password" -H "Content-Type: application/json" -d "{\"email\":\"$TEST_EMAIL\",\"redirectTo\":\"$ALLOWED_REDIRECT\"}"
curl -i -X POST "$BASE_URL/api/auth/forgot-password" -H "Content-Type: application/json" -d "{\"email\":\"$TEST_EMAIL\",\"redirectTo\":\"$ALLOWED_REDIRECT\"}"
curl -i -X POST "$BASE_URL/api/auth/forgot-password" -H "Content-Type: application/json" -d "{\"email\":\"$TEST_EMAIL\",\"redirectTo\":\"$ALLOWED_REDIRECT\"}"
```

## 4) Admin Guard (contoh endpoint user create)

### 4.1 Non-admin (harus `403`)

```bash
curl -i -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=$NON_ADMIN_SESSION_COOKIE" \
  -d "{\"name\":\"QA User\",\"email\":\"qa.create@example.com\",\"password\":\"StrongPass123!\",\"roleId\":\"00000000-0000-0000-0000-000000000000\"}"
```

### 4.2 Admin (harus diproses normal sesuai permission)

```bash
curl -i -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=$ADMIN_SESSION_COOKIE" \
  -d "{\"name\":\"QA Admin Create\",\"email\":\"qa.admin.create@example.com\",\"password\":\"StrongPass123!\",\"roleId\":\"00000000-0000-0000-0000-000000000000\"}"
```

## 5) Refresh Token Rotation

### 5.1 Rotate valid token (harus sukses)

```bash
curl -i -X POST "$BASE_URL/api/auth/rotate-refresh-token" \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=$VALID_SESSION_COOKIE; refresh_token=$VALID_REFRESH_TOKEN" \
  -d "{}"
```

### 5.2 Rotate token lama/invalid (harus `401`)

```bash
curl -i -X POST "$BASE_URL/api/auth/rotate-refresh-token" \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=$VALID_SESSION_COOKIE; refresh_token=$INVALID_REFRESH_TOKEN" \
  -d "{}"
```

## 6) Stripe Webhook Signature

Catatan: gunakan raw payload persis dan signature yang dibuat Stripe CLI/SDK.

### 6.1 Signature valid (harus diterima)

```bash
curl -i -X POST "$BASE_URL/api/webhooks/stripe" \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: $STRIPE_SIGNATURE_VALID" \
  --data-binary '{"id":"evt_test_webhook","object":"event","type":"payment_intent.succeeded"}'
```

### 6.2 Signature invalid (harus ditolak)

```bash
curl -i -X POST "$BASE_URL/api/webhooks/stripe" \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: $STRIPE_SIGNATURE_INVALID" \
  --data-binary '{"id":"evt_test_webhook","object":"event","type":"payment_intent.succeeded"}'
```

## 7) Error Handling Generic Message

Contoh trigger error validasi:

```bash
curl -i -X POST "$BASE_URL/api/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"\",\"redirectTo\":\"not-a-url\"}"
```

Expected:

- Client menerima message generik.
- Detail stack/error hanya muncul di server log.
