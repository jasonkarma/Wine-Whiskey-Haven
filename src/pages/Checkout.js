import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress,
} from '@mui/material';
import { clearCart } from '../redux/slices/cartSlice';

const steps = ['Shipping Information', 'Payment Method', 'Review Order'];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total, deliveryOption } = useSelector((state) => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleShippingInfoChange = (event) => {
    setShippingInfo({
      ...shippingInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handlePaymentInfoChange = (event) => {
    setPaymentInfo({
      ...paymentInfo,
      [event.target.name]: event.target.value,
    });
  };

  const validateShippingInfo = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode', 'country'];
    return required.every(field => shippingInfo[field].trim() !== '');
  };

  const validatePaymentInfo = () => {
    if (paymentMethod === 'credit_card') {
      const required = ['cardNumber', 'cardName', 'expiry', 'cvv'];
      return required.every(field => paymentInfo[field].trim() !== '');
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateShippingInfo()) {
      setError('Please fill in all required shipping information');
      return;
    }
    if (activeStep === 1 && !validatePaymentInfo()) {
      setError('Please fill in all required payment information');
      return;
    }
    setError('');
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      dispatch(clearCart());
      navigate('/order-success');
    } catch (error) {
      setError('Failed to process your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ShippingForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={shippingInfo.firstName}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={shippingInfo.lastName}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={shippingInfo.email}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Phone Number"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Address"
          name="address"
          value={shippingInfo.address}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          name="city"
          value={shippingInfo.city}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="State/Province"
          name="state"
          value={shippingInfo.state}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="ZIP / Postal Code"
          name="zipCode"
          value={shippingInfo.zipCode}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Country"
          name="country"
          value={shippingInfo.country}
          onChange={handleShippingInfoChange}
        />
      </Grid>
    </Grid>
  );

  const PaymentForm = () => (
    <Box>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            value="credit_card"
            control={<Radio />}
            label="Credit Card"
          />
          <FormControlLabel
            value="paypal"
            control={<Radio />}
            label="PayPal"
          />
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'credit_card' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Card Number"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentInfoChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Name on Card"
              name="cardName"
              value={paymentInfo.cardName}
              onChange={handlePaymentInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Expiry Date"
              name="expiry"
              placeholder="MM/YY"
              value={paymentInfo.expiry}
              onChange={handlePaymentInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              name="cvv"
              type="password"
              value={paymentInfo.cvv}
              onChange={handlePaymentInfoChange}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );

  const OrderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
          </ListItem>
        ))}
        <Divider sx={{ my: 2 }} />
        <ListItem>
          <ListItemText primary="Subtotal" />
          <Typography>${total.toFixed(2)}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Shipping" />
          <Typography>$0.00</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="h6" color="primary">
            ${total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Information
        </Typography>
        <Typography>
          {shippingInfo.firstName} {shippingInfo.lastName}
          <br />
          {shippingInfo.address}
          <br />
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
          <br />
          {shippingInfo.country}
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
        <Typography>
          {paymentMethod === 'credit_card' ? 'Credit Card' : 'PayPal'}
        </Typography>
      </Box>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ShippingForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <OrderReview />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ py: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmitOrder}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Place Order'
              )}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout;
