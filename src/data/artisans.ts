import type { ArtisanCommunity } from "../types";

export const artisans: ArtisanCommunity[] = [
  {
    id: "kantapada-kansa",
    community: "Kansa Craftsmen of Kantapada",
    region: "Kantapada, Odisha",
    craft: "Kansa (Bell Metal) Forging",
    materials: ["kansa"],
    process:
      "Traditional forging and foot-powered lathe turning of bell-metal alloy — a process unchanged for centuries.",
    story:
      "The village of Kantapada in Odisha is home to a community that has practised Kansa forging across generations. The craft is passed from parent to child — the knowledge of the right alloy ratio, the correct heat, the turn of the lathe. In Kantapada, the sound of Kansa hammering begins before dawn and continues through the day. Each piece passes through many hands before it is complete: the alloyer, the forger, the lathe-turner, the finisher. This is collective craft — a village's knowledge expressed in every bowl.",
    heritage:
      "Kantapada's Kansa tradition is rooted in Odisha's ancient connection to temple craft. The temples of Puri have used Kansa vessels for centuries; the village's craftsmen supplied them.",
    image:
      "https://images.unsplash.com/photo-1638005576371-44bede80507c?w=800&h=600&fit=crop&auto=format",
    craftImage:
      "https://images.unsplash.com/photo-1759738101717-40a450bac1ad?w=800&h=600&fit=crop&auto=format",
    productSlugs: ["kansa-bowl", "kansa-thali", "bronze-cooking-vessel"],
  },
  {
    id: "swamimalai-bronze",
    community: "Sthapathi Bronze Craftsmen of Swamimalai",
    region: "Swamimalai, Tamil Nadu",
    craft: "Lost-Wax Bronze Casting",
    materials: ["bronze"],
    process:
      "The ancient Panchaloka lost-wax casting method — the same process used to create the Chola bronzes — practised in continuous tradition.",
    story:
      "In the town of Swamimalai near Kumbakonam, families who call themselves Sthapathis have practised bronze casting for over a thousand years. They are the inheritors of the Chola tradition — the craftsmen whose predecessors created the Nataraja. Their knowledge is comprehensive: the correct alloy composition, the wax modelling technique, the clay mixture for the mould, the firing temperature, the breaking of the mould, the hand-chasing of the surface. This knowledge cannot be learned from a book — it lives in the hands.",
    heritage:
      "The Swamimalai tradition holds GI (Geographical Indication) status as a protected Indian craft. The craftsmen are considered custodians of one of India's most significant cultural heritages.",
    image:
      "https://images.unsplash.com/photo-1694438058376-f7af2f661ac2?w=800&h=600&fit=crop&auto=format",
    craftImage:
      "https://images.unsplash.com/photo-1640789076618-fbc855d32ec1?w=800&h=600&fit=crop&auto=format",
    productSlugs: ["bronze-serving-bowl", "bronze-lamp"],
  },
  {
    id: "molela-terracotta",
    community: "Potter Community of Molela",
    region: "Molela, Rajasthan",
    craft: "Terracotta Vessel Making",
    materials: ["terracotta"],
    process:
      "Traditional wheel-throwing and kiln-firing of terracotta — using local red clay and wood-burning kilns maintained by the community.",
    story:
      "Molela is a village in Rajasthan where the potter community has worked the same local red clay for generations. Their tradition includes both utilitarian vessels — the matka, the cooking pot — and the distinctive votive plaques for which Molela is particularly known. The work begins before sunrise: clay is prepared, wheels are set in motion, forms are thrown and set to dry in the morning sun. By afternoon, the kilns are lit. The rhythm of the village is the rhythm of the craft.",
    heritage:
      "Molela's terracotta tradition has GI status and is recognised as a significant Indian craft heritage. The community maintains both practical and ceremonial traditions of clay working.",
    image:
      "https://images.unsplash.com/photo-1756201409582-e0abcd78a12b?w=800&h=600&fit=crop&auto=format",
    craftImage:
      "https://images.unsplash.com/photo-1761410388288-a1e48d396adb?w=800&h=600&fit=crop&auto=format",
    productSlugs: ["terracotta-water-pot", "terracotta-serving-bowl"],
  },
  {
    id: "moradabad-brass",
    community: "Brass Artisans of Moradabad",
    region: "Moradabad, Uttar Pradesh",
    craft: "Brass Casting and Finishing",
    materials: ["brass", "copper"],
    process:
      "Sand casting, machine turning, and hand engraving — a sophisticated combination of traditional and evolved techniques that produce brass objects of remarkable quality.",
    story:
      "Moradabad — known as 'Peetal Nagri' (Brass City) — has been India's most important centre for brass craft since at least the 17th century. The city's entire economy was once built on the skill of its metal workers — casters, turners, engravers, polishers, each a specialist in their part of the process. The tradition continues today: hundreds of small workshops where families practise the craft across generations, each contributing a part of the object's journey from molten metal to finished piece.",
    heritage:
      "Moradabad's brass tradition has supplied the world with Indian metalware for centuries. Its craftsmen have adapted to every market while maintaining the essential hand skills that make Moradabad objects distinctive.",
    image:
      "https://images.unsplash.com/photo-1591064369306-20ad33188ed3?w=800&h=600&fit=crop&auto=format",
    craftImage:
      "https://images.unsplash.com/photo-1638005576371-44bede80507c?w=800&h=600&fit=crop&auto=format",
    productSlugs: ["copper-water-pot", "brass-storage-vessel", "brass-thali"],
  },
  {
    id: "kerala-copper-brass",
    community: "Temple Craft Artisans of Thrissur",
    region: "Thrissur, Kerala",
    craft: "Copper and Brass Temple Craft",
    materials: ["copper", "brass", "bronze"],
    process:
      "Hand-hammering and casting of copper, brass, and bronze objects in the tradition of Kerala temple craft — forms evolved over a thousand years of temple service.",
    story:
      "Thrissur, the cultural capital of Kerala, is home to artisan communities who have served the state's famous temples for centuries. The forms they make — the nilavilakku (standing lamp), the urli (water vessel), the bell, the ritual vessel — are the shapes of Kerala's sacred life. These craftsmen maintain a knowledge that is inseparable from Kerala's cultural identity: the right proportions of a lamp that burns steadily, the correct alloy for a bell that rings true.",
    heritage:
      "Kerala's temple craft tradition is among the most sophisticated in India — supported by the state's ancient temple system and the patronage of communities that have valued metal craft as sacred service.",
    image:
      "https://images.unsplash.com/photo-1680491025190-269d21ac8326?w=800&h=600&fit=crop&auto=format",
    craftImage:
      "https://images.unsplash.com/photo-1666694051761-cd972857da30?w=800&h=600&fit=crop&auto=format",
    productSlugs: ["brass-urli", "copper-tumbler-set", "bronze-lamp"],
  },
];

export const getArtisan = (id: string) =>
  artisans.find((a) => a.id === id);
