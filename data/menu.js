// data/menu.js
// Clean single-source menu data.
// Duplicated menu blocks were removed: old food/beverage copies are gone.
// Shared items such as drinks are defined once and reused by Restaurant, Cafe, and Pool menus.

export const CATEGORY_LABELS = {
  "Başlangıçlar": {
    "en": "Starters",
    "tr": "Başlangıçlar"
  },
  "Tavuk Menüsü": {
    "en": "Chicken Menu",
    "tr": "Tavuk Menüsü"
  },
  "Balık Menüsü": {
    "en": "Fish Menu",
    "tr": "Balık Menüsü"
  },
  "Fix Menü": {
    "en": "Set Menu",
    "tr": "Fix Menü"
  },
  "Et Menüsü": {
    "en": "Meat Menu",
    "tr": "Et Menüsü"
  },
  "Salatalar": {
    "en": "Salads",
    "tr": "Salatalar"
  },
  "Makarnalar": {
    "en": "Pastas",
    "tr": "Makarnalar"
  },
  "Hamburgerler": {
    "en": "Burgers",
    "tr": "Hamburgerler"
  },
  "Pideler": {
    "en": "Pides",
    "tr": "Pideler"
  },
  "Omletler": {
    "en": "Omelets",
    "tr": "Omletler"
  },
  "Tatlılar": {
    "en": "Desserts",
    "tr": "Tatlılar"
  },
  "Alkolsüz İçecekler": {
    "en": "Non-Alcoholic Drinks",
    "tr": "Alkolsüz İçecekler"
  },
  "Kokteyller": {
    "en": "Cocktails",
    "tr": "Kokteyller"
  },
  "Bira": {
    "en": "Beer",
    "tr": "Bira"
  },
  "Viski Şişe": {
    "en": "Whiskey Bottle",
    "tr": "Viski Şişe"
  },
  "Viski": {
    "en": "Whiskey",
    "tr": "Viski"
  },
  "Rakı": {
    "en": "Rakı",
    "tr": "Rakı"
  },
  "Şarap": {
    "en": "Wine",
    "tr": "Şarap"
  },
  "Sıcak İçecekler": {
    "en": "Hot Drinks",
    "tr": "Sıcak İçecekler"
  },
  "The Finger Foods": {
    "en": "Finger Foods",
    "tr": "Atıştırmalıklar"
  }
};

const RESTAURANT_FOOD_ITEMS = [
  {
    "id": "starter-1",
    "category": "Başlangıçlar",
    "price": "360₺",
    "image": "",
    "name": {
      "en": "House Soup",
      "tr": "Günün Çorbası"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "starter-2",
    "category": "Başlangıçlar",
    "price": "360₺",
    "image": "",
    "name": {
      "en": "Garlic Bread",
      "tr": "Sarımsaklı Ekmek"
    },
    "desc": {
      "en": "Bread with garlic butter.",
      "tr": "Mangalda kızarmış sarımsaklı ekmek."
    }
  },
  {
    "id": "starter-3",
    "category": "Başlangıçlar",
    "price": "500₺",
    "image": "",
    "name": {
      "en": "Deep Fried Calamari",
      "tr": "Kalamar"
    },
    "desc": {
      "en": "Rings of squid in a light crispy butter.",
      "tr": "Yağda kalamar."
    }
  },
  {
    "id": "starter-4",
    "category": "Başlangıçlar",
    "price": "540₺",
    "image": "",
    "name": {
      "en": "Garlic Prawns",
      "tr": "Karides"
    },
    "desc": {
      "en": "Jumbo shelled prawns in a hot garlic sauce.",
      "tr": "Sarımsaklı tereyağında karides."
    }
  },
  {
    "id": "starter-5",
    "category": "Başlangıçlar",
    "price": "420₺",
    "image": "",
    "name": {
      "en": "Chicken Liver Pate",
      "tr": "Tavuk Ciğeri Pate"
    },
    "desc": {
      "en": "Chicken liver served with salad.",
      "tr": "Salata ile servis edilen tavuk ciğeri."
    }
  },
  {
    "id": "starter-6",
    "category": "Başlangıçlar",
    "price": "420₺",
    "image": "",
    "name": {
      "en": "Garlic Mushrooms",
      "tr": "Mantar"
    },
    "desc": {
      "en": "In a garlic sauce.",
      "tr": "Sarımsaklı tereyağında mantar."
    }
  },
  {
    "id": "starter-7",
    "category": "Başlangıçlar",
    "price": "520₺",
    "image": "",
    "name": {
      "en": "Scampi",
      "tr": "Skampi"
    },
    "desc": {
      "en": "Breaded scampi served with tartare sauce and garnish.",
      "tr": "Yağda skampi."
    }
  },
  {
    "id": "starter-8",
    "category": "Başlangıçlar",
    "price": "600₺",
    "image": "",
    "name": {
      "en": "Octopus",
      "tr": "Ahtapot"
    },
    "desc": {
      "en": "In a garlic sauce.",
      "tr": "Sarımsaklı tereyağında ahtapot."
    }
  },
  {
    "id": "starter-9",
    "category": "Başlangıçlar",
    "price": "420₺",
    "image": "",
    "name": {
      "en": "Halloumi Pane",
      "tr": "Hellim Pane"
    },
    "desc": {
      "en": "Breaded halloumi served with salad.",
      "tr": "Yağda kızarmış hellim pane."
    }
  },
  {
    "id": "starter-10",
    "category": "Başlangıçlar",
    "price": "480₺",
    "image": "",
    "name": {
      "en": "Deep-Fried Crab Claws",
      "tr": "Yengeç Bacağı"
    },
    "desc": {
      "en": "Breaded crab claws served with tartare sauce and garnish.",
      "tr": "Yağda yengeç bacağı."
    }
  },
  {
    "id": "starter-11",
    "category": "Başlangıçlar",
    "price": "480₺",
    "image": "",
    "name": {
      "en": "Garlic Mussels",
      "tr": "Midye"
    },
    "desc": {
      "en": "Mussels in a garlic sauce.",
      "tr": "Sarımsaklı tereyağında midye."
    }
  },
  {
    "id": "starter-12",
    "category": "Başlangıçlar",
    "price": "420₺",
    "image": "",
    "name": {
      "en": "Pastry",
      "tr": "Sigara Böreği"
    },
    "desc": {
      "en": "Cigarette pastries with cheese.",
      "tr": ""
    }
  },
  {
    "id": "chicken-1",
    "category": "Tavuk Menüsü",
    "price": "800₺",
    "image": "",
    "name": {
      "en": "Chicken Shish",
      "tr": "Tavuk Şiş"
    },
    "desc": {
      "en": "Chicken shish with tomato, pepper and onion. (250gr)",
      "tr": "Domates, biber ve soğanlı tavuk şiş. (250gr)"
    }
  },
  {
    "id": "chicken-2",
    "category": "Tavuk Menüsü",
    "price": "800₺",
    "image": "",
    "name": {
      "en": "Chicken Thigh",
      "tr": "Tavuk But"
    },
    "desc": {
      "en": "Charcoal grilled chicken thigh. (300gr)",
      "tr": "Mangalda tavuk but. (300gr)"
    }
  },
  {
    "id": "chicken-3",
    "category": "Tavuk Menüsü",
    "price": "800₺",
    "image": "",
    "name": {
      "en": "Chicken Wings",
      "tr": "Tavuk Kanat"
    },
    "desc": {
      "en": "Charcoal grilled chicken wings. (300gr)",
      "tr": "Mangalda tavuk kanat. (300gr)"
    }
  },
  {
    "id": "chicken-4",
    "category": "Tavuk Menüsü",
    "price": "900₺",
    "image": "",
    "name": {
      "en": "Mixed Chicken",
      "tr": "Karışık Tavuk"
    },
    "desc": {
      "en": "Chicken shish, chicken thigh with skin, and wings. (350gr)",
      "tr": "Tavuk şiş, derili but, kanat. (350gr)"
    }
  },
  {
    "id": "chicken-5",
    "category": "Tavuk Menüsü",
    "price": "1000₺",
    "image": "",
    "name": {
      "en": "Chicken with Prawns",
      "tr": "Karidesli Tavuk"
    },
    "desc": {
      "en": "Chicken with prawns in lemon and garlic sauce. (180gr chicken - 100gr prawns)",
      "tr": "Limon ve sarımsak soslu karidesli tavuk. (180gr Tavuk - 100gr Karides)"
    }
  },
  {
    "id": "chicken-6",
    "category": "Tavuk Menüsü",
    "price": "920₺",
    "image": "",
    "name": {
      "en": "Chicken with Mushrooms",
      "tr": "Mantarlı Tavuk"
    },
    "desc": {
      "en": "Chicken with mushrooms. (200gr)",
      "tr": "Mantarlı tavuk. (200gr)"
    }
  },
  {
    "id": "chicken-7",
    "category": "Tavuk Menüsü",
    "price": "920₺",
    "image": "",
    "name": {
      "en": "Honey Chicken",
      "tr": "Ballı Tavuk"
    },
    "desc": {
      "en": "Chicken with sweet and sour sauce. (200gr)",
      "tr": "Tatlı ekşi soslu tavuk. (200gr)"
    }
  },
  {
    "id": "chicken-8",
    "category": "Tavuk Menüsü",
    "price": "920₺",
    "image": "",
    "name": {
      "en": "Curry Chicken",
      "tr": "Köri Soslu Tavuk"
    },
    "desc": {
      "en": "Curry chicken. (200gr)",
      "tr": "Köri tavuk. (200gr)"
    }
  },
  {
    "id": "chicken-9",
    "category": "Tavuk Menüsü",
    "price": "920₺",
    "image": "",
    "name": {
      "en": "Orange Chicken",
      "tr": "Portakallı Tavuk"
    },
    "desc": {
      "en": "Chicken with orange and tarragon sauce. (200gr)",
      "tr": "Portakal ve taragon soslu tavuk. (200gr)"
    }
  },
  {
    "id": "chicken-10",
    "category": "Tavuk Menüsü",
    "price": "920₺",
    "image": "",
    "name": {
      "en": "Soy Sauce Chicken",
      "tr": "Soya Soslu Tavuk"
    },
    "desc": {
      "en": "Chicken with onion, mushrooms, red and green peppers, and soy sauce. (200gr)",
      "tr": "Soğan, mantar, kırmızı ve yeşil biberli soya soslu tavuk. (200gr)"
    }
  },
  {
    "id": "fish-1",
    "category": "Balık Menüsü",
    "price": "980₺",
    "image": "",
    "name": {
      "en": "Sea Bream",
      "tr": "Çipura"
    },
    "desc": {
      "en": "Charcoal grilled. (380gr)",
      "tr": "Izgara çipura. (380gr)"
    }
  },
  {
    "id": "fish-2",
    "category": "Balık Menüsü",
    "price": "980₺",
    "image": "",
    "name": {
      "en": "Sea Bass",
      "tr": "Levrek"
    },
    "desc": {
      "en": "Charcoal grilled. (380gr)",
      "tr": "Izgara levrek. (330gr)"
    }
  },
  {
    "id": "fish-3",
    "category": "Balık Menüsü",
    "price": "1000₺",
    "image": "",
    "name": {
      "en": "Minekop",
      "tr": "Kaya Levreği"
    },
    "desc": {
      "en": "Fillet of minekop charcoal grilled. (300gr)",
      "tr": "Mangalda filet kaya levreği. (300gr)"
    }
  },
  {
    "id": "fish-4",
    "category": "Balık Menüsü",
    "price": "980₺",
    "image": "",
    "name": {
      "en": "Ergun's Fish Kofte",
      "tr": "Ergun'un Balık Köftesi"
    },
    "desc": {
      "en": "Deep-fried fish balls. (300gr)",
      "tr": "Kızartılmış balık köftesi. (300gr)"
    }
  },
  {
    "id": "fish-5",
    "category": "Balık Menüsü",
    "price": "980₺",
    "image": "",
    "name": {
      "en": "Deep Fried Calamari",
      "tr": "Kalamar"
    },
    "desc": {
      "en": "Rings of squid in a light crispy batter. (300gr)",
      "tr": "Yağda kızartma kalamar. (300gr)"
    }
  },
  {
    "id": "fish-6",
    "category": "Balık Menüsü",
    "price": "1000₺",
    "image": "",
    "name": {
      "en": "Scampi",
      "tr": "Skampi"
    },
    "desc": {
      "en": "Deep-fried breaded scampi served with tartare sauce. (200gr)",
      "tr": "Yağda kızarmış paneli skampi, tartar sos ile servis edilir. (200gr)"
    }
  },
  {
    "id": "fish-7",
    "category": "Balık Menüsü",
    "price": "1000₺",
    "image": "",
    "name": {
      "en": "Fish A'la Creme",
      "tr": "Kremalı Balık"
    },
    "desc": {
      "en": "Fillet of fish in creamy mushroom and prawn sauce. (250gr)",
      "tr": "Kremalı mantar ve karides soslu balık filetosu. (250gr)"
    }
  },
  {
    "id": "fish-8",
    "category": "Balık Menüsü",
    "price": "1200₺",
    "image": "",
    "name": {
      "en": "Grilled Salmon",
      "tr": "Somon Izgara"
    },
    "desc": {
      "en": "Salmon charcoal grilled with garnish. (220gr)",
      "tr": "Mangalda somon balığı. (220gr)"
    }
  },
  {
    "id": "fish-9",
    "category": "Balık Menüsü",
    "price": "1100₺",
    "image": "",
    "name": {
      "en": "Deep Fried Fish",
      "tr": "Kızarmış Balık"
    },
    "desc": {
      "en": "Fillet of cod fried in a crispy batter. (300gr)",
      "tr": "Çıtır hamurda kızartılmış morina filetosu. (300gr)"
    }
  },
  {
    "id": "fish-10",
    "category": "Balık Menüsü",
    "price": "1100₺",
    "image": "",
    "name": {
      "en": "Mixture of Seafood Plate",
      "tr": "Karışık Balık Tabağı"
    },
    "desc": {
      "en": "Pan fried cod fish, calamari, crab claws, mussels, jumbo prawns and scampi. (300gr)",
      "tr": "Yengeç bacağı, midye, karides, skampi, kalamar. (500gr)"
    }
  },
  {
    "id": "fish-11",
    "category": "Balık Menüsü",
    "price": "1100₺",
    "image": "",
    "name": {
      "en": "King Prawns in Garlic",
      "tr": "Sebzeli Karides"
    },
    "desc": {
      "en": "King prawns cooked in garlic butter with vegetables. (250gr)",
      "tr": "Sarımsaklı tereyağı sebzeli karides. (120gr)"
    }
  },
  {
    "id": "fish-12",
    "category": "Balık Menüsü",
    "price": "1100₺",
    "image": "",
    "name": {
      "en": "King Prawns with Sun-Dried Tomato",
      "tr": "Güveçte Kuru Domatesli Karides"
    },
    "desc": {
      "en": "King prawns cooked in garlic butter with sun-dried tomato. (120gr)",
      "tr": "Sarımsak tereyağında pişmiş karides. (120gr)"
    }
  },
  {
    "id": "fish-13",
    "category": "Balık Menüsü",
    "price": "1100₺",
    "image": "",
    "name": {
      "en": "Sea Bass with Seafood",
      "tr": "Deniz Ürünlü Levrek"
    },
    "desc": {
      "en": "Sea bass fillet with seafood in garlic butter. (300gr)",
      "tr": "Filet levrek üzerinde sarımsak tereyağında kızarmış deniz ürünleri. (350gr)"
    }
  },
  {
    "id": "fix-1",
    "category": "Fix Menü",
    "price": "980₺",
    "image": "",
    "name": {
      "en": "Cold Meze (Per Person)",
      "tr": "Soğuk Meze (Bir Kişilik)"
    },
    "desc": {
      "en": "8 kinds of cold meze: hummus, kısır, cacık, beetroot, eggplant with yoghurt, white cheese, olives, tahini.",
      "tr": "8 çeşit soğuk meze: Humus, kısır, cacık, pancar, yoğurtlu patlıcan, beyaz peynir, zeytin, tahin."
    }
  },
  {
    "id": "fix-2",
    "category": "Fix Menü",
    "price": "1400₺",
    "image": "",
    "name": {
      "en": "Full Meze (Per Person)",
      "tr": "Ful Meze (Bir Kişilik)"
    },
    "desc": {
      "en": "8 kinds of cold meze and 8 kinds of hot meze: hummus, kısır, cacık, beetroot, eggplant with yoghurt, white cheese, olives, tahini, calamari, prawns, crab claws, mussels, scampi, octopus, mushrooms, pastry, and Silver Rocks halloumi.",
      "tr": "8 çeşit soğuk meze ve 8 çeşit sıcak meze: Humus, kısır, cacık, pancar, yoğurtlu patlıcan, beyaz peynir, zeytin, tahin. Kalamar, karides, yengeç bacağı, midye, skampi, ahtapot, mantar, sigara böreği, Silverrocks hellim."
    }
  },
  {
    "id": "fix-3",
    "category": "Fix Menü",
    "price": "1700₺",
    "image": "",
    "name": {
      "en": "Full Meze + Sea Bream or Sea Bass (Per Person)",
      "tr": "Ful Meze + Çipura veya Levrek (Bir Kişilik)"
    },
    "desc": {
      "en": "8 kinds of cold meze and 8 kinds of hot meze.",
      "tr": "8 çeşit soğuk meze, 8 çeşit sıcak meze."
    }
  },
  {
    "id": "fix-4",
    "category": "Fix Menü",
    "price": "1800₺",
    "image": "",
    "name": {
      "en": "Full Meze + Minekop (Per Person)",
      "tr": "Ful Meze + Kaya Levreği (Bir Kişilik)"
    },
    "desc": {
      "en": "8 kinds of cold meze and 8 kinds of hot meze.",
      "tr": "8 çeşit soğuk meze, 8 çeşit sıcak meze."
    }
  },
  {
    "id": "meat-1",
    "category": "Et Menüsü",
    "price": "1060₺",
    "image": "",
    "name": {
      "en": "Lamb Meatballs",
      "tr": "Köfte"
    },
    "desc": {
      "en": "Lamb meatballs charcoal grilled. (300gr)",
      "tr": "(250gr)"
    }
  },
  {
    "id": "meat-2",
    "category": "Et Menüsü",
    "price": "1380₺",
    "image": "",
    "name": {
      "en": "Mixed Kebab",
      "tr": "Karışık Kebap"
    },
    "desc": {
      "en": "Lamb and Chicken Mix. (300gr)",
      "tr": "Et, Tavuk Karışık. (300gr)"
    }
  },
  {
    "id": "meat-3",
    "category": "Et Menüsü",
    "price": "1480₺",
    "image": "",
    "name": {
      "en": "Lamb Cutlets",
      "tr": "Pirzola"
    },
    "desc": {
      "en": "(300gr)",
      "tr": "(300gr)"
    }
  },
  {
    "id": "meat-4",
    "category": "Et Menüsü",
    "price": "1620₺",
    "image": "",
    "name": {
      "en": "Tournedo A'la Cream",
      "tr": "Tournedo A La Cream"
    },
    "desc": {
      "en": "Fillet steak topped with a creamy mushroom and gherkin sauce. (200gr)",
      "tr": "Mantarlı kremalı soslu bonfile. (200gr)"
    }
  },
  {
    "id": "meat-5",
    "category": "Et Menüsü",
    "price": "1620₺",
    "image": "",
    "name": {
      "en": "Peppered Steak",
      "tr": "Peppered Steak"
    },
    "desc": {
      "en": "Fillet steak with ground pepper, brandy, mustard and cream. (200gr)",
      "tr": "Karabiber kremalı soslu bonfile. (200gr)"
    }
  },
  {
    "id": "meat-6",
    "category": "Et Menüsü",
    "price": "1420₺",
    "image": "",
    "name": {
      "en": "Fillet Steak",
      "tr": "Bonfile"
    },
    "desc": {
      "en": "Fillet steak charcoal grilled. (200gr)",
      "tr": "(200gr)"
    }
  },
  {
    "id": "meat-7",
    "category": "Et Menüsü",
    "price": "1300₺",
    "image": "",
    "name": {
      "en": "Beef Stroganoff",
      "tr": "Beef Stroganoff"
    },
    "desc": {
      "en": "Strips of beef cooked with mushrooms, red wine and sour cream. (200gr)",
      "tr": "Mantarlı krema soslu bonfile, ince kıyılmış bonfile. (200gr)"
    }
  },
  {
    "id": "meat-8",
    "category": "Et Menüsü",
    "price": "1300₺",
    "image": "",
    "name": {
      "en": "Stir Fried Beef",
      "tr": "Stir Fried Beef"
    },
    "desc": {
      "en": "Strips of beef cooked with onion, mushroom, red and green pepper and soy sauce. (200gr)",
      "tr": "Mantarlı, soğanlı, biber ve soya soslu ince kıyılmış bonfile. (200gr)"
    }
  },
  {
    "id": "salad-1",
    "category": "Salatalar",
    "price": "560₺",
    "image": "",
    "name": {
      "en": "Chicken Salad",
      "tr": "Tavuk Salatası"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "salad-2",
    "category": "Salatalar",
    "price": "560₺",
    "image": "",
    "name": {
      "en": "Tuna Salad",
      "tr": "Ton Balıklı Salata"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "salad-3",
    "category": "Salatalar",
    "price": "660₺",
    "image": "",
    "name": {
      "en": "Steak Salad",
      "tr": "Steak Salata"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "salad-4",
    "category": "Salatalar",
    "price": "650₺",
    "image": "",
    "name": {
      "en": "Shrimps and Chicken Salad",
      "tr": "Karidesli ve Tavuklu Salata"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "salad-5",
    "category": "Salatalar",
    "price": "650₺",
    "image": "",
    "name": {
      "en": "Mixed Seafood Salad",
      "tr": "Karışık Deniz Ürünleri Salatası"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "salad-6",
    "category": "Salatalar",
    "price": "560₺",
    "image": "",
    "name": {
      "en": "Halloumi Salad",
      "tr": "Hellim Salatası"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "pasta-1",
    "category": "Makarnalar",
    "price": "600₺",
    "image": "",
    "name": {
      "en": "Chicken Fusilli",
      "tr": "Tavuklu Fusilli"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "pasta-2",
    "category": "Makarnalar",
    "price": "600₺",
    "image": "",
    "name": {
      "en": "Mushroom Fusilli",
      "tr": "Mantarlı Fusilli"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "pasta-3",
    "category": "Makarnalar",
    "price": "660₺",
    "image": "",
    "name": {
      "en": "Shrimps and Chicken Fusilli",
      "tr": "Karidesli ve Tavuklu Fusilli"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "pasta-4",
    "category": "Makarnalar",
    "price": "660₺",
    "image": "",
    "name": {
      "en": "Seafood Fusilli",
      "tr": "Deniz Ürünlü Fusilli"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "pasta-5",
    "category": "Makarnalar",
    "price": "600₺",
    "image": "",
    "name": {
      "en": "Spaghetti Bolognese",
      "tr": "Spaghetti Bolognese"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "pasta-6",
    "category": "Makarnalar",
    "price": "660₺",
    "image": "",
    "name": {
      "en": "Seafood Spaghetti",
      "tr": "Deniz Ürünlü Spaghetti"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "pasta-7",
    "category": "Makarnalar",
    "price": "600₺",
    "image": "",
    "name": {
      "en": "Chicken Penne",
      "tr": "Tavuklu Penne"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "burger-1",
    "category": "Hamburgerler",
    "price": "660₺",
    "image": "",
    "name": {
      "en": "Meat Burger",
      "tr": "Et Burger"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "burger-2",
    "category": "Hamburgerler",
    "price": "660₺",
    "image": "",
    "name": {
      "en": "Cheese Burger",
      "tr": "Cheese Burger"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "pitta-1",
    "category": "Pideler",
    "price": "620₺",
    "image": "",
    "name": {
      "en": "Skewered Chicken in Pitta",
      "tr": "Pide İçinde Tavuk Şiş"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "pitta-2",
    "category": "Pideler",
    "price": "620₺",
    "image": "",
    "name": {
      "en": "Lamb Meatball in Pitta Bread",
      "tr": "Pide İçinde Köfte"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "omelette-1",
    "category": "Omletler",
    "price": "480₺",
    "image": "",
    "name": {
      "en": "Mixed Omelette",
      "tr": "Karışık Omlet"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "omelette-2",
    "category": "Omletler",
    "price": "480₺",
    "image": "",
    "name": {
      "en": "Cheese Omelette",
      "tr": "Peynirli Omlet"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "omelette-3",
    "category": "Omletler",
    "price": "480₺",
    "image": "",
    "name": {
      "en": "Mushroom Omelette",
      "tr": "Mantarlı Omlet"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "omelette-4",
    "category": "Omletler",
    "price": "540₺",
    "image": "",
    "name": {
      "en": "Bacon Omelette",
      "tr": "Pastırmalı Omlet"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "dessert-1",
    "category": "Tatlılar",
    "price": "350₺",
    "image": "",
    "name": {
      "en": "Cheesecake",
      "tr": "Cheesecake"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "dessert-2",
    "category": "Tatlılar",
    "price": "350₺",
    "image": "",
    "name": {
      "en": "Ice Cream",
      "tr": "Dondurma"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "dessert-3",
    "category": "Tatlılar",
    "price": "350₺",
    "image": "",
    "name": {
      "en": "Fruit Plate",
      "tr": "Meyve Tabağı"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "dessert-4",
    "category": "Tatlılar",
    "price": "350₺",
    "image": "",
    "name": {
      "en": "Apple Pie",
      "tr": "Elmalı Turta"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  }
];

const SHARED_DRINK_ITEMS = [
  {
    "id": "softdrink-1",
    "category": "Alkolsüz İçecekler",
    "price": "100₺",
    "image": "",
    "name": {
      "en": "CocaCola",
      "tr": "CocaCola"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-2",
    "category": "Alkolsüz İçecekler",
    "price": "100₺",
    "image": "",
    "name": {
      "en": "CocaCola Zero",
      "tr": "CocaCola Zero"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-3",
    "category": "Alkolsüz İçecekler",
    "price": "100₺",
    "image": "",
    "name": {
      "en": "Fanta",
      "tr": "Fanta"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-4",
    "category": "Alkolsüz İçecekler",
    "price": "100₺",
    "image": "",
    "name": {
      "en": "Sprite",
      "tr": "Sprite"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-5",
    "category": "Alkolsüz İçecekler",
    "price": "100₺",
    "image": "",
    "name": {
      "en": "Schweppes",
      "tr": "Schweppes"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-6",
    "category": "Alkolsüz İçecekler",
    "price": "170₺",
    "image": "",
    "name": {
      "en": "Fresh Pomegranate Juice",
      "tr": "Taze Nar Suyu"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-8",
    "category": "Alkolsüz İçecekler",
    "price": "150₺",
    "image": "",
    "name": {
      "en": "Fresh Orange Juice",
      "tr": "Taze Portakal Suyu"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-9",
    "category": "Alkolsüz İçecekler",
    "price": "100₺",
    "image": "",
    "name": {
      "en": "Iced Tea",
      "tr": "Buzlu Çay"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-10",
    "category": "Alkolsüz İçecekler",
    "price": "100₺",
    "image": "",
    "name": {
      "en": "Fruit Juice",
      "tr": "Meyve Suyu"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-11",
    "category": "Alkolsüz İçecekler",
    "price": "100₺",
    "image": "",
    "name": {
      "en": "Lemonade",
      "tr": "Limonata"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-12",
    "category": "Alkolsüz İçecekler",
    "price": "160₺",
    "image": "",
    "name": {
      "en": "Iced Coffee",
      "tr": "Buzlu Kahve"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-13",
    "category": "Alkolsüz İçecekler",
    "price": "180₺",
    "image": "",
    "name": {
      "en": "Milkshake",
      "tr": "Milkshake"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-14",
    "category": "Alkolsüz İçecekler",
    "price": "120₺",
    "image": "",
    "name": {
      "en": "Water (1 Liter)",
      "tr": "Su (1 Litre)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "softdrink-15",
    "category": "Alkolsüz İçecekler",
    "price": "70₺",
    "image": "",
    "name": {
      "en": "Water (0.5 Liter)",
      "tr": "Su (0.5 Litre)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "cocktail-1",
    "category": "Kokteyller",
    "price": "300₺",
    "image": "",
    "name": {
      "en": "Blue Hawaii",
      "tr": "Blue Hawaii"
    },
    "desc": {
      "en": "Vodka, light rum, blue curacao, pineapple juice and sweet-sour mix.",
      "tr": "Votka, light rum, blue curacao, ananas suyu ve tatlı-ekşi karışım."
    }
  },
  {
    "id": "cocktail-2",
    "category": "Kokteyller",
    "price": "300₺",
    "image": "",
    "name": {
      "en": "Bloody Mary",
      "tr": "Bloody Mary"
    },
    "desc": {
      "en": "Vodka, fresh lemon juice, salt, black pepper and tomato juice.",
      "tr": "Votka, taze limon suyu, tuz, karabiber ve domates suyu."
    }
  },
  {
    "id": "cocktail-3",
    "category": "Kokteyller",
    "price": "300₺",
    "image": "",
    "name": {
      "en": "Sex on the Beach",
      "tr": "Sex on the Beach"
    },
    "desc": {
      "en": "Vodka, peach schnapps and cranberry juice.",
      "tr": "Votka, şeftali likörü ve cranberry suyu."
    }
  },
  {
    "id": "cocktail-4",
    "category": "Kokteyller",
    "price": "300₺",
    "image": "",
    "name": {
      "en": "Margarita",
      "tr": "Margarita"
    },
    "desc": {
      "en": "Tequila, triple sec and freshly squeezed lime juice.",
      "tr": "Tekila, triple sec ve taze sıkılmış lime suyu."
    }
  },
  {
    "id": "cocktail-5",
    "category": "Kokteyller",
    "price": "300₺",
    "image": "",
    "name": {
      "en": "Pornstar Martini",
      "tr": "Pornstar Martini"
    },
    "desc": {
      "en": "Vanilla vodka, passion fruit liqueur and passion fruit puree.",
      "tr": "Vanilyalı votka, passion fruit likörü ve passion fruit püresi."
    }
  },
  {
    "id": "cocktail-6",
    "category": "Kokteyller",
    "price": "300₺",
    "image": "",
    "name": {
      "en": "Raspberry Sour",
      "tr": "Raspberry Sour"
    },
    "desc": {
      "en": "Vodka, lemon juice, simple syrup and bourbon.",
      "tr": "Votka, limon suyu, şeker şurubu ve bourbon."
    }
  },
  {
    "id": "cocktail-7",
    "category": "Kokteyller",
    "price": "180₺",
    "image": "",
    "name": {
      "en": "Brandy Sour",
      "tr": "Brandy Sour"
    },
    "desc": {
      "en": "Brandy, lemon juice, soda and angostura.",
      "tr": "Brandy, limon suyu, soda ve angostura."
    }
  },
  {
    "id": "cocktail-8",
    "category": "Kokteyller",
    "price": "300₺",
    "image": "",
    "name": {
      "en": "Cuba Libre",
      "tr": "Cuba Libre"
    },
    "desc": {
      "en": "White rum, cola and fresh lime juice.",
      "tr": "Beyaz rom, kola ve taze lime suyu."
    }
  },
  {
    "id": "cocktail-9",
    "category": "Kokteyller",
    "price": "300₺",
    "image": "",
    "name": {
      "en": "Pina Colada",
      "tr": "Pina Colada"
    },
    "desc": {
      "en": "Light rum, coconut cream, lime juice and pineapple juice.",
      "tr": "Light rum, Hindistan cevizi kreması, lime suyu ve ananas suyu."
    }
  },
  {
    "id": "beer-1",
    "category": "Bira",
    "price": "120₺",
    "image": "",
    "name": {
      "en": "Efes Draft (33cl)",
      "tr": "Efes Fıçı (33cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "beer-2",
    "category": "Bira",
    "price": "140₺",
    "image": "",
    "name": {
      "en": "Efes Draft (50cl)",
      "tr": "Efes Fıçı (50cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "beer-3",
    "category": "Bira",
    "price": "140₺",
    "image": "",
    "name": {
      "en": "Efes Bottle (50cl)",
      "tr": "Efes Şişe (50cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "beer-4",
    "category": "Bira",
    "price": "140₺",
    "image": "",
    "name": {
      "en": "Goldbräu (50cl)",
      "tr": "Goldbräu (50cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "beer-5",
    "category": "Bira",
    "price": "140₺",
    "image": "",
    "name": {
      "en": "Tuborg (50cl)",
      "tr": "Tuborg (50cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "beer-6",
    "category": "Bira",
    "price": "180₺",
    "image": "",
    "name": {
      "en": "Miller (50cl)",
      "tr": "Miller (50cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "beer-7",
    "category": "Bira",
    "price": "180₺",
    "image": "",
    "name": {
      "en": "Bud Bottle (50cl)",
      "tr": "Bud Şişe (50cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "beer-8",
    "category": "Bira",
    "price": "180₺",
    "image": "",
    "name": {
      "en": "Corona (35.5cl)",
      "tr": "Corona (35.5cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "beer-9",
    "category": "Bira",
    "price": "190₺",
    "image": "",
    "name": {
      "en": "Recorders Cider",
      "tr": "Recorders Cider"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "whiskey-bottle-1",
    "category": "Viski Şişe",
    "price": "2800₺",
    "image": "",
    "name": {
      "en": "Black Label (70cl)",
      "tr": "Black Label (70cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "whiskey-bottle-2",
    "category": "Viski Şişe",
    "price": "1800₺",
    "image": "",
    "name": {
      "en": "Black Label (35cl)",
      "tr": "Black Label (35cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "whiskey-bottle-3",
    "category": "Viski Şişe",
    "price": "1700₺",
    "image": "",
    "name": {
      "en": "Red Label (70cl)",
      "tr": "Red Label (70cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "whiskey-bottle-4",
    "category": "Viski Şişe",
    "price": "1100₺",
    "image": "",
    "name": {
      "en": "Red Label (35cl)",
      "tr": "Red Label (35cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "whiskey-1",
    "category": "Viski",
    "price": "180₺",
    "image": "",
    "name": {
      "en": "Local Whisky",
      "tr": "Local Whisky"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "whiskey-2",
    "category": "Viski",
    "price": "240₺",
    "image": "",
    "name": {
      "en": "J.W. Red Label",
      "tr": "J.W. Red Label"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "whiskey-3",
    "category": "Viski",
    "price": "300₺",
    "image": "",
    "name": {
      "en": "J.W. Black Label",
      "tr": "J.W. Black Label"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "whiskey-4",
    "category": "Viski",
    "price": "240₺",
    "image": "",
    "name": {
      "en": "Famous Grouse",
      "tr": "Famous Grouse"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-1",
    "category": "Rakı",
    "price": "180₺",
    "image": "",
    "name": {
      "en": "Rakı Glass",
      "tr": "Rakı Kadeh"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-2",
    "category": "Rakı",
    "price": "220₺",
    "image": "",
    "name": {
      "en": "Rakı Glass (Gold Series)",
      "tr": "Rakı Kadeh (Altın Seri)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-3",
    "category": "Rakı",
    "price": "240₺",
    "image": "",
    "name": {
      "en": "Rakı Glass (Beylerbeyi)",
      "tr": "Rakı Kadeh (Beylerbeyi)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-4",
    "category": "Rakı",
    "price": "550₺",
    "image": "",
    "name": {
      "en": "Yeni Rakı (20cl)",
      "tr": "Yeni Rakı (20cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-5",
    "category": "Rakı",
    "price": "750₺",
    "image": "",
    "name": {
      "en": "Yeni Rakı (35cl)",
      "tr": "Yeni Rakı (35cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-6",
    "category": "Rakı",
    "price": "1300₺",
    "image": "",
    "name": {
      "en": "Yeni Rakı (70cl)",
      "tr": "Yeni Rakı (70cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-7",
    "category": "Rakı",
    "price": "650₺",
    "image": "",
    "name": {
      "en": "Efe Rakı (20cl)",
      "tr": "Efe Rakı (20cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-8",
    "category": "Rakı",
    "price": "850₺",
    "image": "",
    "name": {
      "en": "Efe Rakı (35cl)",
      "tr": "Efe Rakı (35cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-9",
    "category": "Rakı",
    "price": "1480₺",
    "image": "",
    "name": {
      "en": "Efe Rakı (70cl)",
      "tr": "Efe Rakı (70cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-10",
    "category": "Rakı",
    "price": "780₺",
    "image": "",
    "name": {
      "en": "Tekirdağ Altın (20cl)",
      "tr": "Tekirdağ Altın (20cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-11",
    "category": "Rakı",
    "price": "1100₺",
    "image": "",
    "name": {
      "en": "Tekirdağ Altın (35cl)",
      "tr": "Tekirdağ Altın (35cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-12",
    "category": "Rakı",
    "price": "1800₺",
    "image": "",
    "name": {
      "en": "Tekirdağ Altın (70cl)",
      "tr": "Tekirdağ Altın (70cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-13",
    "category": "Rakı",
    "price": "850₺",
    "image": "",
    "name": {
      "en": "Beylerbeyi (20cl)",
      "tr": "Beylerbeyi (20cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-14",
    "category": "Rakı",
    "price": "1200₺",
    "image": "",
    "name": {
      "en": "Beylerbeyi (35cl)",
      "tr": "Beylerbeyi (35cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-15",
    "category": "Rakı",
    "price": "2050₺",
    "image": "",
    "name": {
      "en": "Beylerbeyi (70cl)",
      "tr": "Beylerbeyi (70cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-16",
    "category": "Rakı",
    "price": "620₺",
    "image": "",
    "name": {
      "en": "Yeni Rakı Yeni Seri (20cl)",
      "tr": "Yeni Rakı Yeni Seri (20cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-17",
    "category": "Rakı",
    "price": "900₺",
    "image": "",
    "name": {
      "en": "Yeni Rakı Yeni Seri (35cl)",
      "tr": "Yeni Rakı Yeni Seri (35cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "raki-18",
    "category": "Rakı",
    "price": "1800₺",
    "image": "",
    "name": {
      "en": "Yeni Rakı Yeni Seri (70cl)",
      "tr": "Yeni Rakı Yeni Seri (70cl)"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "wine-1",
    "category": "Şarap",
    "price": "140₺",
    "image": "",
    "name": {
      "en": "Glass of Local Wine",
      "tr": "Bardak Şarap Yerli"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "wine-2",
    "category": "Şarap",
    "price": "200₺",
    "image": "",
    "name": {
      "en": "Glass of Imported Wine",
      "tr": "Bardak Şarap Yabancı"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "hotdrink-1",
    "category": "Sıcak İçecekler",
    "price": "120₺",
    "image": "",
    "name": {
      "en": "Nescafe",
      "tr": "Nescafe"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "hotdrink-2",
    "category": "Sıcak İçecekler",
    "price": "80₺",
    "image": "",
    "name": {
      "en": "Turkish Coffee",
      "tr": "Türk Kahvesi"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "hotdrink-3",
    "category": "Sıcak İçecekler",
    "price": "100₺",
    "image": "",
    "name": {
      "en": "Tea",
      "tr": "Çay"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "hotdrink-4",
    "category": "Sıcak İçecekler",
    "price": "150₺",
    "image": "",
    "name": {
      "en": "Cafe Latte",
      "tr": "Cafe Latte"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "hotdrink-5",
    "category": "Sıcak İçecekler",
    "price": "150₺",
    "image": "",
    "name": {
      "en": "Cappuccino",
      "tr": "Cappuccino"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "hotdrink-6",
    "category": "Sıcak İçecekler",
    "price": "120₺",
    "image": "",
    "name": {
      "en": "Espresso",
      "tr": "Espresso"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "hotdrink-7",
    "category": "Sıcak İçecekler",
    "price": "140₺",
    "image": "",
    "name": {
      "en": "Americano",
      "tr": "Americano"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  }
];

const CAFE_POOL_FINGER_FOOD_ITEMS = [
  {
    "id": "finger-foods-1",
    "category": "The Finger Foods",
    "price": "720₺",
    "image": "",
    "name": {
      "en": "Mix Sea Food",
      "tr": "Karışık Deniz Ürünleri"
    },
    "desc": {
      "en": "Crab Claws, Scampi, Calamari, Torpedo Shrimp, Chips",
      "tr": "Yengeç Bacağı, Scampi, Kalamar, Torpedo Karides, Patates Kızartması"
    }
  },
  {
    "id": "finger-foods-2",
    "category": "The Finger Foods",
    "price": "720₺",
    "image": "",
    "name": {
      "en": "Deep Fried Fish",
      "tr": "Kızarmış Balık"
    },
    "desc": {
      "en": "Cod Fish and Chips",
      "tr": "Morina Balığı ve Patates Kızartması"
    }
  },
  {
    "id": "finger-foods-3",
    "category": "The Finger Foods",
    "price": "600₺",
    "image": "",
    "name": {
      "en": "Mix Local Food",
      "tr": "Yerel Yiyecekleri Karıştırın"
    },
    "desc": {
      "en": "Silver Rocks Hellim, Pastry, Mac and Cheese Balls, Chips",
      "tr": "Silver Rocks Hellim, Börek, Makarna ve Peynir Topları, Patates Kızartması"
    }
  },
  {
    "id": "finger-foods-4",
    "category": "The Finger Foods",
    "price": "660₺",
    "image": "",
    "name": {
      "en": "Calamari",
      "tr": "Kalamar"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "finger-foods-5",
    "category": "The Finger Foods",
    "price": "660₺",
    "image": "",
    "name": {
      "en": "Chicken Croquettes",
      "tr": "Tavuk Kroketleri"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "finger-foods-6",
    "category": "The Finger Foods",
    "price": "540₺",
    "image": "",
    "name": {
      "en": "Tuna Sandwich",
      "tr": "Ton balıklı sandviç"
    },
    "desc": {
      "en": "Sandwiches",
      "tr": "Sandviçler"
    }
  },
  {
    "id": "finger-foods-7",
    "category": "The Finger Foods",
    "price": "540₺",
    "image": "",
    "name": {
      "en": "Chicken Sandwich",
      "tr": "Tavuklu Sandviç"
    },
    "desc": {
      "en": "Sandwiches",
      "tr": "Sandviçler"
    }
  },
  {
    "id": "finger-foods-8",
    "category": "The Finger Foods",
    "price": "540₺",
    "image": "",
    "name": {
      "en": "Bacon Sandwich",
      "tr": "Bacon Sandviç"
    },
    "desc": {
      "en": "Sandwiches",
      "tr": "Sandviçler"
    }
  },
  {
    "id": "finger-foods-9",
    "category": "The Finger Foods",
    "price": "660₺",
    "image": "",
    "name": {
      "en": "Burger",
      "tr": "Hamburger"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "finger-foods-10",
    "category": "The Finger Foods",
    "price": "620₺",
    "image": "",
    "name": {
      "en": "Meat Ball in Pitta Bread",
      "tr": "Pide Arası Köfte"
    },
    "desc": {
      "en": "",
      "tr": ""
    }
  },
  {
    "id": "finger-foods-11",
    "category": "The Finger Foods",
    "price": "480₺",
    "image": "",
    "name": {
      "en": "Fruit Skewers",
      "tr": "Meyve Tabağı"
    },
    "desc": {
      "en": "4 Types of Fruit",
      "tr": "4 Çeşit Meyve"
    }
  }
];

const CAFE_POOL_DESSERT_ITEMS = RESTAURANT_FOOD_ITEMS.filter(item =>
  item.category === "Tatlılar" && ["Cheesecake", "Apple Pie"].includes(item.name.en)
);

const RESTAURANT_ITEMS = [
  ...RESTAURANT_FOOD_ITEMS,
  ...SHARED_DRINK_ITEMS
];

const CAFE_POOL_ITEMS = [
  ...CAFE_POOL_FINGER_FOOD_ITEMS,
  ...SHARED_DRINK_ITEMS,
  ...CAFE_POOL_DESSERT_ITEMS
];

export const MENUS = {
  restaurant: {
    titleKey: "restaurantMenu",
    items: RESTAURANT_ITEMS
  },

  cafe: {
    titleKey: "cafeMenu",
    items: CAFE_POOL_ITEMS
  },

  pool: {
    titleKey: "poolMenu",
    items: CAFE_POOL_ITEMS
  }
};
