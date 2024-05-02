'use client'

import { useCardsContext } from "@/context/CardsProvider"


export default function CardSearch() {
    const {updateInput} = useCardsContext();

    return (
        <section className="mb-4 mx-auto">
            <form>
                <input type="text" className="appearence-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" onChange={e => updateInput(e.target.value)} placeholder="Search for cards here..."></input>
            </form>
        </section>
    )
}