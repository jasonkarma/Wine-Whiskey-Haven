import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ExpandMore,
  Phone,
  Email,
  LocationOn,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const contactFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    subject: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
    message: Yup.string()
      .min(10, 'Too Short!')
      .max(1000, 'Too Long!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: contactFormSchema,
    onSubmit: (values, { resetForm }) => {
      // Handle form submission here
      console.log(values);
      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success',
      });
      resetForm();
    },
  });

  const faqs = [
    {
      question: 'What are your delivery hours?',
      answer: 'We deliver from 10 AM to 10 PM daily. For UberEats and Foodpanda deliveries, please check their respective apps for real-time availability.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries. International shipping times vary by region, typically taking 3-10 business days. Please note that additional customs duties may apply.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase, provided the product is unopened and in its original packaging. Please contact our customer service for return authorization.',
    },
    {
      question: 'Do you offer gift wrapping?',
      answer: 'Yes, we offer premium gift wrapping services for all our products. You can select this option during checkout.',
    },
    {
      question: 'How do I track my order?',
      answer: "Once your order is shipped, you will receive a tracking number via email. You can use this to track your package on our website or the carrier's website.",
    },
  ];

  const socialMedia = [
    { icon: <Facebook />, name: 'Facebook', link: 'https://facebook.com/wineandswhiskeyhaven' },
    { icon: <Instagram />, name: 'Instagram', link: 'https://instagram.com/wineandswhiskeyhaven' },
    { icon: <Twitter />, name: 'Twitter', link: 'https://twitter.com/wineandswhiskeyhaven' },
    { icon: <LinkedIn />, name: 'LinkedIn', link: 'https://www.linkedin.com/company/wine-and-whiskey-haven/' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={6}>
        {/* Contact Form Section */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontFamily: 'Playfair Display' }}
          >
            Get in Touch
          </Typography>
          <Paper elevation={3} sx={{ p: 4 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Your Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="subject"
                    label="Subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="message"
                    label="Message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontFamily: 'Playfair Display' }}
          >
            Contact Information
          </Typography>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Main Store"
                    secondary="123 Wine Street, Central District"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary="(555) 123-4567"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary="info@wineandwhiskeyhaven.com"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ mb: 4 }}>
            {socialMedia.map((social) => (
              <Button
                key={social.name}
                startIcon={social.icon}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mr: 2, mb: 2 }}
              >
                {social.name}
              </Button>
            ))}
          </Box>

          {/* Business Hours */}
          <Typography variant="h6" gutterBottom>
            Business Hours
          </Typography>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Monday - Saturday"
                    secondary="10:00 AM - 8:00 PM"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Sunday"
                    secondary="12:00 PM - 6:00 PM"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* FAQ Section */}
        <Grid item xs={12}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontFamily: 'Playfair Display', mt: 4 }}
          >
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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

export default Contact;
