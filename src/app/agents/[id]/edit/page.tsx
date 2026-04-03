import AgentForm from "../../new/AgentForm";

export default function EditAgentPage() {
  // Mocked existing agent data
  const agentData = {
    id: "agt_02h9y",
    name: "Sales Qualification Bot",
    status: "active",
    description: "Handles initial inbound inquiries, qualifies leads based on BANT criteria, and books meetings for account executives.",
    objective: "Qualify leads and schedule a follow-up demo.",
    language: "ar-en",
    tone: "consultative",
    greeting: "Marhaba! You've reached Khemet Enterprise Sales. I'm here to learn a bit about your needs. How can I help you today?",
    questions: [
      "What industry does your company operate in?",
      "Are you looking for an on-premise or cloud deployment?",
      "What is your budget range for this project?"
    ],
    escalateOnFailedIntents: true,
    escalateOnUrgent: true,
    escalateBusinessHours: true,
    fallbackBehavior: "transfer",
    escalationDestination: "sales_queue",
    channels: ["web", "inbound", "whatsapp"],
    lastUpdated: "Today, 14:30 GST"
  };

  return <AgentForm isEdit={true} agentData={agentData} />;
}
