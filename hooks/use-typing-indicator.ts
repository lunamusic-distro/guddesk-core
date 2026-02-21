"use client";

import { useState, useCallback, useRef } from "react";
import { usePusher } from "./use-pusher";
import { getPusherClient } from "@/lib/pusher-client";

export function useTypingIndicator(conversationId: string | null) {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSentRef = useRef<number>(0);

  // Listen for typing events
  usePusher(
    conversationId ? `private-conversation-${conversationId}` : null,
    "typing:start",
    (data: { userId: string; name: string }) => {
      setIsTyping(true);
      setTypingUser(data.name);

      // Auto-clear after 3 seconds
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setTypingUser(null);
      }, 3000);
    },
  );

  usePusher(
    conversationId ? `private-conversation-${conversationId}` : null,
    "typing:stop",
    () => {
      setIsTyping(false);
      setTypingUser(null);
    },
  );

  const sendTyping = useCallback(() => {
    if (!conversationId) return;
    const now = Date.now();
    // Throttle to once per second
    if (now - lastSentRef.current < 1000) return;
    lastSentRef.current = now;

    const client = getPusherClient();
    if (!client) return;

    const channel = client.channel(`private-conversation-${conversationId}`);
    if (channel) {
      channel.trigger("client-typing", {});
    }
  }, [conversationId]);

  return { isTyping, typingUser, sendTyping };
}
