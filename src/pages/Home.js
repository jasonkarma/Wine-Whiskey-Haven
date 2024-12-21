import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Paper,
  CircularProgress,
} from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { getProducts, updateProductImages } from '../firebase/services';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Update product images if needed
        await updateProductImages();
        
        // Fetch products again to get updated image URLs
        const allProducts = await getProducts();
        
        // Create a Map to store unique products
        const uniqueProducts = new Map();
        
        // First pass: collect all products and keep the one with valid image
        allProducts.forEach(product => {
          if (!product || !product.name || !product.category) return;
          
          const key = `${product.name}-${product.category}`.toLowerCase();
          const existingProduct = uniqueProducts.get(key);
          
          // Always use the product with a valid image URL
          if (!existingProduct || 
              (product.imageUrl && (!existingProduct.imageUrl || existingProduct.imageUrl.includes('undefined')))) {
            uniqueProducts.set(key, {
              ...product,
              imageUrl: product.imageUrl || 
                (product.category === 'whiskey' 
                  ? 'https://i.ibb.co/8XyYVPd/jack-daniels.png'
                  : 'https://i.ibb.co/GCzqbVn/cabernet.png')
            });
          }
        });
        
        // Convert to array and filter out any products without valid images
        const uniqueProductsList = Array.from(uniqueProducts.values())
          .filter(product => product.imageUrl && !product.imageUrl.includes('undefined'));
        
        console.log(`Successfully fetched ${uniqueProductsList.length} unique products with images`);
        setProducts(uniqueProductsList);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3)',
          minHeight: '400px',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container
          sx={{
            position: 'relative',
            pt: { xs: 3, md: 6 },
            pb: { xs: 3, md: 6 },
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            sx={{ textAlign: 'center' }}
          >
            Wine & Whiskey Haven
          </Typography>
          <Typography
            variant="h5"
            color="inherit"
            paragraph
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Discover our curated collection of fine wines and premium whiskeys
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/whiskey')}
              sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
            >
              Explore Whiskeys
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/wine')}
            >
              Browse Wines
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Featured Products */}
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={product.imageUrl}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </Button>
                  <Box>
                    <IconButton
                      aria-label="add to favorites"
                      sx={{ mr: 1 }}
                    >
                      <Favorite />
                    </IconButton>
                    <IconButton
                      aria-label="add to cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <AddShoppingCart />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
