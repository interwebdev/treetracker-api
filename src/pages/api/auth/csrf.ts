import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const serverKey = "scoobyDoo";
const serverToken = crypto.createHash("sha1").update(serverKey).digest("hex");

const timeInterval = () => Date.now() / (1000 * 5 * 60);

const handleCSRFRequest = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ csrfToken: buildCSRF() });
};

export const buildCSRF = () => {
  const timeToken = timeInterval();
  const nonce128bitvalue = crypto
    .createHash("sha1")
    .update(crypto.randomBytes(16))
    .digest("hex");

  // TODO - Add bearer tokens into the csrf hash
  const tokenVerify = crypto
    .createHash("sha1")
    .update(`${nonce128bitvalue}${serverToken}${timeToken}`)
    .digest("hex");
  return `${nonce128bitvalue}${tokenVerify}`;
};

export const validateCSRFRequest = (csrfToken: string) => {
  const randomToken = csrfToken.slice(0, 40);
  const verifyToken = csrfToken.slice(40, 40);
  const timeToken = timeInterval();
  // TODO - Add bearer tokens into the verify hash
  const validateNow = crypto
    .createHash("sha1")
    .update(`${randomToken}${serverToken}${timeToken}`)
    .digest("hex");
  const validateLast = crypto
    .createHash("sha1")
    .update(`${randomToken}${serverToken}${timeToken - 1}`)
    .digest("hex");
  return verifyToken === validateNow || verifyToken === validateLast;
};

export default handleCSRFRequest;
