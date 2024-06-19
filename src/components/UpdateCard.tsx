import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import CardForm from "@/components/CardForm";
import { Center, Spinner, Text } from "@chakra-ui/react";

interface UpdateCardProps {
  uniqueId: number;
}

export default function UpdateCard({ uniqueId }: UpdateCardProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [cardId, setCardId] = useState<number | undefined>();
  const [existingCardData, setExistingCardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Fetch user ID
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Error fetching session:', sessionError);
          return;
        }
        if (session?.user?.id) {
          setUserId(session.user.id);
        } else {
          console.error('No user logged in');
          return;
        }

        // Fetch card data
        const { data: cardData, error: cardError } = await supabase
          .from('cards')
          .select('*')
          .eq('id', uniqueId)
          .single();

        if (cardError) {
          console.error('Error fetching card data:', cardError);
          return;
        }

        if (cardData) {
          setCardId(cardData.cardid);
          setExistingCardData(cardData);
        } else {
          console.error('No card found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uniqueId]);

  const handleFormSubmitSuccess = () => {
    console.log("Card updated successfully");
  };

  return (
    <>
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
      ) : cardId ? (
        <CardForm
          uniqueId={uniqueId}
          cardId={cardId}
          userId={userId}
          isUpdate={true}
          existingCardData={existingCardData}
        />
      ) : (
        <Center flexDirection="column">
          <Text mt={4}>No Card Found</Text>
        </Center>
      )}
    </>
  );
}
