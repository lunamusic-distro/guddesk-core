import { useEffect, useRef } from "preact/hooks";

import { isOpen, config, conversationId, messages, showOfflineForm, restoreState } from "./stores/state";
import { initClient, fetchConfig, authenticate, fetchMessages } from "./api/client";
import { initPusher, subscribeToConversation, disconnect, isConnected } from "./api/pusher";
import { getStyles } from "./utils/styles";
import { ChatWindow } from "./components/chat-window";
import { ChatBubble } from "./components/chat-bubble";

interface WidgetAppProps {
  appId: string;
  baseUrl: string;
  pusherKey?: string;
  pusherCluster?: string;
}

// Polling interval when Pusher is not available (4 seconds)
const POLL_INTERVAL = 4000;

export function WidgetApp({ appId, baseUrl, pusherKey, pusherCluster }: WidgetAppProps) {
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pusherInitRef = useRef(false);
  const offlineTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastVisitorMsgCountRef = useRef(0);

  // Start polling for new messages when Pusher is not available
  function startPolling() {
    stopPolling();
    pollRef.current = setInterval(() => {
      if (conversationId.value && isOpen.value) {
        fetchMessages().catch(() => {});
      }
    }, POLL_INTERVAL);
  }

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  // Try to init Pusher with the given keys
  async function tryInitPusher(key: string, cluster: string) {
    if (pusherInitRef.current) return;
    pusherInitRef.current = true;
    try {
      await initPusher(key, cluster, `${baseUrl}/api/pusher/auth`);
      // If we already have a conversation, subscribe now
      if (conversationId.value) {
        subscribeToConversation();
      }
      // Pusher connected — stop polling if active
      stopPolling();
    } catch {
      // Pusher failed — fall back to polling
      pusherInitRef.current = false;
      startPolling();
    }
  }

  useEffect(() => {
    restoreState();
    initClient(appId, baseUrl);

    // Fetch config and authenticate in parallel
    Promise.all([
      fetchConfig().catch(() => {}),
      authenticate().catch(() => {}),
    ]).then(() => {
      // If we have a restored conversation, fetch its messages
      if (conversationId.value) {
        fetchMessages().catch(() => {});
      }

      // Try Pusher from props first, then from config response
      const pKey = pusherKey || config.value.pusherKey;
      const pCluster = pusherCluster || config.value.pusherCluster;

      if (pKey && pCluster) {
        tryInitPusher(pKey, pCluster);
      } else {
        // No Pusher configured — use polling
        startPolling();
      }
    });

    return () => {
      disconnect();
      stopPolling();
    };
  }, []);

  // Subscribe to conversation when it changes (Pusher) or ensure polling is active
  useEffect(() => {
    if (conversationId.value) {
      if (isConnected()) {
        subscribeToConversation();
      } else if (!pollRef.current) {
        startPolling();
      }
    }
  }, [conversationId.value]);

  // When widget opens/closes, manage polling (only poll when open)
  useEffect(() => {
    if (isOpen.value && conversationId.value && !isConnected()) {
      // Fetch immediately when opening, then start polling
      fetchMessages().catch(() => {});
      startPolling();
    } else if (!isOpen.value && !isConnected()) {
      stopPolling();
    }
  }, [isOpen.value]);

  // Offline form timer — show form if no agent response after timeout
  useEffect(() => {
    const timeout = config.value.offlineFormTimeout;
    if (!timeout || !conversationId.value) return;

    const msgs = messages.value;
    const visitorMsgCount = msgs.filter((m) => m.type === "VISITOR").length;
    const hasAgentReply = msgs.some((m) => m.type === "AGENT" || m.type === "BOT");

    // If agent has replied, hide the form and reset
    if (hasAgentReply) {
      showOfflineForm.value = false;
      if (offlineTimerRef.current) {
        clearTimeout(offlineTimerRef.current);
        offlineTimerRef.current = null;
      }
      lastVisitorMsgCountRef.current = visitorMsgCount;
      return;
    }

    // Start timer only when a new visitor message is sent (and no agent reply yet)
    if (visitorMsgCount > lastVisitorMsgCountRef.current) {
      lastVisitorMsgCountRef.current = visitorMsgCount;

      if (offlineTimerRef.current) clearTimeout(offlineTimerRef.current);
      offlineTimerRef.current = setTimeout(() => {
        // Check again if no agent reply at timer expiry
        const current = messages.value;
        const replied = current.some((m) => m.type === "AGENT" || m.type === "BOT");
        if (!replied) {
          showOfflineForm.value = true;
        }
      }, timeout * 60 * 1000);
    }

    return () => {
      if (offlineTimerRef.current) {
        clearTimeout(offlineTimerRef.current);
        offlineTimerRef.current = null;
      }
    };
  }, [messages.value, conversationId.value, config.value.offlineFormTimeout]);

  return (
    <>
      <style>{getStyles(config.value.primaryColor, config.value.position)}</style>
      <div class="fc-container">
        {isOpen.value && <ChatWindow />}
        <ChatBubble />
      </div>
    </>
  );
}
