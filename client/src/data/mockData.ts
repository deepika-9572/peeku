// Types for our mock data
export type ReviewType = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
};

export type SizeType = {
  name: string;
  price: number;
};

export type ProductType = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  shortDescription: string;
  images: string[];
  rating: number;
  reviews: ReviewType[];
  featured: boolean;
  sizes?: SizeType[];
};

export type OrderItemType = {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
};

export type OrderStatusType = 
  | 'pending'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type OrderType = {
  id: string;
  userId: number;
  items: OrderItemType[];
  totalAmount: number;
  date: string;
  status: OrderStatusType;
  deliveryAddress: string;
  paymentMethod: string;
  estimatedDelivery: string;
  trackingSteps: {
    step: string;
    completed: boolean;
    time?: string;
  }[];
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  username: string;
  isAdmin: boolean;
};

// Mock products data
const products: ProductType[] = [
  {
    id: 1,
    name: "Chocolate Delight Cake",
    price: 499,
    category: "cakes",
    description: "Our bestselling chocolate cake is a true delight for chocolate lovers. Made with premium dark chocolate and layered with rich chocolate ganache, this cake is perfect for any celebration or special occasion. Each bite delivers an intense chocolate flavor that melts in your mouth.",
    shortDescription: "Rich chocolate cake with ganache frosting",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=100",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=100",
      "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=100"
    ],
    rating: 4.5,
    featured: true,
    sizes: [
      { name: "Small (500g)", price: 399 },
      { name: "Medium (1kg)", price: 499 },
      { name: "Large (2kg)", price: 899 }
    ],
    reviews: [
      {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        comment: "This cake is absolutely incredible! The chocolate is rich without being overpowering, and the texture is perfect. I ordered it for my husband's birthday and everyone loved it.",
        date: "2 days ago",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        id: 2,
        name: "Rahul Patel",
        rating: 4,
        comment: "Great cake overall, though I found it a bit too sweet for my taste. The delivery was prompt and the cake looked exactly like the pictures. Would order again but maybe try a different flavor.",
        date: "1 week ago",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      },
      {
        id: 3,
        name: "Sneha Gupta",
        rating: 5,
        comment: "Absolutely divine! The cake was moist, rich and had the perfect balance of sweetness. Will definitely order again!",
        date: "2 weeks ago",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      }
    ]
  },
  {
    id: 2,
    name: "Butter Croissants",
    price: 129,
    category: "pastries",
    description: "Indulge in our authentic French butter croissants, made with the finest imported butter and baked to golden perfection. Our artisanal process involves 24 hours of careful preparation to create those signature flaky layers that shatter delicately with each bite. Perfect for breakfast or as an anytime treat.",
    shortDescription: "Classic buttery French croissants",
    images: [
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1620146344904-097a0909ec63?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.0,
    featured: true,
    sizes: [
      { name: "Pack of 2", price: 129 },
      { name: "Pack of 4", price: 239 },
      { name: "Pack of 6", price: 349 }
    ],
    reviews: [
      {
        id: 4,
        name: "Anjali Mehta",
        rating: 4,
        comment: "These croissants are absolutely delicious! Flaky, buttery, and perfectly baked. Could be slightly larger for the price, but the quality is top notch.",
        date: "3 days ago"
      },
      {
        id: 5,
        name: "Vikram Singh",
        rating: 5,
        comment: "The best croissants I've had outside of France! Truly authentic and reminds me of the bakeries in Paris. Worth every rupee!",
        date: "1 week ago"
      }
    ]
  },
  {
    id: 3,
    name: "Artisan Sourdough Bread",
    price: 199,
    category: "breads",
    description: "Our signature sourdough bread is crafted with a natural levain that's been carefully nurtured for over five years. Each loaf undergoes a 36-hour fermentation process, developing complex flavors and that perfect tangy taste. The crust is crackling and robust, while the interior crumb remains tender and airy with beautiful irregular holes. This bread is perfect for sandwiches, toast, or simply enjoyed with good butter.",
    shortDescription: "Traditional sourdough with perfect crust",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1594994564322-d1c8ef0a0911?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 5.0,
    featured: true,
    sizes: [
      { name: "Small (500g)", price: 199 },
      { name: "Large (1kg)", price: 349 }
    ],
    reviews: [
      {
        id: 6,
        name: "Arjun Kumar",
        rating: 5,
        comment: "This sourdough bread is exceptional! The crust is perfect and the flavor is complex and satisfying. It's become a weekly staple in our home.",
        date: "4 days ago"
      },
      {
        id: 7,
        name: "Meera Reddy",
        rating: 5,
        comment: "Absolutely the best sourdough I've found in the city. Perfect texture and that slight tanginess that makes sourdough special.",
        date: "2 weeks ago"
      }
    ]
  },
  {
    id: 4,
    name: "French Macarons Assortment",
    price: 349,
    category: "desserts",
    description: "Our elegant French macarons are made using traditional techniques and the finest ingredients. Each delicate almond meringue shell has the perfect crisp exterior that gives way to a chewy interior, sandwiching a flavorful filling. This assortment includes classic flavors like vanilla, chocolate, pistachio, rose, lemon, and coffee. These colorful treats make perfect gifts or a special indulgence for yourself.",
    shortDescription: "Assorted flavors of delicate French macarons",
    images: [
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1558326567-98ae2405596b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.7,
    featured: true,
    sizes: [
      { name: "Box of 6", price: 349 },
      { name: "Box of 12", price: 649 },
      { name: "Box of 24", price: 1199 }
    ],
    reviews: [
      {
        id: 8,
        name: "Pooja Iyer",
        rating: 5,
        comment: "These macarons are simply divine! The shells are delicate and perfectly crisp, and the fillings are rich and flavorful. My favorites are the pistachio and rose flavors.",
        date: "1 week ago"
      },
      {
        id: 9,
        name: "Sanjay Mehta",
        rating: 4,
        comment: "Excellent quality macarons that taste as good as they look. They make great gifts too - my friends were impressed!",
        date: "3 weeks ago"
      }
    ]
  },
  {
    id: 5,
    name: "Cinnamon Swirl Brioche",
    price: 279,
    category: "breads",
    description: "Our Cinnamon Swirl Brioche combines the buttery richness of traditional French brioche with warm swirls of cinnamon sugar throughout. This decadent bread is made with premium European butter and free-range eggs, creating an incredibly tender and fluffy texture. Each loaf is hand-rolled with our signature cinnamon filling and baked to golden perfection. Perfect for an indulgent breakfast, especially when toasted and topped with a light smear of cream cheese.",
    shortDescription: "Buttery brioche with cinnamon swirls",
    images: [
      "https://images.unsplash.com/photo-1620921568790-c1cf8984624c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1600398138360-766a0e0a4c0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1600398138252-c5f7f2fafd25?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.8,
    featured: false,
    reviews: [
      {
        id: 10,
        name: "Neha Sharma",
        rating: 5,
        comment: "This brioche is heavenly! The cinnamon flavor is perfectly balanced and the bread itself is so soft and buttery. Makes the best french toast!",
        date: "5 days ago"
      },
      {
        id: 11,
        name: "Raj Kapoor",
        rating: 4,
        comment: "Delicious brioche with a wonderful aroma. It's a bit pricey but worth it for a special breakfast treat.",
        date: "2 weeks ago"
      }
    ]
  },
  {
    id: 6,
    name: "Blueberry Cheesecake",
    price: 549,
    category: "cakes",
    description: "Our Blueberry Cheesecake features a creamy, smooth filling made with premium cream cheese, set on a buttery graham cracker crust, and topped with a luscious homemade blueberry compote. Each cheesecake is slowly baked and then chilled overnight to develop the perfect texture and flavor. The natural sweetness of the blueberries complements the slight tanginess of the cheesecake, creating a balanced and memorable dessert that's perfect for any occasion.",
    shortDescription: "Creamy cheesecake with blueberry topping",
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1567171466295-4afa63d45416?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.6,
    featured: false,
    sizes: [
      { name: "6 inch (serves 6-8)", price: 549 },
      { name: "8 inch (serves 10-12)", price: 849 }
    ],
    reviews: [
      {
        id: 12,
        name: "Anita Desai",
        rating: 5,
        comment: "This cheesecake is absolutely divine! The texture is perfect - creamy but light, and the blueberry topping adds just the right amount of sweetness.",
        date: "1 week ago"
      },
      {
        id: 13,
        name: "Karan Malhotra",
        rating: 4,
        comment: "Ordered this for my mother's birthday and it was a hit! The blueberry topping is made with real berries and not overly sweet. Will order again.",
        date: "3 weeks ago"
      }
    ]
  },
  {
    id: 7,
    name: "Almond Chocolate Cookies",
    price: 249,
    category: "desserts",
    description: "Our Almond Chocolate Cookies are a perfect balance of chewy and crisp, featuring premium dark chocolate chunks and roasted almond slivers. Made with European-style butter and a touch of sea salt to enhance the flavors, these cookies develop a wonderful depth and complexity. Each cookie is generous in size and baked to order to ensure maximum freshness. The slight nuttiness from the almonds perfectly complements the rich chocolate, creating an irresistible treat for cookie enthusiasts.",
    shortDescription: "Chewy cookies with dark chocolate and almonds",
    images: [
      "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1590080874088-eec64895b423?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.4,
    featured: false,
    sizes: [
      { name: "Pack of 6", price: 249 },
      { name: "Pack of 12", price: 459 }
    ],
    reviews: [
      {
        id: 14,
        name: "Divya Singh",
        rating: 5,
        comment: "These cookies are addictive! The perfect balance of chocolate and almond, not too sweet, and with a wonderful texture. My new favorite!",
        date: "4 days ago"
      },
      {
        id: 15,
        name: "Anil Kumar",
        rating: 4,
        comment: "Very good cookies with excellent ingredients. I liked the generous size and the fact that they stay chewy even after a few days.",
        date: "2 weeks ago"
      }
    ]
  },
  {
    id: 8,
    name: "Mango Tart",
    price: 399,
    category: "seasonal",
    description: "Our seasonal Mango Tart celebrates the king of fruits in its most glorious form. A buttery, crisp tart shell provides the perfect base for a light vanilla custard, topped with perfectly ripe Alphonso mangoes arranged in a beautiful pattern. Each tart is glazed with a hint of lime for a subtle contrast to the sweetness of the mangoes. This dessert is only available during mango season to ensure we use the finest, freshest fruits at their peak ripeness.",
    shortDescription: "Seasonal tart with fresh Alphonso mangoes",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1462043103994-3474e6b6c3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.9,
    featured: true,
    sizes: [
      { name: "4 inch (individual)", price: 399 },
      { name: "8 inch (serves 6-8)", price: 899 }
    ],
    reviews: [
      {
        id: 16,
        name: "Sunita Patel",
        rating: 5,
        comment: "This mango tart is summer in a dessert! The mangoes were perfectly ripe and sweet, and the tart shell was buttery and crisp. A true seasonal delight!",
        date: "2 days ago"
      },
      {
        id: 17,
        name: "Vivek Nair",
        rating: 5,
        comment: "Absolutely phenomenal! As a mango lover, this tart exceeded all my expectations. The custard was light and not too sweet, letting the mangoes shine.",
        date: "1 week ago"
      }
    ]
  },
  {
    id: 9,
    name: "Whole Wheat Multigrain Loaf",
    price: 179,
    category: "breads",
    description: "Our hearty Whole Wheat Multigrain Loaf is crafted with nutrition and flavor in mind. Made with 100% whole wheat flour and enriched with a blend of seven nutritious grains including flax, oats, sunflower seeds, and pumpkin seeds, this bread provides excellent fiber and protein. Each loaf undergoes a slow fermentation process that enhances digestibility and develops a rich, complex flavor. The crust is rustic and substantial, while the interior crumb remains moist and tender. Perfect for wholesome sandwiches or toasted with your favorite toppings.",
    shortDescription: "Nutritious whole wheat bread with seven grains",
    images: [
      "https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1590368746679-a403c347a5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.7,
    featured: false,
    sizes: [
      { name: "Standard (700g)", price: 179 }
    ],
    reviews: [
      {
        id: 18,
        name: "Rohan Joshi",
        rating: 5,
        comment: "This is now my go-to bread for everyday use. It's substantial and nutritious without being heavy, and stays fresh for several days. Great with soups!",
        date: "6 days ago"
      },
      {
        id: 19,
        name: "Lakshmi Raman",
        rating: 4,
        comment: "A very good wholesome bread. I appreciate that it's not overly dense like some whole grain breads can be. Perfect for a healthy breakfast.",
        date: "2 weeks ago"
      }
    ]
  },
  {
    id: 10,
    name: "Red Velvet Cupcakes",
    price: 299,
    category: "cakes",
    description: "Our Red Velvet Cupcakes are a modern classic, featuring a subtle cocoa flavor, vibrant red color, and velvety soft texture. Each cupcake is topped with a generous swirl of our signature cream cheese frosting that provides the perfect tangy complement to the lightly sweet cake. Made with natural food coloring and quality ingredients, these cupcakes have a sophisticated flavor that appeals to adults while maintaining the fun, festive appearance that everyone loves. Perfect for celebrations or as an elegant treat any day of the week.",
    shortDescription: "Classic red cupcakes with cream cheese frosting",
    images: [
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.5,
    featured: false,
    sizes: [
      { name: "Box of 4", price: 299 },
      { name: "Box of 6", price: 399 },
      { name: "Box of 12", price: 749 }
    ],
    reviews: [
      {
        id: 20,
        name: "Maya Verma",
        rating: 5,
        comment: "These are the best red velvet cupcakes I've ever had! The texture is so light and tender, and the cream cheese frosting is perfectly balanced - not too sweet.",
        date: "3 days ago"
      },
      {
        id: 21,
        name: "Kabir Shah",
        rating: 4,
        comment: "Ordered these for a birthday and they were a hit! Very moist and flavorful. The frosting is exceptional. Would definitely order again.",
        date: "1 week ago"
      }
    ]
  },
  {
    id: 11,
    name: "Almond Croissant",
    price: 159,
    category: "pastries",
    description: "Our Almond Croissant elevates the traditional French pastry with a decadent almond filling and topping. We begin with our classic butter croissant, slice it horizontally, and fill it with a house-made almond cream flavored with a hint of rum. The croissant is then topped with more almond cream, sliced almonds, and baked again until the filling is set and the almonds are toasted to golden perfection. A light dusting of powdered sugar completes this indulgent pastry that pairs perfectly with your morning coffee or afternoon tea.",
    shortDescription: "Buttery croissant filled with almond cream",
    images: [
      "https://images.unsplash.com/photo-1592985684811-6c0f98adb014?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.8,
    featured: false,
    sizes: [
      { name: "Single", price: 159 },
      { name: "Pack of 2", price: 299 },
      { name: "Pack of 4", price: 569 }
    ],
    reviews: [
      {
        id: 22,
        name: "Sophie Thomas",
        rating: 5,
        comment: "These almond croissants are a slice of Paris in Mumbai! The perfect balance of buttery, flaky pastry and rich almond filling. Worth every calorie!",
        date: "5 days ago"
      },
      {
        id: 23,
        name: "Aryan Menon",
        rating: 5,
        comment: "Absolutely heavenly! The almond flavor is pronounced without being overwhelming, and the texture contrast between the crisp exterior and soft filling is perfect.",
        date: "2 weeks ago"
      }
    ]
  },
  {
    id: 12,
    name: "Tiramisu Cake",
    price: 599,
    category: "cakes",
    description: "Our Tiramisu Cake reimagines the beloved Italian dessert in cake form. Layers of light vanilla sponge are soaked in espresso and layered with a mascarpone cream that achieves the perfect balance between richness and lightness. The cake is finished with a dusting of premium cocoa powder and decorated with chocolate shavings. Each bite delivers the classic tiramisu experience - the bitter notes of coffee and cocoa perfectly complementing the sweet, creamy mascarpone. This elegant dessert is perfect for coffee lovers and sophisticated palates.",
    shortDescription: "Italian-inspired cake with coffee and mascarpone",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1618426703623-c1b335803e07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1632206217663-8e15e231bd60?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.7,
    featured: false,
    sizes: [
      { name: "6 inch (serves 6-8)", price: 599 },
      { name: "8 inch (serves 10-12)", price: 899 }
    ],
    reviews: [
      {
        id: 24,
        name: "Natasha Khan",
        rating: 5,
        comment: "This tiramisu cake was the highlight of our dinner party! The coffee flavor is prominent but not overwhelming, and the mascarpone cream is so light and airy. Exceptional!",
        date: "1 week ago"
      },
      {
        id: 25,
        name: "Vishal Jain",
        rating: 4,
        comment: "A very good interpretation of tiramisu in cake form. The layers are well-defined and the flavors authentic. Would have liked a slightly stronger coffee flavor, but still excellent.",
        date: "3 weeks ago"
      }
    ]
  },
  {
    id: 13,
    name: "Chocolate Chip Cookies",
    price: 229,
    category: "desserts",
    description: "Our Chocolate Chip Cookies are a perfect balance of crisp edges and chewy centers, packed with premium chocolate chunks that create pockets of melted goodness in every bite. We use a blend of brown and white sugars for depth of flavor, and a touch of sea salt to enhance the chocolate and create a more complex taste profile. Each cookie is generously sized and baked to order, ensuring you receive them at their absolute best. A classic treat elevated with quality ingredients and expert technique.",
    shortDescription: "Classic cookies with premium chocolate chunks",
    images: [
      "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1590080876179-aac08da5b70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.6,
    featured: false,
    sizes: [
      { name: "Pack of 6", price: 229 },
      { name: "Pack of 12", price: 429 }
    ],
    reviews: [
      {
        id: 26,
        name: "Amit Patel",
        rating: 5,
        comment: "These cookies are perfect! Crisp on the outside, soft and chewy in the middle, with generous chocolate chunks. They taste homemade in the best possible way.",
        date: "4 days ago"
      },
      {
        id: 27,
        name: "Riya Sharma",
        rating: 4,
        comment: "Very good chocolate chip cookies that satisfy that classic cookie craving. I appreciate that they're not too sweet and have a hint of salt to balance the chocolate.",
        date: "2 weeks ago"
      }
    ]
  },
  {
    id: 14,
    name: "Garlic Herb Focaccia",
    price: 249,
    category: "breads",
    description: "Our Garlic Herb Focaccia is a fragrant Italian-style flatbread that's both rustic and refined. The dough undergoes a long, slow fermentation that develops exceptional flavor and creates the characteristic airy texture with large, irregular holes. Before baking, we generously drizzle the dough with extra virgin olive oil and press in dimples that capture the aromatic mixture of fresh garlic, rosemary, thyme, and sea salt. The result is a bread with a crisp exterior, tender interior, and an intoxicating aroma that fills the room when warmed. Perfect as an accompaniment to meals, for sandwiches, or simply dipped in quality olive oil.",
    shortDescription: "Italian flatbread with garlic and fresh herbs",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.8,
    featured: false,
    sizes: [
      { name: "Half Slab", price: 249 },
      { name: "Full Slab", price: 429 }
    ],
    reviews: [
      {
        id: 28,
        name: "Sonali Gupta",
        rating: 5,
        comment: "This focaccia is out of this world! The herbs are fresh and fragrant, and the texture is exactly what focaccia should be - crisp outside and soft inside. Makes any meal special!",
        date: "3 days ago"
      },
      {
        id: 29,
        name: "Dev Patil",
        rating: 5,
        comment: "Absolutely delicious focaccia that's clearly made with care. The garlic and herb topping is generous and flavorful. Great for serving with soups or making sandwiches.",
        date: "1 week ago"
      }
    ]
  },

  {
    id: 16,
    name: "Pineapple Upside-Down Cake",
    price: 449,
    category: "seasonal",
    description: "Our Pineapple Upside-Down Cake is a nostalgic treat with a gourmet twist. We start with a caramelized base of brown sugar and butter, topped with perfectly arranged pineapple rings and maraschino cherries. Over this, we pour a vanilla-scented butter cake batter enriched with a touch of rum. After baking, the cake is inverted to reveal the stunning caramelized fruit design on top. The contrast between the sticky, caramelized fruit and the light, fluffy cake creates a dessert that's both comforting and sophisticated. Available seasonally when pineapples are at their sweetest.",
    shortDescription: "Classic cake with caramelized pineapple topping",
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1570476922354-81227cdbb76c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      "https://images.unsplash.com/photo-1551879400-111a9087cd86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    ],
    rating: 4.6,
    featured: false,
    sizes: [
      { name: "8 inch (serves 8-10)", price: 449 }
    ],
    reviews: [
      {
        id: 32,
        name: "Anjali Kapoor",
        rating: 5,
        comment: "This cake is a tropical dream! The caramelized pineapple topping is perfectly balanced - not too sweet, with a hint of tanginess. The cake itself is incredibly moist and tender.",
        date: "6 days ago"
      },
      {
        id: 33,
        name: "Vikrant Mehta",
        rating: 4,
        comment: "A very good rendition of a classic cake. The hint of rum in the batter adds a sophisticated touch, and the presentation is beautiful. Would order again!",
        date: "2 weeks ago"
      }
    ]
  }
];

// Mock orders data
const orders: OrderType[] = [
  {
    id: "DB12345",
    userId: 1,
    items: [
      {
        id: 1,
        productId: 1,
        name: "Chocolate Delight Cake",
        price: 499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
        size: "Medium (1kg)"
      },
      {
        id: 2,
        productId: 3,
        name: "Artisan Sourdough Bread",
        price: 199,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
        size: "Small (500g)"
      }
    ],
    totalAmount: 897,
    date: "2023-10-10T10:30:00",
    status: "delivered",
    deliveryAddress: "123 Main St, Mumbai 400001",
    paymentMethod: "Credit Card",
    estimatedDelivery: "Oct 10, 2023, 11:30 AM - 12:30 PM",
    trackingSteps: [
      {
        step: "Order Placed",
        completed: true,
        time: "Oct 10, 10:30 AM"
      },
      {
        step: "Order Confirmed",
        completed: true,
        time: "Oct 10, 10:35 AM"
      },
      {
        step: "Preparation Started",
        completed: true,
        time: "Oct 10, 10:45 AM"
      },
      {
        step: "Out for Delivery",
        completed: true,
        time: "Oct 10, 11:30 AM"
      },
      {
        step: "Delivered",
        completed: true,
        time: "Oct 10, 12:15 PM"
      }
    ]
  },
  {
    id: "DB67890",
    userId: 1,
    items: [
      {
        id: 3,
        productId: 4,
        name: "French Macarons Assortment",
        price: 349,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
        size: "Box of 6"
      }
    ],
    totalAmount: 349,
    date: "2023-10-15T14:45:00",
    status: "delivered",
    deliveryAddress: "123 Main St, Mumbai 400001",
    paymentMethod: "Cash on Delivery",
    estimatedDelivery: "Oct 15, 2023, 3:45 PM - 4:45 PM",
    trackingSteps: [
      {
        step: "Order Placed",
        completed: true,
        time: "Oct 15, 2:45 PM"
      },
      {
        step: "Order Confirmed",
        completed: true,
        time: "Oct 15, 2:50 PM"
      },
      {
        step: "Preparation Started",
        completed: true,
        time: "Oct 15, 3:00 PM"
      },
      {
        step: "Out for Delivery",
        completed: true,
        time: "Oct 15, 3:45 PM"
      },
      {
        step: "Delivered",
        completed: true,
        time: "Oct 15, 4:20 PM"
      }
    ]
  },
  {
    id: "DB24680",
    userId: 1,
    items: [
      {
        id: 4,
        productId: 2,
        name: "Butter Croissants",
        price: 239,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
        size: "Pack of 4"
      },
      {
        id: 5,
        productId: 6,
        name: "Blueberry Cheesecake",
        price: 549,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1533134242453-b9e071ac6899?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
        size: "6 inch (serves 6-8)"
      }
    ],
    totalAmount: 788,
    date: "2023-10-20T09:15:00",
    status: "out_for_delivery",
    deliveryAddress: "123 Main St, Mumbai 400001",
    paymentMethod: "Online Payment",
    estimatedDelivery: "Oct 20, 2023, 10:15 AM - 11:15 AM",
    trackingSteps: [
      {
        step: "Order Placed",
        completed: true,
        time: "Oct 20, 9:15 AM"
      },
      {
        step: "Order Confirmed",
        completed: true,
        time: "Oct 20, 9:20 AM"
      },
      {
        step: "Preparation Started",
        completed: true,
        time: "Oct 20, 9:30 AM"
      },
      {
        step: "Out for Delivery",
        completed: true,
        time: "Oct 20, 10:15 AM"
      },
      {
        step: "Delivered",
        completed: false
      }
    ]
  },
  {
    id: "DB13579",
    userId: 1,
    items: [
      {
        id: 6,
        productId: 8,
        name: "Mango Tart",
        price: 399,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
        size: "4 inch (individual)"
      }
    ],
    totalAmount: 798,
    date: "2023-11-01T16:30:00",
    status: "processing",
    deliveryAddress: "123 Main St, Mumbai 400001",
    paymentMethod: "Credit Card",
    estimatedDelivery: "Nov 1, 2023, 5:30 PM - 6:30 PM",
    trackingSteps: [
      {
        step: "Order Placed",
        completed: true,
        time: "Nov 1, 4:30 PM"
      },
      {
        step: "Order Confirmed",
        completed: true,
        time: "Nov 1, 4:35 PM"
      },
      {
        step: "Preparation Started",
        completed: true,
        time: "Nov 1, 4:45 PM"
      },
      {
        step: "Out for Delivery",
        completed: false
      },
      {
        step: "Delivered",
        completed: false
      }
    ]
  },
  {
    id: "DB97531",
    userId: 1,
    items: [
      {
        id: 7,
        productId: 10,
        name: "Red Velvet Cupcakes",
        price: 299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
        size: "Box of 4"
      }
    ],
    totalAmount: 299,
    date: "2023-11-05T11:00:00",
    status: "pending",
    deliveryAddress: "123 Main St, Mumbai 400001",
    paymentMethod: "Cash on Delivery",
    estimatedDelivery: "Nov 5, 2023, 12:00 PM - 1:00 PM",
    trackingSteps: [
      {
        step: "Order Placed",
        completed: true,
        time: "Nov 5, 11:00 AM"
      },
      {
        step: "Order Confirmed",
        completed: false
      },
      {
        step: "Preparation Started",
        completed: false
      },
      {
        step: "Out for Delivery",
        completed: false
      },
      {
        step: "Delivered",
        completed: false
      }
    ]
  }
];

// Mock users data
const users: UserType[] = [
  {
    id: 1,
    name: "Test User",
    email: "testuser@example.com",
    phone: "+91 9876543210",
    address: "123 Main St, Mumbai 400001",
    username: "test123",
    isAdmin: false
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@Peekusbakery.com",
    phone: "+91 9876543211",
    address: "456 Admin Ave, Mumbai 400002",
    username: "admin",
    isAdmin: true
  }
];

// Helper functions to work with mock data
export function getAllProducts(): ProductType[] {
  return products;
}

export function getProductById(id: number): ProductType | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): ProductType[] {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
}

export function getRelatedProducts(productId: number, limit: number = 4): ProductType[] {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
}

export function getFeaturedProducts(limit: number = 4): ProductType[] {
  return products
    .filter(product => product.featured)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
}

export function getUserByUsername(username: string): UserType | undefined {
  return users.find(user => user.username === username);
}

export function getOrdersByUserId(userId: number): OrderType[] {
  return orders.filter(order => order.userId === userId);
}

export function getOrderById(orderId: string): OrderType | undefined {
  return orders.find(order => order.id === orderId);
}

export function getAllOrders(): OrderType[] {
  return orders;
}

export function searchProducts(query: string): ProductType[] {
  const lowercaseQuery = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}
