import crypto from "crypto";

const API_SECRET = process.env.GUDESK_API_SECRET || "";

const EMPTY_BODY_HASH = crypto.createHash("sha256").update("").digest("hex");

export interface HmacAuthResult {
  valid: boolean;
  workspaceId: string;
  error?: string;
}

export function verifyHmacSignature(
  method: string,
  path: string,
  headers: Headers,
  body?: string,
): HmacAuthResult {
  if (!API_SECRET) {
    return { valid: false, workspaceId: "", error: "GUDESK_API_SECRET not configured" };
  }

  const signature = headers.get("X-Hertz-Signature");
  const timestamp = headers.get("X-Hertz-Timestamp");
  const workspaceId = headers.get("X-Hertz-Workspace-Id");

  if (!signature || !timestamp || !workspaceId) {
    return { valid: false, workspaceId: "", error: "Missing required HMAC headers" };
  }

  // Reject requests older than 5 minutes
  const now = Math.floor(Date.now() / 1000);
  const requestTime = parseInt(timestamp, 10);
  if (isNaN(requestTime) || Math.abs(now - requestTime) > 300) {
    return { valid: false, workspaceId, error: "Request timestamp expired" };
  }

  const bodyHash = body
    ? crypto.createHash("sha256").update(body).digest("hex")
    : EMPTY_BODY_HASH;

  const canonical = `${method}\n${path}\n${timestamp}\n${bodyHash}`;
  const expectedSig = crypto
    .createHmac("sha256", API_SECRET)
    .update(canonical)
    .digest("hex");

  const expectedHeader = `hmac-sha256=${expectedSig}`;

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedHeader))) {
    return { valid: false, workspaceId, error: "Invalid signature" };
  }

  return { valid: true, workspaceId };
}
