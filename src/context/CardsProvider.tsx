'use client'

import useCards from "@/hooks/useCards";
import { Card } from "@/types/card";
import Fuse from "fuse.js";
import { ReactNode, createContext, useContext, useState } from "react"

interface iCardsContext {
    cardResult: Card[]
    updateInput: (value: string) => void
}

const CardsContext = createContext<iCardsContext>({
    cardResult: [],
    updateInput: () => {}
});

export function useCardsContext(){
    return useContext(CardsContext)
}

export default function CardsProvider({children}: {children: ReactNode}) {
    const { cards } = useCards();
    const [input, setInput] = useState("");

    const fuse = new Fuse(cards, {
        keys: ['name'],
        threshold: 0.2
    })

    const cardResult = input ? fuse.search(input, {
        limit: 100
    }).map((card) => {
        return {
            ...card.item
        }
    }) : cards

    function updateInput(value: string){
        setInput(value)
    }

    return (
        <CardsContext.Provider value={{cardResult, updateInput}}>
            {children}
        </CardsContext.Provider>
    )
}