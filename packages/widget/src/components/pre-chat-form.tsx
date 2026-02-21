import { useState } from "preact/hooks";
import { visitorEmail } from "../stores/state";
import { identify } from "../api/client";

export function PreChatForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await identify({ email: trimmed });
      visitorEmail.value = trimmed;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form class="fc-prechat" onSubmit={handleSubmit}>
      <label>Enter your email to start chatting</label>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        required
      />
      {error && (
        <div style={{ color: "#ef4444", fontSize: "12px" }}>{error}</div>
      )}
      <button type="submit" disabled={submitting}>
        {submitting ? "..." : "Start Chat"}
      </button>
    </form>
  );
}
