import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Modal,
  Chip,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import axios from "axios";
import dayjs from "dayjs";

const JobAllocationAttendence = ({ onClose, selectedDate }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `JobAllocation/GetAttendance?P_DATE=${selectedDate}`
        );

        if (response.data?.StatusCode === 200) {
          setAttendanceData(response.data.ResultSet || []);
        } else {
          setAttendanceData([]);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendanceData([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) {
      fetchAttendance();
    }
  }, [selectedDate]);

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "92%", sm: "620px" },
          maxHeight: "90vh",
          bgcolor: "#ffffff",
          borderRadius: "18px",
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header Banner */}
        <Box
          sx={{
            p: 2,
            px: 2.5,
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
            color: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HowToRegIcon sx={{ fontSize: 22 }} />
            <Box>
              <Typography variant="h6" fontWeight="800" sx={{ fontSize: "1.05rem", lineHeight: 1.2 }}>
                Attendance Records
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.85)" }}>
                Date: {selectedDate}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
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

        {/* Modal Content */}
        <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
              px: 0.5,
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#1e293b" }}>
              Workforce Attendance
            </Typography>
            {!loading && (
              <Chip
                label={`${attendanceData.length} Present`}
                size="small"
                sx={{
                  height: "20px",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  backgroundColor: "#dcfce7",
                  color: "#15803d",
                }}
              />
            )}
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
              <CircularProgress size={32} sx={{ color: "#2563eb" }} />
            </Box>
          ) : (
            <>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  maxHeight: "65vh",
                  minHeight: "360px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Table size="small" stickyHeader aria-label="attendance table">
                  <TableHead>
                    <TableRow>
                      {["Barcode No", "Name", "In Time", "Out Time"].map((text, i) => (
                        <TableCell
                          key={i}
                          align={i === 0 || i === 2 || i === 3 ? "center" : "left"}
                          sx={{
                            backgroundColor: "#1e40af",
                            color: "#ffffff",
                            fontWeight: 700,
                            fontSize: "11px",
                            padding: "6px 8px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {text}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 2, color: "#94a3b8", fontSize: "12px" }}>
                          No attendance records found for this date.
                        </TableCell>
                      </TableRow>
                    ) : (
                      attendanceData.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:nth-of-type(even)": { backgroundColor: "#f8fafc" },
                            "&:hover": { backgroundColor: "#f0f7ff" },
                          }}
                        >
                          <TableCell align="center" sx={{ padding: "5px 8px" }}>
                            <Chip
                              label={row.BarCodeNo}
                              size="small"
                              sx={{
                                height: "20px",
                                fontSize: "11px",
                                fontWeight: 700,
                                backgroundColor: "#f1f5f9",
                                color: "#334155",
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, fontWeight: 700, color: "#0f172a", padding: "5px 8px" }}>
                            {row.Name}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: 12, fontWeight: 600, color: "#16a34a", padding: "5px 8px" }}>
                            {row.InTime ? dayjs(row.InTime).format("HH:mm") : "-"}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: 12, fontWeight: 600, color: "#dc2626", padding: "5px 8px" }}>
                            {row.OutTime ? dayjs(row.OutTime).format("HH:mm") : "-"}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={onClose}
            sx={{
              mt: 2,
              py: 0.8,
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

export default JobAllocationAttendence;

