import { Metadata } from "next";

import IntegrationsCatalog from "@/components/sections/integrations-catalog";

export const metadata: Metadata = {
  title: "Integrations – GudDesk",
  description:
    "Connect AI agents, channels, CRMs, and automation tools. Browse the GudDesk integration marketplace — most are free.",
};

export default function IntegrationsPage() {
  return <IntegrationsCatalog />;
}
