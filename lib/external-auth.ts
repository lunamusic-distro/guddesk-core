import { NextRequest, NextResponse } from "next/server";

import { verifyHmacSignature } from "@/lib/hmac-auth";

export interface AuthenticatedRequest {
  workspaceId: string;
}

export function authenticateExternal(
  req: NextRequest,
  method: string,
  body?: string,
): AuthenticatedRequest | NextResponse {
  const url = new URL(req.url);
  const fullPath = url.pathname + url.search;
  const result = verifyHmacSignature(method, fullPath, req.headers, body);

  if (!result.valid) {
    return NextResponse.json(
      { ok: false, error: { code: "UNAUTHORIZED", message: result.error || "Invalid signature" } },
      { status: 401 },
    );
  }

  return { workspaceId: result.workspaceId };
}
