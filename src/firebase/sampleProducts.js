import { addProduct } from './services';

const sampleProducts = [
  // Whiskey Products
  {
    id: 'whiskey1',
    name: 'Jack Daniels Old No. 7',
    category: 'whiskey',
    price: 29.99,
    description: 'Classic Tennessee Bourbon whiskey with a smooth, rich flavor.',
    imageUrl: 'https://www.oaks.delivery/wp-content/uploads/Jack-Daniels-Honey-Whiskey-1-1600x900-1-1200x900-cropped.webp',
    stock: 50,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Lynchburg, Tennessee, USA',
      distillery: 'Jack Daniel Distillery',
      age: 'Minimum 4 years',
      abv: '40%',
      size: '750ml',
      type: 'Tennessee Whiskey'
    },
    tastingNotes: {
      nose: 'Sweet vanilla, caramel, and oak with hints of banana',
      palate: 'Smooth, full-bodied with notes of toasted oak, vanilla, and dark caramel',
      finish: 'Long, warm with lingering sweetness and subtle spice'
    }
  },
  {
    id: 'whiskey2',
    name: 'Jameson Irish Whiskey',
    category: 'whiskey',
    price: 34.99,
    description: 'Triple-distilled Irish whiskey with perfect balance.',
    imageUrl: 'https://dayspringshop.com/wp-content/uploads/2024/05/DSC4620.jpg',
    stock: 45,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Cork, Ireland',
      distillery: 'Midleton Distillery',
      age: 'Minimum 4 years',
      abv: '40%',
      size: '750ml',
      type: 'Blended Irish Whiskey'
    },
    tastingNotes: {
      nose: 'Light floral fragrance, peppered with spicy wood notes',
      palate: 'Perfect balance of spicy, nutty and vanilla notes with hints of sweet sherry',
      finish: 'Smooth and mellow, with lingering warmth and wood spice'
    }
  },
  {
    id: 'whiskey3',
    name: 'Macallan 12 Year',
    category: 'whiskey',
    price: 89.99,
    description: 'Aged single malt Scotch with rich oak and fruit notes.',
    imageUrl: 'https://dayspringshop.com/wp-content/uploads/2024/05/DSC4620.jpg',
    stock: 30,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Speyside, Scotland',
      distillery: 'The Macallan Distillery',
      age: '12 Years',
      abv: '43%',
      size: '750ml',
      type: 'Single Malt Scotch Whisky'
    },
    tastingNotes: {
      nose: 'Vanilla, dried fruits, and sherry, with wood smoke and spice',
      palate: 'Rich dried fruits, wood smoke and spice, with hints of chocolate orange',
      finish: 'Long and rich, with dried fruits, sweet toffee and spice'
    }
  },
  {
    id: 'whiskey4',
    name: 'Glenfiddich 15 Year',
    category: 'whiskey',
    price: 79.99,
    description: 'Solera aged single malt with warm spice notes.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Y_uN75UNuotchTBNWdg3JX09qidhOZZ8gg&s',
    stock: 35,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Speyside, Scotland',
      distillery: 'Glenfiddich Distillery',
      age: '15 Years',
      abv: '40%',
      size: '750ml',
      type: 'Single Malt Scotch Whisky'
    },
    tastingNotes: {
      nose: 'Honey, rich fruit, and delicate spice',
      palate: 'Silky smooth, revealing layers of sherry oak, marzipan, cinnamon and ginger',
      finish: 'Long and satisfying, with lingering sweetness and oak'
    }
  },
  {
    id: 'whiskey5',
    name: 'Johnnie Walker Black',
    category: 'whiskey',
    price: 44.99,
    description: 'Premium blended Scotch aged 12 years.',
    imageUrl: 'https://www.medoc.com.tw/web/wp-content/uploads/shop/product/WKJW3570.jpg',
    stock: 40,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Scotland',
      distillery: 'Various Scottish Distilleries',
      age: '12 Years',
      abv: '40%',
      size: '750ml',
      type: 'Blended Scotch Whisky'
    },
    tastingNotes: {
      nose: 'Rich dried fruits, vanilla, orange zest and spice',
      palate: 'Creamy toffee, sweet fruit and spice, with hints of smoke',
      finish: 'Smooth and mellow, with a warming smokiness'
    }
  },

  // Wine Products - Red
  {
    id: 'wine-red1',
    name: 'Cabernet Sauvignon Reserve',
    category: 'red',
    price: 45.99,
    description: 'Full-bodied red wine with rich dark fruit flavors.',
    imageUrl: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg',
    stock: 30,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Napa Valley, California',
      winery: 'Oakridge Vineyards',
      vintage: '2018',
      abv: '14.5%',
      size: '750ml',
      type: 'Red Wine'
    },
    tastingNotes: {
      nose: 'Black cherry, cassis, and cedar',
      palate: 'Full-bodied with ripe black fruits and hints of vanilla',
      finish: 'Long, smooth with well-integrated tannins'
    }
  },
  // Wine Products - White
  {
    id: 'wine-white1',
    name: 'Chardonnay Reserve',
    category: 'white',
    price: 35.99,
    description: 'Elegant white wine with balanced oak and fruit.',
    imageUrl: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg',
    stock: 25,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Sonoma County, California',
      winery: 'Coastal Vineyards',
      vintage: '2019',
      abv: '13.5%',
      size: '750ml',
      type: 'White Wine'
    },
    tastingNotes: {
      nose: 'Apple, pear, and vanilla',
      palate: 'Creamy texture with citrus and oak notes',
      finish: 'Long and elegant with subtle minerality'
    }
  },
  // Wine Products - Rose
  {
    id: 'wine-rose1',
    name: 'Provence Rosé',
    category: 'rose',
    price: 28.99,
    description: 'Refreshing and elegant rosé with delicate fruit flavors.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs__Ry9Bkyk5ahceL5cnAPG1zMLVU2v1qZnA&s',
    stock: 40,
    rating: 4.3,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Provence, France',
      winery: 'Château Roseline',
      vintage: '2020',
      abv: '12.5%',
      size: '750ml',
      type: 'Rosé Wine'
    },
    tastingNotes: {
      nose: 'Fresh strawberries and citrus blossoms',
      palate: 'Light and crisp with red berry notes',
      finish: 'Clean and refreshing'
    }
  },
  // Wine Products - Sparkling
  {
    id: 'wine-sparkling1',
    name: 'Prosecco Extra Dry',
    category: 'sparkling',
    price: 32.99,
    description: 'Vibrant sparkling wine with fine bubbles and fresh fruit.',
    imageUrl: 'https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg',
    stock: 35,
    rating: 4.4,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Veneto, Italy',
      winery: 'Villa Spumante',
      vintage: 'NV',
      abv: '11.5%',
      size: '750ml',
      type: 'Sparkling Wine'
    },
    tastingNotes: {
      nose: 'Green apple and white flowers',
      palate: 'Fresh and lively with citrus and pear',
      finish: 'Clean with persistent bubbles'
    }
  }
];

export const addSampleProducts = async () => {
  try {
    for (const product of sampleProducts) {
      await addProduct(product);
    }
    console.log('Sample products added successfully');
  } catch (error) {
    console.error('Error adding sample products:', error);
  }
};

export default sampleProducts;
