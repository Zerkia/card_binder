import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import useCard from "@/hooks/useCard";
import CardForm from "@/components/CardForm";

interface SpecificCardProps {
  id: number;
}

export default function SpecificCard({ id }: SpecificCardProps) {
  const { card } = useCard(id);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
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

    fetchUserId();
  }, []);

  const handleFormSubmitSuccess = () => {
    console.log("Card added successfully");
  };

  return (
    <>
      {card ? (
        <CardForm
          card={card}
          cardId={id}
          userId={userId}
          onSubmitSuccess={handleFormSubmitSuccess}
          isUpdate={false}
        />
      ) : (
        <p>No card found</p>
      )}
    </>
  );
}
