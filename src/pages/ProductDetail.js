import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Rating,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Divider,
  CircularProgress,
  Alert,
  ImageList,
  ImageListItem,
  Skeleton,
} from '@mui/material';
import {
  AddShoppingCart,
  Favorite,
  Share,
  LocalShipping,
  Store,
} from '@mui/icons-material';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { getProducts } from '../firebase/services';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'react-error-boundary';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        const foundProduct = products.find(p => p.id === id);
        
        if (!foundProduct) {
          throw new Error('Product not found');
        }
        
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    try {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      toast.error('Failed to add item to cart');
    }
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast.success(`${product.name} ${wishlistItems.some(item => item.id === product.id) ? 'removed from' : 'added to'} wishlist`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={30} />
            <Box sx={{ mt: 2 }}>
              <Skeleton variant="rectangular" height={50} width={200} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/wine-menu')}>
          Return to Wine Menu
        </Button>
      </Container>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="error">Something went wrong!</Typography>
          <Typography>{error.message}</Typography>
          <Button variant="contained" onClick={() => navigate('/wine-menu')} sx={{ mt: 2 }}>
            Return to Wine Menu
          </Button>
        </Box>
      )}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ToastContainer position="bottom-right" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <LazyLoadImage
                    alt={product.name}
                    height={400}
                    src={product.imageUrl}
                    width="100%"
                    effect="blur"
                    style={{ 
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                </Box>
                {product.additionalImages && (
                  <ImageList sx={{ mt: 2 }} cols={4} rowHeight={100}>
                    {product.additionalImages.map((img, index) => (
                      <ImageListItem 
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        sx={{ 
                          cursor: 'pointer',
                          opacity: selectedImage === index ? 1 : 0.6,
                          transition: 'opacity 0.3s'
                        }}
                      >
                        <LazyLoadImage
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          effect="blur"
                          height={100}
                          width="100%"
                          style={{ objectFit: 'cover', borderRadius: '4px' }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mt: { xs: 2, md: 3 } }}>
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    mb: 3,
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                  }}
                >
                  {product.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Rating value={product.rating} readOnly precision={0.5} />
                  <Typography variant="body2" color="text.secondary">
                    ({product.rating} / 5)
                  </Typography>
                </Box>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>

                <Box display="flex" gap={2} mb={3}>
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCart />}
                    onClick={handleAddToCart}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    onClick={handleToggleWishlist}
                    color={wishlistItems.some(item => item.id === product.id) ? 'error' : 'default'}
                    sx={{ border: 1, borderColor: 'divider' }}
                  >
                    <Favorite />
                  </IconButton>
                </Box>

                <Box display="flex" gap={2} mb={3}>
                  <Chip icon={<LocalShipping />} label="Free Shipping" color="primary" variant="outlined" />
                  <Chip icon={<Store />} label={`${product.stock} in stock`} color="success" variant="outlined" />
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
                  <Tab label="Details" />
                  <Tab label="Tasting Notes" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {Object.entries(product.details).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '40%' }}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {Object.entries(product.tastingNotes).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '40%' }}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </ErrorBoundary>
  );
};

export default React.memo(ProductDetail);
