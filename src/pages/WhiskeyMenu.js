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

const WhiskeyMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchWhiskeys = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        
        // Create a Map to ensure unique products by ID
        const uniqueProductsMap = new Map();
        
        allProducts.forEach(product => {
          // Normalize the category
          let category = (product.category || '').toLowerCase();
          const type = (product.type || '').toLowerCase();
          
          // If it's a whiskey type, ensure it has a proper category
          if (type === 'whiskey' || category === 'whiskey') {
            // Try to determine the specific category from the name or description
            const name = (product.name || '').toLowerCase();
            const description = (product.description || '').toLowerCase();
            
            if (name.includes('scotch') || description.includes('scotch')) {
              category = 'scotch';
            } else if (name.includes('bourbon') || description.includes('bourbon')) {
              category = 'bourbon';
            } else if (name.includes('irish') || description.includes('irish')) {
              category = 'irish';
            } else if (name.includes('japanese') || description.includes('japanese')) {
              category = 'japanese';
            }
          }
          
          // Only add the product if it's a whiskey or belongs to a whiskey category
          if (type === 'whiskey' || category === 'whiskey' || 
              ['scotch', 'bourbon', 'irish', 'japanese'].includes(category)) {
            
            // If the product already exists, only update if it has more complete data
            const existingProduct = uniqueProductsMap.get(product.id);
            if (!existingProduct || 
                (product.category && !existingProduct.category) || 
                (product.type && !existingProduct.type)) {
              uniqueProductsMap.set(product.id, {
                ...product,
                category: category // Use the normalized category
              });
            }
          }
        });
        
        // Convert Map back to array
        const whiskeys = Array.from(uniqueProductsMap.values());
        setProducts(whiskeys);
        setError('');
      } catch (err) {
        console.error('Error fetching whiskeys:', err);
        setError('Failed to load whiskeys');
        toast.error('Failed to load whiskeys');
      } finally {
        setLoading(false);
      }
    };

    fetchWhiskeys();
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
    : products.filter(product => {
        const category = (product.category || '').toLowerCase();
        return category === selectedCategory.toLowerCase();
      });

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found';
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
          Whiskey Collection
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
            <Tab value="scotch" label="Scotch" />
            <Tab value="bourbon" label="Bourbon" />
            <Tab value="irish" label="Irish" />
            <Tab value="japanese" label="Japanese" />
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

export default WhiskeyMenu;
