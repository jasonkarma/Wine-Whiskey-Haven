import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Playfair Display', mb: 2 }}
            >
              Wine & Whiskey Haven
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your premier destination for fine wines and premium whiskeys.
              Discover our curated selection of exceptional spirits from around the world.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                color="inherit"
                component="a"
                href="https://facebook.com"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                color="inherit"
                component="a"
                href="https://twitter.com"
                target="_blank"
              >
                <Twitter />
              </IconButton>
              <IconButton
                color="inherit"
                component="a"
                href="https://instagram.com"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                color="inherit"
                component="a"
                href="https://linkedin.com"
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Link
                component={RouterLink}
                to="/whiskey"
                color="inherit"
                underline="hover"
              >
                Whiskey Collection
              </Link>
              <Link
                component={RouterLink}
                to="/wine"
                color="inherit"
                underline="hover"
              >
                Wine Selection
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                underline="hover"
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="inherit"
                underline="hover"
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body2">(555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="body2">info@wineandwhiskeyhaven.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="body2">
                  123 Wine Street
                  <br />
                  Central District
                  <br />
                  City, State 12345
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to receive updates about new products, special offers, and tasting events.
            </Typography>
            <form onSubmit={handleNewsletterSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                size="small"
                sx={{
                  bgcolor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 1 }}
              >
                Subscribe
              </Button>
            </form>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" sx={{ mb: { xs: 2, md: 0 } }}>
            © {new Date().getFullYear()} Wine & Whiskey Haven. All rights reserved.
          </Typography>
          <Box>
            <Link
              color="inherit"
              underline="hover"
              sx={{ mx: 1 }}
            >
              Privacy Policy
            </Link>
            <Link
              color="inherit"
              underline="hover"
              sx={{ mx: 1 }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
