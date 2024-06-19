import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import useCard from "@/hooks/useCard";
import CardForm from "@/components/CardForm";
import { Center, Spinner, Text } from "@chakra-ui/react";

interface SpecificCardProps {
  id: number;
}

export default function SpecificCard({ id }: SpecificCardProps) {
  const { card } = useCard(id);
  const [userId, setUserId] = useState<string | null>(null);
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
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFormSubmitSuccess = () => {
    console.log("Card added successfully");
    // Add any post-form submission logic here if needed
  };

  return (
    <>
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
      ) : card ? (
        <CardForm
          cardId={id}
          userId={userId}
          isUpdate={false}
        />
      ) : (
        <Center flexDirection="column">
          <Text mt={4}>No Card Found</Text>
        </Center>
      )}
    </>
  );
}
