import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TJobModel from "../Utility/TJobModel";
import EWOUpdateModal from "../Utility/EWOUpdateModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1e40af",
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
    zIndex: 1,
    padding: "10px 12px",
    fontSize: "0.75rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.82rem",
    wordWrap: "break-word",
    whiteSpace: "normal",
    padding: "8px 12px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f8fafc",
  },
  "&:hover": {
    backgroundColor: "#f0f7ff !important",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function JobCard({
  jobData = [],
  unassignedList,
  selectedDate,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedEditRow, setSelectedEditRow] = useState(null);
  const [temporaryJobData, setTemporaryJobData] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  const fetchTemporaryJobs = async () => {
    try {
      const response = await axios.get("JobAllocation/LoadTempJob", {
        params: {
          P_DATE: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
        },
      });
      if (response.data.StatusCode === 200 && response.data.ResultSet) {
        setTemporaryJobData(response.data.ResultSet);
      }
    } catch (error) {
      console.error("Error loading temporary jobs:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) fetchTemporaryJobs();
  }, [selectedDate]);

  const handleRowClick = (row) => {
    navigate("/empdetails", {
      state: {
        EWONO: row.EWONO || row.TEMP_EWONO,
        JOBNO: row.JOBNO || row.TEMP_JOBNO,
        unassignedList,
        selectedDate: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
      },
    });
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleEditClick = (row) => {
    setSelectedEditRow(row);
    setModalEditOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const handleCloseUpdateModal = () => {
    setModalEditOpen(false);
    setSelectedEditRow(null);
  };

  const handleUpdateEwo = (newEwoNumber) => {
    console.log("Updated EWO Number:", newEwoNumber);
    fetchTemporaryJobs();
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Assigned Jobs Section Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
          px: 0.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AssignmentIcon sx={{ color: "#2563eb", fontSize: 22 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#0f172a", fontSize: "1.1rem" }}
          >
            Assigned Jobs
          </Typography>
          <Chip
            label={`${jobData.length}`}
            size="small"
            sx={{
              height: "20px",
              fontSize: "0.7rem",
              fontWeight: 800,
              backgroundColor: "#dbeafe",
              color: "#1d4ed8",
            }}
          />
        </Box>

        <Button
          variant="contained"
          startIcon={<ArrowBack sx={{ fontSize: 16 }} />}
          onClick={() => navigate(-1)}
          sx={{
            height: "32px",
            borderRadius: "16px",
            fontWeight: 700,
            fontSize: "12px",
            textTransform: "none",
            backgroundColor: "#f1f5f9",
            color: "#334155",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#e2e8f0",
              boxShadow: "none",
            },
          }}
        >
          Back
        </Button>
      </Box>

      {/* Assigned Jobs Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          maxHeight: 260,
          width: "100%",
          overflowX: "auto",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
          mb: 3.5,
        }}
      >
        <Table stickyHeader aria-label="assigned jobs table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">EWO No</StyledTableCell>
              <StyledTableCell align="center">Job No</StyledTableCell>
              <StyledTableCell align="center">LOC</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobData.length > 0 ? (
              jobData.map((row, index) => (
                <StyledTableRow
                  key={index}
                  onClick={() => handleRowClick(row)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <StyledTableCell align="center">
                    <Chip
                      label={row.EWONO}
                      size="small"
                      sx={{
                        height: "20px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        backgroundColor: "#f1f5f9",
                        color: "#334155",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 700, color: "#1e293b" }}>
                    {row.JOBNO}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      label={row.LOC || "N/A"}
                      size="small"
                      sx={{
                        height: "20px",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        backgroundColor: "#e0f2fe",
                        color: "#0369a1",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      label={row.STS || "Active"}
                      size="small"
                      sx={{
                        height: "20px",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        backgroundColor: "#dcfce7",
                        color: "#15803d",
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3, color: "#94a3b8" }}>
                  No assigned jobs found for this date.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Temporary Jobs Section Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1.5,
          px: 0.5,
        }}
      >
        <PendingActionsIcon sx={{ color: "#f59e0b", fontSize: 22 }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#0f172a", fontSize: "1.1rem" }}
        >
          Temporary Jobs
        </Typography>
        <Chip
          label={`${temporaryJobData.length}`}
          size="small"
          sx={{
            height: "20px",
            fontSize: "0.7rem",
            fontWeight: 800,
            backgroundColor: "#fef3c7",
            color: "#b45309",
          }}
        />
      </Box>

      {/* Temporary Jobs Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          maxHeight: 300,
          width: "100%",
          overflowX: "auto",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
        }}
      >
        <Table stickyHeader aria-label="temporary jobs table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">TWO No</StyledTableCell>
              <StyledTableCell align="center">Job No</StyledTableCell>
              <StyledTableCell align="center">Specification</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {temporaryJobData.length > 0 ? (
              temporaryJobData.map((row, index) => (
                <StyledTableRow
                  key={index}
                  onClick={() => handleRowClick(row)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <StyledTableCell align="center">
                    <Chip
                      label={"T" + row.TEMP_EWONO.toString().padStart(5, "0")}
                      size="small"
                      sx={{
                        height: "20px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        backgroundColor: "#fef3c7",
                        color: "#92400e",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 700, color: "#1e293b" }}>
                    {row.TEMP_JOBNO}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ color: "#475569" }}>
                    {row.TEMP_SPEC}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewClick(row);
                        }}
                        aria-label="view"
                        sx={{
                          backgroundColor: "#eff6ff",
                          "&:hover": { backgroundColor: "#dbeafe" },
                        }}
                      >
                        <VisibilityIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(row);
                        }}
                        aria-label="edit"
                        sx={{
                          backgroundColor: "#fef2f2",
                          color: "#dc2626",
                          "&:hover": { backgroundColor: "#fee2e2" },
                        }}
                      >
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3, color: "#94a3b8" }}>
                  No temporary jobs found for this date.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TJobModel
        open={modalOpen}
        onClose={handleCloseModal}
        selectedRow={selectedRow}
      />
      <EWOUpdateModal
        open={modalEditOpen}
        onClose={handleCloseUpdateModal}
        ewoNumber={selectedEditRow?.TEMP_EWONO || ""}
        onUpdate={handleUpdateEwo}
      />
    </Box>
  );
}

