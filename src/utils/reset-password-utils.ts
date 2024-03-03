const crypto = require("crypto");

export function generateToken(email: string, secret: string) {
  const hmac = crypto.createHmac("sha256", secret);
  return hmac.update(email).digest("hex");
}

export function validateToken(email: string, token: string, secret: string) {
  const generatedToken = generateToken(email, secret);
  return token === generatedToken;
}
