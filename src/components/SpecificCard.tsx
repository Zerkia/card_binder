import useCard from "@/hooks/useCard";
import Image from "next/image";
import { Roboto } from "next/font/google";

interface SpecificCardProps {
  id: number;
}

const roboto = Roboto({
  weight: ["100", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function SpecificCard({ id }: SpecificCardProps) {
  const { card } = useCard(id);

  return (
    <>
      {card ? (
        <section className="text-center">
          <h1 className="text-black">{card.name}</h1>
          <select
            id="cardSets"
            className={
              roboto.className +
              ` block mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
            }
          >
            <option selected>Choose a set</option>
            {card.card_sets.map((cardSet) => (
              <option
                key={cardSet.set_code}
                value={cardSet.set_code}
                className={roboto.className}
              >
                {cardSet.set_code.split("-")[0]}
              </option>
            ))}
          </select>
          {/* <Image src={card.card_images[0].image_url} alt={card.name} width={50} height={50}></Image> */}
        </section>
      ) : (
        <p>No card found</p>
      )}
    </>
  );
}
