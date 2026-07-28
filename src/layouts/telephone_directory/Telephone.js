import TelephoneCard from "../../components/Cards/TelephoneCard";
import { GetTelephoneCard } from "../../action/Telephone";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  InputAdornment,
  TextField,
  Paper,
  Button,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Loader from "../../components/Utility/Loader";
import { useNavigate } from "react-router-dom";

const Telephone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responseBody, loading, msg } = useSelector(
    (state) => state.telephoneCard
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(GetTelephoneCard());
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#004AAD");
    }
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    if (!responseBody) return [];
    if (!searchQuery.trim()) return responseBody;

    const lowerCaseQuery = searchQuery.toLowerCase();
    return responseBody.filter((row) => {
      return (
        (row.Name && row.Name.toLowerCase().includes(lowerCaseQuery)) ||
        (row.Telephone && row.Telephone.includes(lowerCaseQuery)) ||
        (row.Extension && row.Extension.includes(lowerCaseQuery)) ||
        (row.FirstName && row.FirstName.toLowerCase().includes(lowerCaseQuery)) ||
        (row.LastName && row.LastName.toLowerCase().includes(lowerCaseQuery)) ||
        (row.Designation && row.Designation.toLowerCase().includes(lowerCaseQuery)) ||
        (row.DDescription && row.DDescription.toLowerCase().includes(lowerCaseQuery)) ||
        (row.VNo && row.VNo.toLowerCase().includes(lowerCaseQuery)) ||
        (row.Initials && row.Initials.toLowerCase().includes(lowerCaseQuery)) ||
        (row.Nic && row.Nic.toLowerCase().includes(lowerCaseQuery)) ||
        (row.DOB && row.DOB.toLowerCase().includes(lowerCaseQuery)) ||
        (row.Gender && row.Gender.toLowerCase().includes(lowerCaseQuery)) ||
        (row.DCode && row.DCode.toLowerCase().includes(lowerCaseQuery)) ||
        (row.DeptCode && row.DeptCode.toLowerCase().includes(lowerCaseQuery)) ||
        (row.DeptDesc && row.DeptDesc.toLowerCase().includes(lowerCaseQuery)) ||
        (row.ContactCity && row.ContactCity.toLowerCase().includes(lowerCaseQuery)) ||
        (row.Phone && row.Phone.toLowerCase().includes(lowerCaseQuery)) ||
        (row.WorkCategory && row.WorkCategory.toLowerCase().includes(lowerCaseQuery)) ||
        (row.Abbreviation && row.Abbreviation.toLowerCase().includes(lowerCaseQuery)) ||
        (row.LDesc && row.LDesc.toLowerCase().includes(lowerCaseQuery)) ||
        (row.OfzMobile && row.OfzMobile.toLowerCase().includes(lowerCaseQuery))
      );
    });
  }, [responseBody, searchQuery]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "760px",
        margin: "0 auto",
        padding: { xs: 1, sm: 1.8 },
      }}
    >
      {/* CDPLC Portal Gradient Header Banner */}
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
          {/* Back Button */}
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

          {/* Title Header */}
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
              Telephone Directory
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
        {/* Search Input Section */}
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search by name, ext, phone, designation..."
            value={searchQuery}
            variant="outlined"
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#f8fafc",
                fontSize: "13px",
                "& fieldset": {
                  borderColor: "#e2e8f0",
                },
                "&:hover fieldset": {
                  borderColor: "#cbd5e1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#64748b", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery("")}
                    edge="end"
                    sx={{ color: "#94a3b8" }}
                  >
                    <ClearIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />

          {/* Results Summary Counter Bar */}
          {!loading && responseBody && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 1.2,
                px: 0.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <ContactPhoneIcon sx={{ fontSize: 16, color: "#2563eb" }} />
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#334155",
                  }}
                >
                  Directory Contacts
                </Typography>
              </Box>
              <Chip
                label={`${filteredItems.length} ${
                  filteredItems.length === 1 ? "Result" : "Results"
                }`}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "11px",
                  fontWeight: 700,
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Directory Card Content / Loader */}
        {loading ? (
          <Loader />
        ) : (
          <TelephoneCard data={filteredItems} msg={msg} />
        )}
      </Paper>
    </Box>
  );
};

export default Telephone;

