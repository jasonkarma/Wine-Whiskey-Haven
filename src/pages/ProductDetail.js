import React, { useState, useEffect } from 'react';
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
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isFavorite = wishlistItems.some(item => item.id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        const foundProduct = products.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setError('');
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleToggleWishlist = () => {
    if (product) {
      dispatch(toggleWishlist(product));
    }
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
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error">Product not found</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                maxHeight: '500px',
              }}
              src={product.imageUrl}
              alt={product.name}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" gutterBottom>
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
                color={isFavorite ? 'error' : 'default'}
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
            <Tabs value={tabValue} onChange={handleTabChange}>
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
    </Container>
  );
};

export default ProductDetail;
