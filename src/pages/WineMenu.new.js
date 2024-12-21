import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Button,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getProducts } from '../firebase/services';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { isIOSDevice, setupIOSHandlers, cleanupIOSHandlers, handleIOSError } from '../utils/iosHelpers';
import PageContainer from '../components/layout/PageContainer';

const WineMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        
        // Create a Map to ensure unique products by ID
        const uniqueProductsMap = new Map();
        allProducts.forEach(product => {
          if (['red', 'white', 'rose', 'sparkling'].includes(product.category)) {
            uniqueProductsMap.set(product.id, product);
          }
        });
        
        // Convert Map back to array
        const wines = Array.from(uniqueProductsMap.values());
        setProducts(wines);
        setError('');
      } catch (err) {
        console.error('Error fetching wines:', err);
        setError('Failed to load wines');
        toast.error('Failed to load wines');
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  // Handle mobile-specific setup
  useEffect(() => {
    if (isIOSDevice()) {
      setupIOSHandlers();
    }
    return () => {
      if (isIOSDevice()) {
        cleanupIOSHandlers();
      }
    };
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlist(product));
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    toast.success(isInWishlist ? 'Removed from wishlist!' : 'Added to wishlist!');
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
  };

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
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <PageContainer maxWidth="xl">
      <Box 
        sx={{ 
          width: '100%',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'none'
        }}
      >
        <Typography
          component={motion.h1}
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontFamily: 'Playfair Display',
            mb: 4,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Wine Collection
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => handleCategoryChange(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            centered
            sx={{
              '& .MuiTab-root': {
                minWidth: 100,
              },
            }}
          >
            <Tab value="all" label="All" />
            <Tab value="red" label="Red" />
            <Tab value="white" label="White" />
            <Tab value="rose" label="Rosé" />
            <Tab value="sparkling" label="Sparkling" />
          </Tabs>
        </Box>

        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                component={motion.div}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[4],
                  },
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                }}
              >
                <CardMedia
                  component="img"
                  height="260"
                  image={product.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
                  alt={product.name}
                  onError={handleImageError}
                  sx={{
                    objectFit: 'cover',
                    backgroundColor: 'grey.100',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      lineHeight: 1.2,
                      mb: 1,
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      height: '2.5em',
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    View Details
                  </Button>
                  <Box>
                    <IconButton
                      onClick={() => handleToggleWishlist(product)}
                      color={
                        wishlistItems.some((item) => item.id === product.id)
                          ? 'primary'
                          : 'default'
                      }
                      size="small"
                    >
                      <Favorite />
                    </IconButton>
                    <IconButton
                      onClick={() => handleAddToCart(product)}
                      color="primary"
                      size="small"
                    >
                      <AddShoppingCart />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default WineMenu;
