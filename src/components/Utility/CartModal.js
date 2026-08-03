// import React from "react";
// import { Modal, Box, Typography, Button } from "@mui/material";

// const CartModal = ({ open, handleClose, cartItems }) => {
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography variant="h6" mb={2}>
//           Cart Items
//         </Typography>
//         {cartItems.length > 0 ? (
//           cartItems.map((item, idx) => (
//             <Box key={idx} sx={{ mb: 2 }}>
//               <Typography fontSize={14} fontWeight={500}>
//                 {item.MaterialDescription}
//               </Typography>
//               <Typography fontSize={12}>
//                 Qty: {item.quantity} {item.Unit}
//               </Typography>
//               <Typography fontSize={12}>Price: Rs {item.SellingPrice}</Typography>
//             </Box>
//           ))
//         ) : (
//           <Typography>No Items Selected</Typography>
//         )}
//         <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleClose}>
//           Close
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default CartModal;

//Cart Modal with Table

// import React from "react";
// import { Modal, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// const CartModal = ({ open, handleClose, cartItems }) => {
//     // Calculate total amount
//     const totalAmount = cartItems.reduce((acc, item) => {
//         return acc + (item.quantity * item.SellingPrice);
//     }, 0);

//     const theme = useTheme();

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box
//                 sx={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     width: "100%",
//                     bgcolor: "background.paper",
//                     borderRadius: 2,
//                     boxShadow: 24,
//                     p: 2,
//                 }}
//             >
//                 <Typography variant="h6" mb={1.5} sx={{fontWeight:"bold"}}>
//                     Cart Items
//                 </Typography>

//                 {cartItems.length > 0 ? (
//                     <>
//                         <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//                             <Table stickyHeader size="small">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell sx={{ backgroundColor: "#1976d2", color: theme.palette.common.white, fontSize: 12 ,fontWeight:"bold"}}>
//                                             Item
//                                         </TableCell>
//                                         <TableCell align="center" sx={{ backgroundColor: "#1976d2", color: theme.palette.common.white, fontSize: 12,fontWeight:"bold" }}>
//                                             Qty
//                                         </TableCell>
//                                         <TableCell align="center" sx={{ backgroundColor: "#1976d2", color: theme.palette.common.white, fontSize: 12,fontWeight:"bold" }}>
//                                             Price
//                                         </TableCell>
//                                         <TableCell align="center" sx={{ backgroundColor: "#1976d2", color: theme.palette.common.white, fontSize: 12,fontWeight:"bold" }}>
//                                         Total
//                                         </TableCell>
//                                     </TableRow>
//                                 </TableHead>

//                                 <TableBody>
//                                     {cartItems.map((item) => (
//                                         <TableRow >
//                                             <TableCell sx={{ fontSize: 12, color: "black" }}>
//                                                 {item.MaterialDescription}
//                                             </TableCell>
//                                             <TableCell align="center" sx={{ fontSize: 12, color: "black" }}>
//                                                 {item.quantity} {item.Unit}
//                                             </TableCell>
//                                             <TableCell align="center" sx={{ fontSize: 12, color: "black" }}>
//                                                 Rs {item.SellingPrice}
//                                             </TableCell>
//                                             <TableCell align="center" sx={{ fontSize: 12, color: "black" }}>
//                                                 Rs {item.quantity * item.SellingPrice}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>

//                         {/* Grand Total */}
//                         <Box sx={{ mt: 1, textAlign: "right", mr: 0.5 }}>
//                             <Typography variant="subtitle1" fontWeight="bold">
//                                 Grand Total: Rs {totalAmount}
//                             </Typography>
//                         </Box>
//                     </>
//                 ) : (
//                     <Typography>No Items Selected</Typography>
//                 )}

//                 <Button
//                     variant="contained"
//                     fullWidth
//                     sx={{ mt: 2 }}
//                     onClick={handleClose}
//                 >
//                     Close
//                 </Button>
//             </Box>
//         </Modal>
//     );
// };

// export default CartModal;

// import React from "react";
// import {
//     Modal,
//     Box,
//     Typography,
//     IconButton,
//     Divider,
//     Button,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";

// const CartModal = ({ open, handleClose, cartItems }) => {
//     const subtotal = cartItems.reduce(
//         (sum, item) => sum + item.quantity * item.SellingPrice,
//         0
//     );

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box
//                 sx={{
//                     position: "fixed",
//                     top: 0,
//                     right: 0,
//                     width: { xs: "100%", sm: "400px" },
//                     height: "100%",
//                     bgcolor: "background.paper",
//                     boxShadow: 24,
//                     display: "flex",
//                     flexDirection: "column",
//                     overflow: "auto",
//                 }}
//             >
//                 {/* Header */}
//                 <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography variant="h6" fontWeight="bold" sx={{ mb: -3 }}>
//                         Cart Items ({cartItems.length})
//                     </Typography>
//                     <IconButton onClick={handleClose} sx={{ mb: -3 }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </Box>

//                 {/* Free Shipping Notice */}
//                 {/* <Typography sx={{ px: 2, py: 1, fontSize: "14px" }}>
//                     You are eligible for free shipping.
//                 </Typography> */}
//                 <Divider sx={{ my: 1 }} />

//                 {/* Cart Items */}
//                 <Box
//                     sx={{
//                         flexGrow: 1,
//                         px: 2,
//                         overflowY: "auto",
//                     }}
//                 >
//                     {cartItems.length > 0 ? (
//                         cartItems.map((item, idx) => (
//                             <Box
//                                 key={idx}
//                                 sx={{
//                                     display: "flex",
//                                     justifyContent: "space-between",
//                                     alignItems: "center",
//                                     flexWrap: "wrap",
//                                     mb: 1,
//                                     gap: 2,
//                                     backgroundColor: "#f0f0f0",
//                                     p: 2,
//                                     borderRadius: 2,
//                                 }}
//                             >
//                                 <Box sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
//                                     <Box>
//                                         <img
//                                             src={require("../../assets/icons/food.png")}
//                                             alt="item"
//                                             style={{ borderRadius: "10px", height: 60 }}
//                                         />
//                                         <Typography fontSize={8} sx={{ ml: 2 }}>
//                                             {item.MaterialCode}
//                                         </Typography>
//                                     </Box>

//                                     <Box sx={{ ml: 1, minWidth: 0 }}>
//                                         <Typography fontWeight="bold" sx={{ wordBreak: "break-word" }}>
//                                             Item: {item.MaterialDescription}
//                                         </Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             QTY: {item.Unit || "Qty"} x {item.quantity}
//                                         </Typography>
//                                         <Typography mt={1}>
//                                             Price: Rs {item.SellingPrice.toLocaleString("en-US")}.00
//                                         </Typography>
//                                     </Box>
//                                 </Box>

//                                 {/* Item total on the right */}
//                                 <Box sx={{ minWidth: "fit-content" }}>
//                                     <Typography fontWeight="bold" textAlign="right">
//                                         Rs {(item.quantity * item.SellingPrice).toLocaleString("en-US", {
//                                             minimumFractionDigits: 2,
//                                             maximumFractionDigits: 2,
//                                         })}
//                                     </Typography>
//                                 </Box>

//                             </Box>
//                         ))
//                     ) : (
//                         <Typography sx={{ textAlign: "center", mt: 4 }}>
//                             No items selected
//                         </Typography>
//                     )}
//                 </Box>

//                 {/* Bottom Section */}
//                 <Box sx={{ borderTop: "1px solid #ccc", p: 2 }}>
//                     {/* <Typography variant="body2" sx={{ mb: 1 }}>
//                         Taxes included and shipping calculated at checkout.
//                     </Typography> */}
//                     <Typography fontWeight="bold" sx={{ mb: 1, textAlign: "right" }}>
//                         Subtotal: Rs {subtotal.toLocaleString("en-US", {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                         })} LKR
//                     </Typography>

//                     {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                         <Button
//                             variant="contained"
//                             fullWidth
//                             sx={{
//                                 bgcolor: "black",
//                                 "&:hover": { bgcolor: "#333" },
//                                 borderRadius: 10,
//                                 textTransform: "none",
//                                 fontSize: "16px",
//                                 py: 1,
//                             }}
//                         >
//                             Checkout
//                         </Button>
//                         <Button
//                             variant="outlined"
//                             fullWidth
//                             sx={{
//                                 borderRadius: 10,
//                                 textTransform: "none",
//                                 fontSize: "16px",
//                                 py: 1,
//                             }}
//                         >
//                             View Cart
//                         </Button>
//                     </Box> */}
//                 </Box>
//             </Box>
//         </Modal>
//     );
// };

// export default CartModal;

//cart modal with cards
import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Chip,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";

const CartModal = ({ open, handleClose, cartItems, handleRemoveItem }) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.SellingPrice,
    0
  );

  const handleProceed = () => {
    Swal.fire({
      text: "Do you want to Place Order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        handleClose();
      }
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: { xs: "100%", sm: "420px" },
          height: "100%",
          bgcolor: "#ffffff",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header section */}
        <Box
          sx={{
            p: 2.5,
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
            color: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShoppingCartIcon sx={{ fontSize: 22 }} />
            <Typography variant="h6" fontWeight="800" sx={{ fontSize: "1.1rem" }}>
              My Cart
            </Typography>
            <Chip
              label={`${cartItems.length} items`}
              size="small"
              sx={{
                height: "22px",
                fontSize: "0.7rem",
                fontWeight: 700,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                ml: 0.5,
              }}
            />
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{
              color: "#ffffff",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Cart Items List */}
        <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <Paper
                key={idx}
                elevation={0}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1.5,
                  p: 1.5,
                  borderRadius: "14px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                {/* Item Thumbnail & Details */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "10px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 0.5,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={require("../../assets/icons/food.png")}
                      alt="item"
                      style={{ height: "32px", objectFit: "contain" }}
                    />
                  </Paper>

                  <Box sx={{ minWidth: 0 }}>
                    <Chip
                      label={item.MaterialCode}
                      size="small"
                      sx={{
                        height: "16px",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        backgroundColor: "#e2e8f0",
                        color: "#475569",
                        mb: 0.2,
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: "#0f172a",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.MaterialDescription}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Qty: {item.quantity} {item.Unit || ""} × Rs. {item.SellingPrice}
                    </Typography>
                  </Box>
                </Box>

                {/* Price Total & Remove Action */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    ml: 1,
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", color: "#2563eb" }}>
                    Rs.{" "}
                    {(item.quantity * item.SellingPrice).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveItem(item.MaterialCode)}
                    sx={{ mt: 0.5, backgroundColor: "#fee2e2", "&:hover": { backgroundColor: "#fca5a5" } }}
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Paper>
            ))
          ) : (
            <Box sx={{ textAlign: "center", mt: 8, color: "#94a3b8" }}>
              <ShoppingCartIcon sx={{ fontSize: 48, opacity: 0.4, mb: 1 }} />
              <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                Your cart is empty
              </Typography>
            </Box>
          )}
        </Box>

        {/* Bottom Panel */}
        <Box
          sx={{
            borderTop: "1px solid #e2e8f0",
            p: 2.5,
            backgroundColor: "#f8fafc",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 600, color: "#64748b", fontSize: "0.9rem" }}>
              Total Amount
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#1e293b" }}>
              Rs.{" "}
              {subtotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            disabled={cartItems.length === 0}
            onClick={handleProceed}
            sx={{
              py: 1.2,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 800,
              fontSize: "0.95rem",
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)",
                boxShadow: "0 6px 18px rgba(37, 99, 235, 0.45)",
              },
            }}
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CartModal;

