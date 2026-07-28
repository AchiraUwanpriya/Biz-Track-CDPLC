import React, { useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Chip,
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
              p: 1.6,
              "&:hover": {
                boxShadow: "0 6px 16px rgba(37, 99, 235, 0.08)",
                borderColor: "#bfdbfe",
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
           
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, width: "100%" }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    backgroundColor: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2563eb",
                    flexShrink: 0,
                    border: "1px solid #dbeafe",
                    mt: 0.2,
                  }}
                >
                  <BuildIcon sx={{ fontSize: 18 }} />
                </Box>

                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f172a",
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                    flex: 1,
                  }}
                >
                  {item.MaterialDescription || "Tool Item"}
                </Typography>
              </Box>

              
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  pt: 0.8,
                  borderTop: "1px dashed #f1f5f9",
                  flexWrap: "wrap",
                }}
              >
                {item.MaterialCode ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>
                      Code:
                    </Typography>
                    <Chip
                      label={item.MaterialCode}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "10px",
                        fontWeight: 700,
                        backgroundColor: "#f1f5f9",
                        color: "#334155",
                        borderRadius: "6px",
                      }}
                    />
                  </Box>
                ) : (
                  <Box />
                )}

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
                  <Chip
                    label={`Qty: ${formatNumber(item.IssuedQuantity)}`}
                    size="small"
                    sx={{
                      height: 22,
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


