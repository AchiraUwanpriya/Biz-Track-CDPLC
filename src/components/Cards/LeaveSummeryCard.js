// import React, { useState } from "react";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Box, Grid } from "@mui/material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function RecipeReviewCard({ dataList }) {
//   const [expanded, setExpanded] = useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
//   const formatDate = (inputDate) => {
//     const options = { weekday: "short", day: "2-digit", month: "short" };
//     const date = new Date(inputDate);
//     return date.toLocaleDateString("en-US", options);
//   };

//   return (
//     <Card sx={{ margin: 1 }}>
//       <CardContent
//         sx={{
//           padding: 1,
//         }}
//       >
//         <Box sx={{}}>
//           <Grid container direction="row">
//             <Box sx={{ display: "flex", zIndex: 999, width: "100%" }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   flex: 1,
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     width: "100%",
//                     paddingLeft: 8,
//                     paddingRight: 8,
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: 10,
//                         fontWeight: 400,
//                         fontFamily: "sans-serif",
//                         opacity: "60%",
//                       }}
//                     >
//                       {dataList.NoDays === "1"
//                         ? "Full Day Application"
//                         : "Half Day Application"}
//                     </Typography>
//                     <Typography
//                       sx={{
//                         fontSize: 14,
//                         fontWeight: 600,
//                         fontFamily: "sans-serif",
//                       }}
//                     >
//                       {formatDate(dataList.Date)}
//                     </Typography>
//                   </div>

//                   <div
//                     style={{
//                       display: "flex",
//                       backgroundColor:
//                         dataList.ApprovedDate !== ""
//                           ? dataList.LeaveType === "CS"
//                             ? "#40E0D0"
//                             : dataList.LeaveType === "AL"
//                             ? "#9ACD32"
//                             : dataList.LeaveType === "SK"
//                             ? "#BDB76B"
//                             : "#fff"
//                           : "#FF8066",
//                       padding: 5,
//                       borderRadius: 5,
//                       width: "40%",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: 14,
//                         fontWeight: 400,
//                         fontFamily: "sans-serif",
//                         color: "#646464",
//                       }}
//                     >
//                       {dataList.ApprovedDate !== ""
//                         ? "Approved"
//                         : "Not Approved"}
//                     </Typography>
//                   </div>
//                 </div>
//               </Box>
//             </Box>
//           </Grid>
//         </Box>
//       </CardContent>
//       <CardActions
//         disableSpacing
//         sx={{ padding: 0 }}
//         onClick={handleExpandClick}
//       >
//         <Typography
//           sx={{
//             fontSize: 12,
//             fontWeight: 600,
//             marginLeft: 2,
//             fontFamily: "sans-serif",
//             color:
//               dataList.LeaveType === "CS"
//                 ? "#40E0D0"
//                 : dataList.LeaveType === "AL"
//                 ? "#9ACD32"
//                 : dataList.LeaveType === "SK"
//                 ? "#BDB76B"
//                 : "#fff",
//           }}
//         >
//           {dataList.LeaveType === "CS"
//             ? "Casual "
//             : dataList.LeaveType === "AL"
//             ? "Annual "
//             : dataList.LeaveType === "SK"
//             ? "Sick "
//             : dataList.LeaveType === "SP"
//             ? "SPECIAL LEAVE "
//             : "Other"}
//         </Typography>

//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto">
//         <CardContent sx={{ padding: 0, paddingBottom: 0 }}>
//           <Box
//             sx={{
//               padding: 0,
//             }}
//           >
//             <Grid
//               container
//               spacing={0}
//               sx={{
//                 padding: 2,
//                 paddingBottom: 0,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   Form No{" "}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={8}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   : {dataList.LeaveFormNo}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   Leave Type{" "}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={8}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   :{" "}
//                   {dataList.LeaveType === "CS"
//                     ? "Casual Leave"
//                     : dataList.LeaveType === "AL"
//                     ? "Annual Leave"
//                     : dataList.LeaveType === "SK"
//                     ? "Sick Leave"
//                     : dataList.LeaveType === "SP"
//                     ? "Special Leave "
//                     : "Other"}
//                 </Typography>
//               </Grid>

//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   Reason{" "}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={8}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   : {dataList.Reason}
//                 </Typography>
//               </Grid>

//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   {" "}
//                   No of Days
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={8}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   : {dataList.NoDays}
//                 </Typography>
//               </Grid>

//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   Approved Date{" "}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={8}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   : {dataList.ApprovedDate}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid, Chip } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ dataList }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const formatDate = (inputDate) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  };

  const getDayNumber = (inputDate) => {
    const d = new Date(inputDate);
    return d.getDate() || "1";
  };

  const isApproved = dataList.ApprovedDate !== "";
  
  const getLeaveTypeBadge = (type) => {
    switch (type) {
      case "CS":
        return { label: "Casual", bg: "#ecfeff", border: "#a5f3fc", dot: "#06b6d4", color: "#155e75" };
      case "AL":
        return { label: "Annual", bg: "#ecfdf5", border: "#a7f3d0", dot: "#10b981", color: "#065f46" };
      case "SK":
        return { label: "Sick", bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b", color: "#92400e" };
      case "SP":
        return { label: "Special Leave", bg: "#f3e8ff", border: "#e9d5ff", dot: "#a855f7", color: "#6b21a8" };
      default:
        return { label: "Other", bg: "#f1f5f9", border: "#cbd5e1", dot: "#64748b", color: "#334155" };
    }
  };

  const leaveBadge = getLeaveTypeBadge(dataList.LeaveType);

  return (
    <Card
      elevation={0}
      sx={{
        margin: "6px 0",
        borderRadius: "14px",
        border: "1px solid #f1f5f9",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 10px rgba(37, 99, 235, 0.03)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(37, 99, 235, 0.06)",
          borderColor: "#cbd5e1",
        },
      }}
    >
      <CardContent sx={{ p: 1.5, pb: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Left item info with date box badge */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                backgroundColor: isApproved ? "#fef3c7" : "#eff6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 14,
                color: isApproved ? "#d97706" : "#2563eb",
                flexShrink: 0,
              }}
            >
              {getDayNumber(dataList.Date)}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#0f172a",
                }}
              >
                {formatDate(dataList.Date)}
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                }}
              >
                {dataList.NoDays === "1"
                  ? "Full Day Application"
                  : "Half Day Application"}
              </Typography>
            </Box>
          </Box>

          {/* Right Dot Pill Badge for Status */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 1.2,
              py: 0.3,
              borderRadius: "14px",
              backgroundColor: isApproved ? "#ecfdf5" : "#fdf2f8",
              border: isApproved ? "1px solid #a7f3d0" : "1px solid #fbcfe8",
              fontSize: "10px",
              fontWeight: 700,
              color: isApproved ? "#065f46" : "#9d174d",
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: isApproved ? "#10b981" : "#ec4899",
                mr: 0.6,
              }}
            />
            {isApproved ? "Approved" : "Not Approved"}
          </Box>
        </Box>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{ px: 2, py: 1, cursor: "pointer", borderTop: "1px solid #f8fafc" }}
        onClick={handleExpandClick}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            px: 1.2,
            py: 0.3,
            borderRadius: "16px",
            backgroundColor: leaveBadge.bg,
            border: `1px solid ${leaveBadge.border}`,
            fontSize: "11px",
            fontWeight: 700,
            color: leaveBadge.color,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: leaveBadge.dot,
              mr: 0.8,
            }}
          />
          {leaveBadge.label}
        </Box>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ p: 0.5 }}
        >
          <ExpandMoreIcon sx={{ fontSize: 20, color: "#64748b" }} />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto">
        <CardContent sx={{ p: 2, pt: 0 }}>
          {/* Dashed Notice Box styling for collapsed details */}
          <Box
            sx={{
              p: 2,
              borderRadius: "16px",
              border: "1.5px dashed #cbd5e1",
              backgroundColor: "#f8fafc",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>
                  Form No
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>
                  : {dataList.LeaveFormNo}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>
                  Leave Type
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>
                  : {leaveBadge.label}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>
                  Reason
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>
                  : {dataList.Reason || "-"}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>
                  No of Days
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>
                  : {dataList.NoDays}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>
                  Approved Date
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>
                  : {dataList.ApprovedDate || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
