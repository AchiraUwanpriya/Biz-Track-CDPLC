import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ToolsCard from "../../components/Cards/ToolsCard";
import { useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";

const Outstanding_Tools = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#004AAD");
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "760px",
        margin: "0 auto",
        padding: { xs: 1, sm: 1.8 },
      }}
    >
      {/* Calendar / Medical / Leave Style Gradient Header Banner */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
          borderRadius: "18px",
          p: { xs: 1.8, sm: 2.2 },
          color: "#ffffff",
          boxShadow: "0 8px 24px rgba(37, 99, 235, 0.18)",
          mb: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 1.2,
          }}
        >
          {/* Top: Back Button */}
          <Button
            variant="contained"
            startIcon={<ArrowBack sx={{ fontSize: 16 }} />}
            onClick={() => navigate(-1)}
            sx={{
              alignSelf: "flex-start",
              height: "32px",
              borderRadius: "16px",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "none",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.35)",
                boxShadow: "none",
              },
            }}
          >
            Back
          </Button>

          {/* Middle: Title */}
          <Box sx={{ alignSelf: "center", textAlign: "center", width: "100%" }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                color: "rgba(255, 255, 255, 0.8)",
                mb: 0.2,
                textAlign: "center",
              }}
            >
              CDPLC Portal
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.2rem", sm: "1.4rem" },
                letterSpacing: "0.4px",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              Outstanding Tools
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Main Content Container */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.8, sm: 2.2 },
          borderRadius: "18px",
          border: "1px solid #f1f5f9",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 24px rgba(37, 99, 235, 0.04)",
        }}
      >
        <ToolsCard />
      </Paper>
    </Box>
  );
};

export default Outstanding_Tools;