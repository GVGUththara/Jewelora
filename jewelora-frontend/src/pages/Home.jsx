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
  Favorite,
  ShoppingCart,
  ChevronRight,
  ArrowDownward,
  Image as ImageIcon,
} from "@mui/icons-material";

import backgroundImage from "../assets/background.jpg";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [loaded] = useState(true);
  const [products, setProducts] = useState([]);
  const [floatingIcons] = useState(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 6 + Math.random() * 4,
      delay: i * 0.5,
      opacity: 0.1 + Math.random() * 0.2,
    }))
  );
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/product/get-all-product`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };

    loadProducts();
  }, []);

  const visibleCount = 4; // number of cards visible
  const [slideIndex, setSlideIndex] = useState(0);

  const maxIndex = Math.max(0, products.length - visibleCount);

  const handleNext = () => {
    setSlideIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 4000);
    return () => clearInterval(timer);
  }, [products]);

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

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          pt: { xs: "90px", md: "120px" },
          backgroundImage: `
      linear-gradient(
        rgba(255,255,255,0.88),
        rgba(255,255,255,0.88)
      ),
      url(${backgroundImage})
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
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
                  fontWeight: "bold",
                  display: "block",
                  mb: 1,
                  fontSize: { xs: "1.2rem", md: "1.8rem" },
                  animation: "fadeInUp 1s ease",
                }}
              >
                WELCOME TO
              </Typography>

              {/* Main Title */}
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  color: "#000",
                  background: "linear-gradient(45deg, #000 30%, #daa425 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                JEWELORA
              </Typography>

              {/* Dynamic Tagline */}
              <Typography
                variant="h5"
                sx={{ color: "#444", fontWeight: "bold" }}
              >
                Affordable Luxury for Everyday Elegance
              </Typography>

              <Typography variant="h6" sx={{ color: "#444" }}>
                Discover handcrafted jewelry that combines traditional
                craftsmanship with modern design.
              </Typography>

              {/* Action Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 4, mt: 5 }}
              >
                <Fade in={loaded} timeout={1800}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/login")}
                    endIcon={<ShoppingCart />}
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
                      "&:focus": {
                        outline: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                      },
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
                      startIcon={<ArrowForward />}
                      onClick={() => {
                        document
                          .getElementById("collections")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      sx={{
                        backgroundColor: "#daa425",
                        color: "#000",
                        fontWeight: 700,
                        borderRadius: "30px",
                        "&:focus": {
                          outline: "none",
                        },
                        "&:focus-visible": {
                          outline: "none",
                        },
                      }}
                    >
                      VIEW COLLECTION
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Favorite />}
                      onClick={() => navigate("/signup")}
                      sx={{
                        color: "#000",
                        borderColor: "rgba(0, 0, 0, 0.5)",
                        px: { xs: 4, md: 4 },
                        py: 1.5,
                        borderRadius: "30px",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 700,
                        borderWidth: "2px",
                        minWidth: { xs: "100%", sm: "auto" },
                        "&:hover": {
                          borderColor: "#000",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          transform: "translateY(-3px)",
                          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
                        },
                        transition: "all 0.3s ease",
                        "&:focus": {
                          outline: "none",
                        },
                        "&:focus-visible": {
                          outline: "none",
                        },
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

      <Container
        id="collections"
        sx={{
          py: { xs: 6, md: 10 },
          width: "100vw",
          position: "relative",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 6,
            fontWeight: 800,
            textAlign: "center",
            color: "#333",
          }}
        >
          Our Signature Collections
        </Typography>

        <Box sx={{ position: "relative", overflow: "hidden" }}>
          {/* LEFT ARROW */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: 15,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "#fff",
              boxShadow: 2,
              "&:hover": { backgroundColor: "#f5f5f5" },
              "&:focus": {
                outline: "none",
              },
              "&:focus-visible": {
                outline: "none",
              },
            }}
          >
            <ChevronRight sx={{ transform: "rotate(180deg)" }} />
          </IconButton>

          {/* SLIDER */}
          <Box
            sx={{
              display: "flex",
              transition: "transform 0.6s ease",
              transform: `translateX(-${slideIndex * (100 / visibleCount)}%)`,
              width: "flex",
              height: "450px",
            }}
          >
            {products.map((product) => {
              const discountedPrice =
                product.productDiscount > 0
                  ? Math.round(
                      product.unitPrice -
                        (product.unitPrice * product.productDiscount) / 100
                    )
                  : product.unitPrice;

              return (
                <Box
                  key={product.productId}
                  sx={{
                    px: 1.5,
                  }}
                >
                  {/* CARD */}
                  <Card
                    sx={{
                      height: 420,
                      width: 300,
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "translateY(-6px)" },
                    }}
                  >
                    {/* IMAGE */}
                    <Box
                      component="img"
                      src={IMAGE_BASE_URL + product.imageUrl}
                      alt={product.productName}
                      sx={{
                        height: 260,
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {/* DISCOUNT BADGE */}
                    {product.productDiscount > 0 && (
                      <Chip
                        label={`${product.productDiscount}% OFF`}
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          zIndex: 2,
                          backgroundColor: "#daa425",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                    )}

                    {/* CONTENT */}
                    <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                      <Typography fontWeight={700}>
                        {product.productName}
                      </Typography>

                      {product.productDiscount > 0 ? (
                        <>
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              color: "#777",
                            }}
                          >
                            LKR {product.unitPrice}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ color: "#daa425", fontWeight: 800 }}
                          >
                            LKR {discountedPrice}
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          variant="h6"
                          sx={{ color: "#daa425", fontWeight: 800 }}
                        >
                          LKR {product.unitPrice}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>

          {/* RIGHT ARROW */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 15,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "#fff",
              boxShadow: 2,
              "&:hover": { backgroundColor: "#f5f5f5" },
              "&:focus": {
                outline: "none",
              },
              "&:focus-visible": {
                outline: "none",
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
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
            What Our Customers Say
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
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
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
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                }}
              >
                CREATE ACCOUNT
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Container>

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
