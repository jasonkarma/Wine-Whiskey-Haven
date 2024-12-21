import { addProduct } from './services';

const sampleProducts = [
  // Whiskey Products
  {
    id: 'whiskey1',
    name: 'Jack Daniels Old No. 7',
    category: 'whiskey',
    price: 29.99,
    description: 'Classic Tennessee whiskey with a smooth, rich flavor.',
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
      finish: 'Long and smooth, with a warming smokiness'
    }
  },

  // Wine Products
  {
    id: 'wine1',
    name: 'Cabernet Sauvignon',
    category: 'wine',
    price: 24.99,
    description: 'Full-bodied red wine with rich dark fruit flavors.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0028/9669/1264/files/I26705-10_900x.png?v=1721295770',
    stock: 60,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Napa Valley, California',
      winery: 'Estate Vineyards',
      vintage: '2019',
      abv: '14.5%',
      size: '750ml',
      type: 'Red Wine'
    },
    tastingNotes: {
      nose: 'Black cherry, cassis, and hints of vanilla and cedar',
      palate: 'Full-bodied with rich black fruits, chocolate, and oak spice',
      finish: 'Long and smooth with fine-grained tannins'
    }
  },
  {
    id: 'wine2',
    name: 'Chardonnay Reserve',
    category: 'wine',
    price: 29.99,
    description: 'Buttery white wine with oak and vanilla notes.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy3q49QVteGkdGjh5lL2JpTj_wFo6d10Xwhg&s',
    stock: 55,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Russian River Valley, California',
      winery: 'Reserve Cellars',
      vintage: '2020',
      abv: '13.5%',
      size: '750ml',
      type: 'White Wine'
    },
    tastingNotes: {
      nose: 'Ripe apple, pear, vanilla, and toasted oak',
      palate: 'Rich and creamy with butterscotch, tropical fruit, and subtle spice',
      finish: 'Long and elegant with balanced oak and fruit'
    }
  },
  {
    id: 'wine3',
    name: 'Pinot Noir',
    category: 'wine',
    price: 34.99,
    description: 'Elegant red wine with cherry and earthy notes.',
    imageUrl: 'https://www.maset.com/cdnassets/products/red-wines/lg/bottle/pinot-noir-lg-1.png',
    stock: 45,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Willamette Valley, Oregon',
      winery: 'Valley Estates',
      vintage: '2019',
      abv: '13.5%',
      size: '750ml',
      type: 'Red Wine'
    },
    tastingNotes: {
      nose: 'Red cherry, raspberry, and forest floor',
      palate: 'Silky texture with bright red fruits and subtle earth notes',
      finish: 'Elegant and balanced with soft tannins'
    }
  },
  {
    id: 'wine4',
    name: 'Sauvignon Blanc',
    category: 'wine',
    price: 19.99,
    description: 'Crisp white wine with citrus and herbal notes.',
    imageUrl: 'https://www.sauvignonjohn.com/cdn/shop/products/image_65e4f397-1371-472c-a123-075ddd391ca0_1200x1200.png?v=1661873388',
    stock: 50,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Marlborough, New Zealand',
      winery: 'Coastal Vineyards',
      vintage: '2021',
      abv: '12.5%',
      size: '750ml',
      type: 'White Wine'
    },
    tastingNotes: {
      nose: 'Grapefruit, lime, and fresh-cut grass',
      palate: 'Vibrant citrus with gooseberry and tropical fruit notes',
      finish: 'Clean and refreshing with lingering citrus'
    }
  },
  {
    id: 'wine5',
    name: 'Merlot',
    category: 'wine',
    price: 22.99,
    description: 'Smooth red wine with plum and chocolate notes.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwZ0lH8nmKTkXxynhrrqyFImv9s2RKb_2PoA&s',
    stock: 40,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    details: {
      origin: 'Columbia Valley, Washington',
      winery: 'Valley View',
      vintage: '2018',
      abv: '14%',
      size: '750ml',
      type: 'Red Wine'
    },
    tastingNotes: {
      nose: 'Ripe plum, black cherry, and mocha',
      palate: 'Smooth and rich with dark fruits and chocolate',
      finish: 'Velvety with soft tannins and lingering fruit'
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
