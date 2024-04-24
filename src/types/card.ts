export interface Card {
  id: number
  name: string
  card_sets: CardSets[]
  card_images: CardImage[]
}

interface CardSets {
  set_name: string
  set_code: string
  set_price: string
}

interface CardImage { 
    id: number
    image_url: string
    image_url_small: string
    image_url_cropped: string
}