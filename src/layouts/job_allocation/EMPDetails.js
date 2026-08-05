import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Box,
  Typography,
  Checkbox,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBack from "@mui/icons-material/ArrowBack";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SaveIcon from "@mui/icons-material/Save";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1e40af",
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
    zIndex: 1,
    padding: "6px 8px",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    wordWrap: "break-word",
    whiteSpace: "normal",
    padding: "5px 8px",
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

export default function EMPDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    EWONO,
    JOBNO,
    unassignedList: initialUnassignedList,
    selectedDate,
  } = location.state || {};
  const [unassignedList, setUnassignedList] = useState(
    initialUnassignedList || []
  );
  const [allocatedList, setAllocatedList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedTimes, setUpdatedTimes] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployeeForUpdate, setSelectedEmployeeForUpdate] =
    useState(null);

  const fetchAllocatedEmployees = async () => {
    try {
      const response = await axios.get("JobAllocation/GetAssignedList", {
        params: {
          P_DATE: selectedDate,
          P_EWO_NO: EWONO,
        },
      });
      if (response.data && response.data.StatusCode === 200) {
        setAllocatedList(response.data.ResultSet);
      } else {
        console.log("Failed to fetch allocated employees.");
      }
    } catch (error) {
      console.error("Error fetching allocated employees:", error);
      Swal.fire("Error", "Error fetching allocated employees.", "error");
    }
  };

  useEffect(() => {
    if (selectedDate && EWONO) {
      fetchAllocatedEmployees();
    }
  }, [selectedDate, EWONO]);

  const handleCheckboxChange = (employee) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employee)
        ? prevSelected.filter((e) => e.BarCodeNo !== employee.BarCodeNo)
        : [...prevSelected, employee]
    );
  };

  const saveEmployees = async () => {
    if (selectedEmployees.length === 0) {
      Swal.fire("Warning", "No employees selected to save.", "warning");
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: "Confirm Save",
      text: "Are you sure to save selected records?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!isConfirmed) return;

    const employeesToSave = selectedEmployees.filter(
      (employee) =>
        !allocatedList.some(
          (allocated) => allocated.AS_BarCodeNo === employee.BarCodeNo
        )
    );

    if (employeesToSave.length === 0) {
      Swal.fire(
        "Info",
        "All selected employees are already allocated.",
        "info"
      );
      setSelectedEmployees([]);
      return;
    }

    try {
      for (const employee of employeesToSave) {
        const response = await axios.get("JobAllocation/SelectEmployee", {
          params: {
            P_DATE: selectedDate,
            P_TIME_IN: employee.InTime,
            P_TIME_OUT: employee.OutTime,
            P_EWO_NO: EWONO,
            P_BARCODE_CARDNO: employee.BarCodeNo,
            P_CONTINUED_STATUS: employee.Cont,
          },
        });

        if (response.data && response.data.StatusCode === 200) {
          setAllocatedList((prev) => [...prev, employee]);
          setUnassignedList((prev) =>
            prev.filter((e) => e.BarCodeNo !== employee.BarCodeNo)
          );
        } else {
          Swal.fire(
            "Error",
            `Employee ${employee.Name} could not be saved.`,
            "error"
          );
        }
      }
      setSelectedEmployees([]);
      Swal.fire("Success", "Selected employees saved successfully!", "success");
      setTimeout(() => {
        fetchAllocatedEmployees();
      }, 500);
    } catch (error) {
      console.error("Error saving employees:", error);
      Swal.fire("Error", "Error saving employees.", "error");
    }
  };

  const handleUpdateTimes = (employee) => {
    const currentDateTime = new Date();
    setSelectedEmployeeForUpdate(employee);

    setUpdatedTimes((prevTimes) => ({
      ...prevTimes,
      [employee.BarCodeNo]: {
        inDate: employee.AS_InTime
          ? new Date(employee.AS_InTime).toISOString().split("T")[0]
          : "",
        inTime: employee.AS_InTime
          ? new Date(employee.AS_InTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hourCycle: "h23",
            })
          : "",
        outDate: employee.AS_OutTime
          ? new Date(employee.AS_OutTime).toISOString().split("T")[0]
          : currentDateTime.toISOString().split("T")[0],
        outTime: employee.AS_OutTime
          ? new Date(employee.AS_OutTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hourCycle: "h23",
            })
          : "",
      },
    }));
    setOpenDialog(true);
  };

  const handleConfirmUpdate = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to change the date and time?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!isConfirmed) return;

    try {
      const updatedEmployee = updatedTimes[selectedEmployeeForUpdate.BarCodeNo];

      const response = await axios.post(
        "JobAllocation/UpdateAllocatedTime",
        null,
        {
          params: {
            P_DATE: updatedEmployee.inDate,
            P_EWO_NO: EWONO,
            P_BARCODE_CARDNO: selectedEmployeeForUpdate.AS_BarCodeNo,
            P_SERIALNO: selectedEmployeeForUpdate.SerialNo || 1,
            P_SDATE: updatedEmployee.inTime
              ? `${updatedEmployee.inDate} ${updatedEmployee.inTime}`
              : null,
            P_EDATE: updatedEmployee.outTime
              ? `${updatedEmployee.outDate} ${updatedEmployee.outTime}`
              : null,
          },
        }
      );

      if (response.data && response.data.StatusCode === 200) {
        await Swal.fire(
          "Success",
          "Successfully updated the date and time.",
          "success"
        );

        fetchAllocatedEmployees();
        setOpenDialog(false);
      } else {
        Swal.fire("Error", "Failed to update the date and time.", "error");
      }
    } catch (error) {
      console.error("Error updating date and time:", error);
      Swal.fire("Error", "Error updating date and time.", "error");
    }
  };

  const filteredUnassignedList = unassignedList.filter(
    (employee) =>
      employee.BarCodeNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "840px",
        margin: "0 auto",
        padding: { xs: 1, sm: 2 },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* CDPLC Portal Header Banner */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
          borderRadius: "16px",
          p: { xs: 1.8, sm: 2 },
          color: "#ffffff",
          boxShadow: "0 6px 20px rgba(37, 99, 235, 0.2)",
          mb: 2.5,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
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
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.35)",
                boxShadow: "none",
              },
            }}
          >
            Back
          </Button>
        </Box>

        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              color: "rgba(255, 255, 255, 0.85)",
              mb: 0.2,
            }}
          >
            CDPLC Portal
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.2rem", sm: "1.4rem" },
              letterSpacing: "0.5px",
              color: "#ffffff",
            }}
          >
            Employee Allocation Details
          </Typography>
        </Box>

        {/* Info Badges */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            mt: 0.5,
          }}
        >
          <Chip
            label={`EWO: ${EWONO || "N/A"}`}
            size="small"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.7rem",
              height: "22px",
            }}
          />
          <Chip
            label={`Job: ${JOBNO || "N/A"}`}
            size="small"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.7rem",
              height: "22px",
            }}
          />
          <Chip
            label={`Date: ${selectedDate || "N/A"}`}
            size="small"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.7rem",
              height: "22px",
            }}
          />
        </Box>
      </Paper>

      {/* Section 1: Allocated Employees */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            px: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <GroupIcon sx={{ color: "#16a34a", fontSize: 20 }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#0f172a", fontSize: "0.98rem" }}
            >
              Allocated Employees
            </Typography>
            <Chip
              label={`${allocatedList.length}`}
              size="small"
              sx={{
                height: "18px",
                fontSize: "0.65rem",
                fontWeight: 800,
                backgroundColor: "#dcfce7",
                color: "#15803d",
              }}
            />
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            maxHeight: 320,
            width: "100%",
            overflowY: "auto",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Table stickyHeader aria-label="allocated employees table" size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" sx={{ width: "18%" }}>
                  Barcode No
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: "42%" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ width: "15%" }}>
                  In Time
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ width: "15%" }}>
                  Out Time
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ width: "10%" }}>
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allocatedList.length > 0 ? (
                allocatedList.map((employee) => (
                  <StyledTableRow key={employee.AS_BarCodeNo}>
                    <StyledTableCell align="center">
                      <Chip
                        label={employee.AS_BarCodeNo}
                        size="small"
                        sx={{
                          height: "16px",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          backgroundColor: "#f1f5f9",
                          color: "#334155",
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ fontWeight: 700, color: "#1e293b" }}>
                      {employee.AS_Name}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontWeight: 600, color: "#475569" }}>
                      {new Date(employee.AS_InTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h23",
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontWeight: 600, color: "#475569" }}>
                      {employee.AS_OutTime
                        ? new Date(employee.AS_OutTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hourCycle: "h23",
                          })
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AccessTimeIcon sx={{ fontSize: 11 }} />}
                        sx={{
                          height: "20px",
                          borderRadius: "10px",
                          fontWeight: 700,
                          fontSize: "0.6rem",
                          textTransform: "none",
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          px: 0.8,
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#1d4ed8",
                            boxShadow: "none",
                          },
                        }}
                        onClick={() => handleUpdateTimes(employee)}
                      >
                        Update
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 1.5, color: "#94a3b8", fontSize: "0.72rem" }}>
                    No allocated employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Section 2: Unassigned Employees */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            px: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <PersonAddIcon sx={{ color: "#2563eb", fontSize: 20 }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#0f172a", fontSize: "0.98rem" }}
            >
              Unassigned Employees
            </Typography>
            <Chip
              label={`${filteredUnassignedList.length}`}
              size="small"
              sx={{
                height: "18px",
                fontSize: "0.65rem",
                fontWeight: 800,
                backgroundColor: "#dbeafe",
                color: "#1d4ed8",
              }}
            />
          </Box>

          <Button
            variant="contained"
            size="small"
            startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
            onClick={saveEmployees}
            disabled={selectedEmployees.length === 0}
            sx={{
              height: "30px",
              borderRadius: "15px",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "none",
              backgroundColor: "#16a34a",
              color: "#ffffff",
              boxShadow: "0 3px 10px rgba(22, 163, 74, 0.25)",
              "&:hover": {
                backgroundColor: "#15803d",
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.35)",
              },
            }}
          >
            Save ({selectedEmployees.length})
          </Button>
        </Box>

        {/* Search Field */}
        <Box sx={{ mb: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search unassigned employees by barcode or name..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#2563eb", fontSize: 18 }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery("")}
                    sx={{ color: "#64748b" }}
                  >
                    <ClearIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: "32px",
                fontSize: "0.78rem",
                "& fieldset": { borderColor: "#e2e8f0" },
                "&:hover fieldset": { borderColor: "#cbd5e1" },
                "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
              },
              "& .MuiOutlinedInput-input": {
                padding: "4px 8px",
              },
            }}
          />
        </Box>

        {/* Unassigned Table */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            maxHeight: 450,
            width: "100%",
            overflowY: "auto",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Table stickyHeader aria-label="unassigned employees table" size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" sx={{ width: "8%" }}>
                  Select
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ width: "17%" }}>
                  Barcode No
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: "45%" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ width: "15%" }}>
                  In Time
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ width: "15%" }}>
                  Out Time
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUnassignedList.length > 0 ? (
                filteredUnassignedList.map((employee) => {
                  const isChecked = selectedEmployees.includes(employee);
                  return (
                    <StyledTableRow
                      key={employee.BarCodeNo}
                      sx={{
                        backgroundColor: isChecked ? "#f0f7ff !important" : "inherit",
                      }}
                    >
                      <StyledTableCell align="center" sx={{ py: 0.2 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(employee)}
                          sx={{
                            p: 0.1,
                            color: "#94a3b8",
                            "&.Mui-checked": {
                              color: "#2563eb",
                            },
                          }}
                        />
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Chip
                          label={employee.BarCodeNo}
                          size="small"
                          sx={{
                            height: "16px",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            backgroundColor: "#f1f5f9",
                            color: "#334155",
                          }}
                        />
                      </StyledTableCell>

                      <StyledTableCell align="left" sx={{ fontWeight: 700, color: "#1e293b" }}>
                        {employee.Name}
                      </StyledTableCell>

                      <StyledTableCell align="center" sx={{ color: "#475569" }}>
                        {employee.InTime
                          ? new Date(employee.InTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hourCycle: "h23",
                            })
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ color: "#475569" }}>
                        {employee.OutTime
                          ? new Date(employee.OutTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hourCycle: "h23",
                            })
                          : "-"}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 1.5, color: "#94a3b8", fontSize: "0.72rem" }}>
                    No unassigned employees found matching search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Time Update Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#1e293b" }}>
          Update Date & Time
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={6}>
              <TextField
                label="In Time"
                type="time"
                value={
                  updatedTimes[selectedEmployeeForUpdate?.BarCodeNo]
                    ?.inTime || ""
                }
                onChange={(e) =>
                  setUpdatedTimes((prev) => ({
                    ...prev,
                    [selectedEmployeeForUpdate.BarCodeNo]: {
                      ...prev[selectedEmployeeForUpdate.BarCodeNo],
                      inTime: e.target.value || null,
                    },
                  }))
                }
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Out Time"
                type="time"
                value={
                  updatedTimes[selectedEmployeeForUpdate?.BarCodeNo]
                    ?.outTime || ""
                }
                onChange={(e) =>
                  setUpdatedTimes((prev) => ({
                    ...prev,
                    [selectedEmployeeForUpdate.BarCodeNo]: {
                      ...prev[selectedEmployeeForUpdate.BarCodeNo],
                      outTime: e.target.value || null,
                    },
                  }))
                }
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              color: "#64748b",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmUpdate}
            sx={{
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#1d4ed8" },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

