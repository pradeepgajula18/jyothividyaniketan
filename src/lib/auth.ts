import crypto from 'crypto';

const ADMIN_SECRET_PIN = process.env.ADMIN_SECRET_PIN || '130603';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'jyothi_vidya_niketan_secret_session_2026_super_key_secure';

export function verifyAdminPin(enteredPin: string): boolean {
  if (!enteredPin) return false;
  // Constant-time comparison to avoid timing attacks
  const pinBuffer = Buffer.from(enteredPin.trim());
  const expectedBuffer = Buffer.from(ADMIN_SECRET_PIN.trim());
  if (pinBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(pinBuffer, expectedBuffer);
}

export function createAdminToken(): string {
  const payload = {
    role: 'administrator',
    school: 'Jyothi Vidya Niketan',
    issuedAt: Date.now(),
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days session
  };
  const payloadStr = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payloadStr).digest('hex');
  const token = Buffer.from(payloadStr).toString('base64') + '.' + signature;
  return token;
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [payloadBase64, signature] = parts;
    const payloadStr = Buffer.from(payloadBase64, 'base64').toString('utf8');
    const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payloadStr).digest('hex');
    if (signature !== expectedSig) return false;
    const parsed = JSON.parse(payloadStr);
    if (Date.now() > parsed.expiresAt) return false;
    return true;
  } catch (e) {
    return false;
  }
}

