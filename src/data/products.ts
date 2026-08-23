export type Category = 'Women' | 'Men' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  tag?: string;
  colors: string[];
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Cashmere Wrap Dress',
    price: 248,
    category: 'Women',
    image: 'https://images.pexels.com/photos/8693633/pexels-photo-8693633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'New',
    colors: ['#e8e4df', '#1c1917', '#c2571c'],
  },
  {
    id: 'p2',
    name: 'Tailored Wool Overcoat',
    price: 395,
    category: 'Men',
    image: 'https://images.pexels.com/photos/17689236/pexels-photo-17689236.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Bestseller',
    colors: ['#625b50', '#322e29', '#4b463e'],
  },
  {
    id: 'p3',
    name: 'Merino Knit Sweater',
    price: 168,
    category: 'Women',
    image: 'https://images.pexels.com/photos/14642651/pexels-photo-14642651.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    colors: ['#edebe7', '#dcd9d2', '#c2bdb1'],
  },
  {
    id: 'p4',
    name: 'Structured Leather Tote',
    price: 320,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/20380733/pexels-photo-20380733.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'New',
    colors: ['#9f441a', '#322e29', '#625b50'],
  },
  {
    id: 'p5',
    name: 'Heritage Denim Jacket',
    price: 188,
    category: 'Men',
    image: 'https://images.pexels.com/photos/7528989/pexels-photo-7528989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    colors: ['#4b5563', '#322e29', '#1c1917'],
  },
  {
    id: 'p6',
    name: 'Silk Slip Dress',
    price: 215,
    category: 'Women',
    image: 'https://images.pexels.com/photos/10999561/pexels-photo-10999561.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Limited',
    colors: ['#1c1917', '#4b463e', '#c2571c'],
  },
  {
    id: 'p7',
    name: 'Ribbed Turtleneck',
    price: 142,
    category: 'Women',
    image: 'https://images.pexels.com/photos/6996083/pexels-photo-6996083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    colors: ['#edebe7', '#9e978a', '#625b50'],
  },
  {
    id: 'p8',
    name: 'Pinstripe Blazer',
    price: 285,
    category: 'Men',
    image: 'https://images.pexels.com/photos/30916977/pexels-photo-30916977.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'New',
    colors: ['#322e29', '#4b463e', '#625b50'],
  },
];

export type Filter = 'All' | 'New Arrivals' | Category;

export const categories: Filter[] = ['All', 'New Arrivals', 'Women', 'Men', 'Accessories'];

export function filterProducts(filter: Filter): Product[] {
  if (filter === 'All') return products;
  if (filter === 'New Arrivals') return products.filter((p) => p.tag === 'New');
  return products.filter((p) => p.category === filter);
}
