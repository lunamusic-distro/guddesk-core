import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

const trustItems = [
  { icon: Icons.code, label: "Open Source" },
  { icon: Icons.laptop, label: "Self-Hostable" },
  { icon: Icons.sparkles, label: "Agent-Ready" },
  { icon: Icons.integrations, label: "Plugin API" },
  { icon: Icons.integrations, label: "Integrations" },
];

export default function TrustBar() {
  return (
    <section className="py-8 sm:py-12">
      <MaxWidthWrapper>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-8">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2.5 text-muted-foreground"
            >
              <item.icon className="size-5 shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
