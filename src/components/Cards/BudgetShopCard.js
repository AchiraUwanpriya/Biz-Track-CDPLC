import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Grid,
  Typography,
  Checkbox,
  TextField,
  Chip,
  Paper,
} from "@mui/material";
import Swal from "sweetalert2";
import { getGetBudgetShopPriceList } from "../../action/BudgetShop";
import Loader from "../Utility/Loader";
import NotFound from "../Utility/NotFound";

export default function BudgetShopCard({ searchTerm, selectedItems, setSelectedItems }) {
  const { responseBody, loading } = useSelector((state) => state.budgetItem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGetBudgetShopPriceList(""));
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return responseBody;
    return responseBody.filter((item) =>
      item.MaterialDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [responseBody, searchTerm]);

  const handleCheckboxChange = (materialCode) => {
    setSelectedItems((prev) => ({
      ...prev,
      [materialCode]: {
        ...prev[materialCode],
        selected: !prev[materialCode]?.selected,
        quantity: prev[materialCode]?.quantity || "",
      },
    }));
  };

  const handleQuantityChange = (materialCode, value, maxQty) => {
    if (Number(value) > Number(maxQty)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Can't Exceed the Balance Quantity!",
      });
      value = maxQty;
    }
    setSelectedItems((prev) => ({
      ...prev,
      [materialCode]: {
        ...prev[materialCode],
        quantity: value,
        selected: true,
      },
    }));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
          px: 0.5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b", fontSize: "1.1rem" }}>
          {searchTerm ? "Search Results" : "Available Items"}
        </Typography>
        {!loading && filteredItems && (
          <Chip
            label={`${filteredItems.length} Products`}
            size="small"
            sx={{
              fontWeight: 700,
              backgroundColor: "#e0e7ff",
              color: "#3730a3",
              fontSize: "0.75rem",
            }}
          />
        )}
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={1.5}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const isSelected = selectedItems[item.MaterialCode]?.selected || false;
                return (
                  <Grid item xs={12} key={item.MaterialCode}>
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: "16px",
                        border: isSelected ? "2px solid #2563eb" : "1px solid #e2e8f0",
                        backgroundColor: isSelected ? "#f0f7ff" : "#ffffff",
                        transition: "all 0.2s ease-in-out",
                        boxShadow: isSelected
                          ? "0 6px 20px rgba(37, 99, 235, 0.12)"
                          : "0 2px 8px rgba(0, 0, 0, 0.04)",
                        "&:hover": {
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                          borderColor: isSelected ? "#2563eb" : "#cbd5e1",
                        },
                        p: { xs: 1.5, sm: 2 },
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1, sm: 1.5 },
                        }}
                      >
                        {/* Checkbox Selection */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleCheckboxChange(item.MaterialCode)}
                            sx={{
                              color: "#94a3b8",
                              "&.Mui-checked": {
                                color: "#2563eb",
                              },
                            }}
                          />
                        </Box>

                        {/* Item Icon Thumbnail */}
                        <Paper
                          elevation={0}
                          sx={{
                            width: { xs: 54, sm: 64 },
                            height: { xs: 54, sm: 64 },
                            borderRadius: "12px",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #f1f5f9",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={require("../../assets/icons/food.png")}
                            alt="Item Icon"
                            style={{ height: "36px", objectFit: "contain" }}
                          />
                        </Paper>

                        {/* Item Details */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                            minWidth: 0,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.3 }}>
                            <Chip
                              label={item.MaterialCode}
                              size="small"
                              sx={{
                                height: "18px",
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                backgroundColor: "#f1f5f9",
                                color: "#475569",
                              }}
                            />
                            <Chip
                              label={`Balance: ${item.BalanceQuantity} ${item.Unit}`}
                              size="small"
                              sx={{
                                height: "18px",
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                backgroundColor: Number(item.BalanceQuantity) > 0 ? "#dcfce7" : "#fee2e2",
                                color: Number(item.BalanceQuantity) > 0 ? "#15803d" : "#b91c1c",
                              }}
                            />
                          </Box>

                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: { xs: "0.85rem", sm: "0.95rem" },
                              color: "#0f172a",
                              lineHeight: 1.3,
                              mb: 0.5,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.MaterialDescription}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: { xs: "0.85rem", sm: "0.95rem" },
                              fontWeight: 800,
                              color: "#2563eb",
                            }}
                          >
                            Rs. {item.SellingPrice}
                          </Typography>
                        </Box>

                        {/* Quantity Input Field */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            flexShrink: 0,
                            ml: 0.5,
                          }}
                        >
                          <TextField
                            size="small"
                            type="number"
                            label="QTY"
                            variant="outlined"
                            value={selectedItems[item.MaterialCode]?.quantity || ""}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.MaterialCode,
                                e.target.value,
                                item.BalanceQuantity
                              )
                            }
                            disabled={!isSelected}
                            sx={{
                              width: { xs: 80, sm: 95 },
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                backgroundColor: isSelected ? "#ffffff" : "#f8fafc",
                              },
                              "& .MuiInputLabel-root": {
                                fontSize: "0.8rem",
                              },
                            }}
                            inputProps={{ min: 1 }}
                          />
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12}>
                <NotFound text="No Products Found!" />
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}

