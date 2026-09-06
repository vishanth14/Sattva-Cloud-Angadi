import type { Ritual } from "../types";

export const rituals: Ritual[] = [
  {
    id: "copper-water-ritual",
    title: "The Morning Copper Water Practice",
    category: "wellness",
    description:
      "An ancient Ayurvedic morning practice of drinking water stored overnight in a copper vessel.",
    traditionalContext:
      "Ayurvedic texts describe copper-stored water (Tamra Jal) as beneficial for balancing Pitta dosha, supporting digestion, and purifying the body. This practice has been followed across India for centuries as part of morning wellness routines.",
    whatYouNeed: [
      "A copper water vessel (bottle or pot)",
      "Clean filtered water",
      "A quiet morning moment",
    ],
    materials: ["copper"],
    steps: [
      {
        step: 1,
        description: "Clean your copper vessel with lemon and salt if not already clean.",
      },
      { step: 2, description: "Fill with clean filtered water in the evening." },
      {
        step: 3,
        description: "Leave at room temperature overnight for 6–8 hours.",
      },
      {
        step: 4,
        description:
          "Drink 1–2 glasses on an empty stomach in the morning before eating.",
      },
      {
        step: 5,
        description: "Rinse the vessel and allow it to air dry.",
      },
    ],
    relatedProductSlugs: [
      "heritage-copper-bottle",
      "copper-tumbler-set",
      "copper-water-pot",
    ],
    image:
      "https://images.unsplash.com/photo-1743438406174-92333c11d0d8?w=800&h=500&fit=crop&auto=format",
    disclaimer:
      "Ayurvedic traditions have a long history of using copper vessels for water storage. Scientific research on copper's antimicrobial properties is ongoing. If you have specific health conditions, consult a healthcare provider before beginning any new practice.",
  },
  {
    id: "evening-diya",
    title: "The Evening Diya",
    category: "puja",
    description:
      "The daily lighting of the diya — a practice that marks the transition from day to evening across Hindu India.",
    traditionalContext:
      "Sandhyavandanam — worship at the junction of day and night — is among the oldest continuous practices in Indian spiritual life. The lighting of the diya marks this moment: the threshold between the work of the day and the rest of the evening. It is a moment of pause, gratitude, and presence.",
    whatYouNeed: [
      "A brass or copper diya",
      "Cotton wick",
      "Pure ghee or sesame oil",
      "A match or lighter",
    ],
    materials: ["brass", "copper"],
    steps: [
      {
        step: 1,
        description: "Clean the diya with a dry cloth and set it in its place — typically the puja area or the home threshold.",
      },
      {
        step: 2,
        description: "Add ghee or sesame oil — enough to burn for the duration of your prayer or meditation.",
      },
      {
        step: 3,
        description: "Set the cotton wick so that one end is in the oil and the other is ready to light.",
      },
      {
        step: 4,
        description: "Light the wick. Observe the flame for a moment before beginning your prayer or sitting in quiet.",
      },
      {
        step: 5,
        description: "Let the flame burn until it is naturally complete, or carefully extinguish after your practice.",
      },
    ],
    relatedProductSlugs: ["brass-diya", "bronze-lamp", "copper-tumbler-set"],
    image:
      "https://images.unsplash.com/photo-1666694051761-cd972857da30?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "kansa-dining",
    title: "The Kansa Dining Practice",
    category: "dining",
    description:
      "Eating from a Kansa thali — the traditional Ayurvedic way of dining that is said to transform the quality of meals.",
    traditionalContext:
      "Ayurvedic dining goes beyond nutrition to consider the vessel from which food is eaten. Kansa (bell metal) thalis and bowls are described in Ayurvedic texts as having beneficial properties — believed to alkalise food, reduce acidity, and support digestion. Traditional Ayurvedic households ate from Kansa as a matter of daily practice.",
    whatYouNeed: [
      "A Kansa thali",
      "Kansa bowls for sides",
      "A mindful approach to the meal",
    ],
    materials: ["kansa"],
    steps: [
      {
        step: 1,
        description: "Rinse the Kansa thali and bowls before use.",
      },
      {
        step: 2,
        description:
          "Arrange your meal on the thali in the traditional manner: rice or roti at the centre, dal and sabzi in the smaller bowls.",
      },
      {
        step: 3,
        description: "Eat without distraction — no screens, no hurry.",
      },
      {
        step: 4,
        description: "After the meal, wash the Kansa with tamarind water or lime and salt — not soap.",
      },
      {
        step: 5,
        description: "Dry immediately and store in a clean, dry place.",
      },
    ],
    relatedProductSlugs: ["kansa-thali", "kansa-bowl", "kansa-tumbler"],
    image:
      "https://images.unsplash.com/photo-1638005576371-44bede80507c?w=800&h=500&fit=crop&auto=format",
    disclaimer:
      "Ayurvedic traditions attribute various benefits to Kansa dining vessels. Scientific evidence for these specific claims is currently limited. This information is provided as traditional knowledge, not medical advice.",
  },
  {
    id: "traditional-iron-cooking",
    title: "Cooking on Iron",
    category: "cooking",
    description:
      "The traditional Indian way of cooking on iron — the foundation of the subcontinent's culinary heritage.",
    traditionalContext:
      "Iron cookware has been central to Indian cooking for over two millennia. The iron tawa for roti, the iron kadai for sabzi and dal — these are the forms around which Indian cuisine evolved. A well-seasoned iron pan is non-stick without chemicals and improves every year. Cooking on iron is also believed in Indian tradition to contribute dietary iron, particularly important for traditional plant-based diets.",
    whatYouNeed: [
      "A seasoned iron tawa or kadai",
      "Oil for cooking",
      "Medium-low heat",
    ],
    materials: ["iron"],
    steps: [
      {
        step: 1,
        description:
          "Heat the iron vessel on medium-low heat before adding oil or food.",
      },
      {
        step: 2,
        description:
          "Add a small amount of oil and allow it to spread across the surface.",
      },
      {
        step: 3,
        description: "Cook at medium heat — iron distributes heat evenly and holds it well.",
      },
      {
        step: 4,
        description: "After cooking, while still hot, clean with hot water and a brush. No soap needed after seasoning.",
      },
      {
        step: 5,
        description: "Dry completely over heat. Add a few drops of oil, wipe over the surface, and store.",
      },
    ],
    relatedProductSlugs: ["iron-tawa", "iron-kadai"],
    image:
      "https://images.unsplash.com/photo-1702497508675-c67b1a38c9c6?w=800&h=500&fit=crop&auto=format",
    disclaimer:
      "While cooking on iron is associated in traditional practice with dietary iron supplementation, the actual iron transfer varies significantly by food type and cooking conditions. People with iron metabolism conditions should consult a healthcare provider.",
  },
  {
    id: "urli-ritual",
    title: "The Urli Tradition",
    category: "home",
    description:
      "The Kerala urli — filled with water and flowers — as a living home ritual of beauty and welcome.",
    traditionalContext:
      "The urli is Kerala's most beloved brass object. In Kerala homes and temples, the urli filled with water and floating flowers (typically jasmine, marigold, and lotus) marks the entrance and the sacred space. It is simultaneously a ritual object and an aesthetic tradition — beauty as practice.",
    whatYouNeed: [
      "A brass urli",
      "Clean water",
      "Fresh flowers — lotus, jasmine, marigold, or rose petals",
      "Optional: floating candles or oil lamps",
    ],
    materials: ["brass"],
    steps: [
      {
        step: 1,
        description: "Place the urli at the entrance of your home, on a courtyard, or as a centrepiece.",
      },
      {
        step: 2,
        description: "Fill with clean water — about two thirds full.",
      },
      {
        step: 3,
        description: "Float fresh flowers on the surface. In Kerala tradition, marigold petals and jasmine are common.",
      },
      {
        step: 4,
        description: "Add floating candles or small oil lamps in the evening if desired.",
      },
      {
        step: 5,
        description: "Change the water and flowers daily to maintain freshness.",
      },
    ],
    relatedProductSlugs: ["brass-urli", "brass-diya"],
    image:
      "https://images.unsplash.com/photo-1652960018678-1f19799996c5?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "heritage-gifting",
    title: "Gifting with Heritage",
    category: "gifting",
    description:
      "The Indian tradition of gifting objects that carry meaning — material, craft, and story together.",
    traditionalContext:
      "In Indian tradition, the most meaningful gifts are those that carry material significance — copper for health, brass for auspiciousness, Kansa for wellness. A gift of traditional metalware has been the mark of a considered, generous giver across Indian cultures. The object carries the intention of the gift forward into daily use.",
    whatYouNeed: [
      "A heritage object chosen for the recipient's needs",
      "The material story of the object",
      "The care guide for the object",
      "The intention behind the gift",
    ],
    materials: ["copper", "brass", "kansa", "bronze"],
    steps: [
      {
        step: 1,
        description: "Choose the material based on the recipient's life and needs: copper for wellness, brass for home and ritual, Kansa for mindful dining, bronze for a lasting heirloom.",
      },
      {
        step: 2,
        description: "Learn the story of the object — its material, its craft, its artisan community.",
      },
      {
        step: 3,
        description: "Share the story when you give the gift — the gift is not just the object but the knowledge of it.",
      },
      {
        step: 4,
        description: "Include the care guide — a gift that you explain how to care for is a gift that lasts.",
      },
    ],
    relatedProductSlugs: [
      "heritage-copper-bottle",
      "kansa-bowl",
      "brass-diya",
      "bronze-serving-bowl",
    ],
    image:
      "https://images.unsplash.com/photo-1601446052518-f793d82a4a97?w=800&h=500&fit=crop&auto=format",
  },
];

export const getRitual = (id: string) => rituals.find((r) => r.id === id);

export const getRitualsByCategory = (category: string) =>
  rituals.filter((r) => r.category === category);
