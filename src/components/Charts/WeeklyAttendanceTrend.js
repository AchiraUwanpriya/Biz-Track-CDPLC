
// import React, { useState, useEffect } from "react";
// import { Box, Typography, ButtonGroup, Button } from "@mui/material";
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   BarChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ReferenceLine,
//   Cell,
// } from "recharts";

// // ─── Custom Tooltip ───────────────────────────────────────────────────────────
// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <Box
//         sx={{
//           backgroundColor: "#ffffff",
//           border: "1px solid #e2e8f0",
//           padding: "10px 14px",
//           borderRadius: "10px",
//           boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
//         }}
//       >
//         <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#1a2d4d", mb: 0.5 }}>
//           {payload[0].payload.name}
//         </Typography>
//         {payload.map((p, i) => (
//           <Box key={i} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//             <Box sx={{ width: 8, height: 8, backgroundColor: p.color, borderRadius: "50%" }} />
//             <Typography sx={{ fontSize: 11, color: "#64748b" }}>
//               {p.name}:{" "}
//               <span style={{ color: "#1a2d4d", fontWeight: 700 }}>
//                 {p.value}{p.name === "Rate %" || p.name === "Trend" ? "%" : ""}
//               </span>
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     );
//   }
//   return null;
// };

// const fmtK = (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v);

// // ─── Helper function for dynamic chart width ─────────────────────────────────
// const calculateChartDimensions = (dataLength, isMobile) => {
//   const baseWidth = dataLength * (isMobile ? 80 : 100);
//   const minWidth = 300;
//   const maxWidth = 1200;
//   return Math.min(maxWidth, Math.max(minWidth, baseWidth));
// };

// // ─── Arc gauge for rate cards ─────────────────────────────────────────────────
// const ARC_LEN = Math.PI * 52;
// const RateArc = ({ rate, color = "#004AAD" }) => {
//   const offset = ARC_LEN - (ARC_LEN * Math.min(rate, 100)) / 100;
//   return (
//     <svg width="130" height="72" viewBox="0 0 130 72" style={{ overflow: "visible" }}>
//       <path d="M10,65 A55,55 0 0,1 120,65" fill="none" stroke="#e2e8f0" strokeWidth="9" strokeLinecap="round" />
//       <path
//         d="M10,65 A55,55 0 0,1 120,65"
//         fill="none"
//         stroke={color}
//         strokeWidth="9"
//         strokeLinecap="round"
//         strokeDasharray={ARC_LEN}
//         strokeDashoffset={offset}
//         style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)" }}
//       />
//       <text x="65" y="62" textAnchor="middle" fontSize="22" fontWeight="700" fill={color}>
//         {rate.toFixed(1)}%
//       </text>
//     </svg>
//   );
// };

// // ─── Rate Card (Month / Year) ─────────────────────────────────────────────────
// const RateCard = ({ label, rate, color = "#004AAD", sub }) => (
//   <Box
//     sx={{
//       flex: 1,
//       minWidth: { xs: "140px", sm: "160px" },
//       backgroundColor: "#f8faff",
//       border: "1px solid #e2e8f0",
//       borderRadius: "14px",
//       p: { xs: "14px 10px", sm: "18px 16px" },
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: 0.5,
//     }}
//   >
//     <Typography
//       sx={{
//         fontSize: { xs: 11, sm: 12 },
//         fontWeight: 700,
//         color: "#64748b",
//         textTransform: "uppercase",
//         letterSpacing: "0.5px",
//       }}
//     >
//       {label}
//     </Typography>
//     <RateArc rate={rate} color={color} />
//     {sub && (
//       <Typography sx={{ fontSize: { xs: 10, sm: 11 }, color: "#94a3b8", mt: 0.5 }}>
//         {sub}
//       </Typography>
//     )}
//   </Box>
// );

// // ─── VIEW MODES ───────────────────────────────────────────────────────────────
// const VIEWS = [
//   { key: "year",  label: "Year"  },
//   { key: "month", label: "Month" },
//   { key: "week",  label: "Week"  },
// ];

// // ─── Legend Component ────────────────────────────────────────────────────────
// const LegendDot = ({ color, label }) => (
//   <Box sx={{ display: "flex", gap: 0.8, alignItems: "center" }}>
//     <Box sx={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: color }} />
//     <Typography sx={{ fontSize: { xs: 9, sm: 10 }, color: "#64748b" }}>{label}</Typography>
//   </Box>
// );

// const ChartLegend = ({ showTarget = true }) => (
//   <Box
//     sx={{
//       display: "flex",
//       gap: { xs: 1, sm: 2 },
//       alignItems: "center",
//       pt: 2,
//       borderTop: "1px solid #e5e7eb",
//       flexWrap: "wrap",
//     }}
//   >
//     <LegendDot color="#bfdbfe" label="Eligible" />
//     <LegendDot color="#3b82f6" label="Attendance" />
//     <LegendDot color="#f59e0b" label="Rate %" />
//     {showTarget && (
//       <Box sx={{ ml: "auto", display: "flex", gap: 1, alignItems: "center" }}>
//         <Box sx={{ width: 20, height: 0, borderBottom: "2px dashed #ef4444" }} />
//         <Typography sx={{ fontSize: { xs: 9, sm: 10 }, color: "#64748b" }}>Target</Typography>
//       </Box>
//     )}
//   </Box>
// );

// // ─── Empty State ─────────────────────────────────────────────────────────────
// const EmptyState = ({ height = 200, message = "No data available" }) => (
//   <Box
//     sx={{
//       height,
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#94a3b8",
//       fontSize: 13,
//       gap: 1,
//     }}
//   >
//     <Box sx={{ fontSize: 40, opacity: 0.3 }}>📊</Box>
//     <Typography sx={{ color: "#94a3b8", fontSize: 13 }}>{message}</Typography>
//   </Box>
// );

// // ─── FIXED BAR SIZE - SAME FOR ALL VIEWS ──────────────────────────────────
// const getFixedBarSize = (dataLength) => {
//   if (dataLength <= 7) return 32;  
//   if (dataLength <= 31) return 28; 
//   if (dataLength <= 90) return 26;  
//   if (dataLength <= 180) return 24; 
//   return 22;
// };

// const AttendanceChart = ({ 
//   data, 
//   view, 
//   isMobile, 
//   targetEligible,
//   chartMargin,
//   yAxisWidth,
//   yAxisRightW,
//   chartHeight 
// }) => {

//   const barSize = getFixedBarSize(data.length);

//   const showDots = data.length <= 30;
//   const dotSize = data.length <= 15 ? 4 : 3;
  
//   const getTickInterval = () => {
//     if (data.length <= 15) return 0;
//     if (data.length <= 31) return 2;
//     if (view === "year") return 10;
//     if (data.length <= 60) return 4;
//     if (data.length <= 100) return 6;
//     if (data.length <= 180) return 10;
//     return Math.floor(data.length / 20);
//   };


// const shouldAngleLabels = data.length > 20;
// const labelAngle = shouldAngleLabels ? -45 : 0;
// const labelAnchor = shouldAngleLabels ? "end" : "middle";
// const labelHeight = 30;

//   const getTickFontSize = () => {
//     if (data.length <= 15) return 11;
//     if (data.length <= 31) return 10;
//     if (data.length <= 60) return 9;
//     if (data.length <= 100) return 8;
//     return 8;
//   };

//   return ( 
//     <Box sx={{ height: chartHeight, width: "100%" }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <ComposedChart data={data} margin={chartMargin} barCategoryGap="30%" barGap={0}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//           <XAxis
//             dataKey="name"
//             axisLine={false}
//             tickLine={false}
//             tick={{ 
//               fill: "#64748b", 
//               fontSize: getTickFontSize() 
//             }}
//             angle={labelAngle}
//             textAnchor={labelAnchor}
//             height={labelHeight}
//             interval={getTickInterval()}
//           />
//           <YAxis
//             yAxisId="left"
//             orientation="left"
//             tickLine={false}
//             axisLine={false}
//             tick={{ fill: "#64748b", fontSize: 10 }}
//             width={yAxisWidth}
//             tickFormatter={fmtK}
//           />
//           <YAxis
//             yAxisId="right"
//             orientation="right"
//             tickLine={false}
//             axisLine={false}
//             tick={{ fill: "#64748b", fontSize: 10 }}
//             domain={[0, 100]}
//             ticks={[0, 25, 50, 75, 100]}
//             width={yAxisRightW}
//             tickFormatter={(v) => `${v}%`}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <ReferenceLine
//             y={targetEligible}
//             stroke="#ef4444"
//             strokeDasharray="4 4"
//             yAxisId="left"
//             strokeWidth={1.5}
//           />
//           <Bar 
//             yAxisId="left" 
//             dataKey="eligible" 
//             name="Eligible" 
//             barSize={barSize}
//             fill="#bfdbfe" 
//             radius={[6,6,6,6]} 
//           />
//           <Bar 
//             yAxisId="left" 
//             dataKey="attendance" 
//             name="Attendance" 
//             barSize={barSize * 0.65}
//             fill="#3b82f6" 
//             radius={[6,6,6,6]} 
//           />
//           <Line
//             yAxisId="right"
//             type="monotone"
//             dataKey="rate"
//             name="Rate %"
//             stroke="#f59e0b"
//             strokeWidth={data.length > 60 ? 2 : 2.5}
//             dot={showDots ? { r: dotSize, fill: "#f59e0b" } : false}
//             activeDot={{ r: 5 }}
//           />
//         </ComposedChart>
//       </ResponsiveContainer>
//     </Box>
//   );
// };
// // ─── Main Component ───────────────────────────────────────────────────────────
// export function WeeklyAttendanceTrend({
//   weeklyApiData = [],
//   targetEligible = 1700,
//   targetRate = 75,
// }) {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [view, setView] = useState("year");

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // ─── Filter and process data based on date ranges ──────────────────────────
//   const processData = () => {
//     if (!weeklyApiData || weeklyApiData.length === 0) {
//       return { weekData: [], monthData: [], yearData: [] };
//     }

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Helper: Filter data by date range
//     const filterByDateRange = (data, startDate, endDate) => {
//       return data.filter(item => {
//         const itemDate = new Date(item.AttDate);
//         itemDate.setHours(0, 0, 0, 0);
//         return itemDate >= startDate && itemDate <= endDate;
//       });
//     };

//     // ── WEEK DATA (last 7 days including today) ──
//     const weekStart = new Date(today);
//     weekStart.setDate(today.getDate() - 6);
//     const weekRawData = filterByDateRange(weeklyApiData, weekStart, today);

//     const weekData = weekRawData.map(item => ({
//       name: item.DayName ? item.DayName.substring(0, 3) : "N/A",
//       eligible: parseInt(item.Eligible) || 0,
//       attendance: parseInt(item.Attendance) || 0,
//       rate: item.Eligible ? Math.round((parseInt(item.Attendance) / parseInt(item.Eligible)) * 100) : 0,
//       fullDate: item.AttDate,
//       dayName: item.DayName || "",
//     }));

//     // ── MONTH DATA (1st of current month to today) ──
//     const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
//     const monthRawData = filterByDateRange(weeklyApiData, monthStart, today);

//     const monthData = monthRawData.map(item => ({
//       name: item.DayName ? item.DayName.substring(0, 3) : "N/A",
//       eligible: parseInt(item.Eligible) || 0,
//       attendance: parseInt(item.Attendance) || 0,
//       rate: item.Eligible ? Math.round((parseInt(item.Attendance) / parseInt(item.Eligible)) * 100) : 0,
//       fullDate: item.AttDate,
//       dayName: item.DayName || "",
//     }));

//     // ── YEAR DATA (Jan 1 of current year to today - ALL DAYS) ──
//     const yearStart = new Date(today.getFullYear(), 0, 1);
//     const yearRawData = filterByDateRange(weeklyApiData, yearStart, today);

//     const yearData = yearRawData.map(item => {
//       const date = new Date(item.AttDate);
//       const monthNum = date.getMonth();
//       const dayNum = date.getDate();
//       const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
//       return {
//         name: label,
//         fullDate: item.AttDate,
//         dayName: item.DayName || "",
//         eligible: parseInt(item.Eligible) || 0,
//         attendance: parseInt(item.Attendance) || 0,
//         rate: item.Eligible ? Math.round((parseInt(item.Attendance) / parseInt(item.Eligible)) * 100) : 0,
//         monthNum: monthNum,
//         dayNum: dayNum,
//       };
//     });

//     return { weekData, monthData, yearData };
//   };

//   const { weekData, monthData, yearData } = processData();

//   // ── Derived ───────────────────────────────────────────────────────────────
//   const isMonthView = view === "month";
//   const isYearView  = view === "year";
//   const isWeekView  = view === "week";

//   const weekEmpty  = weekData.length === 0;
//   const monthEmpty = monthData.length === 0;
//   const yearEmpty  = yearData.length === 0;

//   const chartHeight = isMobile ? 250 : 310;
//   const yAxisWidth  = isMobile ? 48 : 58;
//   const yAxisRightW = isMobile ? 44 : 54;
  
//   const chartMargin = {
//     top:    16,
//     right:  isMobile ? -8  : -12,
//     left:   isMobile ? -18 : -20,
//     bottom: 1,
//   };

//   const titles = {
//     week:  { title: "CDL Weekly Attendance Trend",  sub: "Last 7 days attendance with rate overlay" },
//     month: { title: "CDL Monthly Attendance",       sub: `${new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })} - Daily attendance breakdown` },
//     year:  { title: "CDL Yearly Attendance",        sub: `Attendance from Jan 1 to ${new Date().toLocaleString('en-US', { month: 'long', day: 'numeric' })}` },
//   };

//   // ─── Calculate average rate for year ──────────────────────────────────────
//   const getYearSummary = () => {
//     if (yearData.length === 0) return null;
//     const totalEligible = yearData.reduce((sum, d) => sum + d.eligible, 0);
//     const totalAttendance = yearData.reduce((sum, d) => sum + d.attendance, 0);
//     const avgRate = totalEligible ? Math.round((totalAttendance / totalEligible) * 100) : 0;
//     return {
//       avgRate,
//       totalDays: yearData.length,
//       totalEligible,
//       totalAttendance,
//     };
//   };

//   const yearSummary = getYearSummary();

//   // ─── Format date for tooltip ──────────────────────────────────────────────
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-US", { 
//       weekday: 'short',
//       month: 'short', 
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   // ─── Get current data based on view ──────────────────────────────────────
//   const getCurrentData = () => {
//     switch(view) {
//       case 'week': return weekData;
//       case 'month': return monthData;
//       case 'year': return yearData;
//       default: return yearData;
//     }
//   };

//   const currentData = getCurrentData();
//   const isEmpty = currentData.length === 0;

//   return (
//     <Box sx={{ animation: "fadeInUp 0.5s ease-out 0.2s forwards", opacity: 0 }}>
//       <Box
//         sx={{
//           overflow: "hidden",
//           backgroundColor: "#ffffff",
//           borderRadius: "12px",
//           padding: { xs: "14px", sm: "20px" },
//           boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//           border: "1px solid #e2e8f0",
//         }}
//       >
//         {/* ── Header ── */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             flexWrap: "wrap",
//             gap: 1,
//             mb: 2,
//           }}
//         >
//           <Box>
//             <Typography sx={{ fontSize: { xs: 13, sm: 15 }, fontWeight: 700, color: "#1a2d4d", mb: "2px" }}>
//               {titles[view].title}
//             </Typography>
//             <Typography sx={{ fontSize: { xs: 10, sm: 11 }, color: "#94a3b8" }}>
//               {titles[view].sub}
//             </Typography>
//           </Box>

//           {/* Toggle */}
//           <ButtonGroup size="small" variant="outlined" sx={{ flexShrink: 0, borderRadius: "5px", overflow: "hidden" }}>
//             {VIEWS.map(({ key, label }) => (
//               <Button
//                 key={key}
//                 onClick={() => setView(key)}
//                 disableRipple={false}
//                 sx={{
//                   fontSize:        { xs: "10px", sm: "11px" },
//                   px:              { xs: 1.4, sm: 2 },
//                   py:              0.65,
//                   textTransform:   "none",
//                   fontWeight:      view === key ? 700 : 500,
//                   backgroundColor: view === key ? "#004AAD" : "transparent",
//                   color:           view === key ? "#ffffff"  : "#004AAD",
//                   borderColor:     "#004AAD",
//                   transition:      "all 0.2s",
//                   "&:hover": {
//                     backgroundColor: view === key ? "#003a8c" : "rgba(0,74,173,0.07)",
//                     borderColor: "#003a8c",
//                   },
//                 }}
//               >
//                 {label}
//               </Button>
//             ))}
//           </ButtonGroup>
//         </Box>

//         {/* ════════════════════════════════════════
//             SINGLE CHART - SAME BAR SIZE FOR ALL VIEWS
//         ════════════════════════════════════════ */}
//         {isEmpty ? (
//           <EmptyState 
//             height={chartHeight} 
//             message={`No data available for ${view} view`} 
//           />
//         ) : (
//           <>
//             <AttendanceChart
//               data={currentData}
//               view={view}
//               isMobile={isMobile}
//               targetEligible={targetEligible}
//               chartMargin={chartMargin}
//               yAxisWidth={yAxisWidth}
//               yAxisRightW={yAxisRightW}
//               chartHeight={chartHeight}
//             />
            
//             {/* Legend - consistent across all views */}
//             <ChartLegend showTarget={true} />
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default WeeklyAttendanceTrend;






//-------------------------------------- Stack ON --------------------------------------------- //


import React, { useState, useEffect } from "react";
import { Box, Typography, ButtonGroup, Button, TextField, Popover } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
 
const formatTooltipDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
 
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) { 
    const row = payload[0].payload; 
    const headerLabel = formatTooltipDate(row.fullDate) || row.name;
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          padding: "10px 14px",
          borderRadius: "10px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        }}
      >
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#1a2d4d", mb: 0.5 }}>
          {headerLabel}
        </Typography>
        {payload.map((p, i) => { 
          if (p.dataKey === "remaining") {
            return (
              <Box key={i} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Box sx={{ width: 8, height: 8, backgroundColor: "#bfdbfe", borderRadius: "50%" }} />
                <Typography sx={{ fontSize: 11, color: "#64748b" }}>
                  Eligible:{" "}
                  <span style={{ color: "#1a2d4d", fontWeight: 700 }}>{row.eligible}</span>
                </Typography>
              </Box>
            );
          }
          return (
            <Box key={i} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Box sx={{ width: 8, height: 8, backgroundColor: p.color, borderRadius: "50%" }} />
              <Typography sx={{ fontSize: 11, color: "#64748b" }}>
                {p.name}:{" "}
                <span style={{ color: "#1a2d4d", fontWeight: 700 }}>
                  {p.value}{p.name === "Rate %" || p.name === "Trend" ? "%" : ""}
                </span>
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  }
  return null;
};

const fmtK = (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v);
 
const calculateChartDimensions = (dataLength, isMobile) => {
  const baseWidth = dataLength * (isMobile ? 80 : 100);
  const minWidth = 300;
  const maxWidth = 1200;
  return Math.min(maxWidth, Math.max(minWidth, baseWidth));
};
 
const ARC_LEN = Math.PI * 52;
const RateArc = ({ rate, color = "#004AAD" }) => {
  const offset = ARC_LEN - (ARC_LEN * Math.min(rate, 100)) / 100;
  return (
    <svg width="130" height="72" viewBox="0 0 130 72" style={{ overflow: "visible" }}>
      <path d="M10,65 A55,55 0 0,1 120,65" fill="none" stroke="#e2e8f0" strokeWidth="9" strokeLinecap="round" />
      <path
        d="M10,65 A55,55 0 0,1 120,65"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={ARC_LEN}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)" }}
      />
      <text x="65" y="62" textAnchor="middle" fontSize="22" fontWeight="700" fill={color}>
        {rate.toFixed(1)}%
      </text>
    </svg>
  );
};
 
const RateCard = ({ label, rate, color = "#004AAD", sub }) => (
  <Box
    sx={{
      flex: 1,
      minWidth: { xs: "140px", sm: "160px" },
      backgroundColor: "#f8faff",
      border: "1px solid #e2e8f0",
      borderRadius: "14px",
      p: { xs: "14px 10px", sm: "18px 16px" },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0.5,
    }}
  >
    <Typography
      sx={{
        fontSize: { xs: 11, sm: 12 },
        fontWeight: 700,
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
      {label}
    </Typography>
    <RateArc rate={rate} color={color} />
    {sub && (
      <Typography sx={{ fontSize: { xs: 10, sm: 11 }, color: "#94a3b8", mt: 0.5 }}>
        {sub}
      </Typography>
    )}
  </Box>
);
 

const VIEWS = [
  { key: "week",  label: "Week"  },
  { key: "month", label: "Month" },
  { key: "year",  label: "Year"  },
  { key: "range", label: "Range" },
];
 
const LegendDot = ({ color, label }) => (
  <Box sx={{ display: "flex", gap: 0.8, alignItems: "center" }}>
    <Box sx={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: color }} />
    <Typography sx={{ fontSize: { xs: 9, sm: 10 }, color: "#64748b" }}>{label}</Typography>
  </Box>
);

const ChartLegend = ({ showTarget = true }) => (
  <Box
    sx={{
      display: "flex",
      gap: { xs: 1, sm: 2 },
      alignItems: "center",
      pt: 2,
      borderTop: "1px solid #e5e7eb",
      flexWrap: "wrap",
    }}
  >
    <LegendDot color="#3b82f6" label="Attendance" />
    <LegendDot color="#bfdbfe" label="Eligible" />
    <LegendDot color="#f59e0b" label="Rate %" />
    {showTarget && (
      <Box sx={{ ml: "auto", display: "flex", gap: 1, alignItems: "center" }}>
        <Box sx={{ width: 20, height: 0, borderBottom: "2px dashed #ef4444" }} />
        <Typography sx={{ fontSize: { xs: 9, sm: 10 }, color: "#64748b" }}>Target</Typography>
      </Box>
    )}
  </Box>
);

// ─── Empty State ─────────────────────────────────────────────────────────────
const EmptyState = ({ height = 200, message = "No data available" }) => (
  <Box
    sx={{
      height,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#94a3b8",
      fontSize: 13,
      gap: 1,
    }}
  >
    <Box sx={{ fontSize: 40, opacity: 0.3 }}>📊</Box>
    <Typography sx={{ color: "#94a3b8", fontSize: 13 }}>{message}</Typography>
  </Box>
);

// ─── FIXED BAR SIZE - SAME FOR ALL VIEWS ──────────────────────────────────
const getFixedBarSize = (dataLength) => {
  if (dataLength <= 7) return 32;
  if (dataLength <= 31) return 28;
  if (dataLength <= 90) return 26;
  if (dataLength <= 180) return 24;
  return 22;
};

const AttendanceChart = ({
  data,
  view,
  isMobile,
  targetEligible,
  chartMargin,
  yAxisWidth,
  yAxisRightW,
  chartHeight
}) => {

  const barSize = getFixedBarSize(data.length);

  const showDots = data.length <= 30;
  const dotSize = data.length <= 15 ? 4 : 3;

  const getTickInterval = () => {
    if (data.length <= 15) return 0;
    if (data.length <= 31) return 2;
    if (view === "year") return 10;
    if (data.length <= 60) return 4;
    if (data.length <= 100) return 6;
    if (data.length <= 180) return 10;
    return Math.floor(data.length / 20);
  };


const shouldAngleLabels = data.length > 20;
const labelAngle = shouldAngleLabels ? -45 : 0;
const labelAnchor = shouldAngleLabels ? "end" : "middle";
const labelHeight = 30;

  const getTickFontSize = () => {
    if (data.length <= 15) return 11;
    if (data.length <= 31) return 10;
    if (data.length <= 60) return 9;
    if (data.length <= 100) return 8;
    return 8;
  };
 
  const stackedData = data.map((d) => ({
    ...d,
    remaining: Math.max(0, (d.eligible || 0) - (d.attendance || 0)),
  }));

  return (
    <Box sx={{ height: chartHeight, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={stackedData} margin={chartMargin} barCategoryGap="30%" barGap={0}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#64748b",
              fontSize: getTickFontSize()
            }}
            angle={labelAngle}
            textAnchor={labelAnchor}
            height={labelHeight}
            interval={getTickInterval()}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#64748b", fontSize: 10 }}
            width={yAxisWidth}
            tickFormatter={fmtK}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#64748b", fontSize: 10 }}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            width={yAxisRightW}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={targetEligible}
            stroke="#ef4444"
            strokeDasharray="4 4"
            yAxisId="left"
            strokeWidth={1.5}
          />

          {/* Bottom segment: Attendance (stacked) */}
          <Bar
            yAxisId="left"
            dataKey="attendance"
            name="Attendance"
            stackId="bars"
            barSize={barSize}
            fill="#3b82f6"
            radius={[0, 0, 6, 6]}
          />
 
          <Bar
            yAxisId="left"
            dataKey="remaining"
            name="Eligible"
            stackId="bars"
            barSize={barSize}
            fill="#bfdbfe"
            radius={[6, 6, 0, 0]}
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="rate"
            name="Rate %"
            stroke="#f59e0b"
            strokeWidth={data.length > 60 ? 2 : 2.5}
            dot={showDots ? { r: dotSize, fill: "#f59e0b" } : false}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

// ─── UPDATED: Date Range Picker Component ────────────────────────────────
const DateRangePicker = ({ 
  startDate, 
  endDate, 
  onStartChange, 
  onEndChange, 
  isMobile,
  show = true   
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  if (!show) {
    return null;
  }

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleClick}
        startIcon={<CalendarTodayIcon />}
        sx={{
          fontSize: { xs: "10px", sm: "11px" },
          textTransform: "none",
          color: "#004AAD",
          borderColor: "#004AAD",
          px: { xs: 1.5, sm: 2 },
          py: 0.65,
          "&:hover": {
            backgroundColor: "rgba(0,74,173,0.07)",
            borderColor: "#003a8c",
          },
        }}
      >
        {startDate && endDate 
          ? `${formatTooltipDate(startDate)} - ${formatTooltipDate(endDate)}`
          : "Select Range"}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            p: 2,
            maxWidth: { xs: "90vw", sm: 400 },
            width: { xs: "90vw", sm: 380 },
          }
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: "#1a2d4d" }}>
              Select Date Range
            </Typography>
            
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={onStartChange}
              maxDate={endDate || new Date()}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                }
              }}
            />
            
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={onEndChange}
              minDate={startDate}
              maxDate={new Date()}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                }
              }}
            />

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 1 }}>
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => {
                  onStartChange(null);
                  onEndChange(null);
                  handleClose();
                }}
                sx={{ textTransform: "none" }}
              >
                Clear
              </Button>
              <Button 
                size="small" 
                variant="contained" 
                onClick={handleClose}
                sx={{ 
                  textTransform: "none",
                  backgroundColor: "#004AAD",
                  "&:hover": { backgroundColor: "#003a8c" }
                }}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </LocalizationProvider>
      </Popover>
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export function WeeklyAttendanceTrend({
  weeklyApiData = [],
  targetEligible = 1700,
  targetRate = 75,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [view, setView] = useState("week");
  
  // ─── Date range state ──────────────────────────────────────────────────
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ─── Filter and process data based on date ranges ──────────────────────────
  const processData = () => {
    if (!weeklyApiData || weeklyApiData.length === 0) {
      return { weekData: [], monthData: [], yearData: [], rangeData: [] };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
 
    const filterByDateRange = (data, startDate, endDate) => {
      return data
        .filter(item => {
          const itemDate = new Date(item.AttDate);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= startDate && itemDate <= endDate;
        })
        .sort((a, b) => new Date(a.AttDate) - new Date(b.AttDate));
    };

    // ── WEEK DATA (last 7 days including today) ──
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6);
    const weekRawData = filterByDateRange(weeklyApiData, weekStart, today);

    const weekData = weekRawData.map(item => ({
      name: item.DayName ? item.DayName.substring(0, 3) : "N/A",
      eligible: parseInt(item.Eligible) || 0,
      attendance: parseInt(item.Attendance) || 0,
      rate: item.Eligible ? Math.round((parseInt(item.Attendance) / parseInt(item.Eligible)) * 100) : 0,
      fullDate: item.AttDate,
      dayName: item.DayName || "",
    }));

    // ── MONTH DATA (1st of current month to today) ──
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthRawData = filterByDateRange(weeklyApiData, monthStart, today);

    const monthData = monthRawData.map(item => {
      const date = new Date(item.AttDate);
      return {
        name: String(date.getDate()),
        eligible: parseInt(item.Eligible) || 0,
        attendance: parseInt(item.Attendance) || 0,
        rate: item.Eligible ? Math.round((parseInt(item.Attendance) / parseInt(item.Eligible)) * 100) : 0,
        fullDate: item.AttDate,
        dayName: item.DayName || "",
      };
    });

    // ── YEAR DATA (Jan 1 of current year to today - ALL DAYS) ──
    const yearStart = new Date(today.getFullYear(), 0, 1);
    const yearRawData = filterByDateRange(weeklyApiData, yearStart, today);

    const yearData = yearRawData.map(item => {
      const date = new Date(item.AttDate);
      const monthNum = date.getMonth();
      const dayNum = date.getDate();
      const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      return {
        name: label,
        fullDate: item.AttDate,
        dayName: item.DayName || "",
        eligible: parseInt(item.Eligible) || 0,
        attendance: parseInt(item.Attendance) || 0,
        //rate: item.Eligible ? Math.round((parseInt(item.Attendance) / parseInt(item.Eligible)) * 100) : 0,
        monthNum: monthNum,
        dayNum: dayNum,
      };
    });

    // ── RANGE DATA (custom date range) ──
    let rangeData = [];
    if (startDate && endDate) {
      const rangeRawData = filterByDateRange(weeklyApiData, startDate, endDate);
      rangeData = rangeRawData.map(item => {
        const date = new Date(item.AttDate);
        const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return {
          name: label,
          fullDate: item.AttDate,
          dayName: item.DayName || "",
          eligible: parseInt(item.Eligible) || 0,
          attendance: parseInt(item.Attendance) || 0,
          rate: item.Eligible ? Math.round((parseInt(item.Attendance) / parseInt(item.Eligible)) * 100) : 0,
        };
      });
    }

    return { weekData, monthData, yearData, rangeData };
  };

  const { weekData, monthData, yearData, rangeData } = processData();

  // ── Derived ───────────────────────────────────────────────────────────────
  const isRangeView = view === "range";
  const isMonthView = view === "month";
  const isYearView  = view === "year";
  const isWeekView  = view === "week";

  const weekEmpty  = weekData.length === 0;
  const monthEmpty = monthData.length === 0;
  const yearEmpty  = yearData.length === 0;
  const rangeEmpty = rangeData.length === 0;

  const chartHeight = isMobile ? 250 : 310;
  const yAxisWidth  = isMobile ? 48 : 58;
  const yAxisRightW = isMobile ? 44 : 54;

  const chartMargin = {
    top:    16,
    right:  isMobile ? -8  : -12,
    left:   isMobile ? -18 : -20,
    bottom: 1,
  };

  const titles = {
    week:  { title: "CDL Weekly Attendance ",  },
    month: { title: "CDL Monthly Attendance",       },
    year:  { title: "CDL Yearly Attendance",         },
    range: { 
      title: "CDL Custom Range Attendance", 
      sub: startDate && endDate 
        ? `${formatTooltipDate(startDate)} to ${formatTooltipDate(endDate)}` 
        : "Select a date range to view data" 
    },
  };

  // ─── Calculate average rate for year ──────────────────────────────────────
  const getYearSummary = () => {
    if (yearData.length === 0) return null;
    const totalEligible = yearData.reduce((sum, d) => sum + d.eligible, 0);
    const totalAttendance = yearData.reduce((sum, d) => sum + d.attendance, 0);
    const avgRate = totalEligible ? Math.round((totalAttendance / totalEligible) * 100) : 0;
    return {
      avgRate,
      totalDays: yearData.length,
      totalEligible,
      totalAttendance,
    };
  };

  const yearSummary = getYearSummary();

  // ─── Get current data based on view ──────────────────────────────────────
  const getCurrentData = () => {
    switch(view) {
      case 'week': return weekData;
      case 'month': return monthData;
      case 'year': return yearData;
      case 'range': return rangeData;
      default: return yearData;
    }
  };

  const currentData = getCurrentData();
  const isEmpty = currentData.length === 0;

  // ─── Handle view change ─────────────────────────────────────────────────
  const handleViewChange = (newView) => {
    setView(newView); 
    if (newView !== "range") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ animation: "fadeInUp 0.5s ease-out 0.2s forwards", opacity: 0 }}>
        <Box
          sx={{
            overflow: "hidden",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: { xs: "14px", sm: "20px" },
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* ── Header ── */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 1,
              mb: 2,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: { xs: 13, sm: 15 }, fontWeight: 700, color: "#1a2d4d", mb: "2px" }}>
                {titles[view].title}
              </Typography>
              <Typography sx={{ fontSize: { xs: 10, sm: 11 }, color: "#94a3b8" }}>
                {titles[view].sub}
              </Typography>
            </Box>

            {/* ── Controls ── */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
              {/* Toggle Buttons */}
              <ButtonGroup size="small" variant="outlined" sx={{ borderRadius: "5px", overflow: "hidden" }}>
                {VIEWS.map(({ key, label }) => (
                  <Button
                    key={key}
                    onClick={() => handleViewChange(key)}
                    disableRipple={false}
                    sx={{
                      fontSize:        { xs: "10px", sm: "11px" },
                      px:              { xs: 1.4, sm: 2 },
                      py:              0.65,
                      textTransform:   "none",
                      fontWeight:      view === key ? 700 : 500,
                      backgroundColor: view === key ? "#004AAD" : "transparent",
                      color:           view === key ? "#ffffff"  : "#004AAD",
                      borderColor:     "#004AAD",
                      transition:      "all 0.2s",
                      "&:hover": {
                        backgroundColor: view === key ? "#003a8c" : "rgba(0,74,173,0.07)",
                        borderColor: "#003a8c",
                      },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </ButtonGroup>

              {/* ──── UPDATED: Date Range Picker - Hides when not in Range view ──── */}
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartChange={(date) => {
                  setStartDate(date);
                  if (date && endDate && date > endDate) {
                    setEndDate(null);
                  }
                }}
                onEndChange={(date) => {
                  setEndDate(date);
                  if (date && startDate && date < startDate) {
                    setStartDate(null);
                  }
                }}
                isMobile={isMobile}
                show={isRangeView}   
              />
            </Box>
          </Box>

          {/* ════════════════════════════════════════
              SINGLE CHART - SAME BAR SIZE FOR ALL VIEWS
          ════════════════════════════════════════ */}
          {isEmpty ? (
            <EmptyState
              height={chartHeight}
              message={view === "range" && !startDate && !endDate 
                ? "Please select a date range using the calendar button" 
                : `No data available for ${view} view`}
            />
          ) : (
            <>
              <AttendanceChart
                data={currentData}
                view={view}
                isMobile={isMobile}
                targetEligible={targetEligible}
                chartMargin={chartMargin}
                yAxisWidth={yAxisWidth}
                yAxisRightW={yAxisRightW}
                chartHeight={chartHeight}
              />

              {/* Legend - consistent across all views */}
              <ChartLegend showTarget={true} />
            </>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default WeeklyAttendanceTrend;