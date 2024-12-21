import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Box,
  Divider,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  LocalShipping,
  DeliveryDining,
} from '@mui/icons-material';
import {
  removeFromCart,
  updateQuantity,
  setDeliveryOption,
} from '../redux/slices/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total, deliveryOption } = useSelector((state) => state.cart);

  const deliveryOptions = {
    ubereats: {
      name: 'UberEats',
      fee: 5.99,
      estimatedTime: '30-45 minutes',
    },
    foodpanda: {
      name: 'Foodpanda',
      fee: 4.99,
      estimatedTime: '35-50 minutes',
    },
    standard_shipping: {
      name: 'Standard Shipping',
      fee: 15.00,
      estimatedTime: '2-3 business days',
    },
    express_shipping: {
      name: 'Express Shipping',
      fee: 25.00,
      estimatedTime: 'Next business day',
    },
  };

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDeliveryOptionChange = (event) => {
    dispatch(setDeliveryOption(event.target.value));
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryOption ? deliveryOptions[deliveryOption].fee : 0;
    return {
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
    };
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Looks like you haven't added any items to your cart yet.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  const totals = calculateTotal();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            {items.map((item) => (
              <Box key={item.id}>
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={item.imageUrl}
                        alt={item.name}
                        sx={{ objectFit: 'cover', borderRadius: 1 }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            >
                              <Remove />
                            </IconButton>
                            <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                          <Typography variant="subtitle1" sx={{ textAlign: 'right' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                          <Button
                            startIcon={<Delete />}
                            color="error"
                            onClick={() => handleRemoveItem(item.id)}
                            sx={{ mt: 1 }}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Delivery Option</InputLabel>
              <Select
                value={deliveryOption || ''}
                onChange={handleDeliveryOptionChange}
                label="Delivery Option"
              >
                <MenuItem value="ubereats">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DeliveryDining sx={{ mr: 1 }} />
                    UberEats (${deliveryOptions.ubereats.fee})
                  </Box>
                </MenuItem>
                <MenuItem value="foodpanda">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DeliveryDining sx={{ mr: 1 }} />
                    Foodpanda (${deliveryOptions.foodpanda.fee})
                  </Box>
                </MenuItem>
                <MenuItem value="standard_shipping">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalShipping sx={{ mr: 1 }} />
                    Standard Shipping (${deliveryOptions.standard_shipping.fee})
                  </Box>
                </MenuItem>
                <MenuItem value="express_shipping">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalShipping sx={{ mr: 1 }} />
                    Express Shipping (${deliveryOptions.express_shipping.fee})
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            {deliveryOption && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Estimated delivery time:
                </Typography>
                <Typography variant="body1">
                  {deliveryOptions[deliveryOption].estimatedTime}
                </Typography>
              </Box>
            )}

            <List>
              <ListItem>
                <ListItemText primary="Subtotal" />
                <Typography>${totals.subtotal.toFixed(2)}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Delivery Fee" />
                <Typography>${totals.deliveryFee.toFixed(2)}</Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Total" />
                <Typography variant="h6" color="primary">
                  ${totals.total.toFixed(2)}
                </Typography>
              </ListItem>
            </List>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => navigate('/checkout')}
              disabled={!deliveryOption}
              sx={{ mt: 2 }}
            >
              Proceed to Checkout
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
