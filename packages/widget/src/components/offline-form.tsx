import { useState } from "preact/hooks";
import { showOfflineForm, visitorEmail, config } from "../stores/state";
import { identify } from "../api/client";

export function OfflineForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(visitorEmail.value ?? "");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await identify({
        email: trimmedEmail,
        name: name.trim() || undefined,
      });
      visitorEmail.value = trimmedEmail;
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleDismiss() {
    showOfflineForm.value = false;
  }

  if (submitted) {
    return (
      <div class="fc-offline-form">
        <div class="fc-offline-success">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={config.value.primaryColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p class="fc-offline-success-title">Thanks! We'll be in touch.</p>
          <p class="fc-offline-success-text">
            We'll get back to you at <strong>{email}</strong> as soon as possible.
          </p>
          <button class="fc-offline-dismiss" onClick={handleDismiss}>
            Continue chatting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="fc-offline-form">
      <div class="fc-offline-header">
        <p class="fc-offline-title">We're not available right now</p>
        <p class="fc-offline-subtitle">Leave your details and we'll get back to you.</p>
      </div>
      <form class="fc-offline-fields" onSubmit={handleSubmit}>
        <div class="fc-offline-field">
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
        </div>
        <div class="fc-offline-field">
          <label>Email *</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <div class="fc-offline-field">
          <label>Message</label>
          <textarea
            placeholder="Anything else you'd like us to know?"
            rows={3}
            value={message}
            onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
          />
        </div>
        {error && (
          <div class="fc-offline-error">{error}</div>
        )}
        <button type="submit" class="fc-offline-submit" disabled={submitting}>
          {submitting ? "Sending..." : "Leave a message"}
        </button>
        <button type="button" class="fc-offline-dismiss" onClick={handleDismiss}>
          Continue chatting
        </button>
      </form>
    </div>
  );
}
