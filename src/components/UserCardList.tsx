import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useToast, Center, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function UserCardList() {
  const [userId, setUserId] = useState<string | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    setIsLoading(true);
    const fetchUserId = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        toast({
          title: "Error fetching session.",
          description: error.message || 'Unknown Error',
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      if (session?.user?.id) {
        setUserId(session.user.id);
      } else {
        console.error('No user logged in');
        toast({
          title: "No user logged in.",
          description: "Please log in to view your cards.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };

    fetchUserId();
  }, [toast]);

  useEffect(() => {
    if (!userId) return;

    const fetchCards = async () => {
      try {
        const { data: cardsData, error } = await supabase
          .from('cards')
          .select()
          .eq('userid', userId)
          .order('name');

        if (error) {
          throw error;
        }

        setCards(cardsData || []);
        setIsLoading(false);
      } catch (error: any) {
        toast({
          title: "Error fetching cards.",
          description: error.message || 'Unknown Error',
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [userId, toast]);

  return (
    <section>
      <p className="text-center text-lg mb-4">
        Collection total: <span className="font-bold italic">{cards.length}</span>
      </p>

      {isLoading ? (
        <Center flexDirection="column">
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
          <Text mt={4}>Please wait...</Text>
        </Center>
      ) : (
        cards.slice(0, 25).map((card) => (
          <Link
            key={card.id}
            href={{
              pathname: `/update/${card.id}`
            }}
          >
            <button
              type="button"
              className="block text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
            >
              {card.name}, {card.cardsets.split("-")[0]}
            </button>
          </Link>
        ))
      )}
    </section>
  );
}
