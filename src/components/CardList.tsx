import { useCardsContext } from "@/context/CardsProvider";
import Link from "next/link";

export default function CardList() {
    const { cardResult : cards } = useCardsContext()

return (
    <section>
        { cards && cards.slice(0, 25).map((card) => 
            <Link key={card.id} href={`/card/${card.id}`}>
                <button 
                type="button" 
                className="block text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
                w-full">{card.name}</button>
            </Link>
        )}
        {cards && (
            <p className="text-center">
                Pick from a total of <span className="font-bold italic">{cards.length}</span> cards to add to your collection!
            </p>
        )}
    </section>
    )
}

