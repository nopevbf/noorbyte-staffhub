type LogLevel = "info" | "warn" | "error";

type LogMeta = Record<string, unknown> | undefined;

/**
 * Menulis log terstruktur ke stderr agar aman dipakai di environment server.
 * @param level Level log.
 * @param message Ringkasan pesan log.
 * @param meta Data tambahan yang relevan untuk observability.
 */
function writeLog(level: LogLevel, message: string, meta?: LogMeta) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(meta ?? {}),
  };

  process.stderr.write(`${JSON.stringify(payload)}\n`);
}

/**
 * Util logging sederhana untuk penggantian penggunaan console.* di server.
 */
export const logger = {
  info(message: string, meta?: LogMeta) {
    writeLog("info", message, meta);
  },
  warn(message: string, meta?: LogMeta) {
    writeLog("warn", message, meta);
  },
  error(message: string, meta?: LogMeta) {
    writeLog("error", message, meta);
  },
};
