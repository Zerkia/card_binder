import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/supabaseClient";
import { useToast } from "@chakra-ui/react";
import useCard from "@/hooks/useCard";
import { useRouter } from 'next/navigation';

interface CardFormProps {
  uniqueId?: number;
  cardId?: number;
  userId: string | null;
  isUpdate: boolean;
  existingCardData?: any;
}

export default function CardForm({ uniqueId, cardId, userId, isUpdate, existingCardData }: CardFormProps) {
  const toast = useToast();
  const router = useRouter();
  const [cardSet, setCardSet] = useState<string | undefined>(existingCardData?.cardsets || '');
  const [cardRarity, setCardRarity] = useState<string | undefined>(existingCardData?.rarity || '');
  const [quantity, setQuantity] = useState(existingCardData?.quantity || 1);
  const [condition, setCondition] = useState(existingCardData?.condition || "mint");
  const [language, setLanguage] = useState(existingCardData?.language || "english");
  const [firstEdition, setFirstEdition] = useState(existingCardData?.firstedition || false);
  const [notes, setNotes] = useState(existingCardData?.notes || "");
  const { card } = useCard(cardId);

  useEffect(() => {
    if (!isUpdate && card && card?.card_sets?.length > 0) {
      setCardSet(card.card_sets[0].set_code);
      setCardRarity(card.card_sets[0].set_rarity_code);
    }
  }, [card, isUpdate]);

  const handleCardSet = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSetCode = e.target.value;
    const selectedCardSet = card?.card_sets.find((set: any) => set.set_code === selectedSetCode);
    
    if (selectedCardSet) {
      setCardSet(selectedSetCode);
      setCardRarity(selectedCardSet.set_rarity_code);
    }
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      let data, error;

      if (isUpdate) {
        const { data: updateData, error: updateError } = await supabase
          .from('cards')
          .update({
            cardsets: `${cardSet?.split("-")[0]} ${cardRarity}`,
            quantity,
            condition,
            language,
            firstedition: firstEdition,
            notes,
          })
          .eq('id', uniqueId)
          .eq('userid', userId);

        data = updateData;
        error = updateError;
      } else {
        const { data: insertData, error: insertError } = await supabase
          .from('cards')
          .insert({
            userid: userId,
            cardid: cardId,
            name: card?.name,
            cardsets: `${cardSet?.split("-")[0]} ${cardRarity}`,
            quantity,
            condition,
            language,
            firstedition: firstEdition,
            notes,
            image_url: card?.id,
          });

        data = insertData;
        error = insertError;
      }

      if (error) {
        throw error;
      }

      toast({
        title: isUpdate ? "Card updated successfully." : "Card added successfully.",
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

  const handleDelete = async () => {
    if (!uniqueId) return;

    try {
      const { data, error } = await supabase
        .from('cards')
        .delete()
        .eq('id', uniqueId)
        .eq('userid', userId);

      if (error) {
        throw error;
      }

      toast({
        title: "Card deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: "Error deleting card.",
        description: error.message || 'Unknown Error',
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <section className="text-center text-black">
      {card && (
        <Image
          src={card.card_images[0].image_url}
          alt={card.name}
          width={255}
          height={255}
          layout="fixed"
          className="block mx-auto mb-4"
        />
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardSets" className="block mt-4 mx-auto font-bold">Card Set:</label>
        <select
          id="cardSets"
          className="block w-44 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={cardSet}
          onChange={handleCardSet}
        >
          {card?.card_sets.map((cardSet: any) => {
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
          {isUpdate ? "Update Card" : "Add To Collection"}
        </button>
      </form>

      {/* DELETE BUTTON */}
      {isUpdate && (
        <button
          type="button"
          onClick={handleDelete}
          className="block mx-auto w-52 h-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm mt-4 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Remove From Collection
        </button>
      )}
    </section>
  );
}
