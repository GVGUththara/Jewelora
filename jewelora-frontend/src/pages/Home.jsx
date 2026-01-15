import {
  Box,
  Button,
  Typography,
  Stack,
  Container,
  Fade,
  Zoom,
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  Rating,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Diamond,
  ArrowForward,
  AutoAwesome,
  LocalShipping,
  Shield,
  Favorite,
  ShoppingCart,
  Instagram,
  Facebook,
  Twitter,
  Star,
  ChevronRight,
  ArrowDownward,
  Image as ImageIcon,
} from "@mui/icons-material";

export default function Home() {
  const navigate = useNavigate();
  const [loaded] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [floatingIcons] = useState(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 6 + Math.random() * 4,
      delay: i * 0.5,
      opacity: 0.1 + Math.random() * 0.2,
    }))
  );

  const IMAGE_API = import.meta.env.VITE_IMAGE_API;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      name: "Necklaces",
      icon: "💎",
      description: "Elegant pieces for every occasion",
      count: "45+ Items",
      image: `${IMAGE_API}necklace_2.jpeg`,
    },
    {
      name: "Rings",
      icon: "💍",
      description: "Symbols of love and commitment",
      count: "60+ Items",
      image: `${IMAGE_API}ring-3.jpeg`,
    },
    {
      name: "Bracelets",
      icon: "📿",
      description: "Wristwear that tells a story",
      count: "35+ Items",
      image: `${IMAGE_API}bracelet-2.jpeg`,
    },
    {
      name: "Earrings",
      icon: "✨",
      description: "Sparkling accents for your style",
      count: "50+ Items",
      image: `${IMAGE_API}earrings-5.jpeg`,
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Regular Customer",
      text: "The quality exceeded my expectations! Perfect for everyday wear.",
      rating: 5,
      avatarColor: "#daa425",
    },
    {
      name: "Rajesh K.",
      role: "First-time Buyer",
      text: "Great customer service and fast delivery. Will shop again!",
      rating: 5,
      avatarColor: "#9c27b0",
    },
    {
      name: "Lisa T.",
      role: "Jewelry Collector",
      text: "Affordable yet beautiful pieces. Love the craftsmanship!",
      rating: 4,
      avatarColor: "#2196f3",
    },
  ];

  const features = [
    {
      icon: <Shield fontSize="large" />,
      title: "Certified Quality",
      desc: "All pieces certified for purity",
    },
    {
      icon: <LocalShipping fontSize="large" />,
      title: "Free Shipping",
      desc: "Free delivery on orders above ₹999",
    },
    {
      icon: <AutoAwesome fontSize="large" />,
      title: "Lifetime Polish",
      desc: "Free polishing service forever",
    },
    {
      icon: <Favorite fontSize="large" />,
      title: "30-Day Returns",
      desc: "Easy returns within 30 days",
    },
  ];

  const bestsellers = [
    {
      id: 1,
      name: "Golden Pearl Necklace",
      price: "₹2,499",
      original: "₹3,999",
      discount: "38% OFF",
      tag: "BESTSELLER",
      image: `${IMAGE_API}bestseller-1.jpg`,
    },
    {
      id: 2,
      name: "Silver Infinity Ring",
      price: "₹1,299",
      original: "₹1,999",
      discount: "35% OFF",
      tag: "TRENDING",
      image: `${IMAGE_API}bestseller-2.jpg`,
    },
    {
      id: 3,
      name: "Diamond Stud Earrings",
      price: "₹1,799",
      original: "₹2,499",
      discount: "28% OFF",
      tag: "POPULAR",
      image: `${IMAGE_API}bestseller-3.jpg`,
    },
  ];

  const heroBackground = `${IMAGE_API}hero-bg.jpg`;

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: heroBackground
            ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.85)), url(${heroBackground})`
            : "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(218, 164, 37, 0.15) 0%, transparent 50%)",
            zIndex: 1,
          },
        }}
      >
        {floatingIcons.map((item, i) => (
          <Fade in={loaded} timeout={500 + i * 200} key={i}>
            <Box
              sx={{
                position: "absolute",
                top: item.top,
                left: item.left,
                zIndex: 1,
                animation: `float ${item.duration}s ease-in-out infinite ${item.delay}s`,
              }}
            >
              <AutoAwesome
                sx={{
                  fontSize: { xs: 24, md: 36 },
                  color: `rgba(218, 164, 37, ${item.opacity})`,
                }}
              />
            </Box>
          </Fade>
        ))}

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            px: { xs: 2, md: 3 },
          }}
        >
          <Zoom in={loaded} timeout={800}>
            <Box>
              {/* Animated Logo */}
              <Box
                sx={{
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  backgroundColor: "rgba(218, 164, 37, 0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  border: "2px solid rgba(218, 164, 37, 0.3)",
                  backdropFilter: "blur(10px)",
                  animation: "pulse 2s infinite",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    borderColor: "#daa425",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => navigate("/")}
              >
                <Diamond
                  sx={{ fontSize: { xs: 30, md: 40 }, color: "#daa425" }}
                />
              </Box>

              {/* Welcome Text with Animation */}
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: { xs: 4, md: 6 },
                  color: "#daa425",
                  opacity: 0.9,
                  fontWeight: 600,
                  display: "block",
                  mb: 1,
                  fontSize: { xs: "0.7rem", md: "0.9rem" },
                  animation: "fadeInUp 1s ease",
                }}
              >
                ✨ WELCOME TO ✨
              </Typography>

              {/* Main Title */}
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: { xs: 1, md: 2 },
                  mb: 2,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                  background: "linear-gradient(45deg, #fff 30%, #daa425 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100px",
                    height: "3px",
                    background:
                      "linear-gradient(90deg, transparent, #daa425, transparent)",
                  },
                }}
              >
                JEWELORA
              </Typography>

              {/* Dynamic Tagline */}
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  mb: 1,
                  fontWeight: 400,
                  fontSize: { xs: "1.1rem", md: "1.5rem" },
                }}
              >
                Affordable Luxury for Everyday Elegance
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  mb: 5,
                  maxWidth: "700px",
                  margin: "0 auto",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                }}
              >
                Discover handcrafted jewelry that combines traditional
                craftsmanship with modern design. Perfect for daily wear and
                special occasions.
              </Typography>

              {/* Category Showcase */}
              <Fade in={loaded} timeout={1200}>
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#daa425", mb: 3, fontWeight: 600 }}
                  >
                    Featured Categories
                  </Typography>
                  <Grid container spacing={3} justifyContent="center">
                    {categories.map((category, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Card
                          sx={{
                            background:
                              index === currentCategory
                                ? "linear-gradient(135deg, rgba(218,164,37,0.2), rgba(218,164,37,0.05))"
                                : "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${
                              index === currentCategory
                                ? "#daa425"
                                : "rgba(255,255,255,0.1)"
                            }`,
                            borderRadius: "20px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            height: "100%",
                            minHeight: 180,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              borderColor: "#daa425",
                              boxShadow: "0 10px 30px rgba(218, 164, 37, 0.2)",
                            },
                          }}
                          onClick={() => {
                            setCurrentCategory(index);
                            navigate(
                              "/products?category=" +
                                category.name.toLowerCase()
                            );
                          }}
                        >
                          <CardContent sx={{ textAlign: "center", p: 3 }}>
                            <Typography variant="h2" sx={{ mb: 1 }}>
                              {category.icon}
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{ color: "#fff", mb: 0.5 }}
                            >
                              {category.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "rgba(255,255,255,0.7)",
                                display: "block",
                              }}
                            >
                              {category.description}
                            </Typography>
                            <Chip
                              label={category.count}
                              size="small"
                              sx={{
                                mt: 2,
                                backgroundColor: "rgba(218,164,37,0.2)",
                                color: "#daa425",
                                fontWeight: 600,
                              }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>

              {/* Enhanced Features */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                justifyContent="center"
                sx={{ mb: 6 }}
              >
                {features.map((feature, index) => (
                  <Fade in={loaded} timeout={1000 + index * 200} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        color: "rgba(255,255,255,0.9)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        padding: { xs: "16px", md: "24px" },
                        borderRadius: "20px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(218, 164, 37, 0.1)",
                        minWidth: { xs: "100%", sm: "200px" },
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          borderColor: "#daa425",
                          backgroundColor: "rgba(218, 164, 37, 0.05)",
                        },
                      }}
                    >
                      <Box sx={{ color: "#daa425" }}>{feature.icon}</Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          textAlign: "center",
                        }}
                      >
                        {feature.desc}
                      </Typography>
                    </Box>
                  </Fade>
                ))}
              </Stack>

              {/* Action Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Fade in={loaded} timeout={1800}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/products")}
                    endIcon={<ArrowForward />}
                    sx={{
                      color: "#daa425",
                      borderColor: "rgba(218, 164, 37, 0.5)",
                      px: { xs: 4, md: 5 },
                      py: 1.5,
                      borderRadius: "30px",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      fontWeight: 700,
                      borderWidth: "2px",
                      minWidth: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        borderColor: "#daa425",
                        backgroundColor: "rgba(218, 164, 37, 0.1)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 15px 30px rgba(218, 164, 37, 0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    SHOP NOW
                  </Button>
                </Fade>

                <Fade in={loaded} timeout={2000}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate("/login")}
                      startIcon={<ShoppingCart />}
                      sx={{
                        backgroundColor: "#daa425",
                        color: "#000",
                        px: { xs: 4, md: 4 },
                        py: 1.5,
                        borderRadius: "30px",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 700,
                        minWidth: { xs: "100%", sm: "auto" },
                        "&:hover": {
                          backgroundColor: "#c4931f",
                          transform: "translateY(-3px)",
                          boxShadow: "0 15px 30px rgba(218, 164, 37, 0.5)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      QUICK BUY
                    </Button>

                    <Button
                      variant="text"
                      size="large"
                      onClick={() => navigate("/signup")}
                      startIcon={<Favorite />}
                      sx={{
                        color: "#fff",
                        px: { xs: 4, md: 4 },
                        py: 1.5,
                        borderRadius: "30px",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 600,
                        minWidth: { xs: "100%", sm: "auto" },
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.15)",
                          transform: "translateY(-3px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      CREATE ACCOUNT
                    </Button>
                  </Stack>
                </Fade>
              </Stack>

              {/* Social Proof */}
              <Fade in={loaded} timeout={2200}>
                <Box sx={{ mt: 4, color: "rgba(255,255,255,0.7)" }}>
                  <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="center"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Box sx={{ textAlign: "center", px: 2, py: 1 }}>
                      <Typography
                        variant="h4"
                        sx={{ color: "#daa425", fontWeight: 700 }}
                      >
                        500+
                      </Typography>
                      <Typography variant="caption">Happy Customers</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", px: 2, py: 1 }}>
                      <Typography
                        variant="h4"
                        sx={{ color: "#daa425", fontWeight: 700 }}
                      >
                        4.8
                      </Typography>
                      <Typography variant="caption">
                        <Rating
                          value={4.8}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", px: 2, py: 1 }}>
                      <Typography
                        variant="h4"
                        sx={{ color: "#daa425", fontWeight: 700 }}
                      >
                        24h
                      </Typography>
                      <Typography variant="caption">Delivery</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Fade>

              {/* Scroll Indicator */}
              <Fade in={loaded} timeout={2500}>
                <Box
                  sx={{
                    mt: 6,
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": {
                      color: "#daa425",
                    },
                  }}
                  onClick={() => {
                    const nextSection =
                      document.getElementById("featured-products");
                    if (nextSection) {
                      nextSection.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.scrollTo({
                        top: window.innerHeight,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  <Typography variant="caption" sx={{ letterSpacing: 2 }}>
                    DISCOVER MORE
                  </Typography>
                  <ArrowDownward
                    sx={{
                      animation: "bounce 2s infinite",
                      fontSize: 20,
                    }}
                  />
                </Box>
              </Fade>
            </Box>
          </Zoom>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container
        id="featured-products"
        maxWidth="lg"
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 3 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 6,
            fontWeight: 800,
            color: "#333",
            textAlign: "center",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, #daa425, transparent)",
            },
          }}
        >
          🏆 Customer Favorites
        </Typography>

        <Grid container spacing={4}>
          {bestsellers.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Fade in={loaded} timeout={1000}>
                <Card
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "2px solid #f5f5f5",
                    transition: "all 0.3s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      borderColor: "#daa425",
                      boxShadow: "0 20px 40px rgba(218, 164, 37, 0.15)",
                      "& .product-image": {
                        transform: "scale(1.05)",
                      },
                    },
                  }}
                >
                  {/* Product Image */}
                  <Box
                    sx={{
                      height: 220,
                      backgroundColor: "rgba(218, 164, 37, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    className="product-image"
                  >
                    {product.image ? (
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `
                            <div style="display: flex; flex-direction: column; align-items: center; color: #daa425;">
                              <ImageIcon sx={{ fontSize: 60, opacity: 0.3 }} />
                              <Typography variant="caption" sx={{ mt: 1, color: '#daa425' }}>
                                ${product.name}
                              </Typography>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          color: "#daa425",
                        }}
                      >
                        <ImageIcon sx={{ fontSize: 60, opacity: 0.3 }} />
                        <Typography
                          variant="caption"
                          sx={{ mt: 1, color: "#daa425" }}
                        >
                          {product.name}
                        </Typography>
                      </Box>
                    )}
                    <Chip
                      label={product.tag}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        backgroundColor: "#daa425",
                        color: "#000",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: "#333" }}
                    >
                      {product.name}
                    </Typography>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: 2 }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ color: "#daa425", fontWeight: 800 }}
                      >
                        {product.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#999", textDecoration: "line-through" }}
                      >
                        {product.original}
                      </Typography>
                      <Chip
                        label={product.discount}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(218, 164, 37, 0.1)",
                          color: "#daa425",
                          fontWeight: 600,
                          fontSize: "0.7rem",
                        }}
                      />
                    </Stack>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => navigate(`/product/${product.id}`)}
                      sx={{
                        backgroundColor: "#daa425",
                        color: "#000",
                        fontWeight: 700,
                        borderRadius: "30px",
                        py: 1,
                        "&:hover": {
                          backgroundColor: "#c4931f",
                        },
                      }}
                    >
                      ADD TO CART
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: "#f9f9f9", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h3"
            sx={{
              mb: 6,
              fontWeight: 800,
              color: "#333",
              textAlign: "center",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "3px",
                background:
                  "linear-gradient(90deg, transparent, #daa425, transparent)",
              },
            }}
          >
            ❤️ What Our Customers Say
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={loaded} timeout={1200 + index * 200}>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: "20px",
                      backgroundColor: "#fff",
                      border: "1px solid #eee",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Stack direction="column" spacing={2}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            backgroundColor: testimonial.avatarColor,
                            width: 56,
                            height: 56,
                            fontWeight: 700,
                            fontSize: "1.2rem",
                          }}
                        >
                          {testimonial.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700 }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Stack>

                      <Rating
                        value={testimonial.rating}
                        readOnly
                        size="small"
                        sx={{ color: "#daa425" }}
                      />

                      <Typography
                        variant="body1"
                        sx={{
                          color: "#555",
                          fontStyle: "italic",
                          lineHeight: 1.6,
                        }}
                      >
                        "{testimonial.text}"
                      </Typography>
                    </Stack>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final Call to Action */}
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 3 } }}
      >
        <Fade in={loaded} timeout={2000}>
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: "30px",
              background: "linear-gradient(135deg, #daa425 0%, #c4931f 100%)",
              textAlign: "center",
              color: "#000",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "url('" + IMAGE_API + "pattern.png" + "')",
                opacity: 0.1,
                backgroundSize: "cover",
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{ mb: 2, fontWeight: 900, position: "relative", zIndex: 1 }}
            >
              Ready to Find Your Perfect Piece?
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, opacity: 0.9, position: "relative", zIndex: 1 }}
            >
              Join thousands of satisfied customers who found their perfect
              jewelry at Jewelora
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/products")}
                endIcon={<ChevronRight />}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  px: 6,
                  py: 1.5,
                  borderRadius: "30px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#333",
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
                  },
                  transition: "all 0.3s ease",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                START SHOPPING
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/signup")}
                sx={{
                  borderColor: "#000",
                  color: "#000",
                  px: 6,
                  py: 1.5,
                  borderRadius: "30px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  borderWidth: "2px",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderColor: "#000",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                CREATE ACCOUNT
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#1a1a1a",
          color: "rgba(255,255,255,0.7)",
          py: 4,
          textAlign: "center",
          borderTop: "1px solid rgba(218, 164, 37, 0.2)",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <IconButton
              sx={{
                color: "#daa425",
                "&:hover": {
                  backgroundColor: "rgba(218, 164, 37, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              sx={{
                color: "#daa425",
                "&:hover": {
                  backgroundColor: "rgba(218, 164, 37, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              sx={{
                color: "#daa425",
                "&:hover": {
                  backgroundColor: "rgba(218, 164, 37, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Twitter />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.5)", mb: 1 }}
          >
            © {new Date().getFullYear()} Jewelora. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
            Crafted with ❤️ for jewelry lovers everywhere
          </Typography>
        </Container>
      </Box>

      {/* Global animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.7; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}
