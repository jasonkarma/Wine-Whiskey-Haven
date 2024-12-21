import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import { AddShoppingCart, Favorite, Search, FilterList } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { getProducts, updateProductImages } from '../firebase/services';
import { motion } from 'framer-motion';

const WineMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const wishlist = useSelector((state) => state.wishlist.items);

  // Fetch products with error handling and logging
  useEffect(() => {
    const fetchWines = async () => {
      try {
        console.log('Fetching wine products...');
        setLoading(true);
        
        // Pre-load images before showing content
        const preloadImage = (url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
          });
        };
        
        // Update product images if needed
        await updateProductImages();
        
        // Fetch products again to get updated image URLs
        const allProducts = await getProducts();
        
        // Create a Map to store unique products
        const uniqueProducts = new Map();
        
        // First pass: collect all products and keep the one with valid image
        allProducts.forEach(product => {
          if (product?.category === 'wine') {
            const key = `${product.name}-${product.category}`.toLowerCase();
            const existingProduct = uniqueProducts.get(key);
            
            // Always use the product with a valid image URL
            if (!existingProduct || 
                (product.imageUrl && (!existingProduct.imageUrl || existingProduct.imageUrl.includes('undefined')))) {
              uniqueProducts.set(key, {
                ...product,
                imageUrl: product.imageUrl || 'https://i.ibb.co/GCzqbVn/cabernet.png'
              });
            }
          }
        });
        
        const wines = Array.from(uniqueProducts.values())
          .filter(product => product.imageUrl && !product.imageUrl.includes('undefined'));
        
        // Preload all images
        await Promise.all(
          wines.map(wine => preloadImage(wine.imageUrl))
        );
        
        console.log(`Successfully fetched ${wines.length} unique wines with images:`, 
          wines.map(w => `${w.name} (${w.imageUrl})`));
        
        setProducts(wines);
        setError(null);
      } catch (error) {
        console.error('Error fetching wines:', error);
        setError('Failed to load wine products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  // Filter products based on search and type
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || product.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Handle cart operations with feedback
  const handleAddToCart = (product) => {
    try {
      dispatch(addToCart({ ...product, quantity: 1 }));
      setSnackbar({
        open: true,
        message: `${product.name} added to cart`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add item to cart',
        severity: 'error'
      });
    }
  };

  // Handle wishlist operations
  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlist(product));
    setSnackbar({
      open: true,
      message: `${product.name} ${wishlist.some(item => item.id === product.id) ? 'removed from' : 'added to'} wishlist`,
      severity: 'success'
    });
  };

  // Loading state with animation
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CircularProgress />
        </motion.div>
      </Box>
    );
  }

  // Error state with retry option
  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} minHeight="60vh" pt={4}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Wine Selection
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search wines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Box display="flex" gap={1} mb={2}>
          {['all', 'red', 'white', 'rose', 'sparkling'].map((type) => (
            <Chip
              key={type}
              label={type.charAt(0).toUpperCase() + type.slice(1)}
              onClick={() => setSelectedType(type)}
              color={selectedType === type ? 'primary' : 'default'}
              variant={selectedType === type ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                    boxShadow: 4
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{ cursor: 'pointer' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<AddShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    onClick={() => handleToggleWishlist(product)}
                    color={wishlist.some(item => item.id === product.id) ? 'primary' : 'default'}
                    aria-label={`${wishlist.some(item => item.id === product.id) ? 'Remove from' : 'Add to'} wishlist`}
                  >
                    <Favorite />
                  </IconButton>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default WineMenu;
