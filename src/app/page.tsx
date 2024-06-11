'use client'

import CardList from "@/components/CardList";
import CardSearch from "@/components/CardSearch";
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col px-12 pt-6">
      <Header />
      <CardSearch />
      <CardList />
      <Footer />
    </main>
  );
}
