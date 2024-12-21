import sampleProducts, { addSampleProducts } from './sampleProducts';
import { getProducts, cleanupDuplicateProducts, deleteProduct, addProduct } from './services';

// Function to initialize the database with sample data
const initializeDatabase = async () => {
  try {
    // First, clean up any duplicate products
    await cleanupDuplicateProducts();
    
    // Check if products exist
    const existingProducts = await getProducts();
    
    // Delete any products with old IDs
    const oldIds = ['wine1', 'wine2', 'wine3', 'wine4', 'wine-rose1'];
    for (const id of oldIds) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.log(`No product found with ID: ${id}`);
      }
    }
    
    // Create a map of existing products by ID
    const existingProductMap = new Map(
      existingProducts.map(product => [product.id, product])
    );

    // Add or update products
    for (const sampleProduct of sampleProducts) {
      try {
        const existingProduct = existingProductMap.get(sampleProduct.id);
        
        if (!existingProduct) {
          // Add new product
          await addProduct(sampleProduct);
          console.log(`Added new product: ${sampleProduct.name}`);
        } else {
          // Update existing product if needed
          const needsUpdate = JSON.stringify(existingProduct) !== JSON.stringify(sampleProduct);
          if (needsUpdate) {
            await deleteProduct(existingProduct.id);
            await addProduct(sampleProduct);
            console.log(`Updated product: ${sampleProduct.name}`);
          }
        }
      } catch (error) {
        console.error(`Error processing product ${sampleProduct.name}:`, error);
      }
    }
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default initializeDatabase;
