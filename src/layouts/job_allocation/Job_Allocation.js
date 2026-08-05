// import {
//   Box,
//   Grid,
//   Button,
//   Typography,
//   TextField,
//   styled,
//   Dialog,
//   DialogContent,
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import JobCard from "../../components/Cards/JobCard";
// import WorkOrderModal from "../../components/Utility/WorkOrderModal";
// import JobAllocationService from "../../service/JobAllocationService";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// const Job_Allocation = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [jobData, setJobData] = useState([]);
//   const [unassignedList, setUnassignedList] = useState([]);

//   useEffect(() => {
//     const fetchJobData = async () => {
//       const formattedDate = selectedDate.format("YYYY-MM-DD");

//       try {
//         const jobCardResponse = await JobAllocationService.GetJobCard(
//           formattedDate
//         );
//         if (jobCardResponse.data.StatusCode === 200) {
//           setJobData(jobCardResponse.data.ResultSet);
//         } else {
//           setJobData([]);
//         }

//         const unassignedListResponse =
//           await JobAllocationService.GetUnAssignedList(formattedDate);
//         if (unassignedListResponse.data.StatusCode === 200) {
//           setUnassignedList(unassignedListResponse.data.ResultSet);
//         } else {
//           setUnassignedList([]);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setJobData([]);
//         setUnassignedList([]);
//       }
//     };

//     fetchJobData();
//   }, [selectedDate]);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleDateChange = async (newValue) => {
//     setSelectedDate(newValue);
//   };

//   return (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           p: 2,
//           backgroundColor: "#f5f5f5",
//           borderBottom: "1px solid #ccc",
//           mb: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Typography variant="body1" sx={{ fontWeight: "bold", mr: 1 }}>
//             Date
//           </Typography>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               value={selectedDate}
//               onChange={handleDateChange}
//               renderInput={(params) => (
//                 <TextField {...params} size="small" sx={{ width: 150 }} />
//               )}
//             />
//           </LocalizationProvider>
//         </Box>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleOpenModal}
//           sx={{
//             backgroundColor: "#007bff",
//             color: "white",
//             textTransform: "none",
//           }}
//         >
//           New
//         </Button>
//       </Box>

//       {/* <Grid container rowSpacing={0}> */}
//         <JobCard
//           jobData={jobData}
//           unassignedList={unassignedList}
//           selectedDate={selectedDate}
//         />
//       {/* </Grid> */}

//       {/* Dialog */}
//       <BootstrapDialog
//         onClose={handleCloseModal}
//         aria-labelledby="customized-dialog-title"
//         open={openModal}
//       >
//         <DialogContent>
//           <WorkOrderModal onClose={handleCloseModal} />
//         </DialogContent>
//       </BootstrapDialog>
//     </div>
//   );
// };

// export default Job_Allocation;



import {
  Box,
  Button,
  Typography,
  TextField,
  styled,
  Dialog,
  DialogContent,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import JobCard from "../../components/Cards/JobCard";
import JobAllocationAttendence from "../../components/Utility/JobAllocationAttendence";
import WorkOrderModal from "../../components/Utility/WorkOrderModal";
import JobAllocationService from "../../service/JobAllocationService";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogPaper-root": {
    borderRadius: "18px",
    padding: theme.spacing(1),
    overflow: "hidden",
    boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
}));

const Job_Allocation = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [jobData, setJobData] = useState([]);
  const [unassignedList, setUnassignedList] = useState([]);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const fetchJobData = async () => {
      const formattedDate = selectedDate.format("YYYY-MM-DD");

      try {
        const jobCardResponse = await JobAllocationService.GetJobCard(
          formattedDate
        );
        if (jobCardResponse.data.StatusCode === 200) {
          setJobData(jobCardResponse.data.ResultSet);
        } else {
          setJobData([]);
        }

        const unassignedListResponse =
          await JobAllocationService.GetUnAssignedList(formattedDate);
        if (unassignedListResponse.data.StatusCode === 200) {
          setUnassignedList(unassignedListResponse.data.ResultSet);
        } else {
          setUnassignedList([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setJobData([]);
        setUnassignedList([]);
      }
    };

    fetchJobData();
  }, [selectedDate]);

  const handleOpenModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDateChange = async (newValue) => {
    setSelectedDate(newValue);
  };

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
          borderRadius: "18px",
          p: { xs: 2, sm: 2.5 },
          color: "#ffffff",
          boxShadow: "0 8px 24px rgba(37, 99, 235, 0.2)",
          mb: 2.5,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.4px",
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
              fontSize: { xs: "1.3rem", sm: "1.6rem" },
              letterSpacing: "0.5px",
              color: "#ffffff",
            }}
          >
            Job Allocation Management
          </Typography>
        </Box>

        {/* Date Selector & Action Buttons Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.2,
            backgroundColor: "#ffffff",
            p: 1.5,
            borderRadius: "14px",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* Date Picker Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <CalendarTodayIcon sx={{ color: "#2563eb", fontSize: 18 }} />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "#1e293b",
                mr: 0.3,
              }}
            >
              Date:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      width: 140,
                      "& .MuiInputBase-root, & .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: 600,
                        height: "36px !important",
                        minHeight: "36px !important",
                      },
                      "& .MuiInputBase-input, & .MuiOutlinedInput-input": {
                        padding: "6px 8px !important",
                        fontSize: "13px !important",
                      },
                      "& .MuiIconButton-root": {
                        padding: "4px",
                        "& .MuiSvgIcon-root": {
                          fontSize: "18px",
                        },
                      },
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    sx={{
                      width: 140,
                      "& .MuiInputBase-root, & .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: 600,
                        height: "36px !important",
                        minHeight: "36px !important",
                      },
                      "& .MuiInputBase-input, & .MuiOutlinedInput-input": {
                        padding: "6px 8px !important",
                        fontSize: "13px !important",
                      },
                      "& .MuiIconButton-root": {
                        padding: "4px",
                        "& .MuiSvgIcon-root": {
                          fontSize: "18px",
                        },
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 1.2, flexWrap: "nowrap" }}>
            <Button
              variant="contained"
              startIcon={<HowToRegIcon sx={{ fontSize: 18 }} />}
              onClick={() => handleOpenModal("attendance")}
              sx={{
                height: "36px",
                borderRadius: "18px",
                fontWeight: 700,
                fontSize: "13px",
                textTransform: "none",
                backgroundColor: "#f1f5f9",
                color: "#1e293b",
                boxShadow: "none",
                px: 2,
                "&:hover": {
                  backgroundColor: "#e2e8f0",
                  boxShadow: "none",
                },
              }}
            >
              Attendance
            </Button>

            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: 18 }} />}
              onClick={() => handleOpenModal("new")}
              sx={{
                height: "36px",
                borderRadius: "18px",
                fontWeight: 700,
                fontSize: "13px",
                textTransform: "none",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                px: 2,
                "&:hover": {
                  backgroundColor: "#1d4ed8",
                  boxShadow: "0 6px 16px rgba(37, 99, 235, 0.4)",
                },
              }}
            >
              New Job
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Main Job Cards Container */}
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <JobCard
          jobData={jobData}
          unassignedList={unassignedList}
          selectedDate={selectedDate}
        />
      </Box>

      {/* Dialog */}
      <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogContent>
          {modalType === "attendance" && (
            <JobAllocationAttendence
              onClose={handleCloseModal}
              selectedDate={selectedDate.format("YYYY-MM-DD")}
            />
          )}
          {modalType === "new" && <WorkOrderModal onClose={handleCloseModal} />}
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
};

export default Job_Allocation;

