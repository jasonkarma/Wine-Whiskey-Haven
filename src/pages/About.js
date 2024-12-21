import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  LocationOn,
  EmojiEvents,
  Handshake,
  LocalBar,
  WineBar,
} from '@mui/icons-material';

const About = () => {
  const team = [
    {
      name: 'James Wilson',
      position: 'Master Sommelier',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3iGlG-afVc-iPpDTy3s1SNB2oj9PhhHeelA&s',
      description: 'With over 20 years of experience in wine curation and tasting.',
    },
    {
      name: 'Sarah McPherson',
      position: 'Whiskey Expert',
      image: 'https://thespiritco.com/cdn/shop/files/BLACKENEDWhiskey_RobDietrich_ToastShot.jpg?v=1683295343',
      description: 'Certified whiskey connoisseur with expertise in rare and vintage spirits.',
    },
    {
      name: 'David Chen',
      position: 'Head of Operations',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpWTtE6CAGIf4qGOm668jrflDwisKe8tH45Q&s',
      description: 'Ensures smooth delivery and customer satisfaction across all channels.',
    },
  ];

  const awards = [
    {
      year: '2023',
      title: 'Best Wine Retailer of the Year',
      organization: 'International Wine & Spirit Competition',
    },
    {
      year: '2022',
      title: 'Excellence in Customer Service',
      organization: 'Retail Business Awards',
    },
    {
      year: '2021',
      title: 'Best Online Spirits Retailer',
      organization: 'Spirits Business Awards',
    },
  ];

  const partnerships = [
    {
      name: 'The Macallan Distillery',
      type: 'Exclusive Distributor',
      location: 'Scotland',
    },
    {
      name: 'Château Lafite Rothschild',
      type: 'Premium Wine Partner',
      location: 'France',
    },
    {
      name: 'Suntory Whisky',
      type: 'Official Reseller',
      location: 'Japan',
    },
  ];

  return (
    <Box sx={{ 
      pt: { xs: '80px', sm: '100px' }, // Add top padding to account for fixed navbar
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        {/* Company Story */}
        <Box sx={{ mb: { xs: 6, sm: 8 } }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontFamily: 'Playfair Display',
              textAlign: 'center',
              mb: 4,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Our Story
          </Typography>
          <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper' }}>
            <Typography variant="body1" paragraph>
              Founded in 2010, Wine & Whiskey Haven began as a small boutique store with a passion for 
              curating the finest spirits and wines from around the world. Our journey started with a 
              simple mission: to bring exceptional drinks to discerning customers while providing 
              unparalleled expertise and service.
            </Typography>
            <Typography variant="body1" paragraph>
              Over the years, we've grown from a local favorite to a respected name in the industry, 
              known for our carefully selected collection of rare whiskeys and premium wines. Our team 
              of experts travels the world to source the most exceptional bottles, building direct 
              relationships with distilleries and wineries.
            </Typography>
            <Typography variant="body1">
              Today, we pride ourselves on offering not just products, but experiences. Whether you're 
              a seasoned collector or new to the world of fine spirits and wines, we're here to guide 
              you on your journey of discovery.
            </Typography>
          </Paper>
        </Box>

        {/* Our Team */}
        <Box sx={{ mb: { xs: 6, sm: 8 } }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: 'Playfair Display',
              textAlign: 'center',
              mb: 4,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Meet Our Experts
          </Typography>
          <Grid container spacing={4}>
            {team.map((member) => (
              <Grid item key={member.name} xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={member.image}
                    alt={member.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300'; // replace with a default image
                      e.target.onError = null; // prevent loop
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                    >
                      {member.position}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Awards & Certifications */}
        <Box sx={{ mb: { xs: 6, sm: 8 } }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: 'Playfair Display',
              textAlign: 'center',
              mb: 4,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Awards & Recognition
          </Typography>
          <List>
            {awards.map((award) => (
              <ListItem key={award.title}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <EmojiEvents />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={award.title}
                  secondary={`${award.year} - ${award.organization}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Partnerships */}
        <Box sx={{ mb: { xs: 6, sm: 8 } }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: 'Playfair Display',
              textAlign: 'center',
              mb: 4,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Our Partners
          </Typography>
          <Grid container spacing={4}>
            {partnerships.map((partner) => (
              <Grid item key={partner.name} xs={12} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {partner.type.includes('Wine') ? (
                        <WineBar color="primary" sx={{ mr: 1 }} />
                      ) : (
                        <LocalBar color="primary" sx={{ mr: 1 }} />
                      )}
                      <Typography variant="h6">{partner.name}</Typography>
                    </Box>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {partner.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <LocationOn sx={{ fontSize: 'small', mr: 0.5 }} />
                      {partner.location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Store Locations */}
        <Box>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: 'Playfair Display',
              textAlign: 'center',
              mb: 4,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Visit Our Stores
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Main Store - Downtown
                  </Typography>
                  <Typography variant="body2" paragraph>
                    123 Wine Street, Central District
                    <br />
                    Opening Hours: Mon-Sat 10AM-8PM
                    <br />
                    Phone: (555) 123-4567
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Premium Lounge - Harbor View
                  </Typography>
                  <Typography variant="body2" paragraph>
                    456 Whiskey Boulevard, Harbor District
                    <br />
                    Opening Hours: Mon-Sun 12PM-10PM
                    <br />
                    Phone: (555) 987-6543
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
