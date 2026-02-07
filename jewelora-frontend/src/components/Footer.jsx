import { Box, Typography, Link, Stack, IconButton } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2d2a30",
        color: "#fff",
        p: "50px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100vw",
      }}
    >
      {/* Left */}
      <Box sx={{ flex: 1, minWidth: 250, mb: { xs: 3, md: 0 } }}>
        <Typography variant="h6" fontWeight={600}>
          Jewelora | Elegance in Every Detail
        </Typography>

        <Typography
          sx={{ mt: 2, fontSize: 14, color: "#bbb" }}
        >
          © 2025 <strong>Jewelora</strong> | All rights reserved
        </Typography>
      </Box>

      {/* Center */}
      <Box
        sx={{
          flex: 1,
          minWidth: 250,
          mb: { xs: 3, md: 0 },
        }}
      >
        <Stack spacing={1.5}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                background: "#333",
                borderRadius: "50%",
                p: "10px",
                minWidth: 36,
                textAlign: "center",
              }}
            >
              <i className="fa-solid fa-location-dot"></i>
            </Box>
            <Typography>21, Main Street, Colombo, Sri Lanka</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                background: "#333",
                borderRadius: "50%",
                p: "10px",
                minWidth: 36,
                textAlign: "center",
              }}
            >
              <i className="fa-solid fa-phone"></i>
            </Box>
            <Typography>+94 77 123 4567</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                background: "#333",
                borderRadius: "50%",
                p: "10px",
                minWidth: 36,
                textAlign: "center",
              }}
            >
              <i className="fa-solid fa-envelope"></i>
            </Box>
            <Link
              href="mailto:info@jewelora.com"
              underline="none"
              sx={{ color: "#fff" }}
            >
              info@jewelora.com
            </Link>
          </Stack>
        </Stack>
      </Box>

      {/* Right */}
      <Box
        sx={{
          flex: 1,
          minWidth: 250,
          textAlign: { xs: "center", md: "right" },
        }}
      >
        <Stack direction="row" spacing={1} justifyContent={{ xs: "center", md: "flex-end" }}>
          {[
            "fa-facebook",
            "fa-instagram",
            "fa-linkedin",
            "fa-x-twitter",
          ].map((icon) => (
            <IconButton
              key={icon}
              sx={{
                backgroundColor: "#333",
                color: "#fff",
                borderRadius: "4px",
                px: "12px",
                "&:hover": {
                  backgroundColor: "#daa425",
                  color: "#000",
                },
              }}
            >
              <i className={`fa-brands ${icon}`}></i>
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
