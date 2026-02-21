import { isOpen } from "../stores/state";
import { chatIcon, chevronDownIcon } from "../utils/icons";

export function ChatBubble() {
  return (
    <button
      class="fc-bubble"
      onClick={() => (isOpen.value = !isOpen.value)}
      aria-label={isOpen.value ? "Close chat" : "Open chat"}
      dangerouslySetInnerHTML={{
        __html: isOpen.value ? chevronDownIcon : chatIcon,
      }}
    />
  );
}
