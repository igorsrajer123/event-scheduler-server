const crypto = require("crypto");

export function generateToken(
  email: string,
  secret: string,
  expiresInMinutes: number = 15
) {
  const expiration = Date.now() + expiresInMinutes * 60 * 1000;
  const payload = { email, expiration };
  const token = Buffer.from(JSON.stringify(payload)).toString("base64");

  const hmac = crypto.createHmac("sha256", secret);
  const signature = hmac.update(token).digest("hex");

  return `${token}.${signature}`;
}

export function validateToken(token: string, secret: string) {
  const [payload, signature] = token.split(".");
  const hmac = crypto.createHmac("sha256", secret);
  const expectedSignature = hmac.update(payload).digest("hex");

  // Signature doesn't match, token is invalid
  if (signature !== expectedSignature) {
    return false;
  }

  const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
  const { expiration } = JSON.parse(decodedPayload);

  // Token has expired
  if (expiration < Date.now()) {
    return false;
  }

  // Token is valid
  return true;
}
