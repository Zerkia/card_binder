import useCard from "@/hooks/useCard";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useToast } from "@chakra-ui/react";

interface SpecificCardProps {
  id: number;
}

export default function SpecificCard({ id }: SpecificCardProps) {
  const toast = useToast();
  const { card } = useCard(id);
  const [cardSet, setCardSet] = useState<string | undefined>('');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState("mint");
  const [language, setLanguage] = useState("english");
  const [firstEdition, setFirstEdition] = useState(false);
  const [notes, setNotes] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Ensure user is logged in, so data can be stored appropriately
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

  //Ensures that the default value card set fetched from api can be stored without additional confirmation
  useEffect(() => {
    if (card && card?.card_sets?.length > 0) {
      setCardSet(card.card_sets[0].set_code);
    }
  }, [card]);

  //Form handling
  const handleCardSet = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCardSet(e.target.value);
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleFirstEditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstEdition(e.target.checked);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  //Form submission handling
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    //Make sure user is logged in
    if (!userId) {
      toast({
        title: "User not logged in.",
        description: "Please log in to add a card.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
  
    try {

      //Fetches image from api url and stores in supabase bucket to recall later
      const imageUrl = card!.card_images[0].image_url;
      console.log(imageUrl);

      //Results in CORS for some reason?
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch the image from the API');
      }
      const imageBlob = await response.blob();
  
      const fileExt = imageUrl.split('.').pop();
      const fileName = `${card?.id}.${fileExt}`;
      const filePath = `public/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('card-images')
        .upload(filePath, imageBlob, {
          contentType: `image/${fileExt}`,
        });
  
      if (uploadError) {
        throw uploadError;
      }
  
      const { data: publicUrlData } = supabase.storage
        .from('card-images')
        .getPublicUrl(filePath);
  
      if (!publicUrlData.publicUrl) {
        toast({
          title: "Error in card image download.",
          description: 'Could not fetch image url',
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
  
      const publicUrl = publicUrlData.publicUrl;
  
      // Save the card data and image URL to the database
      const { data, error } = await supabase
        .from('cards')
        .insert({
          userid: userId,
          cardid: id,
          cardsets: cardSet,
          quantity: quantity,
          condition: condition,
          language: language,
          firstedition: firstEdition,
          notes: notes,
          image_url: publicUrl,
        });
  
      if (error) {
        throw error;
      }
  
      console.log('Card data saved:', data);
      toast({
        title: "Card added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error saving card.",
        description: error.message || 'Unknown Error',
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  
  return (
    <>
      {/* IMAGE */}
      {card ? (
        <section className="text-center text-black">
          <Image
            src={card.card_images[0].image_url}
            alt={card.name}
            width={255}
            height={255}
            layout="fixed"
            className="block mx-auto mb-4"
          />

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* CARD SET */}
            <label htmlFor="cardSets" className="block mt-4 mx-auto font-bold">Card Set:</label>
            <select
              id="cardSets"
              className="block w-44 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleCardSet}
            >
              {card.card_sets.map((cardSet) => {
                const euroPrice = (parseFloat(cardSet.set_price) * 0.928728).toFixed(2);
                return (
                  <option
                    key={cardSet.set_code}
                    value={cardSet.set_code}
                  >
                    {cardSet.set_code.split("-")[0]} {cardSet.set_rarity_code} - €{euroPrice}
                  </option>
                );
              })}
            </select>

            {/* QUANTITY */}
            <label htmlFor="quantity" className="block mt-4 mx-auto font-bold">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="block w-44 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Quantity"
            />

            {/* CARD CONDITION */}
            <label htmlFor="condition" className="block mt-4 mx-auto font-bold">Condition:</label>
            <select
              id="condition"
              name="condition"
              value={condition}
              onChange={handleConditionChange}
              className="block w-44 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="mint">Mint</option>
              <option value="near mint">Near Mint</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="light played">Light Played</option>
              <option value="played">Played</option>
              <option value="poor">Poor</option>
            </select>

            {/* LANGUAGE */}
            <label htmlFor="language" className="block mt-4 mx-auto font-bold">Language:</label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={handleLanguageChange}
              className="block w-44 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="spanish">Spanish</option>
              <option value="italian">Italian</option>
              <option value="portuguese">Portuguese</option>
            </select>

            {/* FIRST EDITION ? */}
            <label htmlFor="firstEdition" className="block mt-4 mx-auto font-bold">First Edition?</label>
            <input
              type="checkbox"
              id="firstEdition"
              name="firstEdition"
              checked={firstEdition}
              onChange={handleFirstEditionChange}
              className="appearance-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            {/* PERSONAL NOTES */}
            <label htmlFor="notes" className="block mt-3 mx-auto font-bold">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={handleNotesChange}
              className="block w-52 h-12 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-3.5 pl-3 mt-1 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Notes"
            />

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="block mx-auto w-52 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </section>
      ) : (
        <p>No card found</p>
      )}
    </>
  );
}
