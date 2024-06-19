'use client'

import UpdateCard from "@/components/UpdateCard"
import GenericRouter from "@/components/genericRouter"
import { useSearchParams } from "next/navigation"

export default function UpdatePage({params}: { params: {id: number}}) {
    return (
        <main className="flex min-h-screen flex-col px-12 pt-6">
            <UpdateCard uniqueId={params.id} />
        </main>
    )
}