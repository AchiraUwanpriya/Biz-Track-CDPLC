import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import IndoorAllocationCard from "../../components/Cards/IndoorAllocationCard";
import Loader from "../../components/Utility/Loader";
import HistoryIcon from "@mui/icons-material/History";

function IndoorAllocations({ allocationName }) {
  const {
    responseBody: allocationData,
    msg,
    loading,
  } = useSelector((state) => state.userMedicalDetails);

  const {
    responseBody: IndoorCardData,
    msg: IndoorCardMsg,
    loading: IndoorCardLoading,
  } = useSelector((state) => state.medicalIndoorUsageDetails);

  const {
    responseBody: OutdoorCardData,
    msg: OutdoorCardMsg,
    loading: OutdoorCardLoading,
  } = useSelector((state) => state.medicalOutdoorUsageDetails);

  useEffect(() => {
    if (
      !IndoorCardLoading &&
      allocationName === "Indoor" &&
      IndoorCardData.length === 0
    ) {
      // Info callback if needed
    } else if (
      !OutdoorCardLoading &&
      allocationName === "Outdoor" &&
      OutdoorCardData.length === 0
    ) {
      // Info callback if needed
    }
  }, [
    IndoorCardLoading,
    OutdoorCardLoading,
    IndoorCardData,
    OutdoorCardData,
    allocationName,
  ]);

  const mappedItems = useMemo(() => {
    const list = allocationName === "Indoor" ? IndoorCardData : OutdoorCardData;
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
        {list.map((item, index) => (
          <IndoorAllocationCard key={index} dataList={item} />
        ))}
      </Box>
    );
  }, [IndoorCardData, OutdoorCardData, allocationName]);

  const allocationValues =
    allocationName === "Indoor"
      ? {
          Allocation: allocationData?.IndoorAllocation,
          Usage: allocationData?.IndoorUsage,
          Balance: allocationData?.IndoorBalance,
        }
      : {
          Allocation: allocationData?.OutdoorAllocation,
          Usage: allocationData?.OutdoorUsage,
          Balance: allocationData?.OutdoorBalance,
        };

  const formatNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? "N/A" : num.toLocaleString();
  };

  const currentLoading =
    allocationName === "Indoor" ? IndoorCardLoading : OutdoorCardLoading;
  const currentCardData =
    allocationName === "Indoor" ? IndoorCardData : OutdoorCardData;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Allocation Summary Table */}
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
        <Table aria-label="allocation table" size="small">
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
                All Allocation
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
                Allocation Usage
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
                Allocation Balance
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
                  label={formatNumber(allocationValues.Allocation)}
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
                  label={formatNumber(allocationValues.Usage)}
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
              <TableCell sx={{ textAlign: "center", py: 1, px: 1 }}>
                <Chip
                  label={formatNumber(allocationValues.Balance)}
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* History Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <HistoryIcon sx={{ fontSize: 20, color: "#2563eb" }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: "0.95rem",
            color: "#0f172a",
          }}
        >
          Allocations History
        </Typography>
      </Box>

      {/* History List or Empty State */}
      {currentLoading ? (
        <Loader />
      ) : currentCardData && currentCardData.length > 0 ? (
        mappedItems
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            width: "100%",
            textAlign: "center",
            borderRadius: "14px",
            border: "1.5px dashed #cbd5e1",
            backgroundColor: "#f8fafc",
            mt: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontWeight: 600,
              fontSize: "12px",
              fontStyle: "italic",
            }}
          >
            {allocationName} Allocation History not available
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default IndoorAllocations;
