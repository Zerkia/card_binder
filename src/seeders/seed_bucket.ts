// src/seeders/seed_bucket.ts

import { supabase } from "@/supabaseClient";

// YGOPRODeck API endpoint
const ygoApiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

export async function downloadAndUploadImages() {
  try {
    // Fetch all card data
    const response = await fetch(ygoApiUrl);
    const data = await response.json();
    const cards = data.data;

    for (const card of cards) {
      const imageUrl = card.card_images[0].image_url;
      const imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        console.error(`Failed to fetch image: ${imageUrl}`);
        continue;
      }

      const imageBlob = await imageResponse.blob();
      const fileExt = imageUrl.split('.').pop();
      const fileName = `${card.id}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('card-images')
        .upload(filePath, imageBlob, {
          contentType: `image/${fileExt}`,
        });

      if (uploadError) {
        console.error(`Failed to upload image: ${fileName}`, uploadError);
      } else {
        console.log(`Uploaded image: ${fileName}`);
      }
    }
  } catch (error) {
    console.error('Error downloading and uploading images:', error);
  }
}
