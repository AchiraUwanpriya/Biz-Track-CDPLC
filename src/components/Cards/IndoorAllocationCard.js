import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Box, Grid, Paper } from "@mui/material";

export default function IndoorAllocationCard({ dataList }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    padding: 0,
    marginLeft: "4px",
  }));

  const formatValue = (val, isCurrency = false) => {
    if (val === null || val === undefined || val === "" || val === "-") return "-";
    if (isCurrency) {
      const num = Number(val);
      if (!isNaN(num)) {
        return `Rs. ${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    }
    return val;
  };

  const detailItems = [
    { label: "Reference Date", value: formatValue(dataList?.RefDate || dataList?.ReferenceDate) },
    { label: "Auth Date", value: formatValue(dataList?.AuthDate) },
    { label: "Admission Date", value: formatValue(dataList?.AdmisionDate || dataList?.AdmissionDate) },
    { label: "Discharge Date", value: formatValue(dataList?.DischargeDate) },
    { label: "Reference No", value: formatValue(dataList?.ReferenceNo) },
    { label: "Insurance Amount", value: formatValue(dataList?.InsuranceAmount || dataList?.Insurance, true) },
    { label: "CDL Recovery Amount", value: formatValue(dataList?.CdlRecoveryAmount || dataList?.CdlRecovery || dataList?.CDLRecoveryAmount, true) },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
        transition: "all 0.2s ease-in-out",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(37, 99, 235, 0.08)",
          borderColor: "#bfdbfe",
        },
      }}
    >
      {/* Main Header Bar */}
      <Box
        onClick={handleExpandClick}
        sx={{
          p: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Icon Badge */}
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              backgroundColor: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2563eb",
              flexShrink: 0,
            }}
          >
            <ReceiptLongIcon sx={{ fontSize: 20 }} />
          </Box>

          {/* Core Summary Info */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: "#0f172a",
                lineHeight: 1.2,
              }}
            >
              Ref #: {dataList?.ReferenceNo || "N/A"}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: "#64748b",
              }}
            >
              Insurance:{" "}
              <span style={{ fontWeight: 700, color: "#1e293b" }}>
                {formatValue(dataList?.InsuranceAmount || dataList?.Insurance, true)}
              </span>
            </Typography>
          </Box>
        </Box>

        {/* Action Trigger Pill */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1.2,
            py: 0.4,
            borderRadius: "10px",
            backgroundColor: expanded ? "#2563eb" : "#f1f5f9",
            color: expanded ? "#ffffff" : "#475569",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "none",
              mr: 0.2,
            }}
          >
            {expanded ? "Hide" : "Show"}
          </Typography>
          <ExpandMore expand={expanded} aria-label="show more">
            <ExpandMoreIcon
              sx={{
                fontSize: 18,
                color: expanded ? "#ffffff" : "#475569",
              }}
            />
          </ExpandMore>
        </Box>
      </Box>

      {/* Expandable Details Section */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            p: 1.5,
            backgroundColor: "#f8fafc",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <Grid container spacing={1}>
            {detailItems.map((item, idx) => {
              const isLastOdd = idx === detailItems.length - 1 && detailItems.length % 2 !== 0;
              return (
                <Grid item xs={isLastOdd ? 12 : 6} sm={isLastOdd ? 12 : 6} key={idx}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.2,
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.3,
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        borderColor: "#cbd5e1",
                        backgroundColor: "#f8fafc",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.4px",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#0f172a",
                        wordBreak: "break-word",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
}
