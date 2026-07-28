import React, { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GetOutstandingToolsDetails } from "../../action/Outstanding_Tools";
import Loader from "../Utility/Loader";
import BuildIcon from "@mui/icons-material/Build";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function ToolsCard() {
  const { responseBody, loading, msg } = useSelector(
    (state) => state.tools
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetOutstandingToolsDetails());
  }, [dispatch]);

  const formatCurrency = (val) => {
    if (val === null || val === undefined || val === "" || val === "-") return "Rs. 0.00";
    const num = Number(val);
    if (!isNaN(num)) {
      return `Rs. ${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `Rs. ${val}`;
  };

  const formatNumber = (val) => {
    if (val === null || val === undefined || val === "") return "0";
    const num = Number(val);
    return isNaN(num) ? val : num.toLocaleString();
  };

  const summaryStats = useMemo(() => {
    if (!responseBody || responseBody.length === 0) {
      return { totalItems: 0, totalQty: 0, totalValue: 0 };
    }
    const totalItems = responseBody.length;
    const totalQty = responseBody.reduce(
      (acc, item) => acc + (parseFloat(item.IssuedQuantity) || 0),
      0
    );
    const totalValue = responseBody.reduce(
      (acc, item) => acc + (parseFloat(item.Value) || 0),
      0
    );
    return { totalItems, totalQty, totalValue };
  }, [responseBody]);

  const mappedItems = useMemo(() => {
    if (!responseBody || responseBody.length === 0) return null;

    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: 1.5,
          maxHeight: { xs: "none", md: "540px" },
          overflowY: { xs: "visible", md: "auto" },
          overflowX: "hidden",
          pr: 0.5,
          py: 0.5,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f5f9",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#94a3b8",
          },
        }}
      >
        {responseBody.map((item, index) => (
          <Paper
            elevation={0}
            key={index}
            sx={{
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
              transition: "all 0.2s ease-in-out",
              overflow: "hidden",
              p: 1.8,
              "&:hover": {
                boxShadow: "0 6px 16px rgba(37, 99, 235, 0.08)",
                borderColor: "#bfdbfe",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                flexWrap: { xs: "wrap", sm: "nowrap" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1, minWidth: 0 }}>
                {/* Icon Badge */}
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    backgroundColor: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2563eb",
                    flexShrink: 0,
                    border: "1px solid #dbeafe",
                  }}
                >
                  <BuildIcon sx={{ fontSize: 20 }} />
                </Box>

                {/* Title & Code */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      wordBreak: "break-word",
                    }}
                  >
                    {item.MaterialDescription || "Tool Item"}
                  </Typography>
                  {item.MaterialCode && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                      <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>
                        Code:
                      </Typography>
                      <Chip
                        label={item.MaterialCode}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: "10px",
                          fontWeight: 700,
                          backgroundColor: "#f1f5f9",
                          color: "#334155",
                          borderRadius: "6px",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Quantity & Price */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  alignSelf: { xs: "flex-end", sm: "center" },
                }}
              >
                <Chip
                  label={`Qty: ${formatNumber(item.IssuedQuantity)}`}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: "11px",
                    fontWeight: 700,
                    backgroundColor: "#ecfeff",
                    color: "#155e75",
                    border: "1px solid #a5f3fc",
                    borderRadius: "8px",
                    px: 0.5,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#2563eb",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatCurrency(item.Value)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }, [responseBody]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tools Summary Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          mb: 2.5,
        }}
      >
        <Table aria-label="tools summary table" size="small">
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
              }}
            >
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 800,
                  py: 1,
                  px: 1.5,
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                }}
              >
                Total Items
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 800,
                  py: 1,
                  px: 1.5,
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                }}
              >
                Total Issued Qty
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 800,
                  py: 1,
                  px: 1.5,
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                }}
              >
                Total Value
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow
              sx={{
                backgroundColor: "#ffffff",
                "&:hover": { backgroundColor: "#f8fafc" },
              }}
            >
              <TableCell sx={{ textAlign: "center", py: 1, px: 1 }}>
                <Chip
                  label={formatNumber(summaryStats.totalItems)}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "11px",
                    fontWeight: 700,
                    backgroundColor: "#eff6ff",
                    color: "#1d4ed8",
                    borderRadius: "10px",
                  }}
                />
              </TableCell>
              <TableCell sx={{ textAlign: "center", py: 1, px: 1 }}>
                <Chip
                  label={formatNumber(summaryStats.totalQty)}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "11px",
                    fontWeight: 700,
                    backgroundColor: "#ecfeff",
                    color: "#155e75",
                    border: "1px solid #a5f3fc",
                    borderRadius: "10px",
                  }}
                />
              </TableCell>
              <TableCell sx={{ textAlign: "center", py: 1, px: 1 }}>
                <Chip
                  label={formatCurrency(summaryStats.totalValue)}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "11px",
                    fontWeight: 700,
                    backgroundColor: "#fdf2f8",
                    color: "#9d174d",
                    border: "1px solid #fbcfe8",
                    borderRadius: "10px",
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Section Title Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <BuildCircleIcon sx={{ fontSize: 20, color: "#2563eb" }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: "0.95rem",
            color: "#0f172a",
          }}
        >
          Issued Tools List
        </Typography>
      </Box>

      {/* List or Empty State */}
      {responseBody && responseBody.length > 0 ? (
        mappedItems
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: "100%",
            textAlign: "center",
            borderRadius: "14px",
            border: "1.5px dashed #cbd5e1",
            backgroundColor: "#f8fafc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            my: 1,
          }}
        >
          <ConstructionIcon sx={{ fontSize: 44, color: "#94a3b8" }} />
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontWeight: 600,
              fontSize: "12px",
              fontStyle: "italic",
            }}
          >
            {msg || "No outstanding tools found"}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

