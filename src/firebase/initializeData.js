import { addSampleProducts } from './sampleProducts';

// Function to initialize the database with sample data
const initializeDatabase = async () => {
  try {
    await addSampleProducts();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default initializeDatabase;
