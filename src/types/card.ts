export interface Card {
  id: number
  name: string
  type: string //Card type, normal, fusion, pendulum etc.
  frameType: string
  desc: string
  atk: string
  def: string
  level: number
  race: string //monster type, wyrm, dragon, warrior etc.
  attribute: string
  card_sets: CardSets[]
  card_images: CardImage[]
  card_prices: CardPrices[]
}

interface CardSets {
  set_name: string
  set_code: string
  set_rarity: string
  set_rarity_code: string
  set_price: string
}

interface CardImage { 
    id: number
    image_url: string
    image_url_small: string
    image_url_cropped: string
}

interface CardPrices {
  cardmarket_price: string
  tcgplayer_price: string
  ebay_price: string
  amazon_price: string
  coolstuffinc_price: string
}