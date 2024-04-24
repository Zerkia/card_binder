import useCard from "@/hooks/useCard";
import Image from "next/image";

interface SpecificCardProps{
    id: number
}

export default function SpecificCard({ id }: SpecificCardProps) {
    const { card } = useCard(id)

    return (
        <>
        { card ?
            <section>
            <h1>{ card.name }</h1>
            <h1>{ card.card_sets[0].set_code.split('-')[0] }</h1>
            {/* <Image src={card.card_images[0].image_url} alt={card.name} width={50} height={50}></Image> */}
            </section>
            : 
            <p>No card found</p>
        }
        </>
    )
}