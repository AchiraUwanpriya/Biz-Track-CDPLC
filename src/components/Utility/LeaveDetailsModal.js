import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; 

const LeaveDetailsModal = ({ open, onClose, rowData, modalTitle }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "18px",
          boxShadow: "0 12px 32px rgba(37, 99, 235, 0.12)",
          border: "1px solid #f1f5f9",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 800,
          fontSize: "0.95rem",
          color: "#0f172a",
          borderBottom: "1px solid #f1f5f9",
          py: 1.5,
          px: 2,
        }}
      >
        {modalTitle}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: "absolute", right: 14, top: 8, color: "#64748b" }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ maxHeight: 380, overflowY: "auto", p: 1.8 }}>
        {rowData && rowData.length > 0 ? (
          <Table
            size="small"
            sx={{
              width: "100%",
              tableLayout: "fixed",
              borderCollapse: "separate",
              borderSpacing: 0,
              borderRadius: "12px",
              border: "1px solid #f1f5f9",
              overflow: "hidden",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: "25%",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                    fontWeight: 800,
                    color: "#ffffff",
                    fontSize: "9.5px",
                    py: 0.8,
                    px: 0.8,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    borderTopLeftRadius: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    width: "32%",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                    fontWeight: 800,
                    color: "#ffffff",
                    fontSize: "9.5px",
                    py: 0.8,
                    px: 0.8,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Reason
                </TableCell>
                <TableCell
                  sx={{
                    width: "13%",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                    fontWeight: 800,
                    color: "#ffffff",
                    fontSize: "9.5px",
                    py: 0.8,
                    px: 0.8,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Days
                </TableCell>
                <TableCell
                  sx={{
                    width: "30%",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                    fontWeight: 800,
                    color: "#ffffff",
                    fontSize: "9.5px",
                    py: 0.8,
                    px: 0.8,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    borderTopRightRadius: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((item, index) => {
                const isApproved = Boolean(item.ApprovedDate);
                return (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                      "&:hover": { backgroundColor: "#f1f5f9" },
                      transition: "background-color 0.15s",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "10.5px",
                        fontWeight: 600,
                        color: "#1e293b",
                        py: 0.6,
                        px: 0.8,
                        textAlign: "center",
                        borderBottom: "1px solid #f1f5f9",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.Date}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "10.5px",
                        color: "#475569",
                        py: 0.6,
                        px: 0.8,
                        textAlign: "center",
                        borderBottom: "1px solid #f1f5f9",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.Reason || "-"}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "10.5px",
                        fontWeight: 700,
                        textAlign: "center",
                        color: "#1e293b",
                        py: 0.6,
                        px: 0.8,
                        borderBottom: "1px solid #f1f5f9",
                      }}
                    >
                      {item.NoDays}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "10.5px",
                        textAlign: "center",
                        py: 0.6,
                        px: 0.8,
                        borderBottom: "1px solid #f1f5f9",
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          px: 0.8,
                          py: 0.2,
                          borderRadius: "10px",
                          backgroundColor: isApproved ? "#ecfdf5" : "#fdf2f8",
                          border: isApproved ? "1px solid #a7f3d0" : "1px solid #fbcfe8",
                          fontSize: "9.5px",
                          fontWeight: 700,
                          color: isApproved ? "#065f46" : "#9d174d",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Box
                          sx={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            backgroundColor: isApproved ? "#10b981" : "#ec4899",
                            mr: 0.5,
                            flexShrink: 0,
                          }}
                        />
                        {isApproved ? "Approved" : "Not Approved"}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography sx={{ color: "#64748b", fontSize: 12 }}>
              No data available
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #f1f5f9", px: 2, py: 1 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: 12,
            backgroundColor: "#2563eb",
            px: 2.5,
            py: 0.5,
            boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
            "&:hover": {
              backgroundColor: "#1d4ed8",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveDetailsModal;
