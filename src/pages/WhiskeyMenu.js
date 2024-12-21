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
import { getProducts } from '../firebase/services';
import { motion } from 'framer-motion';

const WhiskeyMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const wishlist = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchWhiskeys = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        // Filter unique whiskeys and ensure no duplicates
        const whiskeys = allProducts.reduce((acc, product) => {
          if (product.category === 'whiskey' && !acc.some(p => p.id === product.id)) {
            acc.push(product);
          }
          return acc;
        }, []);
        setProducts(whiskeys);
        setError(null);
      } catch (err) {
        console.error('Error fetching whiskeys:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchWhiskeys();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setSnackbar({ open: true, message: 'Added to cart!', severity: 'success' });
  };

  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlist(product));
    const isInWishlist = wishlist.some(item => item.id === product.id);
    setSnackbar({
      open: true,
      message: isInWishlist ? 'Removed from wishlist!' : 'Added to wishlist!',
      severity: 'success'
    });
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || product.details.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = ['all', ...new Set(products.map(product => product.details.type))];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Whiskey Collection
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search whiskeys..."
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
        <Box display="flex" gap={1} mb={2} flexWrap="wrap">
          {types.map((type) => (
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

      <Grid container spacing={4}>
        {filteredProducts.map((product, index) => {
          // Add error handling for missing images
          const handleImageError = (e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found';
          };

          return (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.2s ease-in-out'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.imageUrl}
                    alt={product.name}
                    onError={handleImageError}
                    sx={{ objectFit: 'contain', p: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      onClick={() => handleViewDetails(product.id)}
                      sx={{ mr: 'auto' }}
                    >
                      View Details
                    </Button>
                    <IconButton 
                      onClick={() => handleToggleWishlist(product)}
                      color={wishlist.some(item => item.id === product.id) ? 'error' : 'default'}
                    >
                      <Favorite />
                    </IconButton>
                    <IconButton onClick={() => handleAddToCart(product)} color="primary">
                      <AddShoppingCart />
                    </IconButton>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default WhiskeyMenu;
