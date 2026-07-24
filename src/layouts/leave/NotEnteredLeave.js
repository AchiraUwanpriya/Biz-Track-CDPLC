// import React, { useMemo } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useSelector } from "react-redux";
// import { Box, Grid, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Loader from "../../components/Utility/Loader";
// import NotFound from "../../components/Utility/NotFound";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 12,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme, isHighlighted }) => ({
//   backgroundColor: isHighlighted ? "lightblue" : theme.palette.action.hover,
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// export default function LeaveSummery({ selectedYear }) {
//   const { responseBody, loading, msg } = useSelector(
//     (state) => state.notEnteredLeave
//   );

//   const groupedData = responseBody.reduce((acc, record) => {
//     const date = new Date(record.Date);
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     if (year === selectedYear) {
//       if (!acc[month]) {
//         acc[month] = [];
//       }
//       acc[month].push(record);
//     }
//     return acc;
//   }, {});

//   const formatTime = (time) => {
//     const [hour, minute] = time.split(":");
//     const suffix = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minute} ${suffix}`;
//   };

//   const mappedItems = useMemo(() => {
//     return (
//       <div
//         style={{
//           display: "flex",
//           width: "100%",
//           flexDirection: "column",
//           // backgroundColor:'red'
//           //marginBottom:20,
//         }}
//       >
//         <TableContainer component={Paper}>
//           <Table>
//             <TableBody>
//               {Object.entries(groupedData).map(([month, records]) => (
//                 <React.Fragment key={month}>
//                   <StyledTableRow isHighlighted={true}>
//                     <StyledTableCell colSpan={3}>
//                       <Typography
//                         // variant="h6"
//                         align="center"
//                         sx={{ fontWeight: "bold" }}
//                       >
//                         {new Date(selectedYear, month).toLocaleString(
//                           "default",
//                           {
//                             month: "long",
//                           }
//                         )}
//                       </Typography>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                   {records.map((record, index) => (
//                     <TableRow key={index}>
//                       <StyledTableCell>
//                         <Typography variant="body1" align="center">
//                           {/* {new Date(record.date).toLocaleDateString()} */}
//                           {record.Date}
//                         </Typography>
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         {record.ClockIn === "" ? (
//                           <Typography variant="body1" align="center">
//                             Not set
//                           </Typography>
//                         ) : (
//                           <Typography variant="body1" align="center">
//                             In: {formatTime(record.ClockIn)}
//                           </Typography>
//                         )}
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         {record.ClockOut === "" ? (
//                           <Typography variant="body1" align="center">
//                             Not set
//                           </Typography>
//                         ) : (
//                           <Typography variant="body1" align="center">
//                             Out: {formatTime(record.ClockOut)}
//                           </Typography>
//                         )}
//                       </StyledTableCell>
//                     </TableRow>
//                   ))}
//                 </React.Fragment>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     );
//   }, [groupedData, selectedYear]);

//   return (
//     <>
//       {loading ? (
//         <Loader></Loader>
//       ) : (
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             width: "100%",
//             overflow: "auto",
//           }}
//         >
//           <Grid container rowSpacing={0.1}>
//             {responseBody.length > 0 ? mappedItems : <NotFound text={msg} />}
//           </Grid>
//         </Box>
//       )}
//     </>
//   );
// }





import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Box, Grid, Typography, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Loader from "../../components/Utility/Loader";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: 11,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    padding: "6px 12px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function LeaveSummery({ selectedYear }) {
  const { responseBody, loading } = useSelector(
    (state) => state.notEnteredLeave
  );

  // Group data by month
  const groupedData = responseBody.reduce((acc, record) => {
    const date = new Date(record.Date);
    const year = date.getFullYear();
    const month = date.getMonth();
    if (year === selectedYear) {
      if (!acc[month]) acc[month] = [];
      acc[month].push(record);
    }
    return acc;
  }, {});

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${suffix}`;
  };

  const mappedItems = useMemo(() => {
    return (
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            mt: 1
          }}
        >
          <Table size="small">
            <TableBody>
              {Object.entries(groupedData).map(([month, records]) => (
                <React.Fragment key={month}>
                  {/* Month Header */}
                  <TableRow
                    sx={{
                      background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                    }}
                  >
                    <TableCell
                      colSpan={3}
                      sx={{
                        py: 0.8,
                        textAlign: "center",
                        borderBottom: "none",
                      }}
                    >
                      <Typography
                        align="center"
                        sx={{
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          color: "#ffffff",
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                        }}
                      >
                        {new Date(selectedYear, month).toLocaleString("default", {
                          month: "long",
                        })}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {/* Column Headers */}
                  <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                    <StyledTableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 0.8, textTransform: "uppercase", letterSpacing: "0.4px", fontSize: 10 }}>
                      Date
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 0.8, textTransform: "uppercase", letterSpacing: "0.4px", fontSize: 10 }}>
                      Clock In
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontWeight: 800, color: "#475569", py: 0.8, textTransform: "uppercase", letterSpacing: "0.4px", fontSize: 10 }}>
                      Clock Out
                    </StyledTableCell>
                  </TableRow>

                  {/* Attendance Records */}
                  {records.map((record, index) => (
                    <StyledTableRow
                      key={index}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                        "&:hover": { backgroundColor: "#f1f5f9" },
                        transition: "background-color 0.15s",
                      }}
                    >
                      <StyledTableCell align="center">
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "#0f172a" }}>
                          {record.Date}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {record.ClockIn ? (
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              px: 1.5,
                              py: 0.3,
                              borderRadius: "16px",
                              backgroundColor: "#ecfdf5",
                              border: "1px solid #a7f3d0",
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "#065f46",
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                backgroundColor: "#10b981",
                                mr: 0.8,
                              }}
                            />
                            In: {formatTime(record.ClockIn)}
                          </Box>
                        ) : (
                          <Chip
                            label="Not set"
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: "11px",
                              fontWeight: 500,
                              backgroundColor: "#f1f5f9",
                              color: "#64748b",
                            }}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {record.ClockOut ? (
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              px: 1.5,
                              py: 0.3,
                              borderRadius: "16px",
                              backgroundColor: "#eff6ff",
                              border: "1px solid #bfdbfe",
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "#1d4ed8",
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                backgroundColor: "#2563eb",
                                mr: 0.8,
                              }}
                            />
                            Out: {formatTime(record.ClockOut)}
                          </Box>
                        ) : (
                          <Chip
                            label="Not set"
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: "11px",
                              fontWeight: 500,
                              backgroundColor: "#f1f5f9",
                              color: "#64748b",
                            }}
                          />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }, [groupedData, selectedYear]);

  const EmptyState = () => (
    <Grid item xs={12}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 4,
          mb: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            px: 5,
            py: 4,
            textAlign: "center",
            borderRadius: 3,
            border: "1px dashed #cbd5e1",
            backgroundColor: "#f8fafc",
            maxWidth: 420,
          }}
        >
          <EventBusyIcon
            sx={{ fontSize: 44, color: "#1976d2", mb: 1 }}
          />
          <Typography fontSize={15} fontWeight={700} color="#1e293b">
            Not Entered Leave summary not available
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: 13 }}>
            There is no Leave summary data available for the selected year.
          </Typography>
        </Paper>
      </Box>
    </Grid>
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", overflow: "auto" }}>
          <Grid container rowSpacing={1}>
            {responseBody && responseBody.length > 0 ? mappedItems : <EmptyState />}
          </Grid>
        </Box>
      )}
    </>
  );
}
