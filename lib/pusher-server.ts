import Pusher from "pusher";

import { env } from "@/env.mjs";

let pusherServerInstance: Pusher | null = null;

export function getPusherServer(): Pusher | null {
  if (!env.PUSHER_APP_ID || !env.PUSHER_SECRET || !env.NEXT_PUBLIC_PUSHER_KEY || !env.NEXT_PUBLIC_PUSHER_CLUSTER) {
    return null;
  }

  if (!pusherServerInstance) {
    pusherServerInstance = new Pusher({
      appId: env.PUSHER_APP_ID,
      key: env.NEXT_PUBLIC_PUSHER_KEY,
      secret: env.PUSHER_SECRET,
      cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
    });
  }

  return pusherServerInstance;
}
