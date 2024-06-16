'use client'

import CardList from "@/components/CardList";
import CardSearch from "@/components/CardSearch";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col px-12 pt-6">
      <CardSearch />
      <CardList />
    </main>
  );
}
