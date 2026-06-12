import { Suspense } from "react";
import { HomePage } from "@/views/home/ui/home-page";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7fa]" />}>
      <HomePage />
    </Suspense>
  );
}
