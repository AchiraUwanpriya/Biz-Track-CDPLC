import axios from "axios";
import {
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState, useEffect } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Swal from "sweetalert2";

function WorkOrderModal({ onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cdlJobNo, setCdlJobNo] = useState("");
  const [specification, setSpecification] = useState("");
  const [p_loc, setLocation] = useState("");
  const [p_remarks, setRemarks] = useState("");
  const [jobNoOptions, setJobNoOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    const fetchJobNumbers = async () => {
      try {
        const response = await axios.get("JobAllocation/LoadJobNo");
        if (response.status === 200 && response.data.ResultSet) {
          setJobNoOptions(
            response.data.ResultSet.map((item) => ({
              JOBNO: item.JOBNO,
              DISCRIP: item.DISCRIP,
            }))
          );
        } else {
          Swal.fire("Error", "Failed to load job numbers", "error");
        }
      } catch (error) {
        console.error("Error fetching job numbers:", error);
        Swal.fire(
          "Error",
          "An error occurred while loading job numbers",
          "error"
        );
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get("JobAllocation/LoadLocation");
        if (response.status === 200 && response.data.ResultSet) {
          const locations = response.data.ResultSet.map((item) => ({
            LOCCODE: item.LOCCODE,
            LOCDISCRIP: item.LOCDISCRIP,
          }));
          setLocationOptions(locations);
        } else {
          Swal.fire("Error", "Failed to load locations", "error");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        Swal.fire(
          "Error",
          "An error occurred while loading locations",
          "error"
        );
      }
    };

    fetchJobNumbers();
    fetchLocations();
  }, []);

  const handleSave = async () => {
    if (!startDate || !endDate || !specification) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill the required fields",
        icon: "warning",
        customClass: {
          container: "swal2-container",
        },
      });
      return;
    }

    const userConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save this record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      customClass: {
        container: "swal2-container",
      },
    });

    if (!userConfirmed.isConfirmed) return;

    const P_JCAT = cdlJobNo.slice(0, 2);
    const P_JMAIN = cdlJobNo.slice(3);

    try {
      const response = await axios.get("JobAllocation/AddNewJob", {
        params: {
          p_jcat: P_JCAT,
          p_jmain: P_JMAIN,
          p_spec: specification,
          p_sdate: dayjs(startDate).format("YYYY-MM-DD"),
          p_edate: dayjs(endDate).format("YYYY-MM-DD"),
          p_loc: p_loc,
          p_remarks: p_remarks,
          p_status: "",
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Record Saved Successfully!",
          icon: "success",
          customClass: {
            container: "swal2-container",
          },
        }).then(() => {
          onClose();
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `Failed to add job: ${response.data.Result}`,
          icon: "error",
          customClass: {
            container: "swal2-container",
          },
        });
      }
    } catch (error) {
      console.error("Error adding job:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred. Please try again.",
        icon: "error",
        customClass: {
          container: "swal2-container",
        },
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header Banner */}
      <Box
        sx={{
          p: 2,
          px: 2.5,
          mx: -3,
          mt: -3,
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: "18px",
          borderTopRightRadius: "18px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PostAddIcon sx={{ fontSize: 22 }} />
          <Typography variant="h6" fontWeight="800" sx={{ fontSize: "1.05rem" }}>
          Temporary Work Order
          </Typography>
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

      <DialogContent sx={{ pt: 3.5, pb: 2, px: 1 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={
                  <span>
                    Start Date <span style={{ color: "#ef4444" }}>*</span>
                  </span>
                }
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  setEndDate(null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={
                  <span>
                    End Date <span style={{ color: "#ef4444" }}>*</span>
                  </span>
                }
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                minDate={startDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="cdl-job-no-label">CDL Job No</InputLabel>
              <Select
                labelId="cdl-job-no-label"
                id="cdl-job-no"
                value={cdlJobNo}
                label="CDL Job No"
                onChange={(e) => setCdlJobNo(e.target.value)}
                sx={{ borderRadius: "10px" }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 220,
                      maxWidth: { xs: "280px", sm: "360px" },
                      borderRadius: "10px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    },
                  },
                }}
              >
                {jobNoOptions.length > 0 ? (
                  jobNoOptions.map(({ JOBNO, DISCRIP }) => (
                    <MenuItem
                      key={JOBNO}
                      value={JOBNO}
                      sx={{
                        fontSize: "0.78rem",
                        py: 0.8,
                        px: 1.2,
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {`${JOBNO} - ${DISCRIP}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No job numbers available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                labelId="location-label"
                id="location"
                value={p_loc}
                label="Location"
                onChange={(e) => setLocation(e.target.value)}
                sx={{ borderRadius: "10px" }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 220,
                      maxWidth: { xs: "280px", sm: "360px" },
                      borderRadius: "10px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    },
                  },
                }}
              >
                {locationOptions.length > 0 ? (
                  locationOptions.map(({ LOCCODE, LOCDISCRIP }) => (
                    <MenuItem
                      key={LOCCODE}
                      value={LOCCODE}
                      sx={{
                        fontSize: "0.78rem",
                        py: 0.8,
                        px: 1.2,
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {`${LOCCODE} - ${LOCDISCRIP}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No locations available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              label={
                <span>
                  Specification <span style={{ color: "#ef4444" }}>*</span>
                </span>
              }
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
            />
          </Grid>
        </Grid>

        <TextField
          size="small"
          label="Remarks"
          value={p_remarks}
          onChange={(e) => setRemarks(e.target.value)}
          fullWidth
          multiline
          rows={2}
          sx={{
            mb: 1,
            "& .MuiOutlinedInput-root": { borderRadius: "10px" },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ pt: 1, pb: 1, px: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.82rem",
            textTransform: "none",
            color: "#64748b",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
          sx={{
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.82rem",
            textTransform: "none",
            backgroundColor: "#16a34a",
            boxShadow: "0 3px 10px rgba(22, 163, 74, 0.25)",
            "&:hover": {
              backgroundColor: "#15803d",
              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.35)",
            },
          }}
        >
          Save Order
        </Button>
      </DialogActions>
    </Box>
  );
}

export default WorkOrderModal;

