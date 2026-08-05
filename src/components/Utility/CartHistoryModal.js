import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";

const CartHistoryModal = ({ open, handleClose }) => {
  // Sample test data for cartItems
  const cartItems = [
    { date: "2025-04-01", itemName: "WATANA", quantity: 2, SellingPrice: 160 },
    {
      date: "2025-04-02",
      itemName: "JAM - WOOD APPLE (450G)",
      quantity: 1,
      SellingPrice: 410,
    },
    {
      date: "2025-04-03",
      itemName: "SIGNAL (120G)",
      quantity: 3,
      SellingPrice: 118,
    },
    {
      date: "2025-04-04",
      itemName: "MALIBAN - HAWAIIAN COOKIES - 200G",
      quantity: 2,
      SellingPrice: 125,
    },
    {
      date: "2025-04-05",
      itemName: "LANKA SOY - CUTTLE FISH 90G",
      quantity: 1,
      SellingPrice: 77,
    },
    {
      date: "2025-04-06",
      itemName: "LANKA SOY - CURRY 90G",
      quantity: 3,
      SellingPrice: 65.5,
    },
  ];

  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.SellingPrice;
  }, 0);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "92%", sm: "480px" },
          maxHeight: "85vh",
          bgcolor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Compact Header */}
        <Box
          sx={{
            p: 1.8,
            px: 2,
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
            color: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HistoryIcon sx={{ fontSize: 20 }} />
            <Typography variant="h6" fontWeight="800" sx={{ fontSize: "0.95rem" }}>
              Order History Details
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              color: "#ffffff",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {/* Content Body */}
        <Box sx={{ p: 1.8, flexGrow: 1, overflowY: "auto" }}>
          {cartItems.length > 0 ? (
            <>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  maxHeight: 300,
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          backgroundColor: "#1e40af",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "6px 8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "#1e40af",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "6px 8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          width: "35%",
                        }}
                      >
                        Item
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          backgroundColor: "#1e40af",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "6px 8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Qty
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          backgroundColor: "#1e40af",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "6px 8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          backgroundColor: "#1e40af",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "6px 8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {cartItems.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(even)": { backgroundColor: "#f8fafc" },
                          "&:hover": { backgroundColor: "#f1f5f9" },
                        }}
                      >
                        <TableCell sx={{ fontSize: 12, fontWeight: 600, color: "#64748b", padding: "5px 8px" }}>
                          {item.date}
                        </TableCell>
                        <TableCell sx={{ fontSize: 12, fontWeight: 700, color: "#0f172a", padding: "5px 8px" }}>
                          {item.itemName}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "5px 8px" }}>
                          <Chip
                            label={item.quantity}
                            size="small"
                            sx={{
                              height: "20px",
                              fontSize: "11px",
                              fontWeight: 700,
                              backgroundColor: "#e0e7ff",
                              color: "#3730a3",
                            }}
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 12, fontWeight: 600, color: "#334155", padding: "5px 8px" }}>
                          {item.SellingPrice.toFixed(2)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 12, fontWeight: 800, color: "#2563eb", padding: "5px 8px" }}>
                          {(item.quantity * item.SellingPrice).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Compact Total Summary */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1.5,
                  p: 1,
                  px: 1.5,
                  borderRadius: "10px",
                  backgroundColor: "#f0f7ff",
                  border: "1px solid #bfdbfe",
                }}
              >
                <Typography sx={{ fontWeight: 700, color: "#1e40af", fontSize: "0.8rem" }}>
                  Total Historical Value
                </Typography>
                <Typography sx={{ fontWeight: 800, color: "#1d4ed8", fontSize: "0.95rem" }}>
                  Rs. {totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </>
          ) : (
            <Typography sx={{ textAlign: "center", py: 3, color: "#94a3b8", fontSize: "0.85rem" }}>
              No history records available
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={handleClose}
            sx={{
              mt: 1.8,
              py: 0.7,
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.8rem",
              textTransform: "none",
              backgroundColor: "#475569",
              "&:hover": { backgroundColor: "#334155" },
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CartHistoryModal;


