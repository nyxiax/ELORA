import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountDashboard } from "@/components/elora/account-dashboard";

export const metadata: Metadata = { title: "حساب کاربری" };

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="container-elora flex flex-1 items-center justify-center py-24">
          <div className="size-10 animate-spin rounded-full border-4 border-rose-100 border-t-primary" />
        </div>
      }
    >
      <AccountDashboard />
    </Suspense>
  );
}
