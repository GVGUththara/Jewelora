import { Box, Button, Typography, Stack, Container, Fade, Zoom, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Diamond, ArrowForward, AutoAwesome, LocalShipping, Shield } from "@mui/icons-material";
import bg from "./../assets/background.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [loaded] = useState(true);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
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
          background: "radial-gradient(circle at 20% 50%, rgba(218, 164, 37, 0.1) 0%, transparent 50%)",
          zIndex: 1,
        }
      }}
    >
      {/* Animated floating elements */}
      <Fade in={loaded} timeout={1000}>
        <Box sx={{ position: "absolute", top: "20%", left: "10%", zIndex: 1 }}>
          <AutoAwesome sx={{ fontSize: 40, color: "rgba(218, 164, 37, 0.3)", animation: "float 6s ease-in-out infinite" }} />
        </Box>
      </Fade>
      
      <Fade in={loaded} timeout={1500}>
        <Box sx={{ position: "absolute", bottom: "30%", right: "15%", zIndex: 1 }}>
          <Diamond sx={{ fontSize: 36, color: "rgba(218, 164, 37, 0.3)", animation: "float 8s ease-in-out infinite" }} />
        </Box>
      </Fade>

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          mt: "50px",
          textAlign: "center",
        }}
      >
        <Zoom in={loaded} timeout={800}>
          <Box>
            {/* Logo/Icon */}
            <Box
              sx={{
                width: 80,
                height: 80,
                backgroundColor: "rgba(218, 164, 37, 0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                border: "2px solid rgba(218, 164, 37, 0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Diamond sx={{ fontSize: 40, color: "#daa425"}} />
            </Box>

            {/* Welcome Text */}
            <Typography
              variant="overline"
              sx={{
                letterSpacing: 6,
                color: "#daa425",
                opacity: 0.9,
                fontWeight: 500,
                display: "block",
                mb: 1,
                fontSize: "0.9rem",
              }}
            >
              WELCOME TO
            </Typography>

            {/* Main Title */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: "#fff",
                letterSpacing: 2,
                mb: 3,
                fontSize: { xs: "3rem", md: "4rem" },
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                background: "linear-gradient(45deg, #fff 30%, #daa425 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              JEWELORA
            </Typography>

            {/* Tagline */}
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.85)",
                mb: 5,
                maxWidth: "600px",
                margin: "0 auto",
                fontWeight: 300,
                lineHeight: 1.6,
                fontSize: "1.2rem",
              }}
            >
              Where timeless elegance meets modern craftsmanship. Each piece tells a story of passion and precision.
            </Typography>

            {/* Features */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
              sx={{ mb: 6 }}
            >
              {[
                { icon: <Shield />, text: "Certified Quality" },
                { icon: <LocalShipping />, text: "Free Shipping" },
                { icon: <AutoAwesome />, text: "Lifetime Polish" },
              ].map((feature, index) => (
                <Fade in={loaded} timeout={1000 + index * 200} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "rgba(255,255,255,0.7)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(218, 164, 37, 0.1)",
                    }}
                  >
                    {feature.icon}
                    <Typography variant="body2">{feature.text}</Typography>
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
            >
              <Fade in={loaded} timeout={1800}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/login")}
                  endIcon={<ArrowForward />}
                  sx={{
                    color: "#daa425",
                    borderColor: "rgba(218, 164, 37, 0.5)",
                    px: 5,
                    py: 1.5,
                    borderRadius: "30px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderWidth: "2px",
                    "&:hover": {
                      borderColor: "#daa425",
                      backgroundColor: "rgba(218, 164, 37, 0.1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 20px rgba(218, 164, 37, 0.2)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  EXPLORE COLLECTION
                </Button>
              </Fade>

              <Fade in={loaded} timeout={2000}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/login")}
                    sx={{
                      backgroundColor: "#daa425",
                      color: "#000",
                      px: 4,
                      py: 1.5,
                      borderRadius: "30px",
                      fontSize: "1rem",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#c4931f",
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 20px rgba(218, 164, 37, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    SIGN IN
                  </Button>
                  
                  <Button
                    variant="text"
                    size="large"
                    onClick={() => navigate("/signup")}
                    sx={{
                      color: "#fff",
                      px: 4,
                      py: 1.5,
                      borderRadius: "30px",
                      fontSize: "1rem",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    CREATE ACCOUNT
                  </Button>
                </Stack>
              </Fade>
            </Stack>

            {/* Scroll indicator */}
            <Fade in={loaded} timeout={2500}>
              <Box
                sx={{
                  mt: 8,
                  color: "rgba(255,255,255,0.5)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="caption" sx={{ letterSpacing: 2 }}>
                  SCROLL TO DISCOVER
                </Typography>
                <Box
                  sx={{
                    width: "1px",
                    height: "40px",
                    backgroundColor: "rgba(218, 164, 37, 0.5)",
                    animation: "bounce 2s infinite",
                  }}
                />
              </Box>
            </Fade>
          </Box>
        </Zoom>
      </Container>

      {/* Global animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
}