import { useCardsContext } from "@/context/CardsProvider";
import { Center, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CardList() {
  const { cardResult: cards } = useCardsContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      const delayTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      isFirstLoad.current = false;

      return () => {
        clearTimeout(delayTimeout);
      };
    } else {
      setIsLoading(!cards || cards.length === 0);
    }
  }, [cards]);

  return (
    <section>
      {isLoading ? (
        <Center flexDirection="column">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text mt={4}>Please wait...</Text>
        </Center>
      ) : (
        <>
        {cards && (
            <p className="text-center mb-2">
              Pick from a total of{" "}
              <span className="font-bold italic">{cards.length}</span> cards to
              add to your collection!
            </p>
          )}
          {cards && cards.slice(0, 25).map((card) => (
            <Link key={card.id} href={`/card/${card.id}`}>
              <button
                type="button"
                className="block text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
              >
                {card.name}
              </button>
            </Link>
          ))}
        </>
      )}
    </section>
  );
}
