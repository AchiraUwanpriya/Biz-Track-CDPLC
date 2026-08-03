import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Paper,
  Badge,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import { useDispatch, useSelector } from "react-redux";
import BudgetShopCard from "../../components/Cards/BudgetShopCard";
import { getGetBudgetShopPriceList } from "../../action/BudgetShop";
import { useNavigate } from "react-router-dom";
import CartModal from "../../components/Utility/CartModal";
import CartHistoryModal from "../../components/Utility/CartHistoryModal";

const BudgetShop = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { responseBody } = useSelector((state) => state.budgetItem);

  const [selectedItems, setSelectedItems] = useState({});
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#004AAD");
  }, []);

  const handleSearch = () => {
    dispatch(getGetBudgetShopPriceList(searchTerm.trim()));
  };

  const handleOpenCart = () => {
    setCartModalOpen(true);
  };

  const handleCloseModal = () => {
    setCartModalOpen(false);
  };

  const handleOpenHistory = () => {
    setHistoryModalOpen(true);
  };

  const handleCloseHistory = () => {
    setHistoryModalOpen(false);
  };

  const [cartHistoryItems, setCartHistoryItems] = useState([]);

  const handleRemoveItem = (materialCode) => {
    setSelectedItems((prev) => {
      const newItems = { ...prev };
      if (newItems[materialCode]) {
        newItems[materialCode].selected = false;
        newItems[materialCode].quantity = "";
      }
      return newItems;
    });
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm) return responseBody;
    return responseBody.filter((item) =>
      item.MaterialDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [responseBody, searchTerm]);

  const cartItems = Object.entries(selectedItems)
    .filter(([_, value]) => value.selected)
    .map(([materialCode, value]) => {
      const item = responseBody.find((i) => i.MaterialCode === materialCode);
      return {
        ...item,
        quantity: value.quantity || 1,
      };
    });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: { xs: 1, sm: 2 },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* CDPLC Portal Header Banner */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
          borderRadius: "18px",
          p: { xs: 2, sm: 2.5 },
          color: "#ffffff",
          boxShadow: "0 8px 24px rgba(37, 99, 235, 0.2)",
          mb: 2.5,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Controls: Back, History, Cart */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            mb: 1.5,
          }}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBack sx={{ fontSize: 18 }} />}
            onClick={() => navigate(-1)}
            sx={{
              height: "36px",
              borderRadius: "18px",
              fontWeight: 700,
              fontSize: "13px",
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

          <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
            <Button
              variant="contained"
              startIcon={<HistoryIcon sx={{ fontSize: 18 }} />}
              onClick={handleOpenHistory}
              sx={{
                height: "36px",
                borderRadius: "18px",
                fontWeight: 700,
                fontSize: "13px",
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
              History
            </Button>

            <Button
              variant="contained"
              startIcon={
                <Badge
                  badgeContent={cartItems.length}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: 10,
                      height: 18,
                      minWidth: 18,
                      fontWeight: 800,
                    },
                  }}
                >
                  <ShoppingCartIcon sx={{ fontSize: 18 }} />
                </Badge>
              }
              onClick={handleOpenCart}
              sx={{
                height: "36px",
                borderRadius: "18px",
                fontWeight: 700,
                fontSize: "13px",
                textTransform: "none",
                backgroundColor: "#ffffff",
                color: "#1d4ed8",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                "&:hover": {
                  backgroundColor: "#f8fafc",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                },
              }}
            >
              Cart ({cartItems.length})
            </Button>
          </Box>
        </Box>

        {/* Title Header */}
        <Box sx={{ textAlign: "center", mt: 0.5, mb: 2 }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.4px",
              color: "rgba(255, 255, 255, 0.85)",
              mb: 0.2,
            }}
          >
            CDPLC Portal
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.3rem", sm: "1.6rem" },
              letterSpacing: "0.5px",
              color: "#ffffff",
            }}
          >
            Budget Shop Price List
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box>
          <TextField
            fullWidth
            size="small"
            placeholder="Search items by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#2563eb" }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchTerm("")}
                    sx={{ color: "#64748b" }}
                  >
                    <ClearIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                  borderWidth: "2px",
                },
              },
            }}
          />
        </Box>
      </Paper>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, mb: 6 }}>
        <BudgetShopCard
          searchTerm={searchTerm}
          filteredItems={filteredItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </Box>

      {/* Cart Modal */}
      <CartModal
        open={cartModalOpen}
        handleClose={handleCloseModal}
        cartItems={cartItems}
        handleRemoveItem={handleRemoveItem}
        setCartHistoryItems={setCartHistoryItems}
        handleOpenHistory={handleOpenHistory}
      />

      {/* History Modal */}
      <CartHistoryModal
        open={historyModalOpen}
        handleClose={handleCloseHistory}
        cartItems={cartHistoryItems}
      />
    </Box>
  );
};

export default BudgetShop;

