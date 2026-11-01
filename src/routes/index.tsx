import { createFileRoute } from "@tanstack/react-router";
import { BankApp } from "@/bank/BankApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <BankApp />;
}
