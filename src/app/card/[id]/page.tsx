'use client'

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpecificCard from "@/components/SpecificCard";

export default function CardPage({ params }: { params: { id: number }}) {

  return (
    <main className="flex min-h-screen flex-col px-12 pt-6">
      <Header />
      <SpecificCard id={params.id}/>
      <Footer />
    </main>
  );
}
