import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  GetMedicalIndoorUsageDetails,
  GetMedicalOutdoorUsageDetails,
  GetUserMedicalDetails,
} from "../../action/Medical";
import IndoorAllocations from "./indoorAllocations";
import { ArrowBack, LocalHospital, Hotel } from "@mui/icons-material";

const Leave = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("OutdoorAllocations");
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const navigate = useNavigate();
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const renderComponent = () => {
    switch (selectedTab) {
      case "OutdoorAllocations":
        return <IndoorAllocations allocationName="Outdoor" />;
      case "IndoorAllocations":
        return <IndoorAllocations allocationName="Indoor" />;
      default:
        return null;
    }
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#004AAD");
    }
    dispatch(GetUserMedicalDetails(year));
    dispatch(GetMedicalIndoorUsageDetails(year));
    dispatch(GetMedicalOutdoorUsageDetails(year));
  }, [year, dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "760px",
        margin: "0 auto",
        padding: { xs: 1, sm: 1.8 },
      }}
    >
      {/* Calendar Style Gradient Header Banner */}
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
              CDPLC Portal • {year}
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
              Medical Allocations
            </Typography>
          </Box>

          {/* Bottom: Year Picker */}
          <FormControl size="small" sx={{ alignSelf: "flex-start", minWidth: 365 }}>
            <Select
              value={year}
              onChange={handleChangeYear}
              sx={{
                height: "32px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#ffffff",
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                "& .MuiSelect-icon": { color: "#ffffff" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.28)" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    maxHeight: 220,
                  },
                },
              }}
            >
              {Array.from({ length: 10 }, (_, index) => {
                const currentYear = new Date().getFullYear();
                const y = currentYear - index;
                return (
                  <MenuItem key={y} value={y} sx={{ fontSize: "12px" }}>
                    {y}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Segmented Pill Tabs */}
      <Paper
        elevation={0}
        sx={{
          p: 0.5,
          display: "flex",
          justifyContent: "center",
          gap: 0.5,
          borderRadius: "18px",
          backgroundColor: "#ffffff",
          border: "1px solid #f1f5f9",
          boxShadow: "0 6px 18px rgba(37, 99, 235, 0.05)",
          mb: 2,
        }}
      >
        {[
          {
            key: "OutdoorAllocations",
            label: "OUTDOOR ALLOCATIONS",
            icon: <LocalHospital sx={{ fontSize: 16 }} />,
          },
          {
            key: "IndoorAllocations",
            label: "INDOOR ALLOCATIONS",
            icon: <Hotel sx={{ fontSize: 16 }} />,
          },
        ].map((tab) => {
          const isSelected = selectedTab === tab.key;
          return (
            <Button
              key={tab.key}
              variant={isSelected ? "contained" : "text"}
              startIcon={tab.icon}
              onClick={() => handleTabChange(tab.key)}
              sx={{
                flex: 1,
                py: 0.8,
                px: 1.5,
                fontSize: "12px",
                fontWeight: isSelected ? 700 : 600,
                color: isSelected ? "#ffffff" : "#64748b",
                backgroundColor: isSelected ? "#2563eb" : "transparent",
                boxShadow: isSelected
                  ? "0 3px 10px rgba(37, 99, 235, 0.25)"
                  : "none",
                borderRadius: "14px",
                textTransform: "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: isSelected ? "#1d4ed8" : "#f1f5f9",
                  color: isSelected ? "#ffffff" : "#1e293b",
                },
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Paper>

      {/* Main Content Area */}
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
        {renderComponent()}
      </Paper>
    </Box>
  );
};

export default Leave;
