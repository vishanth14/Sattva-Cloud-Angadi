import type { RootsEntry } from "../types";

// ─────────────────────────────────────────────────────────────────
// ROOTS COMPANION KNOWLEDGE BASE
//
// Each entry uses a UNION keyword strategy: if ANY keyword from the
// array appears as a substring in the lowercased user query, the
// entry matches. Keywords are kept atomic (short, single-concept)
// so minor phrasing variations reliably resolve.
//
// Organised by material/topic group for maintainability.
// ─────────────────────────────────────────────────────────────────

export const rootsEntries: RootsEntry[] = [
  // ── COPPER CARE ──────────────────────────────────────────────
  {
    keywords: [
      "clean copper",
      "cleaning copper",
      "how to clean copper",
      "copper clean",
      "copper care",
      "polish copper",
      "copper polish",
      "copper shine",
      "shine copper",
      "copper maintenance",
    ],
    question: "How do I clean my copper vessel?",
    response:
      "Copper is beautiful to care for — it rewards attention.\n\nThe traditional method: mix lemon juice with salt to form a paste. Apply to the copper surface, wait 2–3 minutes, then rinse thoroughly with water. Tamarind paste works equally well — this is the traditional cleaning agent in South Indian households.\n\nFor regular maintenance, simply rinse with water after use and dry with a soft cloth.\n\nAvoid soap, chemical cleaners, and dishwashers — these strip the surface and dull the natural warmth of copper.\n\nNote: copper naturally develops a patina over time — a greenish-brown surface oxidation. Many traditional households value this as a sign of authentic copper. To restore the bright warm tone, use the lemon-salt method.",
    tags: ["traditional"],
  },

  // ── COPPER WATER & AYURVEDA ───────────────────────────────────
  {
    keywords: [
      "ayurveda copper",
      "copper water ayurveda",
      "tamra jal",
      "tamra",
      "copper water benefits",
      "copper water",
      "ayurveda",
      "ayurvedic copper",
      "what does ayurveda",
      "copper and ayurveda",
    ],
    question: "What does Ayurveda say about copper water?",
    response:
      "Ayurvedic medicine has a rich tradition of using copper for health and wellness.\n\nAyurvedic Context:\nAyurvedic texts describe water stored in copper vessels (called Tamra Jal) as having purifying properties. It is said to balance all three doshas (Vata, Pitta, Kapha) and is particularly recommended for Pitta-dominant individuals. Traditional practice prescribes drinking Tamra Jal first thing in the morning on an empty stomach.\n\nScientific Context:\nScientific research has confirmed copper's antimicrobial properties — studies have found that copper surfaces and copper-stored water significantly reduce levels of certain bacteria. The World Health Organisation recognises copper's role in safe water systems. Research on broader Ayurvedic claims about dosha balancing is still developing.\n\nTraditional Practice:\nStore water in a copper vessel overnight at room temperature (not in the refrigerator, which slows the interaction). Drink 1–2 glasses on an empty stomach in the morning. Clean your vessel regularly to prevent interior deposits.",
    tags: ["traditional", "ayurvedic", "scientific"],
  },

  // ── COPPER STORAGE ────────────────────────────────────────────
  {
    keywords: [
      "store copper",
      "storing copper",
      "copper storage",
      "keep copper",
    ],
    question: "How should I store my copper vessel?",
    response:
      "Store your copper vessel in a cool, dry place away from direct sunlight.\n\nKeep it dry between uses — moisture accelerates oxidation. Store upright with the lid off if it has one, to allow air circulation.\n\nFor long-term storage, a light wipe with coconut oil before storing will protect the surface from oxidation.\n\nIf you are storing a copper vessel you use regularly, the best maintenance is simply using it — regular use and cleaning keeps copper in excellent condition.",
    tags: ["traditional"],
  },

  // ── COPPER PATINA ─────────────────────────────────────────────
  {
    keywords: [
      "copper patina",
      "green copper",
      "copper turning green",
      "copper oxidation",
      "copper color",
      "copper colour",
      "patina copper",
      "verdigris",
      "copper green",
    ],
    question: "Why is my copper turning green?",
    response:
      "The green or brownish-green coating on copper is called patina (or verdigris) — it is natural surface oxidation, not damage.\n\nIn traditional Indian households, a well-developed patina is considered a sign of authentic, pure copper. Temple copper objects are rarely polished to mirror brightness — their aged surface is valued as part of their character.\n\nIf you prefer the bright warm copper tone: clean with a lemon-and-salt paste. Apply, wait 2–3 minutes, rinse thoroughly, and dry immediately. The copper will return to its original warm reddish-gold.\n\nImportant: if you see green deposits inside the vessel where water sits, clean promptly and ensure the interior is rinsed thoroughly before use.",
    tags: ["traditional"],
  },

  // ── BRASS MAINTENANCE ─────────────────────────────────────────
  {
    keywords: [
      "maintain brass",
      "brass care",
      "how to maintain brass",
      "brass maintenance",
      "clean brass",
      "cleaning brass",
      "brass polish",
      "polish brass",
      "brass shine",
      "shine brass",
    ],
    question: "How should I maintain brass?",
    response:
      "Brass is one of the most rewarding materials to maintain — it responds beautifully to regular care.\n\nCleaning:\nFor a natural clean: tamarind paste and salt applied with a soft cloth, then rinsed thoroughly. Lemon juice and salt is equally effective. Both are traditional methods used across India.\n\nFor a polish: equal parts flour, salt, and white vinegar made into a paste — apply, leave for 5 minutes, then rinse and dry immediately.\n\nMaintaining Shine:\nAfter cleaning, dry completely and apply a thin coat of coconut oil with a soft cloth. This protects the surface and gives brass its characteristic warm glow.\n\nPatina:\nBrass naturally develops a darker, warmer patina over time. Many traditional households value this aged appearance — temple brass objects are never polished to mirror brightness, as the patina is part of their character.\n\nWhat to Avoid:\nNo dishwasher. No chemical cleaners or bleach. No abrasive scrubbers. Always dry immediately after cleaning — brass oxidises faster when left wet.",
    tags: ["traditional"],
  },

  // ── BRASS USES / DIYA ─────────────────────────────────────────
  {
    keywords: [
      "brass diya",
      "diya",
      "brass urli",
      "urli",
      "brass use",
      "uses of brass",
      "brass for",
      "brass thali",
      "brass lamp",
    ],
    question: "What is brass traditionally used for?",
    response:
      "Brass is the backbone of Indian domestic and spiritual life.\n\nRitual & Puja:\nThe brass diya is the light of every household puja — burnt with ghee or sesame oil, it marks the transition from day to evening (Sandhyavandanam). Brass thalis carry food offerings at festivals and family rituals.\n\nHome Tradition:\nThe Kerala urli — a wide brass vessel filled with water and floating flowers — is among India's most beautiful home traditions. Brass storage vessels hold ghee, oil, and dry goods in traditional kitchens.\n\nTemple Life:\nBrass bells, lamps, and ritual vessels are found in temples across every region of India. Their warm golden tone and durability make them the preferred metal for sacred objects.\n\nModern Home:\nBrass objects have re-entered contemporary homes as heritage accent pieces — diyas, urlis, and vessels that bridge traditional and modern aesthetics without compromise.",
    tags: ["traditional"],
  },

  // ── BRONZE CARE ───────────────────────────────────────────────
  {
    keywords: [
      "bronze care",
      "bronze clean",
      "maintain bronze",
      "care for my bronze",
      "bronze object",
      "care bronze",
      "bronze maintenance",
      "clean bronze",
      "caring for bronze",
      "how do i care",
      "bronze",
    ],
    question: "How do I care for my bronze object?",
    response:
      "Bronze is a remarkably durable material — it has survived centuries in temple environments. Your care task is to maintain it, not fight it.\n\nDaily Care:\nWipe with a soft, dry cloth after use. For bronze serving vessels, rinse with warm water and dry immediately.\n\nDeeper Cleaning:\nFor tarnish or oxidation: apply a paste of tamarind and salt gently with a soft cloth. Leave for 2 minutes, rinse thoroughly, and dry immediately.\n\nTraditional Maintenance:\nIn South Indian temple tradition, bronze is maintained with coconut oil — applied regularly with a soft cloth. This protects the surface and gives it the rich, dark warmth that characterises antique bronzes.\n\nPatina:\nAuthentic Panchaloka bronze develops a beautiful dark patina over time. This is not damage — it is the material maturing. Temple bronzes are typically not polished to remove this patina; it is valued as evidence of age and use.",
    tags: ["traditional"],
  },

  // ── BRONZE HERITAGE / CHOLA ───────────────────────────────────
  {
    keywords: [
      "chola bronze",
      "lost wax",
      "panchaloka",
      "nataraja",
      "bronze sculpture",
      "bronze history",
      "bronze heritage",
      "bronze significance",
      "bronze casting",
      "swamimalai",
    ],
    question: "What is the heritage of Indian bronze?",
    response:
      "Indian bronze has one of the world's great artistic traditions — centred in South India, spanning over a thousand years.\n\nPanchaloka:\nAuthentic traditional bronzes are cast in Panchaloka — an alloy of five metals: copper, gold, silver, tin, and lead — in traditional proportions. Each metal is associated with a different deity; the combination is considered sacred.\n\nLost-Wax (Cire Perdue):\nThe casting tradition uses the lost-wax process: a model sculpted in beeswax is coated in clay and fired. Molten bronze replaces the burnt wax. The clay mould is broken to reveal the casting — every piece is unique.\n\nChola Bronzes:\nThe Chola dynasty (9th–13th centuries CE) produced what many consider humanity's greatest bronze sculptures — the Nataraja, Parvati, and other forms that are now in museums worldwide. These were functional temple objects, not decorations.\n\nSwamimalai, Tamil Nadu remains the living centre of this tradition — where master craftsmen (sthapatis) continue the thousand-year process.",
    tags: ["traditional"],
  },

  // ── KANSA USAGE ───────────────────────────────────────────────
  {
    keywords: [
      "kansa",
      "bell metal",
      "what is kansa",
      "kansa use",
      "kansa benefits",
      "kansa traditional",
      "kansa thali",
      "kansa bowl",
      "kansa dining",
    ],
    question: "What is Kansa traditionally used for?",
    response:
      "Kansa — bell metal, an alloy of copper and tin — holds a special place in Indian material culture.\n\nTraditional Use:\nKansa thalis and bowls are the traditional dining vessels of Ayurvedic households. Ancient texts describe Kansa as the ideal vessel for food and water — prized for its resonance, warmth, and believed beneficial properties.\n\nAyurvedic Context:\nAyurvedic literature describes Kansa as particularly beneficial for balancing Pitta dosha. The metal is believed to alkalise food, reduce acidity, and support digestion. Traditional practitioners recommend eating from Kansa daily as part of an Ayurvedic lifestyle.\n\nScientific Context:\nScientific research on Kansa's specific health claims is ongoing. Copper — a component of Kansa — has well-documented antimicrobial properties. The alkalising effects of Kansa on food are not yet fully established in peer-reviewed literature.\n\nKansa is also used for temple bells, as its resonant quality is considered sacred. Strike a genuine Kansa vessel — the sustained ring is its authentication.",
    tags: ["traditional", "ayurvedic", "scientific"],
  },

  // ── KANSA CLEANING ────────────────────────────────────────────
  {
    keywords: [
      "kansa clean",
      "clean kansa",
      "wash kansa",
      "kansa washing",
      "kansa care",
      "care kansa",
      "maintain kansa",
      "kansa maintenance",
    ],
    question: "How do I clean Kansa vessels?",
    response:
      "Kansa has a specific care routine — different from other metals.\n\nDo Not Use Soap:\nSoap dulls Kansa's characteristic metallic warmth over time. The traditional cleaning method does not use soap.\n\nTraditional Cleaning:\nUse tamarind water: dissolve a small amount of tamarind in water, apply to the Kansa surface with a soft cloth, work gently, then rinse thoroughly with clean water. Alternatively, use lime (nimbu) juice mixed with salt. Both are the traditional cleaning methods used in Kansa-using households.\n\nAfter Cleaning:\nDry immediately and completely. Kansa is sensitive to moisture — water left on the surface causes dark patches. A final rub with a dry cloth and a few drops of coconut oil restores the characteristic warm metallic glow.\n\nFrequency:\nClean after every use. The tamarind method is gentle enough for daily use.",
    tags: ["traditional"],
  },

  // ── IRON RUST REMOVAL ─────────────────────────────────────────
  {
    keywords: [
      "iron rust",
      "remove rust",
      "rust iron",
      "iron cookware rust",
      "rust from iron",
      "iron cookware",
      "rusted iron",
      "iron pan rust",
      "rust on iron",
      "iron rusting",
    ],
    question: "How do I remove rust from iron cookware?",
    response:
      "Rust on iron cookware is not the end of the vessel — it is a condition that can be fully reversed.\n\nProcess:\n1. Scrub the rusted surface with steel wool or coarse salt until all rust is removed.\n2. Wash with water and a small amount of soap.\n3. Dry completely over heat — place on a flame until all moisture evaporates.\n4. While still warm, apply a thin layer of oil (refined oil, not virgin coconut oil) using a paper towel. Wipe off any excess.\n5. Heat the oiled vessel until it begins to smoke lightly. Remove from heat and allow to cool.\n6. Repeat the oil application and heating process 2–3 more times.\n\nThis re-seasoning process restores your iron vessel to better than new condition. Many traditional iron pans have been through this process many times across their long lives.",
    tags: ["traditional"],
  },

  // ── IRON SEASONING (NEW) ──────────────────────────────────────
  {
    keywords: [
      "season iron",
      "seasoning iron",
      "iron seasoning",
      "how to season",
      "season tawa",
      "season kadai",
      "iron first use",
      "new iron pan",
      "prepare iron",
    ],
    question: "How do I season my iron cookware?",
    response:
      "Seasoning is the process that transforms raw iron into a naturally non-stick, durable cooking surface. It is the single most important step in iron cookware care.\n\nInitial Seasoning Process:\n1. Wash the new vessel once with soap and warm water. Rinse thoroughly.\n2. Dry completely over heat — place directly on a flame and heat until all moisture evaporates and the surface just begins to smoke.\n3. While warm (not burning hot), apply a very thin layer of refined oil across the entire surface — inside, outside, and handle — using a paper towel. Wipe off any excess.\n4. Return to medium heat until the oil smokes lightly. Remove and cool.\n5. Repeat steps 3–4 at least 3 times. Each layer builds the seasoning.\n\nThe Result:\nAfter seasoning, the surface darkens to a deep black-brown. This is correct — the carbon from cooking and oil builds the non-stick layer. The vessel improves with every use.\n\nMaintaining Seasoning:\nAfter each use, rinse while warm with hot water. Dry immediately over heat. Add a few drops of oil and wipe over the surface before storing. Never soak in water. Never use the dishwasher.",
    tags: ["traditional"],
  },

  // ── IRON COOKING ─────────────────────────────────────────────
  {
    keywords: [
      "iron cooking",
      "cook iron",
      "iron tawa",
      "iron kadai",
      "cooking iron",
      "iron pan",
      "iron griddle",
    ],
    question: "How do I cook with traditional iron?",
    response:
      "Iron is the foundation of Indian cooking — the tawa for roti, the kadai for sabzi and dal.\n\nBefore Cooking:\nAlways pre-heat your iron vessel before adding oil or food. Iron holds heat differently from stainless steel — it takes longer to heat but holds it far better.\n\nDuring Cooking:\nUse medium to medium-high heat. A small amount of oil is sufficient once the vessel is well-seasoned. Iron's heat distribution and retention makes it ideal for roti, paratha, dal tarka, frying, and slow braising.\n\nAfter Cooking:\nWhile still warm, clean with hot water and a brush or coarse salt. No soap needed once the vessel is well-seasoned — soap strips the seasoning. Dry immediately and completely over heat. Apply a few drops of oil, wipe over the surface, and store.\n\nImprovement Over Time:\nIron improves with every use — the first few months of cooking build the seasoning into something permanent. A well-used iron vessel becomes naturally non-stick without any chemical treatment.",
    tags: ["traditional"],
  },

  // ── TERRACOTTA PREPARATION ────────────────────────────────────
  {
    keywords: [
      "terracotta season",
      "season terracotta",
      "terracotta first use",
      "clay pot preparation",
      "terracotta",
      "clay pot",
      "matka",
      "prepare terracotta",
      "terracotta vessel",
      "terracotta prepare",
      "terracotta pot",
      "clay vessel",
      "terracotta cooking",
      "how do i prepare",
    ],
    question: "How do I prepare my terracotta vessel for first use?",
    response:
      "Terracotta requires a brief preparation before its first use — a process that traditional households have always followed.\n\nFor Water Pots (Matka):\nFill with rice water (the water from washing rice — starchy and milky in colour) and leave overnight. Discard and rinse the following day. Your matka is ready to use.\n\nFor Cooking Vessels:\nSoak in clean water for 30 minutes. Drain and dry. Fill with rice water and leave overnight. Discard, rinse, and dry. Apply a thin coat of oil to the inside surface. Heat gently on a low flame for 5 minutes. Allow to cool. Your vessel is ready.\n\nThis process seals the pores of the clay slightly, reducing initial seepage and preparing the vessel for use.\n\nWhy Terracotta Cools Water:\nTerracotta is naturally porous — water slowly seeps through the walls and evaporates, cooling the remaining water inside. This is the original, energy-free refrigeration of India — used long before electricity.",
    tags: ["traditional"],
  },

  // ── TERRACOTTA CARE ───────────────────────────────────────────
  {
    keywords: [
      "clean terracotta",
      "terracotta clean",
      "terracotta care",
      "care terracotta",
      "maintain terracotta",
      "terracotta maintenance",
      "terracotta wash",
    ],
    question: "How do I care for my terracotta vessel?",
    response:
      "Terracotta rewards gentle, consistent care.\n\nCleaning:\nRinse with warm water after use. Use a soft brush and warm water — a small amount of natural soap is acceptable. Do not use harsh abrasives or steel wool. Rinse thoroughly and allow to dry completely before storing.\n\nStorage:\nStore in a cool, dry, ventilated place. Do not stack heavy objects on terracotta vessels. Allow to dry completely between uses.\n\nWhat to Avoid:\nNo dishwasher. Do not place on high heat or flame — use low to medium heat only. Do not pour cold water into a hot terracotta vessel — the thermal shock can crack it.\n\nNatural Deposits:\nThe mineral deposits that appear inside a regularly used matka are normal and traditional — they do not affect the quality of the water.",
    tags: ["traditional"],
  },

  // ── BEST MATERIAL FOR COOKING ─────────────────────────────────
  {
    keywords: [
      "traditional cooking",
      "material cooking",
      "which material",
      "best material cooking",
      "best for cooking",
      "material for cooking",
      "cooking material",
      "best material for",
      "which material is best",
    ],
    question: "Which material is best for traditional Indian cooking?",
    response:
      "Different materials suit different cooking tasks — this is the accumulated wisdom of Indian culinary tradition.\n\nIron: The foundation of Indian cooking. The iron tawa for roti and paratha; the iron kadai for frying and braising. Iron's heat retention and gradual seasoning makes it irreplaceable for daily cooking. A well-seasoned iron pan is naturally non-stick.\n\nTerracotta: For slow cooking — curries, biryanis, and dal cooked low and slow in clay develop flavours that no metal vessel can match. South Indian fish curry in terracotta is a regional tradition for this reason.\n\nKansa: Traditionally recommended for serving vessels — thalis and bowls from which food is eaten — rather than for cooking itself.\n\nCopper: Traditional copper cooking vessels were used historically, but modern copper water vessels are not designed for cooking. For cooking, iron and terracotta are the traditional choices.\n\nBrass: Traditionally used for serving and ritual purposes rather than primary cooking.",
    tags: ["traditional"],
  },

  // ── GENERAL HERITAGE / GIFTING ────────────────────────────────
  {
    keywords: [
      "heritage gift",
      "gifting",
      "gift ideas",
      "what to gift",
      "traditional gift",
      "best gift",
      "give as gift",
      "gift copper",
      "gift brass",
      "gift kansa",
    ],
    question: "What makes a good heritage gift from these materials?",
    response:
      "In Indian tradition, the most meaningful gifts are those that carry material significance — the object, its story, and its purpose together.\n\nCopper: A gift of health and intention. Copper water vessels are the classic Indian wellness gift — connecting daily practice with centuries of tradition.\n\nBrass: A gift of warmth and home. A brass diya or urli carries the light of Indian domestic ritual into any home. Auspicious, beautiful, and enduring.\n\nKansa: A gift of mindful living. A Kansa thali or bowl is among the most considered gifts you can give — connecting the recipient's daily meals to Ayurvedic tradition.\n\nBronze: A gift that lasts generations. A bronze serving bowl or lamp is an heirloom — it will outlast the giver and be passed forward.\n\nThe heritage way of gifting: choose the material for the recipient's life and needs. Learn the story of the object. Share that story when you give it. Include the care guide — a gift you explain how to keep is a gift that truly lasts.",
    tags: ["traditional"],
  },

  // ── ARTISAN & CRAFT ───────────────────────────────────────────
  {
    keywords: [
      "artisan",
      "craft",
      "craftsman",
      "where is kansa made",
      "where is brass made",
      "moradabad",
      "swamimalai",
      "kantapada",
      "handmade",
      "traditional craft",
      "who makes",
    ],
    question: "Where are these traditional materials crafted?",
    response:
      "India's traditional metalware craft communities are among the oldest continuing artisan traditions in the world.\n\nKansa (Bell Metal): Kantapada, Odisha — the ancient Kansa-making village where foot-powered lathes and hand-forging have been practised for generations. Also produced in Rajasthan and Andhra Pradesh.\n\nBrass: Moradabad, Uttar Pradesh — the 'Brass City' of India, with a tradition stretching centuries. Also crafted in Varanasi, Rajasthan, and Kerala.\n\nBronze (Panchaloka): Swamimalai, Tamil Nadu — the living centre of the lost-wax bronze tradition. Sthapati families here have practised Chola-era casting techniques for a thousand years.\n\nCopper: Kerala (traditional hammered copperware), Rajasthan, and Tamil Nadu.\n\nTerracotta: Molela (Rajasthan), Bankura (West Bengal), and across Tamil Nadu and Assam — each region with its own clay traditions and forms.\n\nEvery object from these communities carries the knowledge of its craft community — buying these materials directly supports living artisan traditions.",
    tags: ["traditional"],
  },

  // ── DIYA / LAMP USAGE ─────────────────────────────────────────
  {
    keywords: [
      "diya",
      "lamp oil",
      "light diya",
      "oil for diya",
      "diya ghee",
      "puja lamp",
      "sandhyavandanam",
      "evening ritual",
      "puja",
    ],
    question: "How do I use a traditional brass or copper diya?",
    response:
      "The diya — oil lamp — is one of the oldest and most continuous of India's daily rituals.\n\nThe Traditional Method:\nUse ghee (clarified butter) or sesame oil as the fuel. Both are traditional — ghee is preferred for puja, sesame oil (gingelly) for daily use in South India. A cotton wick is the correct choice — synthetic wicks are not traditional.\n\nLighting:\nSoak the wick in oil. Light from the top. In Hindu tradition, the flame faces East in the morning and the deity during puja.\n\nSandhyavandanam:\nThe evening lighting of the diya — at the junction of day and night — is among the oldest continuous practices in Indian spiritual life. It is a moment of pause, presence, and gratitude.\n\nCare After Use:\nOnce the oil has burnt and the diya is cool, wipe clean with a dry cloth. Occasional cleaning with tamarind and salt removes carbon deposits and restores the warm brass or copper surface.",
    tags: ["traditional"],
  },
];

// ─────────────────────────────────────────────────────────────────
// RESPONSE MATCHER
//
// Normalises the query (lowercase, trimmed) and checks if any
// keyword from any entry appears as a substring. Returns the first
// matching entry.
//
// This is a deterministic, keyword-union approach — no external AI,
// no fragile exact-string comparison. Works reliably for all
// phrasing variations as long as the keyword vocabulary is maintained.
// ─────────────────────────────────────────────────────────────────

export const getRootsResponse = (query: string): RootsEntry | null => {
  const normalized = query
    .toLowerCase()
    .trim()
    .replace(/[?!.,;:'"]/g, " ")
    .replace(/\s+/g, " ");

  const match = rootsEntries.find((entry) =>
    entry.keywords.some((kw) => normalized.includes(kw.toLowerCase()))
  );
  return match || null;
};

// ─────────────────────────────────────────────────────────────────
// SUGGESTED QUESTIONS
//
// Every question listed here MUST have keyword coverage above.
// Verified against getRootsResponse before deploying.
// ─────────────────────────────────────────────────────────────────

export const suggestedQuestions = [
  // Verified: matches keyword "clean copper"
  "How do I clean copper?",
  // Verified: matches keyword "kansa"
  "What is Kansa traditionally used for?",
  // Verified: matches keyword "maintain brass"
  "How should I maintain brass?",
  // Verified: matches keyword "best material for"
  "Which material is best for traditional cooking?",
  // Verified: matches keyword "ayurveda" and "copper water"
  "What does Ayurveda say about copper water?",
  // Verified: matches keyword "terracotta" and "prepare terracotta"
  "How do I prepare my terracotta vessel?",
  // Verified: matches keyword "bronze care" and "care bronze"
  "How do I care for my bronze object?",
  // Verified: matches keyword "rust from iron" and "iron cookware"
  "How do I remove rust from iron cookware?",
];
