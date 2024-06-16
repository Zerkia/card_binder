'use client'

import SpecificCard from "@/components/SpecificCard";

export default function CardPage({ params }: { params: { id: number }}) {

  return (
    <main className="flex min-h-screen flex-col px-12 pt-6">
      <SpecificCard id={params.id}/>
    </main>
  );
}
