// import React, { useMemo } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useSelector } from "react-redux";
// import { Box, Grid, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Loader from "../../components/Utility/Loader";
// import NotFound from "../../components/Utility/NotFound"; 

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#1976d2",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme, bgColor }) => ({
//   backgroundColor: bgColor !== "" ? bgColor : theme.palette.action.hover,

//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// export default function Punctuality() {
//   const { responseBody, loading, msg } = useSelector(
//     (state) => state.punctuality
//   );

//   const mappedItems = useMemo(() => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     return (
//       <div
//         style={{
//           display: "flex",
//           width: "100%",
//           flexDirection: "column",
//           marginBottom: "10%",
//         }}
//       >
//         <TableContainer component={Paper}>
//           <Table sx={{}} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell align="center">Month</StyledTableCell>
//                 <StyledTableCell align="center"> Type</StyledTableCell>
//                 <StyledTableCell align="center"> Description</StyledTableCell>
//                 <StyledTableCell align="center">Cnt</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {responseBody.map((row, index) => (
//                 <StyledTableRow
//                   key={index}
//                   //isWeekEnd={row.day.toString().substring(0, 3)}
//                   bgColor={row.background_color}
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 >
//                   <TableCell
//                     component="th"
//                     scope="row"
//                     sx={{
//                       padding: 1,
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         backgroundColor: "#B5E8FF",
//                         padding: 1,
//                         borderRadius: 8,
//                       }}
//                     >
//                       <Typography fontSize={12} fontWeight={400} p={1}>
//                         {months[new Date(row.Month).getMonth()]}
//                       </Typography>
//                     </div>
//                   </TableCell>
//                   <TableCell align="center">
//                     {" "}
//                     <Typography fontSize={14} fontWeight={400} p={1}>
//                       {row.RuleType}
//                     </Typography>
//                   </TableCell>
//                   <TableCell align="center">
//                     {" "}
//                     <Typography fontSize={10} fontWeight={400} p={1}>
//                       {row.RuleDescription}
//                     </Typography>
//                   </TableCell>
//                   <TableCell align="center">
//                     <Typography fontSize={14} fontWeight={400} p={1}>
//                       {row.Cnt}
//                     </Typography>
//                   </TableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     );
//   }, [responseBody]);

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
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import Loader from "../../components/Utility/Loader";
import Chip from "@mui/material/Chip";

/* =======================
   Styled Components
======================= */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "transparent",
    color: theme.palette.common.white,
    fontWeight: 800,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    padding: "8px 12px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    padding: "6px 12px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, bgColor }) => ({
  backgroundColor: bgColor || theme.palette.action.hover,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/* =======================
   Component
======================= */

export default function Punctuality() {
  const { responseBody, loading } = useSelector(
    (state) => state.punctuality
  );

  const mappedItems = useMemo(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #f1f5f9",
          overflow: "hidden",
        }}
      >
        <Table aria-label="punctuality table" size="small">
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
              }}
            >
              <StyledTableCell align="center">Month</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {responseBody.map((row, index) => (
              <StyledTableRow
                key={index}
                bgColor={row.background_color}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                  "&:hover": { backgroundColor: "#f1f5f9" },
                  transition: "background-color 0.15s",
                }}
              >
                <TableCell align="center" sx={{ py: 1 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      px: 1.5,
                      py: 0.3,
                      borderRadius: "16px",
                      backgroundColor: "#ecfeff",
                      border: "1px solid #a5f3fc",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#155e75",
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#06b6d4",
                        mr: 0.8,
                      }}
                    />
                    {months[new Date(row.Month).getMonth()]}
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Typography fontSize={13} fontWeight={700} color="#0f172a">
                    {row.RuleType}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography fontSize={12} color="#475569">
                    {row.RuleDescription}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Chip
                    label={row.Cnt}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "11px",
                      height: 22,
                      minWidth: 28,
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                    }}
                  />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [responseBody]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            width: "100%",
            overflow: "auto",
          }}
        >
          <Grid container>
            {responseBody && responseBody.length > 0 ? (
              <Grid item xs={12}>
                {mappedItems}
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Box
                  sx={{
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
                      sx={{
                        fontSize: 44,
                        color: "#1976d2",
                        mb: 1,
                      }}
                    />

                    <Typography fontSize={15} fontWeight={700} color="#1e293b">
                      Punctuality summary not available
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, fontSize: 13 }}
                    >
                      There is no punctuality data available at the moment.
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}
