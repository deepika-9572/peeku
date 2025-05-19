// Types for server mock data
export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number; // Price in cents/paisa
  categoryId: number;
  images: string[];
  featured: boolean;
  rating: number;
  sizes?: { name: string, price: number }[];
  createdAt: Date;
};

export type Review = {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  avatar?: string;
  createdAt: Date;
};

export type Order = {
  id: string;
  userId: number;
  status: string;
  totalAmount: number;
  deliveryAddress: string;
  paymentMethod: string;
  estimatedDelivery?: string;
  createdAt: Date;
  trackingSteps: { step: string; completed: boolean; time?: string }[];
};

export type OrderItem = {
  id: number;
  orderId: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image: string;
};

// Mock products for the bakery
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Chocolate Cake",
    slug: "cakes-chocolate",
    description: "A rich and moist chocolate cake made with premium cocoa and layered with smooth chocolate ganache. Perfect for celebrations or as a special treat for chocolate lovers.",
    shortDescription: "Rich and moist chocolate cake with premium cocoa",
    price: 59900, // ₹599
    categoryId: 1,
    images: [
      "/images/products/chocolate-cake-1.jpg",
      "/images/products/chocolate-cake-2.jpg",
      "/images/products/chocolate-cake-3.jpg"
    ],
    featured: true,
    rating: 4,
    sizes: [
      { name: "Small (6-inch)", price: 59900 },
      { name: "Medium (8-inch)", price: 79900 },
      { name: "Large (10-inch)", price: 99900 }
    ],
    createdAt: new Date()
  },
  {
    id: 2,
    name: "Vanilla Bean Cupcakes",
    slug: "cupcakes-vanilla",
    description: "Delicate vanilla cupcakes made with real vanilla beans, topped with creamy vanilla buttercream frosting. These cupcakes are perfect for any occasion and are a crowd-pleaser!",
    shortDescription: "Delicate cupcakes with real vanilla beans",
    price: 29900, // ₹299 for 6
    categoryId: 2,
    images: [
      "/images/products/vanilla-cupcakes-1.jpg",
      "/images/products/vanilla-cupcakes-2.jpg"
    ],
    featured: true,
    rating: 5,
    sizes: [
      { name: "Box of 6", price: 29900 },
      { name: "Box of 12", price: 49900 }
    ],
    createdAt: new Date()
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    slug: "bread-whole-wheat",
    description: "Nutritious whole wheat bread made with 100% whole grain flour. This hearty bread is perfect for sandwiches, toast, or enjoying with your favorite spread. Baked fresh daily.",
    shortDescription: "Nutritious bread made with 100% whole grain flour",
    price: 14900, // ₹149
    categoryId: 3,
    images: [
      "/images/products/whole-wheat-bread-1.jpg",
      "/images/products/whole-wheat-bread-2.jpg"
    ],
    featured: false,
    rating: 4,
    createdAt: new Date()
  },
  {
    id: 4,
    name: "Blueberry Muffins",
    slug: "muffins-blueberry",
    description: "Soft and fluffy muffins loaded with juicy blueberries. These muffins are made with fresh blueberries and a hint of lemon zest for a delightful breakfast or snack option.",
    shortDescription: "Soft and fluffy muffins loaded with juicy blueberries",
    price: 19900, // ₹199 for 4
    categoryId: 4,
    images: [
      "/images/products/blueberry-muffins-1.jpg",
      "/images/products/blueberry-muffins-2.jpg"
    ],
    featured: false,
    rating: 4,
    sizes: [
      { name: "Box of 4", price: 19900 },
      { name: "Box of 8", price: 34900 }
    ],
    createdAt: new Date()
  },
  {
    id: 5,
    name: "Red Velvet Cake",
    slug: "cakes-red-velvet",
    description: "A classic red velvet cake with a subtle cocoa flavor and a vibrant red color, topped with smooth cream cheese frosting. This cake is perfect for special occasions and celebrations.",
    shortDescription: "Classic cake with cream cheese frosting",
    price: 69900, // ₹699
    categoryId: 1,
    images: [
      "/images/products/red-velvet-1.jpg",
      "/images/products/red-velvet-2.jpg"
    ],
    featured: true,
    rating: 5,
    sizes: [
      { name: "Small (6-inch)", price: 69900 },
      { name: "Medium (8-inch)", price: 89900 },
      { name: "Large (10-inch)", price: 109900 }
    ],
    createdAt: new Date()
  },
  {
    id: 6,
    name: "Chocolate Chip Cookies",
    slug: "cookies-chocolate-chip",
    description: "Classic chocolate chip cookies made with premium chocolate chips and a perfect blend of brown sugar and vanilla. Crispy on the outside, chewy on the inside, just like a good cookie should be.",
    shortDescription: "Classic cookies with premium chocolate chips",
    price: 24900, // ₹249 for 10
    categoryId: 5,
    images: [
      "/images/products/chocolate-chip-cookies-1.jpg",
      "/images/products/chocolate-chip-cookies-2.jpg"
    ],
    featured: true,
    rating: 5,
    sizes: [
      { name: "Box of 10", price: 24900 },
      { name: "Box of 20", price: 44900 }
    ],
    createdAt: new Date()
  },
  {
    id: 7,
    name: "French Baguette",
    slug: "bread-french-baguette",
    description: "Authentic French baguette with a crispy crust and soft, chewy interior. Made using traditional methods and baked to perfection. Perfect for sandwiches or serving with cheese and wine.",
    shortDescription: "Authentic bread with crispy crust and soft interior",
    price: 16900, // ₹169
    categoryId: 3,
    images: [
      "/images/products/french-baguette-1.jpg",
      "/images/products/french-baguette-2.jpg"
    ],
    featured: false,
    rating: 4,
    createdAt: new Date()
  },
  {
    id: 8,
    name: "Fruit Tart",
    slug: "pastries-fruit-tart",
    description: "Elegant fruit tart featuring a buttery shortcrust pastry, smooth vanilla custard, and topped with an assortment of fresh seasonal fruits. A perfect balance of sweet and tangy flavors.",
    shortDescription: "Elegant tart with fresh seasonal fruits",
    price: 39900, // ₹399
    categoryId: 6,
    images: [
      "/images/products/fruit-tart-1.jpg",
      "/images/products/fruit-tart-2.jpg"
    ],
    featured: true,
    rating: 5,
    sizes: [
      { name: "Small (4-inch)", price: 39900 },
      { name: "Medium (6-inch)", price: 59900 },
      { name: "Large (8-inch)", price: 79900 }
    ],
    createdAt: new Date()
  },
  {
    id: 9,
    name: "Cinnamon Rolls",
    slug: "pastries-cinnamon-rolls",
    description: "Warm and gooey cinnamon rolls made with soft dough, swirled with cinnamon sugar, and topped with sweet cream cheese frosting. These rolls are perfect for breakfast or as a sweet treat any time of day.",
    shortDescription: "Warm and gooey rolls with cinnamon and frosting",
    price: 29900, // ₹299 for 6
    categoryId: 6,
    images: [
      "/images/products/cinnamon-rolls-1.jpg",
      "/images/products/cinnamon-rolls-2.jpg"
    ],
    featured: false,
    rating: 4,
    sizes: [
      { name: "Box of 6", price: 29900 },
      { name: "Box of 12", price: 49900 }
    ],
    createdAt: new Date()
  },
  {
    id: 10,
    name: "Black Forest Cake",
    slug: "cakes-black-forest",
    description: "Traditional Black Forest cake layered with chocolate sponge, whipped cream, and cherries, soaked in cherry syrup and Kirsch. Decorated with chocolate shavings and fresh cherries on top.",
    shortDescription: "Traditional cake with chocolate, cream, and cherries",
    price: 74900, // ₹749
    categoryId: 1,
    images: [
      "/images/products/black-forest-1.jpg",
      "/images/products/black-forest-2.jpg"
    ],
    featured: false,
    rating: 5,
    sizes: [
      { name: "Small (6-inch)", price: 74900 },
      { name: "Medium (8-inch)", price: 94900 },
      { name: "Large (10-inch)", price: 114900 }
    ],
    createdAt: new Date()
  },
  {
    id: 11,
    name: "Croissants",
    slug: "pastries-croissants",
    description: "Authentic French croissants made with layers of buttery, flaky pastry. Each croissant is hand-rolled and baked to golden perfection, creating a light and airy texture with a crisp exterior.",
    shortDescription: "Authentic French pastries with buttery, flaky layers",
    price: 19900, // ₹199 for 4
    categoryId: 6,
    images: [
      "/images/products/croissants-1.jpg",
      "/images/products/croissants-2.jpg"
    ],
    featured: true,
    rating: 5,
    sizes: [
      { name: "Box of 4", price: 19900 },
      { name: "Box of 8", price: 34900 }
    ],
    createdAt: new Date()
  },
  {
    id: 12,
    name: "Pineapple Upside-Down Cake",
    slug: "cakes-pineapple",
    description: "Classic pineapple upside-down cake with caramelized pineapple rings and cherries on top of a moist vanilla cake. This retro favorite is both visually appealing and deliciously sweet.",
    shortDescription: "Classic cake with caramelized pineapple and cherries",
    price: 64900, // ₹649
    categoryId: 1,
    images: [
      "/images/products/pineapple-cake-1.jpg",
      "/images/products/pineapple-cake-2.jpg"
    ],
    featured: false,
    rating: 4,
    sizes: [
      { name: "Small (6-inch)", price: 64900 },
      { name: "Medium (8-inch)", price: 84900 }
    ],
    createdAt: new Date()
  }
];

// Mock reviews for products
export const mockReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    rating: 5,
    comment: "This chocolate cake was amazing! So moist and rich, perfect for my birthday celebration.",
    avatar: "/images/avatars/avatar-1.jpg",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
  },
  {
    id: 2,
    productId: 1,
    userId: 2,
    rating: 4,
    comment: "Delicious cake, though it was a bit too sweet for my taste. Great texture though!",
    avatar: "/images/avatars/avatar-2.jpg",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  },
  {
    id: 3,
    productId: 2,
    userId: 1,
    rating: 5,
    comment: "These vanilla cupcakes are divine! So light and fluffy with just the right amount of sweetness.",
    avatar: "/images/avatars/avatar-1.jpg",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
  },
  {
    id: 4,
    productId: 3,
    userId: 2,
    rating: 4,
    comment: "Great whole wheat bread! It stays fresh for days and makes excellent toast.",
    avatar: "/images/avatars/avatar-2.jpg",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) // 20 days ago
  },
  {
    id: 5,
    productId: 5,
    userId: 1,
    rating: 5,
    comment: "Best red velvet cake I've ever had! The cream cheese frosting was perfect.",
    avatar: "/images/avatars/avatar-1.jpg",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    id: 6,
    productId: 6,
    userId: 2,
    rating: 5,
    comment: "These cookies are addictive! Crispy edges and chewy centers, just how I like them.",
    avatar: "/images/avatars/avatar-2.jpg",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    id: 7,
    productId: 8,
    userId: 1,
    rating: 5,
    comment: "The fruit tart was absolutely stunning and tasted even better! Fresh fruits and creamy custard.",
    avatar: "/images/avatars/avatar-1.jpg",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) // 8 days ago
  },
  {
    id: 8,
    productId: 10,
    userId: 2,
    rating: 5,
    comment: "This Black Forest cake brought back memories of my trip to Germany. Authentic and delicious!",
    avatar: "/images/avatars/avatar-2.jpg",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) // 12 days ago
  },
  {
    id: 9,
    productId: 11,
    userId: 1,
    rating: 5,
    comment: "These croissants are as good as the ones I had in Paris! Flaky, buttery perfection.",
    avatar: "/images/avatars/avatar-1.jpg",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  }
];

// Mock orders
export const mockOrders: Order[] = [
  {
    id: "DB12345",
    userId: 1,
    status: "delivered",
    totalAmount: 159700, // ₹1,597
    deliveryAddress: "123 Main St, Mumbai 400001",
    paymentMethod: "Credit Card",
    estimatedDelivery: "2023-04-15",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    trackingSteps: [
      { step: "Order Placed", completed: true, time: "2023-04-12 10:30 AM" },
      { step: "Preparing", completed: true, time: "2023-04-12 11:45 AM" },
      { step: "Out for Delivery", completed: true, time: "2023-04-14 09:15 AM" },
      { step: "Delivered", completed: true, time: "2023-04-14 02:30 PM" }
    ]
  },
  {
    id: "DB12346",
    userId: 1,
    status: "processing",
    totalAmount: 94900, // ₹949
    deliveryAddress: "123 Main St, Mumbai 400001",
    paymentMethod: "UPI",
    estimatedDelivery: "2023-05-20",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    trackingSteps: [
      { step: "Order Placed", completed: true, time: "2023-05-18 15:20 PM" },
      { step: "Preparing", completed: true, time: "2023-05-18 16:05 PM" },
      { step: "Out for Delivery", completed: false },
      { step: "Delivered", completed: false }
    ]
  },
  {
    id: "DB12347",
    userId: 2,
    status: "out_for_delivery",
    totalAmount: 84800, // ₹848
    deliveryAddress: "456 Admin Ave, Mumbai 400002",
    paymentMethod: "Cash on Delivery",
    estimatedDelivery: "2023-05-19",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    trackingSteps: [
      { step: "Order Placed", completed: true, time: "2023-05-17 09:10 AM" },
      { step: "Preparing", completed: true, time: "2023-05-17 10:30 AM" },
      { step: "Out for Delivery", completed: true, time: "2023-05-19 08:45 AM" },
      { step: "Delivered", completed: false }
    ]
  }
];

// Mock order items
export const mockOrderItems: OrderItem[] = [
  {
    id: 1,
    orderId: "DB12345",
    productId: 1,
    name: "Chocolate Cake",
    price: 79900, // ₹799 (Medium size)
    quantity: 1,
    size: "Medium (8-inch)",
    image: "/images/products/chocolate-cake-1.jpg"
  },
  {
    id: 2,
    orderId: "DB12345",
    productId: 6,
    name: "Chocolate Chip Cookies",
    price: 24900, // ₹249 (Box of 10)
    quantity: 1,
    size: "Box of 10",
    image: "/images/products/chocolate-chip-cookies-1.jpg"
  },
  {
    id: 3,
    orderId: "DB12345",
    productId: 11,
    name: "Croissants",
    price: 19900, // ₹199 (Box of 4)
    quantity: 1,
    size: "Box of 4",
    image: "/images/products/croissants-1.jpg"
  },
  {
    id: 4,
    orderId: "DB12346",
    productId: 10,
    name: "Black Forest Cake",
    price: 94900, // ₹949 (Medium size)
    quantity: 1,
    size: "Medium (8-inch)",
    image: "/images/products/black-forest-1.jpg"
  },
  {
    id: 5,
    orderId: "DB12347",
    productId: 8,
    name: "Fruit Tart",
    price: 59900, // ₹599 (Medium size)
    quantity: 1,
    size: "Medium (6-inch)",
    image: "/images/products/fruit-tart-1.jpg"
  },
  {
    id: 6,
    orderId: "DB12347",
    productId: 2,
    name: "Vanilla Bean Cupcakes",
    price: 24900, // ₹249 (Box of 6)
    quantity: 1,
    size: "Box of 6",
    image: "/images/products/vanilla-cupcakes-1.jpg"
  }
];
