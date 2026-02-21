import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HeaderSection } from "@/components/shared/header-section";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

const faqs = [
  {
    question: "Is GudDesk really free?",
    answer:
      "Yes. GudDesk is 100% open source under the AGPL-3.0 license. You get live chat, shared inbox, knowledge base, automations, AI features, and unlimited seats — no paywalls, no limits, no credit card required.",
  },
  {
    question: "What are AI agent plugins?",
    answer:
      "AI agents are bots you connect to GudDesk that can autonomously read conversations, reply to customers, triage issues, suggest articles, and escalate to humans. Use pre-built agents like GudBot, or build your own with our REST API and webhook events. Agents send messages as the BOT type — fully supported in the widget and inbox.",
  },
  {
    question: "Can I build my own agent?",
    answer:
      "Yes. GudDesk exposes a full REST API and event-driven webhooks for conversation lifecycle events (message received, conversation created, tag added, etc.). Build agents in any language — Python, TypeScript, Go — that listen to events and take actions via the API. The BOT message type ensures agent replies appear natively in the widget.",
  },
  {
    question: "How does GudDesk compare to Intercom?",
    answer:
      "GudDesk offers live chat, shared inbox, knowledge base, AI agents, and automations — completely free and open source. Intercom charges $29–$99/seat/month plus extra for AI resolutions. GudDesk has no per-seat pricing, no usage limits, and you own your data.",
  },
  {
    question: "Can I self-host GudDesk?",
    answer:
      "Absolutely. GudDesk is open source and designed to run on your own infrastructure. Deploy with Docker, run on any cloud provider, or use our managed hosting. Your data stays on your servers.",
  },
  {
    question: "What built-in AI features are included?",
    answer:
      "GudDesk includes Claude-powered reply suggestions, conversation summarization, automatic categorization, sentiment analysis, and smart article recommendations. Just set your ANTHROPIC_API_KEY environment variable to enable all AI features. You can also connect external AI agents via the plugin API.",
  },
  {
    question: "How do I install the chat widget?",
    answer:
      "Add two lines of JavaScript to your site. The widget loads asynchronously, is fully customizable — colors, position, welcome message — and works on any website or web app. Agent and bot messages appear natively in the widget.",
  },
  {
    question: "Can I migrate from Intercom?",
    answer:
      "We are building migration tools to import your conversations and articles. In the meantime, you can run both tools side by side during your transition.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <MaxWidthWrapper className="max-w-3xl">
        <HeaderSection title="Frequently asked questions" />

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MaxWidthWrapper>
    </section>
  );
}
