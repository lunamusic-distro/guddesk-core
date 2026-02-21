import { config, isOpen } from "../stores/state";
import { closeIcon } from "../utils/icons";

export function Header() {
  return (
    <div class="fc-header" style={{ position: "relative" }}>
      <div class="fc-header-title">
        {config.value.workspaceName || "Support"}
      </div>
      <div class="fc-header-subtitle">We typically reply in a few minutes</div>
      <button
        class="fc-header-close"
        onClick={() => (isOpen.value = false)}
        aria-label="Close chat"
        dangerouslySetInnerHTML={{ __html: closeIcon }}
      />
    </div>
  );
}
