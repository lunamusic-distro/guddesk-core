import jwt from "jsonwebtoken";

import { env } from "@/env.mjs";

const SECRET = env.AUTH_SECRET;

export interface VisitorTokenPayload {
  visitorId: string;
  workspaceId: string;
}

export function createVisitorToken(
  visitorId: string,
  workspaceId: string,
): string {
  return jwt.sign(
    { visitorId, workspaceId } satisfies VisitorTokenPayload,
    SECRET,
    { expiresIn: "30d" },
  );
}

export function verifyVisitorToken(
  token: string,
): VisitorTokenPayload | null {
  try {
    const payload = jwt.verify(token, SECRET) as VisitorTokenPayload;
    if (!payload.visitorId || !payload.workspaceId) return null;
    return payload;
  } catch {
    return null;
  }
}
