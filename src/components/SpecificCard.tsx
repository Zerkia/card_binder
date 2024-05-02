import useCard from "@/hooks/useCard";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { useState } from "react";

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
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState("mint");
  const [language, setLanguage] = useState("english");
  const [firstEdition, setFirstEdition] = useState(false);
  const [notes, setNotes] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      {/* IMAGE */}
      {card ? (
        <section className="text-center text-black">
          <Image
            src={card.card_images[0].image_url}
            alt={card.name}
            width={400}
            height={400}
            layout="fixed"
            className="block mx-auto mb-4"
          />

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* CARD SET */}
            <label htmlFor="cardSets" className="block mt-4 mx-auto">Card Set:</label>
            <select
              id="cardSets"
              className="block w-40 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {card.card_sets.map((cardSet) => (
                <option
                  key={cardSet.set_code}
                  value={cardSet.set_code}
                >
                  {cardSet.set_code.split("-")[0]}
                </option>
              ))}
            </select>

            {/* QUANTITY */}
            <label htmlFor="quantity" className="block mt-4 mx-auto">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="block w-40 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Quantity"
            />

            {/* CARD CONDITION */}
            <label htmlFor="condition" className="block mt-4 mx-auto">Condition:</label>
            <select
              id="condition"
              name="condition"
              value={condition}
              onChange={handleConditionChange}
              className="block w-40 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <label htmlFor="language" className="block mt-4 mx-auto">Language:</label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={handleLanguageChange}
              className="block w-40 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="spanish">Spanish</option>
              <option value="italian">Italian</option>
              <option value="portuguese">Portuguese</option>
            </select>

            {/* FIRST EDITION ? */}
            <label htmlFor="firstEdition" className="block mt-4 mx-auto">First Edition?</label>
            <input
                type="checkbox"
                id="firstEdition"
                name="firstEdition"
                checked={firstEdition}
                onChange={handleFirstEditionChange}
                className="appearance-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            {/* PERSONAL NOTES */}
            <label htmlFor="notes" className="block mt-4 mx-auto">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={handleNotesChange}
              className="block w-52 h-12 mx-auto bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-1 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Notes"
            />

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="block mx-auto w-52 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
              "
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
