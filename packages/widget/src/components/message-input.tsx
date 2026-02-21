import { useRef } from "preact/hooks";
import { inputText, isLoading } from "../stores/state";
import { sendMessage } from "../api/client";

export function MessageInput() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function handleSend() {
    const text = inputText.value.trim();
    if (!text || isLoading.value) return;

    inputText.value = "";
    await sendMessage(text);

    // Re-focus input after send
    inputRef.current?.focus();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div class="fc-input-area">
      <textarea
        ref={inputRef}
        class="fc-input"
        rows={1}
        placeholder="Type a message..."
        value={inputText.value}
        onInput={(e) => {
          inputText.value = (e.target as HTMLTextAreaElement).value;
        }}
        onKeyDown={handleKeyDown}
      />
      <button
        class="fc-send-btn"
        onClick={handleSend}
        disabled={!inputText.value.trim() || isLoading.value}
      >
        Send
      </button>
    </div>
  );
}
