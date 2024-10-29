import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "iPhone 11",
    description: "Experience power and elegance with the iPhone 11: capture stunning moments with its dual-camera system, enjoy exceptional performance, and immerse yourself in a brilliant Liquid Retina display. Discover a world of possibilities in the palm of your hand!",
    price: 699,
    stock: 10,
    image: "https://http2.mlstatic.com/D_NQ_NP_759471-MLA71782897602_092023-O.webp",
    categoryId: 1
},
{
    name: "MacBook Air",
    description: "Embrace efficiency and sophistication with the MacBook Air: lightweight design meets powerful performance, stunning Retina display brings your work to life, and all-day battery life keeps you productive wherever you go. Elevate your computing experience with the MacBook Air.",
    price: 999,
    stock: 10,
    image: "https://http2.mlstatic.com/D_NQ_NP_817689-MLA51356381077_082022-O.webp",
    categoryId: 2
},
{
    name: "iPad Pro",
    description: "Unleash your creativity and productivity with the iPad Pro: powerful performance, stunning Liquid Retina display, and all-day battery life make the iPad Pro the perfect tool for work and play. Transform your ideas into reality with the iPad Pro.",
    price: 799,
    stock: 10,
    image: "https://http2.mlstatic.com/D_NQ_NP_677351-MLU77933415268_082024-O.webp",
    categoryId: 3
},
{
    name: "Apple Watch Series 6",
    description: "Stay connected and healthy with the Apple Watch Series 6: track your workouts, monitor your health, and stay in touch with the people and information you care about most. Experience the future of health and wellness with the Apple Watch Series 6.",
    price: 399,
    stock: 10,
    image: "https://http2.mlstatic.com/D_NQ_NP_814859-MLA72063243490_102023-O.webp",
    categoryId: 4
},
{
    name: "AirPods Pro",
    description: "Immerse yourself in sound with the AirPods Pro: active noise cancellation, transparency mode, and customizable fit make the AirPods Pro the perfect companion for music, calls, and everything in between. Elevate your audio experience with the AirPods Pro.",
    price: 249,
    stock: 10,
    image: "https://http2.mlstatic.com/D_NQ_NP_779146-MLA53778959612_022023-O.webp",
    categoryId: 5
},
{
    name: "HomePod mini",
    description: "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    price: 99,
    stock: 10,
    image: "https://http2.mlstatic.com/D_NQ_NP_800774-MLA45740145234_042021-O.webp",
    categoryId: 6
},
{
    name: "iPhone 12",
    description: "Experience the power of the iPhone 12: faster performance, improved camera system, and an edge-to-edge OLED display. Take your mobile experience to the next level with this cutting-edge device.",
    price: 799,
    stock: 15,
    image: "https://http2.mlstatic.com/D_NQ_NP_759471-MLA71782897602_092023-O.webp",
    categoryId: 1
},
{
    name: "MacBook Pro",
    description: "The MacBook Pro is engineered for power and portability, featuring a stunning Retina display and the performance to tackle professional workflows. Boost your productivity with its impressive processing power.",
    price: 1299,
    stock: 7,
    image: "https://http2.mlstatic.com/D_NQ_NP_817689-MLA51356381077_082022-O.webp",
    categoryId: 2
},
{
    name: "iPad Air",
    description: "Discover power and versatility with the iPad Air: its advanced technology and sleek design make it the perfect companion for work and entertainment. Lightweight and fast, it's ideal for on-the-go productivity.",
    price: 599,
    stock: 12,
    image: "https://http2.mlstatic.com/D_NQ_NP_677351-MLU77933415268_082024-O.webp",
    categoryId: 3
},
{
    name: "Apple Watch SE",
    description: "Track your fitness, stay connected, and monitor your health with the Apple Watch SE. A perfect blend of essential features and modern design, it's your personal tech companion on your wrist.",
    price: 279,
    stock: 18,
    image: "https://http2.mlstatic.com/D_NQ_NP_814859-MLA72063243490_102023-O.webp",
    categoryId: 4
}
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
