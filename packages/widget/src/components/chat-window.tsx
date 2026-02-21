import { config, needsEmail, showOfflineForm } from "../stores/state";
import { Header } from "./header";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { PreChatForm } from "./pre-chat-form";
import { OfflineForm } from "./offline-form";

export function ChatWindow() {
  return (
    <div class="fc-window">
      <Header />

      {needsEmail.value ? (
        <PreChatForm />
      ) : showOfflineForm.value ? (
        <>
          <MessageList />
          <OfflineForm />
        </>
      ) : (
        <>
          <MessageList />
          <MessageInput />
        </>
      )}

      {config.value.showBranding && (
        <div class="fc-branding">
          Powered by{" "}
          <a href="https://guddesk.com" target="_blank" rel="noopener">
            GudDesk
          </a>
        </div>
      )}
    </div>
  );
}
