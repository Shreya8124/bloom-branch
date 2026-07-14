import basil from "@/assets/herb-basil.jpg";
import mint from "@/assets/herb-mint.jpg";
import tulsi from "@/assets/herb-tulsi.jpg";
import coriander from "@/assets/herb-coriander.jpg";
import curry from "@/assets/herb-curry.jpg";
import fenugreek from "@/assets/herb-fenugreek.jpg";
import rosemary from "@/assets/herb-rosemary.jpg";
import thyme from "@/assets/herb-thyme.jpg";
import oregano from "@/assets/herb-oregano.jpg";
import lemongrass from "@/assets/herb-lemongrass.jpg";

import nursery1 from "@/assets/nursery-1.jpg";
import nursery2 from "@/assets/nursery-2.jpg";
import nursery3 from "@/assets/nursery-3.jpg";
import nursery4 from "@/assets/nursery-4.jpg";
import nursery5 from "@/assets/nursery-5.jpg";
import nursery6 from "@/assets/nursery-6.jpg";

import rajesh from "@/assets/grower-rajesh.jpg";
import meena from "@/assets/grower-meena.jpg";
import harish from "@/assets/grower-harish.jpg";
import fatima from "@/assets/grower-fatima.jpg";

export type Herb = {
  slug: string;
  name: string;
  local?: string;
  image: string;
  price: number;
  availability: "In stock" | "Low stock" | "Pre-order";
  nurseryId: string;
  pickup: boolean;
  description: string;
  benefits: string[];
  cooking: string[];
  care: {
    sunlight: string;
    watering: string;
    harvest: string;
    mistakes: string[];
    timeline: string;
    tips: string[];
  };
};

export type Nursery = {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  rating: number;
  image: string;
  about: string;
  herbs: string[];
};

export type Booking = {
  id: string;
  customer: string;
  herb: string;
  nurseryId: string;
  phone: string;
  date: string;
  slot: string;
  status: "Pending" | "Accepted" | "Completed" | "Cancelled";
};

export type Grower = {
  name: string;
  role: string;
  nursery: string;
  city: string;
  quote: string;
  image: string;
};

export const nurseries: Nursery[] = [
  { id: "green-roots", name: "Green Roots Nursery", city: "Udaipur", address: "12 Fateh Sagar Road, Udaipur", hours: "8:00 AM – 7:00 PM", rating: 4.8, image: nursery1, about: "Family-run nursery growing chemical-free kitchen herbs for 18 years.", herbs: ["tulsi","mint","curry-leaves","basil","rosemary"] },
  { id: "urban-greens", name: "Urban Greens Nursery", city: "Ahmedabad", address: "44 Prahladnagar, Ahmedabad", hours: "9:00 AM – 8:00 PM", rating: 4.7, image: nursery2, about: "Rooftop urban nursery specializing in herbs for balcony gardeners.", herbs: ["mint","coriander","basil","oregano","lemongrass"] },
  { id: "naturenest", name: "NatureNest Nursery", city: "Jaipur", address: "7 Malviya Nagar, Jaipur", hours: "7:30 AM – 6:30 PM", rating: 4.9, image: nursery3, about: "Two generations of growing healthy, hardy Indian herb plants.", herbs: ["tulsi","curry-leaves","fenugreek","coriander","thyme"] },
  { id: "leaf-life", name: "Leaf & Life Nursery", city: "Indore", address: "22 Vijay Nagar, Indore", hours: "8:00 AM – 7:30 PM", rating: 4.6, image: nursery4, about: "Boutique nursery for beginners starting their first kitchen garden.", herbs: ["basil","mint","rosemary","thyme","oregano","fenugreek"] },
  { id: "sunleaf", name: "Sunleaf Botanicals", city: "Pune", address: "9 Koregaon Park, Pune", hours: "9:00 AM – 8:00 PM", rating: 4.5, image: nursery5, about: "Modern greenhouse producing culinary herbs year-round.", herbs: ["rosemary","thyme","oregano","lemongrass","basil"] },
  { id: "kitchen-grove", name: "Kitchen Grove", city: "Bengaluru", address: "58 Indiranagar, Bengaluru", hours: "8:30 AM – 8:00 PM", rating: 4.8, image: nursery6, about: "Neighborhood herb studio for the modern home cook.", herbs: ["mint","coriander","curry-leaves","tulsi","lemongrass"] },
];

export const herbs: Herb[] = [
  { slug: "tulsi", name: "Tulsi", local: "Holy Basil", image: tulsi, price: 149, availability: "In stock", nurseryId: "green-roots", pickup: true,
    description: "Sacred Indian herb prized for its aromatic leaves and immune-supporting properties.",
    benefits: ["Supports immunity","Reduces stress","Rich in antioxidants"],
    cooking: ["Tulsi chai","Herbal infusions","Garnish for chutneys"],
    care: { sunlight: "5–6 hours direct sun", watering: "Every 2 days; keep soil moist", harvest: "40–50 days after planting",
      mistakes: ["Overwatering","Placing in deep shade"], timeline: "Sprouts in 7 days · Harvest in 6 weeks",
      tips: ["Pinch tops to encourage bushy growth","Repot every 6 months"] } },
  { slug: "mint", name: "Mint", local: "Pudina", image: mint, price: 99, availability: "In stock", nurseryId: "urban-greens", pickup: true,
    description: "Fast-growing aromatic herb, perfect for chutneys, drinks, and everyday cooking.",
    benefits: ["Aids digestion","Freshens breath","Cooling effect"],
    cooking: ["Pudina chutney","Mint lemonade","Raita"],
    care: { sunlight: "Partial sun, 4 hours", watering: "Daily light watering", harvest: "30 days",
      mistakes: ["Letting soil dry out","Planting with other herbs (it spreads)"], timeline: "Sprouts in 5 days · Harvest in 4 weeks",
      tips: ["Grow in its own pot","Trim regularly for fresh leaves"] } },
  { slug: "coriander", name: "Coriander", local: "Dhania", image: coriander, price: 79, availability: "Low stock", nurseryId: "naturenest", pickup: true,
    description: "Everyday Indian herb with fresh, citrusy leaves and aromatic seeds.",
    benefits: ["Rich in vitamin K","Aids digestion","Anti-inflammatory"],
    cooking: ["Curry garnish","Chutneys","Salsa"],
    care: { sunlight: "4–5 hours indirect sun", watering: "Every 2 days", harvest: "35–40 days",
      mistakes: ["Overcrowding seeds","Overwatering"], timeline: "Sprouts in 7 days · Harvest in 5 weeks",
      tips: ["Sow seeds every 2 weeks for constant supply"] } },
  { slug: "curry-leaves", name: "Curry Leaves", local: "Kadi Patta", image: curry, price: 199, availability: "In stock", nurseryId: "naturenest", pickup: true,
    description: "Aromatic South Indian staple, essential for tempering dals and curries.",
    benefits: ["Rich in iron","Supports hair health","Aids digestion"],
    cooking: ["Tadka","South Indian curries","Chutneys"],
    care: { sunlight: "6+ hours direct sun", watering: "Every 3 days", harvest: "8–10 months for first harvest",
      mistakes: ["Cold exposure","Waterlogging"], timeline: "Grows slowly · Harvest after 8 months",
      tips: ["Fertilize monthly","Protect from frost"] } },
  { slug: "fenugreek", name: "Fenugreek", local: "Methi", image: fenugreek, price: 89, availability: "In stock", nurseryId: "leaf-life", pickup: true,
    description: "Nutritious leafy green with a subtle bitter note, loved in North Indian cooking.",
    benefits: ["High in iron","Supports blood sugar","Digestive aid"],
    cooking: ["Aloo methi","Methi paratha","Curries"],
    care: { sunlight: "5 hours sunlight", watering: "Every 2 days", harvest: "30 days",
      mistakes: ["Overwatering","Deep sowing"], timeline: "Sprouts in 4 days · Harvest in 4 weeks",
      tips: ["Sow seeds shallow","Harvest by cutting, not pulling"] } },
  { slug: "basil", name: "Basil", image: basil, price: 129, availability: "In stock", nurseryId: "urban-greens", pickup: true,
    description: "Fragrant Italian classic, essential for pastas, pizzas, and pestos.",
    benefits: ["Anti-inflammatory","Rich in vitamin K","Aromatic"],
    cooking: ["Pesto","Caprese","Pasta sauces"],
    care: { sunlight: "6+ hours sun", watering: "Every 2 days", harvest: "50 days",
      mistakes: ["Cold nights","Overwatering"], timeline: "Sprouts in 7 days · Harvest in 7 weeks",
      tips: ["Pinch flowers to keep leaves flavorful"] } },
  { slug: "rosemary", name: "Rosemary", image: rosemary, price: 249, availability: "Low stock", nurseryId: "sunleaf", pickup: true,
    description: "Woody Mediterranean herb with piney fragrance, perfect for roasts and breads.",
    benefits: ["Boosts memory","Antioxidant-rich","Aromatic"],
    cooking: ["Roast potatoes","Focaccia","Grilled meats"],
    care: { sunlight: "6–8 hours sun", watering: "Weekly, deep water", harvest: "3 months",
      mistakes: ["Overwatering","Poor drainage"], timeline: "Slow grower · Harvest in 12 weeks",
      tips: ["Well-draining soil is essential"] } },
  { slug: "thyme", name: "Thyme", image: thyme, price: 229, availability: "In stock", nurseryId: "sunleaf", pickup: true,
    description: "Delicate Mediterranean herb, wonderful with soups, stocks, and roasts.",
    benefits: ["Antibacterial","Aromatic","Rich in vitamin C"],
    cooking: ["Soups","Roasts","Stews"],
    care: { sunlight: "6 hours sun", watering: "Weekly", harvest: "10 weeks",
      mistakes: ["Overwatering"], timeline: "Sprouts in 14 days · Harvest in 10 weeks",
      tips: ["Prune to keep compact"] } },
  { slug: "oregano", name: "Oregano", image: oregano, price: 199, availability: "In stock", nurseryId: "leaf-life", pickup: true,
    description: "Bold, peppery herb — the soul of Italian and Greek cooking.",
    benefits: ["Antimicrobial","Rich in antioxidants"],
    cooking: ["Pizza","Pasta","Grilled vegetables"],
    care: { sunlight: "6 hours sun", watering: "Every 3 days", harvest: "8 weeks",
      mistakes: ["Shade","Overwatering"], timeline: "Sprouts in 10 days · Harvest in 8 weeks",
      tips: ["Harvest often to encourage growth"] } },
  { slug: "lemongrass", name: "Lemongrass", image: lemongrass, price: 179, availability: "In stock", nurseryId: "kitchen-grove", pickup: true,
    description: "Aromatic tropical grass with a citrusy note, essential for Southeast Asian cooking.",
    benefits: ["Aids digestion","Rich in antioxidants","Calming"],
    cooking: ["Thai curries","Herbal teas","Broths"],
    care: { sunlight: "6+ hours sun", watering: "Every 2 days", harvest: "4 months",
      mistakes: ["Cold exposure"], timeline: "Grows in clumps · Harvest in 16 weeks",
      tips: ["Divide clumps yearly"] } },
];

export const growers: Grower[] = [
  { name: "Rajesh Sharma", role: "Owner", nursery: "Green Roots Nursery", city: "Udaipur", image: rajesh,
    quote: "I've been growing herbs for nearly 18 years. Most customers discovered us only through word of mouth. KitchenBloom has helped new families find our nursery and reserve plants before visiting." },
  { name: "Meena Patel", role: "Owner", nursery: "Urban Greens Nursery", city: "Ahmedabad", image: meena,
    quote: "I love teaching beginners how to grow herbs. Now customers already know what they want before they arrive." },
  { name: "Harish Joshi", role: "Owner", nursery: "NatureNest Nursery", city: "Jaipur", image: harish,
    quote: "My family has run this nursery for two generations. KitchenBloom brings technology to traditional businesses without making things complicated." },
  { name: "Fatima Khan", role: "Owner", nursery: "Leaf & Life Nursery", city: "Indore", image: fatima,
    quote: "Seeing young families start herb gardens at home makes our work meaningful. KitchenBloom helps us reach more people." },
];

const customerNames = ["Ananya Rao","Vikram Singh","Priya Menon","Arjun Iyer","Neha Kapoor","Rohan Das","Sneha Kulkarni","Kabir Shah","Isha Verma","Aditya Nair","Riya Bose","Karan Malhotra","Meera Pillai","Devansh Jain","Tara Chowdhury","Nikhil Reddy","Sanya Gupta","Yash Bhatt","Anaya Sethi","Ravi Menon"];

export const bookings: Booking[] = customerNames.map((c, i) => {
  const herb = herbs[i % herbs.length];
  const d = new Date();
  d.setDate(d.getDate() + (i - 5));
  const slots = ["09:00 AM","10:30 AM","12:00 PM","02:00 PM","04:30 PM","06:00 PM"];
  const statuses: Booking["status"][] = ["Pending","Accepted","Completed","Cancelled","Accepted","Pending"];
  return {
    id: `BK-${1000 + i}`,
    customer: c,
    herb: herb.name,
    nurseryId: herb.nurseryId,
    phone: `+91 9${(800000000 + i * 12345).toString().slice(0, 9)}`,
    date: d.toISOString().slice(0, 10),
    slot: slots[i % slots.length],
    status: statuses[i % statuses.length],
  };
});

export const getHerb = (slug: string) => herbs.find((h) => h.slug === slug);
export const getNursery = (id: string) => nurseries.find((n) => n.id === id);