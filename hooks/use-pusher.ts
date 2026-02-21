"use client";

import { useEffect, useRef } from "react";
import type { Channel } from "pusher-js";

import { getPusherClient } from "@/lib/pusher-client";

export function usePusher(
  channelName: string | null,
  eventName: string,
  callback: (data: any) => void,
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!channelName) return;

    const client = getPusherClient();
    if (!client) return;

    const channel: Channel = client.subscribe(channelName);

    const handler = (data: any) => {
      callbackRef.current(data);
    };

    channel.bind(eventName, handler);

    return () => {
      channel.unbind(eventName, handler);
      client.unsubscribe(channelName);
    };
  }, [channelName, eventName]);
}
