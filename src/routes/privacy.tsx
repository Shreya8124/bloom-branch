import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — KitchenBloom" }, { name: "description", content: "KitchenBloom's privacy policy." }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">Legal</p>
      <h1 className="mt-2 font-display text-5xl font-semibold">Privacy Policy</h1>
      <div className="mt-8 space-y-4 text-muted-foreground">
        <p>KitchenBloom collects only the information required to reserve pickups and manage nursery listings — your name, email, phone, and booking details.</p>
        <p>We never sell personal data. Nursery partners see only the booking information required to prepare and hand over your plant.</p>
        <p>You can request deletion of your account and data at any time by contacting hello@kitchenbloom.co.</p>
        <p>This is a demo policy for illustration purposes.</p>
      </div>
    </div>
  ),
});