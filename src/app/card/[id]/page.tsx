'use client'

import SpecificCard from "@/components/SpecificCard";

export default function CardPage({ params }: { params: { id: number }}) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SpecificCard id={params.id}/>
    </main>
  );
}
