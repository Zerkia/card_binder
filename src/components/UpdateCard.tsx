import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import useCard from "@/hooks/useCard";
import CardForm from "@/components/CardForm";

interface UpdateCardProps {
  uniqueId: number;
}

export default function UpdateCard({ uniqueId }: UpdateCardProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [cardId, setCardId] = useState<number | undefined>();
  const [existingCardData, setExistingCardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    setIsLoading(true);
    const fetchUserId = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      if (session?.user?.id) {
        setUserId(session.user.id);
      } else {
        console.error('No user logged in');
      }
    };

    const fetchCardData = async () => {
      // console.log(`Fetching card data for uniqueId: ${uniqueId}`);
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('id', uniqueId)
        .single();

        setCardId(data.cardid);
        console.log(data);
      if (error) {
        console.error('Error fetching card data:', error);
        return;
      }

      setExistingCardData(data);
    };

    fetchUserId();
    fetchCardData();
    setIsLoading(false);
  }, []);

  const handleFormSubmitSuccess = () => {
    console.log("Card updated successfully");
  };

  return (
    <>
      {cardId && !isLoading? (
        <CardForm
          uniqueId={uniqueId}
          cardId={cardId}
          userId={userId}
          onSubmitSuccess={handleFormSubmitSuccess}
          isUpdate={true}
          existingCardData={existingCardData}
        />
      ) : (
        <p>No card found</p>
      )}
    </>
  );
}
