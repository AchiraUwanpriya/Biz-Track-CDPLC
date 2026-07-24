import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Grid,
  Chip,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import LeaveBalance from "./LeaveBalance";
import Punctuality from "./Punctuality";
import NotEnteredLeave from "./NotEnteredLeave";
import LeaveSummery from "./LeaveSummery";
import {
  GetLeaveBalance,
  GetLeaveSummary,
  GetNotEnteredLeave,
  GetPunctuality,
} from "../../action/Leave";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import LeaveDetailsModal from "../../../src/components/Utility/LeaveDetailsModal";
import LeaveSummaryModal from "../../../src/components/Utility/LeaveSummaryModal";
import {
  Visibility,
  DesignServices,
  ArrowBack,
  EventNote,
  Assessment,
  EventBusy,
  AccessTime,
  Lock,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function LegendDotChip({ label, count, type = "common" }) {
  const configs = {
    poya: { bg: "#fff7ed", border: "#fed7aa", dot: "#ea580c", text: "#9a3412" },
    mercantile: { bg: "#fdf2f8", border: "#fbcfe8", dot: "#ec4899", text: "#9d174d" },
    common: { bg: "#ecfeff", border: "#a5f3fc", dot: "#06b6d4", text: "#155e75" },
    info: { bg: "#eff6ff", border: "#bfdbfe", dot: "#2563eb", text: "#1d4ed8" },
  };
  const c = configs[type] || configs.info;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.4,
        borderRadius: "20px",
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        fontSize: "12px",
        fontWeight: 600,
        color: c.text,
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: c.dot,
          mr: 1,
          flexShrink: 0,
        }}
      />
      <span>{label}</span>
      {count !== undefined && (
        <span style={{ marginLeft: 6, fontWeight: 700 }}>{count}</span>
      )}
    </Box>
  );
}

const AddLeave = () => {
  const [leaveType, setLeaveType] = useState("");
  const [days, setDays] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const isDisabled = true;

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = () => { 
    console.log({ leaveType, days, reason, startDate, endDate });
  };
  return (

    // <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
    //   <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
    //     Add Leave
    //   </Typography>
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
    //       <DatePicker
    //         label="Leave Start Date"
    //         value={startDate}
    //         onChange={(newValue) => setStartDate(newValue)}
    //         renderInput={(params) => <TextField {...params} fullWidth />}
    //       />
    //       <DatePicker
    //         label="Leave End Date"
    //         value={endDate}
    //         onChange={(newValue) => setEndDate(newValue)}
    //         renderInput={(params) => <TextField {...params} fullWidth />}
    //       />
    //     </Box>
    //   </LocalizationProvider>
    //   <Box
    //     sx={{
    //       border: "1px solid #ccc",
    //       borderRadius: 1,
    //       padding: 2,
    //       marginBottom: 2,
    //     }}
    //   >
    //     <FormControl component="fieldset" sx={{ width: "100%" }}>
    //       <FormLabel component="legend">Leave Type</FormLabel>
    //       <RadioGroup value={leaveType} onChange={handleLeaveTypeChange}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Casual Leave"
    //               control={<Radio />}
    //               label="Casual Leave"
    //             />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Annual Leave"
    //               control={<Radio />}
    //               label="Annual Leave"
    //             />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Day Off"
    //               control={<Radio />}
    //               label="Day Off"
    //             />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Sick Leave"
    //               control={<Radio />}
    //               label="Sick Leave"
    //             />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Duty Leave"
    //               control={<Radio />}
    //               label="Duty Leave"
    //             />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Shift Day-Off"
    //               control={<Radio />}
    //               label="Shift Day-Off"
    //             />
    //           </Grid>
    //         </Grid>
    //       </RadioGroup>
    //     </FormControl>
    //   </Box>
    //   <Box
    //     sx={{
    //       border: "1px solid #ccc",
    //       borderRadius: 1,
    //       padding: 2,
    //       marginBottom: 2,
    //     }}
    //   >
    //     <FormControl component="fieldset" sx={{ width: "100%" }}>
    //       <FormLabel component="legend">Days</FormLabel>
    //       <RadioGroup row value={days} onChange={handleDaysChange}>
    //         <FormControlLabel value="1" control={<Radio />} label="1" />
    //         <FormControlLabel value="0.5" control={<Radio />} label="0.5" />
    //       </RadioGroup>
    //     </FormControl>
    //   </Box>
    //   <TextField
    //     label="Reason"
    //     multiline
    //     rows={4}
    //     fullWidth
    //     value={reason}
    //     onChange={handleReasonChange}
    //     inputProps={{ maxLength: 100 }}
    //     sx={{ marginBottom: 2 }}
    //   />
    //   <Button variant="contained" color="primary" onClick={handleSubmit}>
    //     Submit
    //   </Button>
    // </Paper>
    // <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
    //   <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
    //     Add Leave
    //   </Typography>
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <Box sx={{ display: "flex", gap: 1, marginBottom: 1 }}>
    //       <DatePicker
    //         label="Leave Start Date"
    //         value={startDate}
    //         onChange={(newValue) => setStartDate(newValue)}
    //         renderInput={(params) => <TextField {...params} fullWidth />}
    //       />
    //       <DatePicker
    //         label="Leave End Date"
    //         value={endDate}
    //         onChange={(newValue) => setEndDate(newValue)}
    //         renderInput={(params) => <TextField {...params} fullWidth />}
    //       />
    //     </Box>
    //   </LocalizationProvider>

    //   {/* Leave Type */}
    //   <Box
    //     sx={{
    //       border: "1px solid #ccc",
    //       borderRadius: 1,
    //       padding: 1, // <-- reduced padding
    //       marginBottom: 1, // <-- reduced margin
    //     }}
    //   >
    //     <FormControl component="fieldset" sx={{ width: "100%" }}>
    //       <FormLabel component="legend" sx={{ fontSize: 12 }}>Leave Type</FormLabel>
    //       <RadioGroup value={leaveType} onChange={handleLeaveTypeChange}>
    //         <Grid container spacing={1}>
    //           {[
    //             "Casual Leave",
    //             "Annual Leave",
    //             "Day Off",
    //             "Sick Leave",
    //             "Duty Leave",
    //             "Shift Day-Off",
    //           ].map((type) => (
    //             <Grid item xs={6} key={type}>
    //               <FormControlLabel
    //                 value={type}
    //                 control={<Radio />}
    //                 label={type}
    //                 sx={{
    //                   margin: 0,
    //                   padding: 0,
    //                   '& .MuiFormControlLabel-label': {
    //                     fontSize: '12px',
    //                   },
    //                 }}
    //               />
    //             </Grid>
    //           ))}
    //         </Grid>
    //       </RadioGroup>

    //     </FormControl>
    //   </Box>

    //   {/* Days */}
    //   <Box
    //     sx={{
    //       border: "1px solid #ccc",
    //       borderRadius: 1,
    //       padding: 1, // reduced padding
    //       marginBottom: 1, // reduced margin
    //     }}
    //   >
    //     <FormControl component="fieldset" sx={{ width: "100%" }}>
    //       <FormLabel component="legend">Days</FormLabel>
    //       <RadioGroup row value={days} onChange={handleDaysChange}>
    //         <FormControlLabel value="1" control={<Radio />} label="1" />
    //         <FormControlLabel value="0.5" control={<Radio />} label="0.5" />
    //       </RadioGroup>
    //     </FormControl>
    //   </Box>

    //   {/* Reason */}
    //   <TextField
    //     label="Reason"
    //     multiline
    //     rows={2}
    //     fullWidth
    //     value={reason}
    //     onChange={handleReasonChange}
    //     inputProps={{ maxLength: 100 }}
    //     sx={{ marginBottom: 1 }} // reduced margin
    //   />

    //   <Button variant="contained" color="primary" onClick={handleSubmit}>
    //     Submit
    //   </Button>
    // </Paper>



//leave modify 2026-01-19------------------------------------


    // <Paper elevation={1} sx={{ p: 1, mt: 2 }}>
    //   <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
    //     Add Leave
    //   </Typography>

    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
    //       <DatePicker
    //         label="Leave Start Date"
    //         value={startDate}
    //         onChange={(newValue) => setStartDate(newValue)}
    //         renderInput={(params) => (
    //           <TextField {...params} fullWidth size="small" inputProps={{ style: { fontSize: 12 } }} />
    //         )}
    //       />
    //       <DatePicker
    //         label="Leave End Date"
    //         value={endDate}
    //         onChange={(newValue) => setEndDate(newValue)}
    //         renderInput={(params) => (
    //           <TextField {...params} fullWidth size="small" inputProps={{ style: { fontSize: 12 } }} />
    //         )}
    //       />
    //     </Box>
    //   </LocalizationProvider>

    //   {/* Leave Type box */}
    //   <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
    //     {/* Leave Type Box (Left) */}
    //     <Box sx={{ flex: 1, minWidth: "35%", border: "1px solid #ccc", borderRadius: 1, p: 1 }}>
    //       <FormControl component="fieldset" sx={{ width: "100%" }}>
    //         <FormLabel component="legend" sx={{ fontSize: 12 }}>
    //           Leave Type
    //         </FormLabel>
    //         <RadioGroup value={leaveType} onChange={handleLeaveTypeChange}>
    //           <Grid container spacing={1}>
    //             {[
    //               "Casual Leave",
    //               "Annual Leave",
    //               "Day Off",
    //               "Sick Leave",
    //               "Duty Leave",
    //               "Shift Day-Off",
    //             ].map((type) => (
    //               <Grid item xs={6} key={type}>
    //                 <FormControlLabel
    //                   value={type}
    //                   control={<Radio sx={{ p: 0.5 }} />}
    //                   label={type}
    //                   sx={{
    //                     m: 0,
    //                     '& .MuiFormControlLabel-label': { fontSize: '12px' },
    //                   }}
    //                 />
    //               </Grid>
    //             ))}
    //           </Grid>
    //         </RadioGroup>
    //       </FormControl>
    //     </Box>

    //     {/* Days Box in Right */}
    //     <Box sx={{ width: "20%", border: "1px solid #ccc", borderRadius: 1, p: 1 }}>
    //       <FormControl component="fieldset" sx={{ width: "100%" }}>
    //         <FormLabel component="legend" sx={{ fontSize: 12 }}>Days</FormLabel>
    //         <RadioGroup row value={days} onChange={handleDaysChange}>
    //           <FormControlLabel
    //             value="1"
    //             control={<Radio sx={{ mt: -1 }} />}
    //             label="1"
    //             sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px', mt: -1 } }}
    //           />
    //           <FormControlLabel
    //             value="0.5"
    //             control={<Radio sx={{ mt: -1 }} />}
    //             label="0.5"
    //             sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px', mt: -1 } }}
    //           />
    //         </RadioGroup>
    //       </FormControl>
    //     </Box>
    //   </Box>

    //   {/* Reason Box */}
    //   <TextField
    //     label="Reason"
    //     multiline
    //     rows={1}
    //     fullWidth
    //     value={reason}
    //     onChange={handleReasonChange}
    //     inputProps={{ maxLength: 100, style: { fontSize: 12 } }}
    //     InputLabelProps={{ style: { fontSize: 12 } }}
    //     sx={{ mb: 1 }}
    //   />

    //   <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ fontSize: 12 }}>
    //     Submit
    //   </Button>
    // </Paper>


    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.8, sm: 2.2 },
        mt: 1.5,
        borderRadius: "18px",
        border: "1px solid #f1f5f9",
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 24px rgba(37, 99, 235, 0.04)",
        transition: "all 0.2s ease-in-out",
      }}
    >
      {/* Dashed Notice Box for disabled mode */}
      {isDisabled && (
        <Box
          sx={{
            p: 1.2,
            mb: 2,
            borderRadius: "12px",
            border: "1.5px dashed #bfdbfe",
            backgroundColor: "#f8fafc",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Lock sx={{ fontSize: 16, color: "#2563eb" }} />
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#2563eb" }}>
            Add Leave Application — Read Only Mode
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.8,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: "0.95rem",
            color: "#0f172a",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "10px",
              backgroundColor: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2563eb",
            }}
          >
            <EventNote sx={{ fontSize: 17 }} />
          </Box>
          Add Leave Application
        </Typography>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={1.5} sx={{ mb: 1.8 }}>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Leave Start Date"
              value={startDate}
              disabled={isDisabled}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      fontSize: 12,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 12,
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Leave End Date"
              value={endDate}
              disabled={isDisabled}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      fontSize: 12,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 12,
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>

      {/* Leave Type & Days */}
      <Grid container spacing={1.5} sx={{ mb: 1.8 }}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              p: 1.5,
              backgroundColor: "#ffffff",
              height: "100%",
            }}
          >
            <FormControl component="fieldset" sx={{ width: "100%" }} disabled={isDisabled}>
              <FormLabel
                component="legend"
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  mb: 1,
                }}
              >
                Leave Type
              </FormLabel>
              <RadioGroup value={leaveType}>
                <Grid container spacing={0.8}>
                  {[
                    { type: "Casual Leave", dotColor: "#06b6d4", bg: "#ecfeff" },
                    { type: "Annual Leave", dotColor: "#10b981", bg: "#ecfdf5" },
                    { type: "Day Off", dotColor: "#6366f1", bg: "#e0e7ff" },
                    { type: "Sick Leave", dotColor: "#f59e0b", bg: "#fffbeb" },
                    { type: "Duty Leave", dotColor: "#3b82f6", bg: "#eff6ff" },
                    { type: "Shift Day-Off", dotColor: "#ec4899", bg: "#fdf2f8" },
                  ].map(({ type, dotColor, bg }) => (
                    <Grid item xs={6} sm={4} key={type}>
                      <Paper
                        elevation={0}
                        sx={{
                          border: leaveType === type ? `1.5px solid ${dotColor}` : "1px solid #e2e8f0",
                          borderRadius: "10px",
                          px: 1,
                          py: 0.4,
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: leaveType === type ? bg : "#ffffff",
                          transition: "all 0.2s",
                        }}
                      >
                        <FormControlLabel
                          value={type}
                          control={<Radio size="small" sx={{ p: 0.3, color: dotColor }} />}
                          label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor: dotColor,
                                  mr: 0.6,
                                }}
                              />
                              <span style={{ fontSize: "11px", fontWeight: 600 }}>{type}</span>
                            </Box>
                          }
                          sx={{
                            m: 0,
                            width: "100%",
                            "& .MuiFormControlLabel-label": {
                              color: "#1e293b",
                            },
                          }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              p: 1.5,
              backgroundColor: "#ffffff",
              height: "100%",
            }}
          >
            <FormControl component="fieldset" sx={{ width: "100%" }} disabled={isDisabled}>
              <FormLabel
                component="legend"
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  mb: 1,
                }}
              >
                Days
              </FormLabel>
              <RadioGroup row value={days}>
                {["1", "0.5"].map((d) => (
                  <Paper
                    key={d}
                    elevation={0}
                    sx={{
                      border: days === d ? "1.5px solid #2563eb" : "1px solid #e2e8f0",
                      borderRadius: "10px",
                      px: 1.5,
                      py: 0.4,
                      mr: 1,
                      backgroundColor: days === d ? "#eff6ff" : "#ffffff",
                    }}
                  >
                    <FormControlLabel
                      value={d}
                      control={<Radio size="small" sx={{ p: 0.3, color: "#2563eb" }} />}
                      label={d}
                      sx={{
                        m: 0,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#1e293b",
                        },
                      }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      {/* Reason */}
      <TextField
        label="Reason"
        multiline
        rows={2}
        fullWidth
        disabled={isDisabled}
        value={reason}
        inputProps={{ maxLength: 100, style: { fontSize: 12 } }}
        InputLabelProps={{ style: { fontSize: 12 } }}
        sx={{
          mb: 1.8,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
      />

      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={handleSubmit}
        sx={{
          fontSize: 12,
          fontWeight: 700,
          px: 3,
          py: 0.7,
          borderRadius: "14px",
          textTransform: "none",
          backgroundColor: "#2563eb",
          boxShadow: "0 2px 10px rgba(37, 99, 235, 0.25)",
          "&:hover": {
            backgroundColor: "#1d4ed8",
          },
        }}
      >
        Submit Application
      </Button>
    </Paper>
  );
};

const Leave = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [year, setYear] = React.useState(dayjs().year());
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openLeaveSummaryModal, setOpenLeaveSummaryModal] = useState(false);
  const [selectedTab, setSelectedTab] = React.useState("Leave Details");
  const [modalTitle, setModalTitle] = useState("");
  const [leaveDetailsData, setLeaveDetailsData] = useState([]);
  const [showLeaveBalanceSummary, setShowLeaveBalanceSummary] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const leaveBalanceData = useSelector(
    (state) => state.leaveBalance.responseBody
  );
  const punctualityData = useSelector(
    (state) => state.punctuality.responseBody
  );
  const notEnteredLeaveData = useSelector(
    (state) => state.notEnteredLeave.responseBody
  );
  const isLoading = useSelector((state) => state.leaveBalance.loading);
  const maxYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => maxYear - index);

  const handleLeaveSummaryClick = () => {
    setSelectedTab("LeaveSummery");
    setShowLeaveBalanceSummary(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedTab(event.target.value);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleDesignButtonClick = () => {
    setOpenLeaveSummaryModal(true);
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);

    let data = [];
    switch (tabName) {
      case "LeaveSummery":
        data = leaveBalanceData;
        break;
      case "NotEnteredLeave":
        data = notEnteredLeaveData;
        break;
      case "Punctuality":
        data = punctualityData;
        break;
      default:
        data = [];
    }
  };

  useEffect(() => {
    dispatch(GetLeaveBalance(year));
    dispatch(GetNotEnteredLeave(year));
    dispatch(GetPunctuality(year));
    dispatch(GetLeaveSummary(year));
  }, [dispatch, year]);

  const totalLeave = leaveBalanceData.reduce(
    (sum, row) => sum + (parseFloat(row.Total) || 0),
    0
  );
  const totalTakenLeave = leaveBalanceData.reduce(
    (sum, row) => sum + (parseFloat(row.Taken) || 0),
    0
  );
  const totalBalanceLeave = leaveBalanceData.reduce(
    (sum, row) => sum + (parseFloat(row.Balance) || 0),
    0
  );

  const fetchLeaveDetails = async (P_TYPE, P_YEAR) => {
    try {
      const response = await axios.get("Leave/GetLeaveByType", {
        params: {
          P_YEAR: P_YEAR,
          P_TYPE: P_TYPE,
        },
      });
      if (response.data && response.data.StatusCode === 200) {
        setLeaveDetailsData(response.data.ResultSet || []);
      } else {
        setLeaveDetailsData([]);
        console.error("Failed to fetch leave details:", response.data);
      }
    } catch (error) {
      console.error("Error fetching leave details:", error);
      setLeaveDetailsData([]);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "760px",
        margin: "0 auto",
        padding: { xs: 1, sm: 1.8 },
      }}
    >
      {/* Calendar Style Gradient Header Banner */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
          borderRadius: "18px",
          p: { xs: 1.8, sm: 2.2 },
          color: "#ffffff",
          boxShadow: "0 8px 24px rgba(37, 99, 235, 0.18)",
          mb: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 1.2,
          }}
        >
          {/* Top: Back Button (Left Aligned) */}
          <Button
            variant="contained"
            startIcon={<ArrowBack sx={{ fontSize: 16 }} />}
            onClick={() => navigate(-1)}
            sx={{
              alignSelf: "flex-start",
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

          {/* Middle: Title Words (Centered) */}
          <Box sx={{ alignSelf: "center", textAlign: "center", width: "100%" }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                color: "rgba(255, 255, 255, 0.8)",
                mb: 0.2,
                textAlign: "center",
              }}
            >
              CDPLC Portal • {year}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.2rem", sm: "1.4rem" },
                letterSpacing: "0.4px",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              Leave & Attendance
            </Typography>
          </Box>

          {/* Bottom: Year Picker (Left Aligned) */}
          <FormControl size="small" sx={{ alignSelf: "flex-center", minWidth: 100 }}>
            <Select
              value={year}
              onChange={handleChangeYear}
              sx={{
                height: "32px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#ffffff",
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                "& .MuiSelect-icon": { color: "#ffffff" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.28)" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  },
                },
              }}
            >
              {Array.from({ length: 10 }, (_, index) => {
                const currentYear = new Date().getFullYear();
                const yearOption = currentYear - index;

                return (
                  <MenuItem
                    key={yearOption}
                    value={yearOption}
                    sx={{ fontSize: "12px" }}
                  >
                    {yearOption}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Overlapping White Segmented Pill Tabs */}
      <Paper
        elevation={0}
        sx={{
          p: 0.5,
          display: "flex",
          justifyContent: "center",
          gap: 0.5,
          borderRadius: "18px",
          backgroundColor: "#ffffff",
          border: "1px solid #f1f5f9",
          boxShadow: "0 6px 18px rgba(37, 99, 235, 0.05)",
          mb: 2,
        }}
      >
        {[
          {
            key: "Leave Details",
            label: "Add Leave",
            icon: <EventNote sx={{ fontSize: 15 }} />,
          },
          {
            key: "LeaveSummery",
            label: "Leave Summary",
            icon: <Assessment sx={{ fontSize: 15 }} />,
          },
          {
            key: "NotEnteredLeave",
            label: "Not Entered Leave",
            icon: <EventBusy sx={{ fontSize: 15 }} />,
          },
          {
            key: "Punctuality",
            label: "Punctuality",
            icon: <AccessTime sx={{ fontSize: 15 }} />,
          },
        ].map((tab) => {
          const isSelected = selectedTab === tab.key;
          return (
            <Button
              key={tab.key}
              variant={isSelected ? "contained" : "text"}
              startIcon={tab.icon}
              onClick={() => handleTabClick(tab.key)}
              sx={{
                flex: 1,
                py: 0.6,
                px: 1,
                fontSize: "11px",
                fontWeight: isSelected ? 700 : 600,
                color: isSelected ? "#ffffff" : "#64748b",
                backgroundColor: isSelected ? "#2563eb" : "transparent",
                boxShadow: isSelected
                  ? "0 3px 10px rgba(37, 99, 235, 0.25)"
                  : "none",
                borderRadius: "14px",
                textTransform: "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: isSelected ? "#1d4ed8" : "#f1f5f9",
                  color: isSelected ? "#ffffff" : "#1e293b",
                },
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Paper>

      {/* Main Active Tab Views */}
      {selectedTab === "Leave Details" && (
        <>
          <AddLeave />

          {showLeaveBalanceSummary && (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.8, sm: 2.2 },
                mt: 2,
                borderRadius: "18px",
                border: "1px solid #f1f5f9",
                backgroundColor: "#ffffff",
                boxShadow: "0 8px 24px rgba(37, 99, 235, 0.04)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1.8,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "#0f172a",
                  }}
                >
                  Leave Balance Summary
                </Typography>

                <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap" }}>
                  <LegendDotChip label="Total" type="info" />
                  <LegendDotChip label="Taken" type="mercantile" />
                  <LegendDotChip label="Balance" type="common" />
                </Box>
              </Box>

              {isLoading ? (
                <Typography sx={{ p: 2, textAlign: "center", color: "#64748b", fontSize: 12 }}>
                  Loading...
                </Typography>
              ) : (
                <Box sx={{ overflowX: "auto" }}>
                  <Table
                    size="small"
                    sx={{
                      width: "100%",
                      tableLayout: "fixed",
                      borderCollapse: "separate",
                      borderSpacing: 0,
                    }}
                  >
                    <TableHead>
                      <TableRow
                        sx={{
                          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                          
                        }}
                      >
                        <TableCell
                          sx={{
                            width: "32%",
                            fontWeight: 800,
                            fontSize: "10px",
                            color: "#ffffff",
                            py: 1,
                            px: 1,
                            textAlign: "center",
                            borderTopLeftRadius: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "0.4px",
                          }}
                        >
                          Description
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "17%",
                            fontWeight: 800,
                            fontSize: "10px",
                            color: "#ffffff",
                            textAlign: "center",
                            py: 1,
                            px: 1,
                            textTransform: "uppercase",
                            letterSpacing: "0.4px",
                          }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "17%",
                            fontWeight: 800,
                            fontSize: "10px",
                            color: "#ffffff",
                            textAlign: "center",
                            py: 1,
                            px: 1,
                            textTransform: "uppercase",
                            letterSpacing: "0.4px",
                          }}
                        >
                          Taken
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "17%",
                            fontWeight: 800,
                            fontSize: "10px",
                            color: "#ffffff",
                            textAlign: "center",
                            py: 1,
                            px: 1,
                            textTransform: "uppercase",
                            letterSpacing: "0.4px",
                          }}
                        >
                          Balance
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "17%",
                            fontWeight: 800,
                            fontSize: "10px",
                            color: "#ffffff",
                            textAlign: "center",
                            py: 1,
                            px: 1,
                            borderTopRightRadius: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "0.4px",
                          }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leaveBalanceData.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? "#ffffff" : "#f8fafc",
                            "&:hover": { backgroundColor: "#f1f5f9" },
                            transition: "background-color 0.15s",
                          }}
                        >
                          <TableCell
                            sx={{
                              textAlign: "center",
                              py: 0.7,
                              px: 1,
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "#1e293b",
                              borderBottom: "1px solid #f1f5f9",
                            }}
                          >
                            {row.Description}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              py: 0.7,
                              px: 1,
                              borderBottom: "1px solid #f1f5f9",
                            }}
                          >
                            <Chip
                              label={row.Total}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: "10px",
                                fontWeight: 700,
                                backgroundColor: "#eff6ff",
                                color: "#1d4ed8",
                                borderRadius: "10px",
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              py: 0.7,
                              px: 1,
                              borderBottom: "1px solid #f1f5f9",
                            }}
                          >
                            <Chip
                              label={row.Taken}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: "10px",
                                fontWeight: 700,
                                backgroundColor: "#fdf2f8",
                                color: "#9d174d",
                                border: "1px solid #fbcfe8",
                                borderRadius: "10px",
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              py: 0.7,
                              px: 1,
                              borderBottom: "1px solid #f1f5f9",
                            }}
                          >
                            <Chip
                              label={row.Balance}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: "10px",
                                fontWeight: 700,
                                backgroundColor: "#ecfeff",
                                color: "#155e75",
                                border: "1px solid #a5f3fc",
                                borderRadius: "10px",
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              py: 0.7,
                              px: 1,
                              borderBottom: "1px solid #f1f5f9",
                            }}
                          >
                            <Tooltip title="View Details">
                              <Button
                                variant="contained"
                                onClick={() => {
                                  setModalTitle(`${row.Description} Details`);
                                  fetchLeaveDetails(row.Type, year);
                                  setOpenModal(true);
                                }}
                                sx={{
                                  backgroundColor: "#2563eb",
                                  "&:hover": { backgroundColor: "#1d4ed8" },
                                  color: "white",
                                  p: "4px",
                                  minWidth: "auto",
                                  borderRadius: "50%",
                                  boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
                                }}
                              >
                                <Visibility sx={{ fontSize: "13px" }} />
                              </Button>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow
                        sx={{
                          backgroundColor: "#f8fafc",
                          borderTop: "2px solid #e2e8f0",
                        }}
                      >
                        <TableCell
                          sx={{
                            textAlign: "center",
                            py: 1,
                            px: 1,
                            fontSize: "11px",
                            fontWeight: 800,
                            color: "#0f172a",
                          }}
                        >
                          Total Summary
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 800,
                            textAlign: "center",
                            py: 1,
                            px: 1,
                            fontSize: "11px",
                            color: "#1d4ed8",
                          }}
                        >
                          {totalLeave}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 800,
                            textAlign: "center",
                            py: 1,
                            px: 1,
                            fontSize: "11px",
                            color: "#9d174d",
                          }}
                        >
                          {totalTakenLeave}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 800,
                            textAlign: "center",
                            py: 1,
                            px: 1,
                            fontSize: "11px",
                            color: "#155e75",
                          }}
                        >
                          {totalBalanceLeave}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center", py: 1, px: 1 }}>
                          <Tooltip title="Leave Balance Design View">
                            <Button
                              variant="contained"
                              onClick={handleDesignButtonClick}
                              sx={{
                                backgroundColor: "#7c3aed",
                                "&:hover": { backgroundColor: "#6d28d9" },
                                color: "white",
                                p: "4px",
                                minWidth: "auto",
                                borderRadius: "50%",
                                boxShadow: "0 2px 6px rgba(124, 58, 237, 0.25)",
                              }}
                            >
                              <DesignServices sx={{ fontSize: "13px" }} />
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              )}
            </Paper>
          )}
        </>
      )}

      {[
        "LeaveBalance",
        "Punctuality",
        "NotEnteredLeave",
        "LeaveSummery",
      ].includes(selectedTab) && (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.8, sm: 2.2 },
            borderRadius: "18px",
            border: "1px solid #f1f5f9",
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 24px rgba(37, 99, 235, 0.04)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1.8,
              fontWeight: 800,
              fontSize: "0.95rem",
              color: "#0f172a",
            }}
          >
            {selectedTab === "LeaveBalance" && "Leave Balance Summary"}
            {selectedTab === "Punctuality" && "Punctuality Summary"}
            {selectedTab === "NotEnteredLeave" && "Not Entered Leave Summary"}
            {selectedTab === "LeaveSummery" && "Leave Summary"}
          </Typography>
          {isLoading ? (
            <Typography sx={{ p: 2, textAlign: "center", color: "#64748b", fontSize: 12 }}>
              Loading...
            </Typography>
          ) : (
            <>
              {selectedTab === "LeaveBalance" && <LeaveBalance />}
              {selectedTab === "Punctuality" && <Punctuality />}
              {selectedTab === "NotEnteredLeave" && (
                <NotEnteredLeave selectedYear={year} />
              )}
              {selectedTab === "LeaveSummery" && <LeaveSummery />}
            </>
          )}
        </Paper>
      )}

      {openLeaveSummaryModal && (
        <LeaveSummaryModal
          open={openLeaveSummaryModal}
          onClose={() => setOpenLeaveSummaryModal(false)}
        />
      )}

      {openModal && (
        <LeaveDetailsModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          rowData={leaveDetailsData}
          modalTitle={modalTitle}
        />
      )}
    </Box>
  );
};

export default Leave;
