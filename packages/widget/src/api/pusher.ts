import { messages, conversationId, visitorToken, isTyping, type Message } from "../stores/state";

let pusherInstance: any = null;
let currentChannel: any = null;

export async function initPusher(key: string, cluster: string, authEndpoint: string) {
  // Dynamically load pusher-js to keep bundle small when not using real-time
  const { default: Pusher } = await import("pusher-js");

  pusherInstance = new Pusher(key, {
    cluster,
    channelAuthorization: {
      endpoint: authEndpoint,
      transport: "ajax",
      headers: {
        "x-visitor-token": visitorToken.value ?? "",
      },
    },
  });

  return pusherInstance;
}

export function subscribeToConversation() {
  if (!pusherInstance || !conversationId.value) return;

  // Unsubscribe previous
  if (currentChannel) {
    currentChannel.unbind_all();
    pusherInstance.unsubscribe(currentChannel.name);
  }

  const channelName = `presence-visitor-${conversationId.value}`;
  currentChannel = pusherInstance.subscribe(channelName);

  currentChannel.bind("message:created", (data: Message) => {
    if (!messages.value.some((m) => m.id === data.id)) {
      messages.value = [...messages.value, data];
    }
  });

  currentChannel.bind("typing:start", () => {
    isTyping.value = true;
  });

  currentChannel.bind("typing:stop", () => {
    isTyping.value = false;
  });
}

export function isConnected(): boolean {
  return !!pusherInstance;
}

export function disconnect() {
  if (currentChannel) {
    currentChannel.unbind_all();
    pusherInstance?.unsubscribe(currentChannel.name);
    currentChannel = null;
  }
  if (pusherInstance) {
    pusherInstance.disconnect();
    pusherInstance = null;
  }
}
