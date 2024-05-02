
import { useEffect, useState } from "react";
import ApiClient from "@/services/api-client";
import { Card } from "@/types/card";

export default function useCards() {
  const [cards, setCards] = useState<Card[]>([])
  const apiClient = new ApiClient<Card>('/')

  useEffect(() => {
    apiClient.getAll()
    .then((res) => setCards(res))
    .catch((err) => console.log(err))
  }, [])
  
  return {
    cards
  }
}