import rajesh from "@/assets/grower-rajesh.jpg";
import meena from "@/assets/grower-meena.jpg";
import harish from "@/assets/grower-harish.jpg";
import fatima from "@/assets/grower-fatima.jpg";

export type Grower = { name: string; role: string; nursery: string; city: string; quote: string; image: string; };

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
