
import { useEffect, useState } from "react";
import ApiClient from "@/services/api-client";
import { Card } from "@/types/card";

export default function useCard(id: number) {
  const [card, setCard] = useState<Card>()
  const apiClient = new ApiClient<Card>('/')

   useEffect(() => {
    apiClient.getById(id)
      .then((res) => setCard(res))
      .catch((err) => console.error(err))
  }, [])
  
  return {
    card
  }
}