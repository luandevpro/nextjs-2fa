import * as speakeasy from 'speakeasy';

export default async function handle(req, res) {
  const result = JSON.parse(req.body);
  const isValid = await speakeasy.totp.verify({
    secret: result.secret,
    encoding: 'base32',
    token: result.token,
    window: 4,
  });
  res.json({
    valid: isValid,
  });
}
