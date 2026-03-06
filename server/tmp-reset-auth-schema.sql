DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS verifications CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id text PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  email_verified boolean NOT NULL DEFAULT false,
  image varchar(512),
  role_id uuid REFERENCES roles(id) ON DELETE SET NULL,
  branch_id uuid REFERENCES branches(id) ON DELETE SET NULL,
  status varchar(20) NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE sessions (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token varchar(512) NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  ip_address varchar(64),
  user_agent varchar(512),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE accounts (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  account_id varchar(255) NOT NULL,
  provider_id varchar(255) NOT NULL,
  access_token varchar(1024),
  refresh_token varchar(1024),
  access_token_expires_at timestamptz,
  refresh_token_expires_at timestamptz,
  scope varchar(512),
  password varchar(255),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE verifications (
  id text PRIMARY KEY,
  identifier varchar(255) NOT NULL,
  value varchar(512) NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text REFERENCES users(id) ON DELETE SET NULL,
  action varchar(20) NOT NULL,
  resource varchar(100) NOT NULL,
  resource_id varchar(100),
  details text,
  ip_address varchar(64),
  created_at timestamptz NOT NULL DEFAULT now()
);
