// import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
// import CommonService from "../../service/CommonService";
// import {
//   Avatar, Box, Button, Chip, Collapse, Dialog, DialogContent, IconButton, Paper,
//   SwipeableDrawer, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Typography, useMediaQuery, useTheme, CircularProgress, Tab, Tabs
// } from "@mui/material";
// import {
//   Business, CheckCircle, Close, KeyboardArrowDown, KeyboardArrowUp,
//   Cancel, LocationOn, Visibility, AccountTree, ArrowBack,
//   Person, Email, Phone, Work, CalendarToday, AttachMoney,
//   ReceiptLong, AccessTime, InfoOutlined, EventNote, Search,
// } from "@mui/icons-material";

// /* ─── Helpers ─────────────────────────────────────────────────────────────── */
// const isPresent = (emp) => emp.inn && emp.inn !== "NR" && emp.inn !== "";

// const normalizeRow = (item) => ({
//   division: (item?.Division || item?.division || "").trim() || "Unknown",
//   loc:      (item?.Location || item?.location || "").trim() || "Unknown",
//   sno:      item?.Sno  || item?.sno  || "",
//   repname:  item?.Name || item?.name || "",
//   des:      item?.Desc || item?.des  || "",
//   inn:      item?.CIN  || item?.inn  || "",
//   pout:     item?.COUT || item?.pout || "",
//   cno:      item?.CNO  || item?.cno  || "",
// });

// /* ─── InfoCard ────────────────────────────────────────────────────────────── */
// const iconBoxColors = {
//   blue:   { bg: "#e6f1fb", color: "#185FA5" },
//   purple: { bg: "#EEEDFE", color: "#534AB7" },
//   red:    { bg: "#FCEBEB", color: "#D85A30" },
//   teal:   { bg: "#E1F5EE", color: "#0F6E56" },
//   amber:  { bg: "#FAEEDA", color: "#854F0B" },
//   green:  { bg: "#EAF3DE", color: "#3B6D11" },
// };

// const InfoCard = ({ icon, label, value, colorKey = "blue", action }) => {
//   const c = iconBoxColors[colorKey] || iconBoxColors.blue;
//   return (
//     <Box
//       sx={{
//         display: "flex", alignItems: "center", gap: 1.5,
//         py: 1.4, borderBottom: "0.5px solid #e2e8f0",
//         "&:last-child": { borderBottom: "none" },
//       }}
//     >
//       <Box
//         sx={{
//           width: 38, height: 38, borderRadius: "10px",
//           background: c.bg, display: "flex", alignItems: "center",
//           justifyContent: "center", flexShrink: 0,
//           "& svg": { fontSize: 19, color: c.color },
//         }}
//       >
//         {icon}
//       </Box>
//       <Box sx={{ flex: 1, minWidth: 0 }}>
//         <Typography sx={{ fontSize: "0.68rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", mb: "1px", fontWeight: 600 }}>
//           {label}
//         </Typography>
//         <Typography sx={{ fontSize: "0.88rem", color: "#1e293b", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//           {value || "-"}
//         </Typography>
//       </Box>
//       {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
//     </Box>
//   );
// };

// /* ─── PlaceholderTab ──────────────────────────────────────────────────────── */
// const PlaceholderTab = ({ icon, message }) => (
//   <Box sx={{ textAlign: "center", py: 7 }}>
//     <Box sx={{ fontSize: 44, color: "#cbd5e1", mb: 1 }}>{icon}</Box>
//     <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>{message}</Typography>
//   </Box>
// );

// /* ─── OtherInfoTab ────────────────────────────────────────────────────────── */
// const OtherInfoTab = ({ sno }) => {
//   const [data, setData]       = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError]     = useState(null);

//   useEffect(() => {
//     if (!sno) return;
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await CommonService.GetEmployeeOtherInfo(sno);
//         if (response?.data?.StatusCode === 200 && Array.isArray(response.data.ResultSet)) {
//           const sorted = [...response.data.ResultSet].sort(
//             (a, b) => new Date(b.date) - new Date(a.date)
//           );
//           setData(sorted);
//         } else {
//           setData([]);
//         }
//       } catch (e) {
//         console.error("OtherInfo fetch error:", e);
//         setError("Failed to load other information.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [sno]);

//   const formatDate = (raw) => {
//     if (!raw) return "-";
//     const d = new Date(raw);
//     if (isNaN(d)) return raw;
//     const yyyy = d.getFullYear();
//     const mm   = String(d.getMonth() + 1).padStart(2, "0");
//     const dd   = String(d.getDate()).padStart(2, "0");
//     return `${yyyy}-${mm}-${dd}`;
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
//         <CircularProgress sx={{ color: "#004AAD" }} size={32} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", py: 6 }}>
//         <InfoOutlined sx={{ fontSize: 40, color: "#fca5a5", mb: 1 }} />
//         <Typography sx={{ color: "#dc2626", fontSize: "0.82rem" }}>{error}</Typography>
//       </Box>
//     );
//   }

//   if (!data.length) {
//     return (
//       <PlaceholderTab
//         icon={<InfoOutlined sx={{ fontSize: 44 }} />}
//         message="No other information available"
//       />
//     );
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "36px 110px 1fr",
//           px: 1.5, py: 1,
//           bgcolor: "#f1f5f9",
//           borderRadius: "10px",
//           mb: 0.5,
//         }}
//       >
//         {["#", "DATE", "EVALUATION"].map((h) => (
//           <Typography key={h} sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}>
//             {h}
//           </Typography>
//         ))}
//       </Box>

//       {data.map((item, idx) => (
//         <Box
//           key={idx}
//           sx={{
//             display: "grid",
//             gridTemplateColumns: "36px 110px 1fr",
//             px: 1.5, py: 1.4,
//             borderBottom: idx < data.length - 1 ? "0.5px solid #e2e8f0" : "none",
//             alignItems: "flex-start",
//             bgcolor: "#fff",
//             "&:hover": { bgcolor: "#f8faff" },
//           }}
//         >
//           <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600, pt: "1px" }}>
//             {data.length - idx}
//           </Typography>
//           <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e293b", pt: "1px" }}>
//             {formatDate(item.date)}
//           </Typography>
//           <Typography sx={{ fontSize: "0.7rem", color: "#334155", lineHeight: 1.55, wordBreak: "break-word" }}>
//             {item.evaluation || "-"}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// /* ─── AttendanceTab ───────────────────────────────────────────────────────── */
// const AttendanceTab = ({ sno }) => {
//   const [attData, setAttData]   = useState([]);
//   const [loading, setLoading]   = useState(false);
//   const [error, setError]       = useState(null);

//   useEffect(() => {
//     if (!sno) return;
//     const fetchAtt = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await CommonService.GetEmployeeAttSummary(sno);
//         if (response?.data?.StatusCode === 200 && Array.isArray(response.data.ResultSet)) {
//           const sorted = [...response.data.ResultSet].sort((a, b) => Number(b.year) - Number(a.year));
//           setAttData(sorted);
//         } else {
//           setAttData([]);
//         }
//       } catch (e) {
//         console.error("Attendance fetch error:", e);
//         setError("Failed to load attendance data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAtt();
//   }, [sno]);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
//         <CircularProgress sx={{ color: "#004AAD" }} size={32} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", py: 6 }}>
//         <AccessTime sx={{ fontSize: 40, color: "#fca5a5", mb: 1 }} />
//         <Typography sx={{ color: "#dc2626", fontSize: "0.82rem" }}>{error}</Typography>
//       </Box>
//     );
//   }

//   if (!attData.length) {
//     return (
//       <PlaceholderTab
//         icon={<AccessTime sx={{ fontSize: 44 }} />}
//         message="No attendance records found"
//       />
//     );
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "40px 1fr 1fr",
//           px: 1.5, py: 1,
//           bgcolor: "#f1f5f9",
//           borderRadius: "10px",
//           mb: 0.5,
//         }}
//       >
//         {["#", "YEAR", "PERCENTAGE"].map((h) => (
//           <Typography
//             key={h}
//             sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}
//           >
//             {h}
//           </Typography>
//         ))}
//       </Box>

//       {attData.map((item, idx) => {
//         const pct      = parseFloat(item.pres_Percentage) || 0;
//         const pctText  = `${pct.toFixed(0)}%`;
//         const txtColor =
//           pct >= 75 ? "#0d28c5" :
//           pct >= 50 ? "#d9c406" : "#dc2626";

//         return (
//           <Box
//             key={idx}
//             sx={{
//               display: "grid",
//               gridTemplateColumns: "40px 1fr 1fr",
//               px: 1.5, py: 1.4,
//               borderBottom: idx < attData.length - 1 ? "0.5px solid #e2e8f0" : "none",
//               alignItems: "center",
//               bgcolor: "#fff",
//               "&:hover": { bgcolor: "#f8faff" },
//             }}
//           >
//             <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600 }}>
//               {idx + 1}
//             </Typography>
//             <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>
//               {item.year}
//             </Typography>
//             <Typography sx={{ textAlign: "center", fontSize: "0.88rem", fontWeight: 700, color: txtColor }}>
//               {pctText}
//             </Typography>
//           </Box>
//         );
//       })}
//     </Box>
//   );
// };

// /* ─── EmployeeDetailsPopup ────────────────────────────────────────────────── */
// const EmployeeDetailsPopup = ({ open, onClose, employee, currentYear }) => {
//   const [employeeDetails, setEmployeeDetails] = useState(null);
//   const [noPayData, setNoPayData]             = useState([]);
//   const [loading, setLoading]                 = useState(false);
//   const [tabValue, setTabValue]               = useState(0);
//   const [imageError, setImageError]           = useState(false);
//   const [selectedYear, setSelectedYear]       = useState(currentYear || new Date().getFullYear().toString());
//   const [noPayLoading, setNoPayLoading]       = useState(false);
//   const [noPayError, setNoPayError]           = useState(null);

//   useEffect(() => {
//     if (open && employee && tabValue === 2 && employeeDetails?.barcode_no) {
//       fetchNoPayData();
//     }
//   }, [open, employee, selectedYear, tabValue, employeeDetails?.barcode_no]);

//   useEffect(() => {
//     if (open && employee) {
//       fetchEmployeeData();
//       setTabValue(0);
//       setImageError(false);
//       setSelectedYear(
//         currentYear
//           ? (parseInt(currentYear) - 1).toString()
//           : (new Date().getFullYear() - 1).toString()
//       );
//     }
//   }, [open, employee, currentYear]);

//   const fetchEmployeeData = async () => {
//     if (!employee?.sno) return;
//     setLoading(true);
//     try {
//       const detailsResponse = await CommonService.GetEmployeeDetails(employee.sno);
//       if (detailsResponse?.data?.StatusCode === 200) {
//         const details = detailsResponse.data.ResultSet?.[0] || null;
//         setEmployeeDetails(details);
//       }
//     } catch (error) {
//       console.error("Error fetching employee details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchNoPayData = async () => {
//     const barcodeNo = employeeDetails?.barcode_no
//                       || employee?.cno
//                       || employee?.barcode_no;

//     if (!barcodeNo) {
//       setNoPayError("Barcode number not found for this employee");
//       setNoPayData([]);
//       return;
//     }

//     if (!selectedYear) {
//       setNoPayError("No year selected");
//       return;
//     }

//     setNoPayLoading(true);
//     setNoPayError(null);

//     try {
//       const noPayResponse = await CommonService.GetEmployeeNoPay(barcodeNo, selectedYear);
//       if (noPayResponse?.data?.StatusCode === 200) {
//         const resultSet = noPayResponse.data.ResultSet || [];
//         setNoPayData(resultSet);
//         if (resultSet.length === 0) {
//           setNoPayError(`No pay records found for ${selectedYear}`);
//         }
//       } else {
//         setNoPayData([]);
//         setNoPayError(noPayResponse?.data?.Message || `No Pay data is not available for ${selectedYear}`);
//       }
//     } catch (error) {
//       console.error("No Pay fetch error:", error);
//       setNoPayError(error?.response?.data?.Message || error?.message || "Network error - Failed to load No Pay data");
//       setNoPayData([]);
//     } finally {
//       setNoPayLoading(false);
//     }
//   };

//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//     setNoPayError(null);
//   };

//   const getInitials = (name) => {
//     if (!name) return "?";
//     return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
//   };

//   const getEmployeeImageUrl = () => {
//     if (!employee?.sno) return null;
//     return `https://esystems.cdl.lk/backend/BizTrack/home/GetUserImg?serviceNo=${employee.sno}`;
//   };

//   const getYearOptions = () => {
//     const currentYearNum = new Date().getFullYear();
//     const years = [];
//     for (let i = 0; i <= 5; i++) {
//       years.push((currentYearNum - i).toString());
//     }
//     return years;
//   };

//   const noPayTotal = noPayData.reduce(
//     (sum, item) => sum + (parseFloat(item.Nopay_Count || item.nopay_count) || 0),
//     0
//   );

//   const TABS = [
//     { label: "Profile",    icon: <Person sx={{ fontSize: 17 }} /> },
//     { label: "Other Info", icon: <InfoOutlined sx={{ fontSize: 17 }} /> },
//     { label: "No Pay",     icon: <ReceiptLong sx={{ fontSize: 17 }} /> },
//     { label: "Attendance", icon: <AccessTime sx={{ fontSize: 17 }} /> },
//   ];

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="xs"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "24px",
//           maxHeight: "92vh",
//           overflow: "hidden",
//           boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
//         },
//       }}
//     >
//       {/* Header */}
//       <Box sx={{ position: "relative", bgcolor: "#004AAD", p: "20px" }}>
//         <IconButton
//           onClick={onClose}
//           size="small"
//           sx={{
//             position: "absolute", right: 14, top: 14,
//             color: "#fff", bgcolor: "rgba(255,255,255,0.15)",
//             "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
//             width: 32, height: 32,
//           }}
//         >
//           <Close sx={{ fontSize: 18 }} />
//         </IconButton>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
//           <Avatar
//             src={!imageError ? getEmployeeImageUrl() : undefined}
//             onError={() => setImageError(true)}
//             sx={{
//               width: 68, height: 68,
//               bgcolor: "#d0dff5", color: "#004AAD",
//               fontSize: "1.5rem", fontWeight: 500,
//               border: "3px solid rgba(255,255,255,0.85)",
//               flexShrink: 0,
//             }}
//           >
//             {getInitials(employee?.repname)}
//           </Avatar>

//           <Box sx={{ minWidth: 0 }}>
//             <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600, fontSize: "1rem", lineHeight: 1.3 }}>
//               {employee?.repname || "-"}
//             </Typography>
//             <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "0.78rem", mb: 0.8 }}>
//               {employee?.des || "No Designation"}
//             </Typography>
//             <Box sx={{ display: "flex", gap: 0.7, flexWrap: "wrap" }}>
//               {employee?.sno && (
//                 <Chip label={employee.sno} size="small"
//                   sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.68rem", fontWeight: 600, height: 22, borderRadius: "20px" }} />
//               )}
//               {employeeDetails?.barcode_no && (
//                 <Chip label={`BC: ${employeeDetails.barcode_no}`} size="small"
//                   sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.68rem", fontWeight: 600, height: 22, borderRadius: "20px" }} />
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* Tabs */}
//       <Tabs
//         value={tabValue}
//         onChange={(_, v) => setTabValue(v)}
//         variant="fullWidth"
//         sx={{
//           borderBottom: "0.5px solid #e2e8f0",
//           minHeight: 44,
//           "& .MuiTab-root": {
//             textTransform: "none", fontWeight: 600, fontSize: "0.72rem",
//             minHeight: 44, py: 0, gap: "4px", color: "#94a3b8",
//           },
//           "& .Mui-selected": { color: "#004AAD" },
//           "& .MuiTabs-indicator": { backgroundColor: "#004AAD", height: 2 },
//         }}
//       >
//         {TABS.map((t, i) => (
//           <Tab key={i} icon={t.icon} iconPosition="start" label={t.label} />
//         ))}
//       </Tabs>

//       {/* Body */}
//       <DialogContent sx={{ p: 0, overflow: "auto" }}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//             <CircularProgress sx={{ color: "#004AAD" }} />
//           </Box>
//         ) : (
//           <>
//             {/* ── Profile Tab ── */}
//             {tabValue === 0 && (
//               <Box sx={{ px: 2, py: 0.5 }}>
//                 {employeeDetails ? (
//                   <>
//                     <InfoCard colorKey="blue"   icon={<Work />}          label="W.Category"     value={employeeDetails.work_category} />
//                     <InfoCard colorKey="purple" icon={<Phone />}         label="Mobile"         value={employeeDetails.mobile_no}
//                       action={
//                         employeeDetails.mobile_no ? (
//                           <Box component="a" href={`tel:${employeeDetails.mobile_no}`}
//                             sx={{ width: 34, height: 34, borderRadius: "10px", background: "#eaf3de", display: "flex", alignItems: "center", justifyContent: "center", "& svg": { fontSize: 18, color: "#3B6D11" } }}>
//                             <Phone />
//                           </Box>
//                         ) : null
//                       }
//                     />
//                     <InfoCard colorKey="teal"  icon={<Business />}      label="Division"       value={employeeDetails.division} />
//                     <InfoCard colorKey="amber" icon={<AccountTree />}   label="Department"     value={employeeDetails.department} />
//                     <InfoCard colorKey="blue"  icon={<Email />}         label="Email"          value={employeeDetails.email} />
//                     <InfoCard colorKey="teal"  icon={<CalendarToday />} label="Permanant Date" value={employeeDetails.permanant_date} />
//                     <InfoCard colorKey="amber" icon={<EventNote />}     label="Retirement Date" value={employeeDetails.retirement_date} />
//                   </>
//                 ) : (
//                   <PlaceholderTab icon={<Person sx={{ fontSize: 44 }} />} message="No profile data available" />
//                 )}
//               </Box>
//             )}

//             {/* ── Other Info Tab ── */}
//             {tabValue === 1 && <OtherInfoTab sno={employee?.sno} />}

//             {/* ── No Pay Tab ── */}
//             {tabValue === 2 && (
//               <Box sx={{ p: 2 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//                   <Typography sx={{ fontWeight: 700, color: "#004AAD", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 0.8 }}>
//                     <AttachMoney sx={{ fontSize: 16 }} />
//                     No Pay Summary
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>Year:</Typography>
//                     <Box
//                       component="select"
//                       value={selectedYear}
//                       onChange={handleYearChange}
//                       sx={{
//                         px: 1.5, py: 0.6,
//                         fontSize: "0.75rem", fontWeight: 600,
//                         border: "1px solid #e2e8f0", borderRadius: "8px",
//                         backgroundColor: "#fff", color: "#004AAD",
//                         cursor: "pointer", outline: "none",
//                         "&:focus": { borderColor: "#004AAD", boxShadow: "0 0 0 2px rgba(0,74,173,0.1)" },
//                       }}
//                     >
//                       {getYearOptions().map((year) => (
//                         <option key={year} value={year}>{year}</option>
//                       ))}
//                     </Box>
//                   </Box>
//                 </Box>

//                 {noPayLoading ? (
//                   <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
//                     <CircularProgress sx={{ color: "#004AAD" }} size={32} />
//                   </Box>
//                 ) : noPayError ? (
//                   <Box sx={{ textAlign: "center", py: 4 }}>
//                     <ReceiptLong sx={{ fontSize: 44, color: "#918e8e", mb: 1 }} />
//                     <Typography sx={{ color: "#918e8e", fontSize: "0.82rem", mb: 1 }}>{noPayError}</Typography>
//                   </Box>
//                 ) : noPayData.length === 0 ? (
//                   <PlaceholderTab
//                     icon={<ReceiptLong sx={{ fontSize: 44 }} />}
//                     message={`No pay records found for ${selectedYear}`}
//                   />
//                 ) : (
//                   <Box sx={{ border: "0.5px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
//                     <Box
//                       sx={{
//                         display: "grid",
//                         gridTemplateColumns: "36px 1fr auto",
//                         px: 2, py: 1.2,
//                         bgcolor: "#f1f5f9",
//                       }}
//                     >
//                       {[
//                         { label: "#",      align: "left"  },
//                         { label: "MONTH",  align: "left"  },
//                         { label: "COUNT",  align: "right" },
//                       ].map(({ label, align }) => (
//                         <Typography
//                           key={label}
//                           sx={{
//                             fontSize: "0.65rem", fontWeight: 700,
//                             color: "#64748b", letterSpacing: "0.07em",
//                             textAlign: align,
//                           }}
//                         >
//                           {label}
//                         </Typography>
//                       ))}
//                     </Box>

//                     {noPayData.map((item, index) => {
//                       let monthName = item.Month || "-";
//                       try {
//                         if (item.Month?.includes("-")) {
//                           const [y, m] = item.Month.split("-");
//                           monthName = new Date(parseInt(y), parseInt(m) - 1)
//                             .toLocaleString("default", { month: "long" });
//                         } else {
//                           const d = new Date(item.Month);
//                           if (!isNaN(d)) {
//                             monthName = d.toLocaleString("default", { month: "long" });
//                           }
//                         }
//                       } catch (_) {}

//                       const count = parseFloat(item.Nopay_Count || item.nopay_count) || 0;

//                       return (
//                         <Box
//                           key={index}
//                           sx={{
//                             display: "grid",
//                             gridTemplateColumns: "36px 1fr auto",
//                             px: 2, py: 1.4,
//                             borderTop: "0.5px solid #e2e8f0",
//                             bgcolor: "#fff",
//                             alignItems: "center",
//                             "&:hover": { bgcolor: "#f8faff" },
//                           }}
//                         >
//                           <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600 }}>
//                             {index + 1}
//                           </Typography>
//                           <Typography sx={{ fontSize: "0.88rem", color: "#1e293b" }}>
//                             {monthName}
//                           </Typography>
//                           <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b", textAlign: "right" }}>
//                             {count.toFixed(2)}
//                           </Typography>
//                         </Box>
//                       );
//                     })}

//                     <Box
//                       sx={{
//                         display: "grid",
//                         gridTemplateColumns: "36px 1fr auto",
//                         px: 2, py: 1.3,
//                         borderTop: "0.5px solid #e2e8f0",
//                         bgcolor: "#f8faff",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Box />
//                       <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}>
//                         TOTAL
//                       </Typography>
//                       <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#dc2626", textAlign: "right" }}>
//                         {noPayTotal.toFixed(2)}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             )}

//             {/* ── Attendance Tab ── */}
//             {tabValue === 3 && <AttendanceTab sno={employee?.sno} />}
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// /* ─── STEP 1: Division Cards ──────────────────────────────────────────────── */
// const DivisionStep = ({ divisions, data, onSelect }) => {
//   const divStats = divisions.map((div) => {
//     const emps    = data.filter((d) => d.division === div);
//     const present = emps.filter(isPresent).length;
//     const locs    = [...new Set(emps.map((e) => e.loc))].length;
//     const rate    = emps.length > 0 ? Math.round((present / emps.length) * 100) : 0;
//     const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
//     return { div, total: emps.length, present, locs, rate, rateColor };
//   });

//   return (
//     <Box>
//       <Typography sx={{ mb: 1.5, fontWeight: 600, color: "#64748b", fontSize: "0.8rem" }}>
//         Select a division to view locations
//       </Typography>
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//         {divStats.map(({ div, total, present, locs, rate, rateColor }) => (
//           <Box key={div} onClick={() => onSelect(div)}
//             sx={{
//               display: "flex", alignItems: "center", gap: 1.5,
//               px: 2, py: 1.25, border: "1.5px solid #e2e8f0",
//               borderRadius: "12px", cursor: "pointer", bgcolor: "#fff",
//               transition: "all 0.18s ease",
//               "&:hover": { borderColor: "#004AAD", bgcolor: "#f0f5ff" },
//             }}
//           >
//             <Avatar sx={{ width: 34, height: 34, bgcolor: "#e8f0fe", flexShrink: 0 }}>
//               <AccountTree sx={{ fontSize: 17, color: "#004AAD" }} />
//             </Avatar>
//             <Typography sx={{ flex: 1, fontWeight: 700, fontSize: "0.85rem", color: "#1e293b", lineHeight: 1.3, wordBreak: "break-word" }}>
//               {div}
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
//               <Chip label={`${locs} loc`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 600, bgcolor: "#e8f0fe", color: "#004AAD" }} />
//               <Chip label={`${present}/${total}`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 600, bgcolor: "#dcfce7", color: "#16a34a" }} />
//               <Chip label={`${rate}%`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 700, bgcolor: `${rateColor}18`, color: rateColor, minWidth: 42 }} />
//               <KeyboardArrowDown sx={{ fontSize: 18, color: "#94a3b8", transform: "rotate(-90deg)" }} />
//             </Box>
//           </Box>
//         ))}
//         {divStats.length === 0 && (
//           <Box sx={{ textAlign: "center", py: 5 }}>
//             <Search sx={{ fontSize: 40, color: "#cbd5e1", mb: 1 }} />
//             <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No divisions match your search</Typography>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// /* ─── STEP 2: Mobile Location Panel ──────────────────────────────────────── */
// const MobileLocationPanel = React.memo(({ location, employees, isExpanded, onToggle, onViewAll }) => {
//   const strength = employees.length;
//   const present  = employees.filter(isPresent).length;
//   const absent   = strength - present;
//   const rate     = strength > 0 ? Math.round((present / strength) * 100) : 0;
//   const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";

//   return (
//     <Box sx={{ mb: 1.5 }}>
//       <Box onClick={() => onToggle(location)}
//         sx={{
//           display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.5,
//           bgcolor: isExpanded ? "#004AAD" : "#fff",
//           border: "1.5px solid", borderColor: isExpanded ? "#004AAD" : "#e2e8f0",
//           borderRadius: isExpanded ? "14px 14px 0 0" : "14px",
//           cursor: "pointer", transition: "all 0.25s ease", userSelect: "none",
//         }}
//       >
//         <Avatar sx={{ width: 36, height: 36, bgcolor: isExpanded ? "rgba(255,255,255,0.2)" : "#e8f0fe", flexShrink: 0 }}>
//           <LocationOn sx={{ fontSize: 18, color: isExpanded ? "#fff" : "#004AAD" }} />
//         </Avatar>
//         <Typography sx={{ flex: 1, fontWeight: 700, fontSize: "0.88rem", color: isExpanded ? "#fff" : "#1e293b", lineHeight: 1.3 }}>
//           {location}
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
//           <Chip label={`${present} / ${strength}`} size="small"
//             sx={{ height: 24, fontSize: "0.72rem", fontWeight: 700, bgcolor: isExpanded ? "rgba(255,255,255,0.18)" : "#e8f0fe", color: isExpanded ? "#fff" : "#004AAD" }} />
//           <Chip label={`${rate}%`} size="small"
//             sx={{ height: 24, fontSize: "0.72rem", fontWeight: 700, bgcolor: isExpanded ? "rgba(255,255,255,0.18)" : `${rateColor}18`, color: isExpanded ? "#fff" : rateColor }} />
//         </Box>
//         <Box sx={{ flexShrink: 0, transition: "transform 0.25s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", color: isExpanded ? "#fff" : "#94a3b8" }}>
//           <KeyboardArrowDown />
//         </Box>
//       </Box>

//       <Collapse in={isExpanded} timeout={250} unmountOnExit>
//         <Box sx={{ border: "1.5px solid #004AAD", borderTop: "none", borderRadius: "0 0 14px 14px", overflow: "hidden", bgcolor: "#f8faff" }}>
//           <Box sx={{ display: "flex", borderBottom: "1px solid #e2e8f0", bgcolor: "#fff" }}>
//             {[{ label: "Strength", value: strength, color: "#004AAD" }, { label: "Present", value: present, color: "#16a34a" }, { label: "Absent", value: absent, color: "#dc2626" }]
//               .map((s) => (
//                 <Box key={s.label} sx={{ flex: 1, textAlign: "center", py: 1.5, borderRight: "1px solid #f1f5f9", "&:last-child": { borderRight: "none" } }}>
//                   <Typography sx={{ fontSize: "0.65rem", color: "#64748b", mb: 0.3 }}>{s.label}</Typography>
//                   <Typography sx={{ fontSize: "1.05rem", fontWeight: 800, color: s.color }}>{s.value}</Typography>
//                 </Box>
//               ))}
//           </Box>
//           <Box sx={{ px: 1.5, pt: 1, pb: 0.5 }}>
//             <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr 0.5fr", gap: 0.5, px: 1, py: 0.75, bgcolor: "#e8f0fe", borderRadius: "8px", mb: 0.5 }}>
//               {["Service No", "Name", "Designation", "IN Time"].map((h) => (
//                 <Typography key={h} sx={{ fontSize: "0.62rem", fontWeight: 700, color: "#004AAD" }}>{h}</Typography>
//               ))}
//             </Box>
//             {employees.map((emp, idx) => {
//               const p = isPresent(emp);
//               return (
//                 <Box key={emp.sno || idx}
//                   sx={{
//                     display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr 0.5fr", gap: 0.5,
//                     px: 1, py: 0.9, bgcolor: idx % 2 === 0 ? "#fff" : "#f8faff",
//                     borderRadius: "6px", mb: 0.25, alignItems: "center",
//                     cursor: "pointer", transition: "all 0.2s ease",
//                     "&:hover": { bgcolor: "#e8f0fe", transform: "translateX(4px)" },
//                   }}
//                   onClick={() => onViewAll(emp)}
//                 >
//                   <Typography sx={{ fontSize: "0.68rem", color: "#475569" }}>{emp.sno || "-"}</Typography>
//                   <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2, wordBreak: "break-word" }}>{emp.repname || "-"}</Typography>
//                   <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2, wordBreak: "break-word" }}>{emp.des || "-"}</Typography>
//                   <Typography sx={{ fontSize: "0.68rem", fontWeight: p ? 700 : 400, color: p ? "#16a34a" : "#f30a0a" }}>{p ? emp.inn : "NR"}</Typography>
//                 </Box>
//               );
//             })}
//           </Box>
//         </Box>
//       </Collapse>
//     </Box>
//   );
// });

// /* ─── Desktop Location Table ──────────────────────────────────────────────── */
// const DesktopLocationTable = ({ locationGroups, expandedRow, onExpand, onViewDetails, onEmployeeClick }) => (
//   <TableContainer>
//     <Table>
//       <TableHead sx={{ bgcolor: "#004AAD" }}>
//         <TableRow>
//           <TableCell sx={{ color: "white", fontWeight: "bold", width: "35%" }}>Location</TableCell>
//           <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Strength</TableCell>
//           <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Present</TableCell>
//           <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Attendance</TableCell>
//           <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Actions</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {Object.entries(locationGroups).map(([location, employees]) => {
//           const strength  = employees.length;
//           const present   = employees.filter(isPresent).length;
//           const absent    = strength - present;
//           const rate      = strength > 0 ? Math.round((present / strength) * 100) : 0;
//           const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
//           const expanded  = expandedRow === location;
//           return (
//             <React.Fragment key={location}>
//               <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(0,74,173,0.04)" } }}>
//                 <TableCell>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Business sx={{ color: "#004AAD" }} />
//                     <Typography fontWeight={500}>{location}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="center"><Chip label={strength} size="small" sx={{ bgcolor: "#e8f0fe", color: "#004AAD", fontWeight: "bold" }} /></TableCell>
//                 <TableCell align="center"><Chip label={present}  size="small" sx={{ bgcolor: "#dcfce7", color: "#16a34a", fontWeight: "bold" }} /></TableCell>
//                 <TableCell align="center"><Chip label={`${rate}%`} size="small" sx={{ bgcolor: `${rateColor}18`, color: rateColor, fontWeight: "bold" }} /></TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small" onClick={() => onExpand(location)} sx={{ color: "#004AAD" }}>
//                     {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//                   </IconButton>
//                   <Button size="small" variant="outlined" startIcon={<Visibility />}
//                     onClick={() => onViewDetails({ location, employees, strength, present, absent, rate })}
//                     sx={{ ml: 1, borderColor: "#004AAD", color: "#004AAD", textTransform: "none" }}>
//                     View
//                   </Button>
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell colSpan={5} sx={{ py: 0 }}>
//                   <Collapse in={expanded} timeout="auto" unmountOnExit>
//                     <Box sx={{ m: 2, bgcolor: "#f8faff", borderRadius: "12px", p: 2 }}>
//                       <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold", color: "#004AAD" }}>
//                         Employee List - {location}
//                       </Typography>
//                       <Table size="small">
//                         <TableHead>
//                           <TableRow sx={{ bgcolor: "#e8f0fe" }}>
//                             {["Service No", "Name", "Designation", "Clock No", "IN Time", "Prev. OUT", "Status"].map((h) => (
//                               <TableCell key={h}><b>{h}</b></TableCell>
//                             ))}
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {employees.map((emp, idx) => {
//                             const p = isPresent(emp);
//                             return (
//                               <TableRow key={emp.sno || idx} hover sx={{ cursor: "pointer" }} onClick={() => onEmployeeClick(emp)}>
//                                 <TableCell>{emp.sno || "-"}</TableCell>
//                                 <TableCell>{emp.repname || "-"}</TableCell>
//                                 <TableCell>{emp.des || "-"}</TableCell>
//                                 <TableCell>{emp.cno || "-"}</TableCell>
//                                 <TableCell>
//                                   <Chip label={p ? emp.inn : "NR"} size="small"
//                                     sx={{ bgcolor: p ? "#dcfce7" : "#fee2e2", color: p ? "#16a34a" : "#dc2626", fontSize: "0.7rem" }} />
//                                 </TableCell>
//                                 <TableCell>{emp.pout || "-"}</TableCell>
//                                 <TableCell>
//                                   <Chip label={p ? "Present" : "Absent"} size="small"
//                                     icon={p ? <CheckCircle sx={{ fontSize: "12px !important" }} /> : <Cancel sx={{ fontSize: "12px !important" }} />}
//                                     sx={{ bgcolor: p ? "#dcfce7" : "#fee2e2", color: p ? "#16a34a" : "#dc2626", fontSize: "0.7rem" }} />
//                                 </TableCell>
//                               </TableRow>
//                             );
//                           })}
//                         </TableBody>
//                       </Table>
//                     </Box>
//                   </Collapse>
//                 </TableCell>
//               </TableRow>
//             </React.Fragment>
//           );
//         })}
//         {Object.keys(locationGroups).length === 0 && (
//           <TableRow>
//             <TableCell colSpan={5} sx={{ textAlign: "center", py: 5 }}>
//               <Search sx={{ fontSize: 40, color: "#cbd5e1", display: "block", mx: "auto", mb: 1 }} />
//               <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No locations match your search</Typography>
//             </TableCell>
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );

// /* ─── Detail Drawer ───────────────────────────────────────────────────────── */
// const DetailDrawer = ({ open, onClose, data, onEmployeeClick }) => {
//   if (!data) return null;
//   const { location, employees, strength, present, absent, rate } = data;
//   const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
//   return (
//     <SwipeableDrawer anchor="bottom" open={open} onClose={onClose} onOpen={() => {}} disableSwipeToOpen
//       sx={{ "& .MuiDrawer-paper": { borderTopLeftRadius: "24px", borderTopRightRadius: "24px", maxHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden" } }}>
//       <Box sx={{ pt: 1.5, pb: 0.5, display: "flex", justifyContent: "center" }}>
//         <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: "#cbd5e1" }} />
//       </Box>
//       <Box sx={{ px: 2.5, py: 2, bgcolor: "#004AAD", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
//         <Box>
//           <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>{location}</Typography>
//           <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", mt: 0.3 }}>{strength} employees</Typography>
//         </Box>
//         <IconButton onClick={onClose} sx={{ color: "#fff" }}><Close /></IconButton>
//       </Box>
//       <Box sx={{ display: "flex", flexShrink: 0, borderBottom: "1px solid #f1f5f9" }}>
//         {[{ label: "Total", value: strength, color: "#004AAD" }, { label: "Present", value: present, color: "#16a34a" }, { label: "Absent", value: absent, color: "#dc2626" }, { label: "Rate", value: `${rate}%`, color: rateColor }]
//           .map((s) => (
//             <Box key={s.label} sx={{ flex: 1, textAlign: "center", py: 1.5, borderRight: "1px solid #f1f5f9", "&:last-child": { borderRight: "none" } }}>
//               <Typography sx={{ fontSize: "0.63rem", color: "#64748b" }}>{s.label}</Typography>
//               <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: s.color }}>{s.value}</Typography>
//             </Box>
//           ))}
//       </Box>
//       <Box sx={{ overflowY: "auto", flex: 1, px: 2, py: 1.5 }}>
//         <Box sx={{ display: "grid", gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr 0.6fr", gap: 0.5, px: 1, py: 0.8, bgcolor: "#e8f0fe", borderRadius: "8px", mb: 1, position: "sticky", top: 0, zIndex: 1 }}>
//           {["Svc No", "Name", "Designation", "IN Time", "Status"].map((h) => (
//             <Typography key={h} sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#004AAD" }}>{h}</Typography>
//           ))}
//         </Box>
//         {employees.map((emp, idx) => {
//           const p = isPresent(emp);
//           return (
//             <Box key={emp.sno || idx}
//               sx={{
//                 display: "grid", gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr 0.6fr", gap: 0.5,
//                 px: 1, py: 1, bgcolor: idx % 2 === 0 ? "#fff" : "#f8faff",
//                 borderRadius: "8px", mb: 0.5, alignItems: "center", border: "1px solid #f1f5f9",
//                 cursor: "pointer", transition: "all 0.2s ease",
//                 "&:hover": { bgcolor: "#e8f0fe", transform: "translateX(4px)" },
//               }}
//               onClick={() => onEmployeeClick(emp)}
//             >
//               <Typography sx={{ fontSize: "0.65rem", color: "#475569" }}>{emp.sno || "-"}</Typography>
//               <Box>
//                 <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2 }}>{emp.repname || "-"}</Typography>
//                 <Typography sx={{ fontSize: "0.6rem", color: "#94a3b8" }}>{emp.cno ? `Clk: ${emp.cno}` : ""}</Typography>
//               </Box>
//               <Typography sx={{ fontSize: "0.62rem", color: "#64748b", lineHeight: 1.2 }}>{emp.des || "-"}</Typography>
//               <Box>
//                 <Typography sx={{ fontSize: "0.7rem", fontWeight: p ? 700 : 400, color: p ? "#16a34a" : "#94a3b8" }}>{p ? emp.inn : "NR"}</Typography>
//                 {emp.pout && <Typography sx={{ fontSize: "0.58rem", color: "#94a3b8" }}>OUT: {emp.pout}</Typography>}
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 {p ? <CheckCircle sx={{ fontSize: 16, color: "#16a34a" }} /> : <Cancel sx={{ fontSize: 16, color: "#dc2626" }} />}
//               </Box>
//             </Box>
//           );
//         })}
//       </Box>
//     </SwipeableDrawer>
//   );
// };

// /* ─── Breadcrumb ──────────────────────────────────────────────────────────── */
// const Breadcrumb = ({ division, onBack }) => (
//   <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
//     <IconButton size="small" onClick={onBack}
//       sx={{ color: "#004AAD", bgcolor: "#e8f0fe", borderRadius: "8px", "&:hover": { bgcolor: "#d0e2ff" } }}>
//       <ArrowBack fontSize="small" />
//     </IconButton>
//     <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
//       <Typography onClick={onBack}
//         sx={{ fontSize: "0.8rem", color: "#004AAD", cursor: "pointer", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
//         All Divisions
//       </Typography>
//       <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8" }}>/</Typography>
//       <Chip label={division} size="small" sx={{ height: 22, fontSize: "0.72rem", fontWeight: 700, bgcolor: "#004AAD", color: "#fff" }} />
//     </Box>
//   </Box>
// );

// /* ─── SearchBar ───────────────────────────────────────────────────────────── */
// const SearchBar = ({ value, onChange, placeholder }) => (
//   <Box
//     sx={{
//       display: "flex", alignItems: "center", gap: 1,
//       mb: 2, px: 1.5, py: 0.85,
//       border: "1.5px solid #e2e8f0",
//       borderRadius: "12px",
//       bgcolor: "#fff",
//       transition: "border-color 0.18s ease, box-shadow 0.18s ease",
//       "&:focus-within": {
//         borderColor: "#004AAD",
//         boxShadow: "0 0 0 3px rgba(0,74,173,0.08)",
//       },
//     }}
//   >
//     <Search sx={{ fontSize: 18, color: "#94a3b8", flexShrink: 0 }} />
//     <Box
//       component="input"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder || "Search…"}
//       sx={{
//         flex: 1, border: "none", outline: "none",
//         fontSize: "0.85rem", color: "#1e293b",
//         bgcolor: "transparent", fontFamily: "inherit",
//         "&::placeholder": { color: "#94a3b8" },
//       }}
//     />
//     {value && (
//       <IconButton
//         size="small"
//         onClick={() => onChange("")}
//         sx={{
//           color: "#94a3b8", p: 0.3,
//           "&:hover": { color: "#004AAD", bgcolor: "#e8f0fe" },
//           borderRadius: "6px",
//         }}
//       >
//         <Close sx={{ fontSize: 16 }} />
//       </IconButton>
//     )}
//   </Box>
// );

// /* ─── DGESatt (inner) ─────────────────────────────────────────────────────── */
// const DGESatt = ({ data = [], loading = false }) => {
//   const theme    = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const currentYear = new Date().getFullYear().toString();

//   const [selectedDivision,  setSelectedDivision]  = useState(null);
//   const [expandedRow,       setExpandedRow]        = useState(null);
//   const [drawerOpen,        setDrawerOpen]         = useState(false);
//   const [selectedLocation,  setSelectedLocation]   = useState(null);
//   const [employeePopupOpen, setEmployeePopupOpen]  = useState(false);
//   const [selectedEmployee,  setSelectedEmployee]   = useState(null);
//   /* ── NEW: search state ── */
//   const [searchTerm,        setSearchTerm]         = useState("");

//   const scrollRef = useRef(null);

//   const handleDivisionSelect = useCallback((div) => {
//     setSelectedDivision(div);
//     setExpandedRow(null);
//     setSearchTerm("");        
//   }, []);

//   const handleBack = useCallback(() => {
//     setSelectedDivision(null);
//     setExpandedRow(null);
//     setSearchTerm("");        
//   }, []);

//   const handleToggle      = useCallback((loc) => setExpandedRow((prev) => (prev === loc ? null : loc)), []);
//   const handleViewDetails = useCallback((locData) => { setSelectedLocation(locData); setDrawerOpen(true); }, []);
//   const handleEmployeeClick = useCallback((emp) => { setSelectedEmployee(emp); setEmployeePopupOpen(true); }, []);

//   if (loading) {
//     return (
//       <Paper sx={{ p: 3, borderRadius: "20px" }}>
//         <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
//           <Typography>Loading CDPLC location attendance...</Typography>
//         </Box>
//       </Paper>
//     );
//   }

//   /* ── Filtered data ── */
//   const term = searchTerm.toLowerCase().trim();
//   const filteredData = term
//     ? data.filter((d) =>
//         d.repname?.toLowerCase().includes(term) ||
//         d.sno?.toLowerCase().includes(term) ||
//         d.des?.toLowerCase().includes(term) ||
//         d.division?.toLowerCase().includes(term) ||
//         d.loc?.toLowerCase().includes(term)
//       )
//     : data;

//   const divisions = [...new Set(filteredData.map((d) => d.division).filter(Boolean))].sort();

//   const locationGroups = {};
//   if (selectedDivision) {
//     filteredData.filter((d) => d.division === selectedDivision).forEach((item) => {
//       const loc = item.loc?.trim() || "Unknown";
//       if (!locationGroups[loc]) locationGroups[loc] = [];
//       locationGroups[loc].push(item);
//     });
//   }

//   const totalLocations = Object.keys(locationGroups).length;
//   const divEmployees   = selectedDivision ? filteredData.filter((d) => d.division === selectedDivision) : [];
//   const totalPresent   = divEmployees.filter(isPresent).length;

//   /* ── Subtitle text ── */
//   const subtitle = selectedDivision
//     ? `${totalLocations} locations · ${divEmployees.length} employees · ${totalPresent} present${term ? ` · filtered by "${searchTerm}"` : ""}`
//     : `${divisions.length} divisions · ${filteredData.length} employees total${term ? ` · filtered by "${searchTerm}"` : ""}`;

//   /* ── Search placeholder ── */
//   const searchPlaceholder = selectedDivision
//     ? "Search by name, service no, designation, location…"
//     : "Search by name, service no, designation, division…";

//   return (
//     <>
//       <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,74,173,0.06)" }}>
//         <Box sx={{ mb: 2 }}>
//           <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700, color: "#004AAD", fontSize: { xs: "1rem", sm: "1.2rem" } }}>
//             CDPLC Employee Strength - Division
//           </Typography>
//           <Typography sx={{ color: "#64748b", fontSize: "0.8rem" }}>
//             {subtitle}
//           </Typography>
//         </Box>

//         {/* ── Search Bar ── */}
//         <SearchBar
//           value={searchTerm}
//           onChange={setSearchTerm}
//           placeholder={searchPlaceholder}
//         />

//         {!selectedDivision && (
//           <DivisionStep divisions={divisions} data={filteredData} onSelect={handleDivisionSelect} />
//         )}

//         {selectedDivision && (
//           <>
//             <Breadcrumb division={selectedDivision} onBack={handleBack} />
//             {isMobile ? (
//               <Box ref={scrollRef}
//                 sx={{
//                   maxHeight: "calc(100vh - 260px)", overflowY: "auto", overflowX: "hidden", pr: 0.5,
//                   "&::-webkit-scrollbar": { width: 4 },
//                   "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
//                   "&::-webkit-scrollbar-thumb": { bgcolor: "#cbd5e1", borderRadius: 4 },
//                 }}
//               >
//                 {Object.entries(locationGroups).map(([location, employees]) => (
//                   <MobileLocationPanel
//                     key={location}
//                     location={location}
//                     employees={employees}
//                     isExpanded={expandedRow === location}
//                     onToggle={handleToggle}
//                     onViewAll={handleEmployeeClick}
//                   />
//                 ))}
//                 {Object.keys(locationGroups).length === 0 && (
//                   <Box sx={{ textAlign: "center", py: 6 }}>
//                     <Search sx={{ fontSize: 44, color: "#cbd5e1", mb: 1 }} />
//                     <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No locations match your search</Typography>
//                   </Box>
//                 )}
//                 <Box sx={{ height: 80 }} />
//               </Box>
//             ) : (
//               <DesktopLocationTable
//                 locationGroups={locationGroups}
//                 expandedRow={expandedRow}
//                 onExpand={handleToggle}
//                 onViewDetails={handleViewDetails}
//                 onEmployeeClick={handleEmployeeClick}
//               />
//             )}
//           </>
//         )}
//       </Paper>

//       <DetailDrawer
//         open={drawerOpen}
//         onClose={() => { setDrawerOpen(false); setTimeout(() => setSelectedLocation(null), 300); }}
//         data={selectedLocation}
//         onEmployeeClick={handleEmployeeClick}
//       />

//       <EmployeeDetailsPopup
//         open={employeePopupOpen}
//         onClose={() => { setEmployeePopupOpen(false); setTimeout(() => setSelectedEmployee(null), 300); }}
//         employee={selectedEmployee}
//         currentYear={currentYear}
//       />
//     </>
//   );
// };

// /* ─── Data Wrapper (exported) ─────────────────────────────────────────────── */
// export const CDLLocBaseAttendance = () => {
//   const [data,    setData]    = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState(null);

//   useEffect(() => {
//     let active = true;
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response  = await CommonService.GetCdllocbaseAttendance();
//         const resultSet = response?.data?.ResultSet || [];
//         const normalized = resultSet.map(normalizeRow);
//         if (active) setData(normalized);
//       } catch (err) {
//         if (active) setError("Failed to load CDPLC location attendance.");
//       } finally {
//         if (active) setLoading(false);
//       }
//     };
//     fetchData();
//     return () => { active = false; };
//   }, []);

//   if (error) {
//     return (
//       <Paper sx={{ p: 3, borderRadius: "20px" }}>
//         <Typography sx={{ color: "#dc2626", fontWeight: 600 }}>{error}</Typography>
//       </Paper>
//     );
//   }

//   return <DGESatt data={data} loading={loading} />;
// };






import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import CommonService from "../../service/CommonService";
import { useSelector } from "react-redux";
import {
  Avatar, Box, Button, Chip, Collapse, Dialog, DialogContent, IconButton, Paper,
  SwipeableDrawer, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, useMediaQuery, useTheme, CircularProgress, Tab, Tabs
} from "@mui/material";
import {
  Business, CheckCircle, Close, KeyboardArrowDown, KeyboardArrowUp,
  Cancel, LocationOn, Visibility, AccountTree, ArrowBack,
  Person, Email, Phone, Work, CalendarToday, AttachMoney,
  ReceiptLong, AccessTime, InfoOutlined, EventNote, Search, GridView,
} from "@mui/icons-material";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
} from "recharts";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const isPresent = (emp) => emp.inn && emp.inn !== "NR" && emp.inn !== "";

const normalizeRow = (item) => ({
  division: (item?.Division || item?.division || "").trim() || "Unknown",
  loc:      (item?.Location || item?.location || "").trim() || "Unknown",
  sno:      item?.Sno  || item?.sno  || "",
  repname:  item?.Name || item?.name || "",
  des:      item?.Desc || item?.des  || "",
  inn:      item?.CIN  || item?.inn  || "",
  pout:     item?.COUT || item?.pout || "",
  cno:      item?.CNO  || item?.cno  || "",
});

/* ─── Chart color helpers ─────────────────────────────────────────────────── */
const rateColor = (pct) =>
  pct >= 80 ? "#16a34a" : pct >= 60 ? "#d97706" : "#dc2626";

const rateBg = (pct) =>
  pct >= 80 ? "#dcfce7" : pct >= 60 ? "#fef3c7" : "#fee2e2";

function PctBadge({ pct }) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        px: "7px",
        py: "1px",
        borderRadius: "10px",
        fontSize: 11,
        fontWeight: 600,
        background: rateBg(pct),
        color: rateColor(pct),
        flexShrink: 0,
      }}
    >
      {pct}%
    </Box>
  );
}

/* ─── InfoCard ────────────────────────────────────────────────────────────── */
const iconBoxColors = {
  blue:   { bg: "#e6f1fb", color: "#185FA5" },
  purple: { bg: "#EEEDFE", color: "#534AB7" },
  red:    { bg: "#FCEBEB", color: "#D85A30" },
  teal:   { bg: "#E1F5EE", color: "#0F6E56" },
  amber:  { bg: "#FAEEDA", color: "#854F0B" },
  green:  { bg: "#EAF3DE", color: "#3B6D11" },
};

const InfoCard = ({ icon, label, value, colorKey = "blue", action }) => {
  const c = iconBoxColors[colorKey] || iconBoxColors.blue;
  return (
    <Box
      sx={{
        display: "flex", alignItems: "center", gap: 1.5,
        py: 1.4, borderBottom: "0.5px solid #e2e8f0",
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Box
        sx={{
          width: 38, height: 38, borderRadius: "10px",
          background: c.bg, display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0,
          "& svg": { fontSize: 19, color: c.color },
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: "0.68rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", mb: "1px", fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: "0.88rem", color: "#1e293b", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value || "-"}
        </Typography>
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
};

/* ─── PlaceholderTab ──────────────────────────────────────────────────────── */
const PlaceholderTab = ({ icon, message }) => (
  <Box sx={{ textAlign: "center", py: 7 }}>
    <Box sx={{ fontSize: 44, color: "#cbd5e1", mb: 1 }}>{icon}</Box>
    <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>{message}</Typography>
  </Box>
);

/* ─── OtherInfoTab ────────────────────────────────────────────────────────── */
const OtherInfoTab = ({ sno }) => {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!sno) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CommonService.GetEmployeeOtherInfo(sno);
        if (response?.data?.StatusCode === 200 && Array.isArray(response.data.ResultSet)) {
          const sorted = [...response.data.ResultSet].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setData(sorted);
        } else {
          setData([]);
        }
      } catch (e) {
        console.error("OtherInfo fetch error:", e);
        setError("Failed to load other information.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sno]);

  const formatDate = (raw) => {
    if (!raw) return "-";
    const d = new Date(raw);
    if (isNaN(d)) return raw;
    const yyyy = d.getFullYear();
    const mm   = String(d.getMonth() + 1).padStart(2, "0");
    const dd   = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress sx={{ color: "#004AAD" }} size={32} />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <InfoOutlined sx={{ fontSize: 40, color: "#fca5a5", mb: 1 }} />
        <Typography sx={{ color: "#dc2626", fontSize: "0.82rem" }}>{error}</Typography>
      </Box>
    );
  }
  if (!data.length) {
    return <PlaceholderTab icon={<InfoOutlined sx={{ fontSize: 44 }} />} message="No other information available" />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "36px 110px 1fr", px: 1.5, py: 1, bgcolor: "#f1f5f9", borderRadius: "10px", mb: 0.5 }}>
        {["#", "DATE", "EVALUATION"].map((h) => (
          <Typography key={h} sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}>{h}</Typography>
        ))}
      </Box>
      {data.map((item, idx) => (
        <Box key={idx} sx={{ display: "grid", gridTemplateColumns: "36px 110px 1fr", px: 1.5, py: 1.4, borderBottom: idx < data.length - 1 ? "0.5px solid #e2e8f0" : "none", alignItems: "flex-start", bgcolor: "#fff", "&:hover": { bgcolor: "#f8faff" } }}>
          <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600, pt: "1px" }}>{data.length - idx}</Typography>
          <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e293b", pt: "1px" }}>{formatDate(item.date)}</Typography>
          <Typography sx={{ fontSize: "0.7rem", color: "#334155", lineHeight: 1.55, wordBreak: "break-word" }}>{item.evaluation || "-"}</Typography>
        </Box>
      ))}
    </Box>
  );
};

/* ─── AttendanceTab ───────────────────────────────────────────────────────── */
const AttendanceTab = ({ sno }) => {
  const [attData, setAttData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!sno) return;
    const fetchAtt = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CommonService.GetEmployeeAttSummary(sno);
        if (response?.data?.StatusCode === 200 && Array.isArray(response.data.ResultSet)) {
          const sorted = [...response.data.ResultSet].sort((a, b) => Number(b.year) - Number(a.year));
          setAttData(sorted);
        } else {
          setAttData([]);
        }
      } catch (e) {
        console.error("Attendance fetch error:", e);
        setError("Failed to load attendance data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAtt();
  }, [sno]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress sx={{ color: "#004AAD" }} size={32} />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <AccessTime sx={{ fontSize: 40, color: "#fca5a5", mb: 1 }} />
        <Typography sx={{ color: "#dc2626", fontSize: "0.82rem" }}>{error}</Typography>
      </Box>
    );
  }
  if (!attData.length) {
    return <PlaceholderTab icon={<AccessTime sx={{ fontSize: 44 }} />} message="No attendance records found" />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "40px 1fr 1fr", px: 1.5, py: 1, bgcolor: "#f1f5f9", borderRadius: "10px", mb: 0.5 }}>
        {["#", "YEAR", "PERCENTAGE"].map((h) => (
          <Typography key={h} sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}>{h}</Typography>
        ))}
      </Box>
      {attData.map((item, idx) => {
        const pct     = parseFloat(item.pres_Percentage) || 0;
        const pctText = `${pct.toFixed(0)}%`;
        const txtColor = pct >= 75 ? "#0d28c5" : pct >= 50 ? "#d9c406" : "#dc2626";
        return (
          <Box key={idx} sx={{ display: "grid", gridTemplateColumns: "40px 1fr 1fr", px: 1.5, py: 1.4, borderBottom: idx < attData.length - 1 ? "0.5px solid #e2e8f0" : "none", alignItems: "center", bgcolor: "#fff", "&:hover": { bgcolor: "#f8faff" } }}>
            <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600 }}>{idx + 1}</Typography>
            <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>{item.year}</Typography>
            <Typography sx={{ textAlign: "center", fontSize: "0.88rem", fontWeight: 700, color: txtColor }}>{pctText}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

/* ─── EmployeeDetailsPopup ────────────────────────────────────────────────── */
const EmployeeDetailsPopup = ({ open, onClose, employee, currentYear }) => {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [noPayData, setNoPayData]             = useState([]);
  const [loading, setLoading]                 = useState(false);
  const [tabValue, setTabValue]               = useState(0);
  const [imageError, setImageError]           = useState(false);
  const [selectedYear, setSelectedYear]       = useState(currentYear || new Date().getFullYear().toString());
  const [noPayLoading, setNoPayLoading]       = useState(false);
  const [noPayError, setNoPayError]           = useState(null);

  useEffect(() => {
    if (open && employee && tabValue === 2 && employeeDetails?.barcode_no) {
      fetchNoPayData();
    }
  }, [open, employee, selectedYear, tabValue, employeeDetails?.barcode_no]);

  useEffect(() => {
    if (open && employee) {
      fetchEmployeeData();
      setTabValue(0);
      setImageError(false);
      setSelectedYear(
        currentYear
          ? (parseInt(currentYear) - 1).toString()
          : (new Date().getFullYear() - 1).toString()
      );
    }
  }, [open, employee, currentYear]);

  const fetchEmployeeData = async () => {
    if (!employee?.sno) return;
    setLoading(true);
    try {
      const detailsResponse = await CommonService.GetEmployeeDetails(employee.sno);
      if (detailsResponse?.data?.StatusCode === 200) {
        const details = detailsResponse.data.ResultSet?.[0] || null;
        setEmployeeDetails(details);
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNoPayData = async () => {
    const barcodeNo = employeeDetails?.barcode_no || employee?.cno || employee?.barcode_no;
    if (!barcodeNo) { setNoPayError("Barcode number not found for this employee"); setNoPayData([]); return; }
    if (!selectedYear) { setNoPayError("No year selected"); return; }
    setNoPayLoading(true);
    setNoPayError(null);
    try {
      const noPayResponse = await CommonService.GetEmployeeNoPay(barcodeNo, selectedYear);
      if (noPayResponse?.data?.StatusCode === 200) {
        const resultSet = noPayResponse.data.ResultSet || [];
        setNoPayData(resultSet);
        if (resultSet.length === 0) setNoPayError(`No pay records found for ${selectedYear}`);
      } else {
        setNoPayData([]);
        setNoPayError(noPayResponse?.data?.Message || `No Pay data is not available for ${selectedYear}`);
      }
    } catch (error) {
      console.error("No Pay fetch error:", error);
      setNoPayError(error?.response?.data?.Message || error?.message || "Network error - Failed to load No Pay data");
      setNoPayData([]);
    } finally {
      setNoPayLoading(false);
    }
  };

  const handleYearChange = (event) => { setSelectedYear(event.target.value); setNoPayError(null); };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getEmployeeImageUrl = () => {
    if (!employee?.sno) return null;
    return `https://esystems.cdl.lk/backend/BizTrack/home/GetUserImg?serviceNo=${employee.sno}`;
  };

  const getYearOptions = () => {
    const currentYearNum = new Date().getFullYear();
    const years = [];
    for (let i = 0; i <= 5; i++) years.push((currentYearNum - i).toString());
    return years;
  };

  const noPayTotal = noPayData.reduce(
    (sum, item) => sum + (parseFloat(item.Nopay_Count || item.nopay_count) || 0), 0
  );

  const TABS = [
    { label: "Profile",    icon: <Person sx={{ fontSize: 17 }} /> },
    { label: "Other Info", icon: <InfoOutlined sx={{ fontSize: 17 }} /> },
    { label: "No Pay",     icon: <ReceiptLong sx={{ fontSize: 17 }} /> },
    { label: "Attendance", icon: <AccessTime sx={{ fontSize: 17 }} /> },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "24px", maxHeight: "92vh", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.18)" },
      }}
    >
      {/* Header */}
      <Box sx={{ position: "relative", bgcolor: "#004AAD", p: "20px" }}>
        <IconButton onClick={onClose} size="small"
          sx={{ position: "absolute", right: 14, top: 14, color: "#fff", bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "rgba(255,255,255,0.25)" }, width: 32, height: 32 }}>
          <Close sx={{ fontSize: 18 }} />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
          <Avatar
            src={!imageError ? getEmployeeImageUrl() : undefined}
            onError={() => setImageError(true)}
            sx={{ width: 68, height: 68, bgcolor: "#d0dff5", color: "#004AAD", fontSize: "1.5rem", fontWeight: 500, border: "3px solid rgba(255,255,255,0.85)", flexShrink: 0 }}
          >
            {getInitials(employee?.repname)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600, fontSize: "1rem", lineHeight: 1.3 }}>
              {employee?.repname || "-"}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "0.78rem", mb: 0.8 }}>
              {employee?.des || "No Designation"}
            </Typography>
            <Box sx={{ display: "flex", gap: 0.7, flexWrap: "wrap" }}>
              {employee?.sno && (
                <Chip label={employee.sno} size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.68rem", fontWeight: 600, height: 22, borderRadius: "20px" }} />
              )}
              {employeeDetails?.barcode_no && (
                <Chip label={`BC: ${employeeDetails.barcode_no}`} size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.68rem", fontWeight: 600, height: 22, borderRadius: "20px" }} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(_, v) => setTabValue(v)}
        variant="fullWidth"
        sx={{
          borderBottom: "0.5px solid #e2e8f0", minHeight: 44,
          "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: "0.72rem", minHeight: 44, py: 0, gap: "4px", color: "#94a3b8" },
          "& .Mui-selected": { color: "#004AAD" },
          "& .MuiTabs-indicator": { backgroundColor: "#004AAD", height: 2 },
        }}
      >
        {TABS.map((t, i) => <Tab key={i} icon={t.icon} iconPosition="start" label={t.label} />)}
      </Tabs>

      {/* Body */}
      <DialogContent sx={{ p: 0, overflow: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#004AAD" }} />
          </Box>
        ) : (
          <>
            {tabValue === 0 && (
              <Box sx={{ px: 2, py: 0.5 }}>
                {employeeDetails ? (
                  <>
                    <InfoCard colorKey="blue"   icon={<Work />}          label="W.Category"      value={employeeDetails.work_category} />
                    <InfoCard colorKey="purple" icon={<Phone />}         label="Mobile"          value={employeeDetails.mobile_no}
                      action={employeeDetails.mobile_no ? (
                        <Box component="a" href={`tel:${employeeDetails.mobile_no}`}
                          sx={{ width: 34, height: 34, borderRadius: "10px", background: "#eaf3de", display: "flex", alignItems: "center", justifyContent: "center", "& svg": { fontSize: 18, color: "#3B6D11" } }}>
                          <Phone />
                        </Box>
                      ) : null}
                    />
                    <InfoCard colorKey="teal"  icon={<Business />}      label="Division"        value={employeeDetails.division} />
                    <InfoCard colorKey="amber" icon={<AccountTree />}   label="Department"      value={employeeDetails.department} />
                    <InfoCard colorKey="blue"  icon={<Email />}         label="Email"           value={employeeDetails.email} />
                    <InfoCard colorKey="teal"  icon={<CalendarToday />} label="Permanant Date"  value={employeeDetails.permanant_date} />
                    <InfoCard colorKey="amber" icon={<EventNote />}     label="Retirement Date" value={employeeDetails.retirement_date} />
                  </>
                ) : (
                  <PlaceholderTab icon={<Person sx={{ fontSize: 44 }} />} message="No profile data available" />
                )}
              </Box>
            )}
            {tabValue === 1 && <OtherInfoTab sno={employee?.sno} />}
            {tabValue === 2 && (
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, color: "#004AAD", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 0.8 }}>
                    <AttachMoney sx={{ fontSize: 16 }} /> No Pay Summary
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>Year:</Typography>
                    <Box component="select" value={selectedYear} onChange={handleYearChange}
                      sx={{ px: 1.5, py: 0.6, fontSize: "0.75rem", fontWeight: 600, border: "1px solid #e2e8f0", borderRadius: "8px", backgroundColor: "#fff", color: "#004AAD", cursor: "pointer", outline: "none", "&:focus": { borderColor: "#004AAD", boxShadow: "0 0 0 2px rgba(0,74,173,0.1)" } }}>
                      {getYearOptions().map((year) => <option key={year} value={year}>{year}</option>)}
                    </Box>
                  </Box>
                </Box>
                {noPayLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                    <CircularProgress sx={{ color: "#004AAD" }} size={32} />
                  </Box>
                ) : noPayError ? (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <ReceiptLong sx={{ fontSize: 44, color: "#918e8e", mb: 1 }} />
                    <Typography sx={{ color: "#918e8e", fontSize: "0.82rem", mb: 1 }}>{noPayError}</Typography>
                  </Box>
                ) : noPayData.length === 0 ? (
                  <PlaceholderTab icon={<ReceiptLong sx={{ fontSize: 44 }} />} message={`No pay records found for ${selectedYear}`} />
                ) : (
                  <Box sx={{ border: "0.5px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "36px 1fr auto", px: 2, py: 1.2, bgcolor: "#f1f5f9" }}>
                      {[{ label: "#", align: "left" }, { label: "MONTH", align: "left" }, { label: "COUNT", align: "right" }].map(({ label, align }) => (
                        <Typography key={label} sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em", textAlign: align }}>{label}</Typography>
                      ))}
                    </Box>
                    {noPayData.map((item, index) => {
                      let monthName = item.Month || "-";
                      try {
                        if (item.Month?.includes("-")) {
                          const [y, m] = item.Month.split("-");
                          monthName = new Date(parseInt(y), parseInt(m) - 1).toLocaleString("default", { month: "long" });
                        } else {
                          const d = new Date(item.Month);
                          if (!isNaN(d)) monthName = d.toLocaleString("default", { month: "long" });
                        }
                      } catch (_) {}
                      const count = parseFloat(item.Nopay_Count || item.nopay_count) || 0;
                      return (
                        <Box key={index} sx={{ display: "grid", gridTemplateColumns: "36px 1fr auto", px: 2, py: 1.4, borderTop: "0.5px solid #e2e8f0", bgcolor: "#fff", alignItems: "center", "&:hover": { bgcolor: "#f8faff" } }}>
                          <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600 }}>{index + 1}</Typography>
                          <Typography sx={{ fontSize: "0.88rem", color: "#1e293b" }}>{monthName}</Typography>
                          <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b", textAlign: "right" }}>{count.toFixed(2)}</Typography>
                        </Box>
                      );
                    })}
                    <Box sx={{ display: "grid", gridTemplateColumns: "36px 1fr auto", px: 2, py: 1.3, borderTop: "0.5px solid #e2e8f0", bgcolor: "#f8faff", alignItems: "center" }}>
                      <Box />
                      <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}>TOTAL</Typography>
                      <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#dc2626", textAlign: "right" }}>{noPayTotal.toFixed(2)}</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
            {tabValue === 3 && <AttendanceTab sno={employee?.sno} />}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* ─── DivisionLevelChart - Shows divisions with expandable locations ─── */ 
const DivisionLevelChart = ({ data, onDivisionClick }) => {
  const chartData = useMemo(() => {
    const divisionMap = new Map();
    data.forEach((item) => {
      const div = item.division?.trim() || "Unknown";
      if (!divisionMap.has(div)) {
        divisionMap.set(div, { division: div, total: 0, present: 0 });
      }
      const entry = divisionMap.get(div);
      entry.total += 1;
      if (isPresent(item)) entry.present += 1;
    });
    return Array.from(divisionMap.values())
      .map((item) => ({
        ...item,
        percentage: item.total > 0 ? Math.round((item.present / item.total) * 100) : 0,
      }))
      .sort((a, b) => a.division.localeCompare(b.division));
  }, [data]);

  const maxTotal = Math.max(...chartData.map((r) => r.total), 1);
  const totalEmployees = chartData.reduce((s, r) => s + r.total, 0);
  const totalPresent = chartData.reduce((s, r) => s + r.present, 0);
  const overallPct = totalEmployees > 0 ? Math.round((totalPresent / totalEmployees) * 100) : 0;

  if (chartData.length === 0) return null;
 
  const handleDivisionSelect = (divisionName) => {
    onDivisionClick(divisionName);
  };

  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        borderRadius: "16px",
        background: "#fff",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,74,173,0.06)",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Box>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#004AAD", letterSpacing: "0.03em" }}>
            Division Overview
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#94a3b8", mt: "1px" }}>
            {chartData.length} divisions · click any division to view locations
          </Typography>
        </Box>
         
      </Box>

      {/* Division Bars - Clicking on bar takes to location chart */}
      {chartData.map((row) => {
        const barW = Math.max(Math.round((row.present / maxTotal) * 100), row.present > 0 ? 2 : 0);
        const barColor = rateColor(row.percentage);

        return (
          <Box 
            key={row.division} 
            sx={{ mb: "6px", "&:last-child": { mb: 0 } }}
            onClick={() => handleDivisionSelect(row.division)}
          >
            {/* ── Bar row ── */}
            <Box
              sx={{
                cursor: "pointer",
                borderRadius: "8px",
                p: "8px 10px",
                mx: "-8px",
                transition: "all 0.18s ease",
                "&:hover": { bgcolor: "#f0f5ff", transform: "translateX(4px)" },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "4px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px", minWidth: 0, flex: 1 }}>
                  <AccountTree sx={{ fontSize: 12, color: "#004AAD", flexShrink: 0 }} />
                  <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {row.division}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0, ml: 1 }}>
                  <Typography sx={{ fontSize: "0.65rem", color: "#64748b" }}>{row.present}/{row.total}</Typography>
                  <PctBadge pct={row.percentage} />
                  <KeyboardArrowDown
                    sx={{
                      fontSize: 14, color: "#94a3b8",
                      transform: "rotate(-90deg)",
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ height: 5, background: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
                <Box sx={{ height: "100%", borderRadius: "10px", width: `${barW}%`, background: barColor, transition: "width 0.45s ease" }} />
              </Box>
            </Box>
          </Box>
        );
      })}

      {/* Legend */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", pt: "10px", mt: "8px", borderTop: "0.5px solid #f1f5f9" }}>
        {[{ label: "≥80%", color: "#16a34a" }, { label: "60–79%", color: "#d97706" }, { label: "<60%", color: "#dc2626" }].map((l) => (
          <Box key={l.label} sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Box sx={{ width: 7, height: 7, borderRadius: "2px", background: l.color }} />
            <Typography sx={{ fontSize: "0.62rem", color: "#64748b" }}>{l.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

/* ─── STEP 1: Division Cards (alternative view) ───────────────────────────── */
const DivisionStep = ({ divisions, data, onSelect }) => {
  const divStats = divisions.map((div) => {
    const emps    = data.filter((d) => d.division === div);
    const present = emps.filter(isPresent).length;
    const locs    = [...new Set(emps.map((e) => e.loc))].length;
    const rate    = emps.length > 0 ? Math.round((present / emps.length) * 100) : 0;
    const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
    return { div, total: emps.length, present, locs, rate, rateColor };
  });

  return (
    <Box>
      <Typography sx={{ mb: 1.5, fontWeight: 600, color: "#64748b", fontSize: "0.8rem" }}>
        Select a division to view locations
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {divStats.map(({ div, total, present, locs, rate, rateColor }) => (
          <Box key={div} onClick={() => onSelect(div)}
            sx={{
              display: "flex", alignItems: "center", gap: 1.5,
              px: 2, py: 1.25, border: "1.5px solid #e2e8f0",
              borderRadius: "12px", cursor: "pointer", bgcolor: "#fff",
              transition: "all 0.18s ease",
              "&:hover": { borderColor: "#004AAD", bgcolor: "#f0f5ff" },
            }}
          >
            <Avatar sx={{ width: 34, height: 34, bgcolor: "#e8f0fe", flexShrink: 0 }}>
              <AccountTree sx={{ fontSize: 17, color: "#004AAD" }} />
            </Avatar>
            <Typography sx={{ flex: 1, fontWeight: 700, fontSize: "0.85rem", color: "#1e293b", lineHeight: 1.3, wordBreak: "break-word" }}>
              {div}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
              <Chip label={`${locs} loc`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 600, bgcolor: "#e8f0fe", color: "#004AAD" }} />
              <Chip label={`${present}/${total}`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 600, bgcolor: "#dcfce7", color: "#16a34a" }} />
              <Chip label={`${rate}%`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 700, bgcolor: `${rateColor}18`, color: rateColor, minWidth: 42 }} />
              <KeyboardArrowDown sx={{ fontSize: 18, color: "#94a3b8", transform: "rotate(-90deg)" }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
/* ─── InlineLocationChart (existing) ──────────────────────────── */
const InlineLocationChart = ({ data, division, onEmployeeClick }) => {
  const [expandedLoc, setExpandedLoc] = useState(null);

  const chartData = useMemo(() => {
    const filtered = data.filter((d) => d.division === division);
    const locationMap = new Map();
    filtered.forEach((item) => {
      const loc = item.loc?.trim() || "Unknown";
      if (!locationMap.has(loc)) {
        locationMap.set(loc, { location: loc, employees: [], total: 0, present: 0 });
      }
      const entry = locationMap.get(loc);
      entry.employees.push(item);
      entry.total += 1;
      if (isPresent(item)) entry.present += 1;
    });
    return Array.from(locationMap.values())
      .map((item) => ({
        ...item,
        percentage: item.total > 0 ? Math.round((item.present / item.total) * 100) : 0,
      }))
      .sort((a, b) => a.location.localeCompare(b.location));
  }, [data, division]);

  useEffect(() => { setExpandedLoc(null); }, [division]);

  const maxTotal = Math.max(...chartData.map((r) => r.total), 1);
  const totalEmployees = chartData.reduce((s, r) => s + r.total, 0);
  const totalPresent   = chartData.reduce((s, r) => s + r.present, 0);
  const overallPct     = totalEmployees > 0 ? Math.round((totalPresent / totalEmployees) * 100) : 0;

  if (chartData.length === 0) return null;

  const handleBarClick = (locName) =>
    setExpandedLoc((prev) => (prev === locName ? null : locName));

  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        borderRadius: "16px",
        background: "#fff",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,74,173,0.06)",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Box>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#004AAD", letterSpacing: "0.03em" }}>
            Location Overview - {division}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#94a3b8", mt: "1px" }}>
            {chartData.length} locations · click bar to expand
          </Typography>
        </Box>
        
      </Box>

      {/* Bars + inline employee list */}
      {chartData.map((row) => {
        const barW     = Math.max(Math.round((row.present / maxTotal) * 100), row.present > 0 ? 2 : 0);
        const isOpen   = expandedLoc === row.location;
        const barColor = rateColor(row.percentage);

        return (
          <Box key={row.location} sx={{ mb: "6px", "&:last-child": { mb: 0 } }}>
            {/* ── Bar row ── */}
            <Box
              onClick={() => handleBarClick(row.location)}
              sx={{
                cursor: "pointer",
                borderRadius: isOpen ? "8px 8px 0 0" : "8px",
                p: "6px 8px",
                mx: "-8px",
                border: isOpen ? `1.5px solid ${barColor}` : "1.5px solid transparent",
                borderBottom: isOpen ? "none" : undefined,
                bgcolor: isOpen ? `${barColor}0d` : "transparent",
                transition: "background 0.15s ease, border-color 0.15s ease",
                "&:hover": { bgcolor: isOpen ? `${barColor}0d` : "#f0f5ff" },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "4px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px", minWidth: 0, flex: 1 }}>
                  <LocationOn sx={{ fontSize: 12, color: isOpen ? barColor : "#004AAD", flexShrink: 0 }} />
                  <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {row.location}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0, ml: 1 }}>
                  <Typography sx={{ fontSize: "0.65rem", color: "#64748b" }}>{row.present}/{row.total}</Typography>
                  <PctBadge pct={row.percentage} />
                  <KeyboardArrowDown
                    sx={{
                      fontSize: 14, color: "#94a3b8",
                      transition: "transform 0.22s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ height: 5, background: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
                <Box sx={{ height: "100%", borderRadius: "10px", width: `${barW}%`, background: barColor, transition: "width 0.45s ease" }} />
              </Box>
            </Box>

            {/* ── Inline employee list (expands below bar) ── */}
            <Collapse in={isOpen} timeout={220} unmountOnExit>
              <Box
                sx={{
                  mx: "-8px",
                  border: `1.5px solid ${barColor}`,
                  borderTop: "none",
                  borderRadius: "0 0 8px 8px",
                  overflow: "hidden",
                  bgcolor: "#fafbff",
                }}
              >
                {/* Stats strip */}
                <Box sx={{ display: "flex", bgcolor: "#fff", borderBottom: "1px solid #f1f5f9" }}>
                  {[
                    { label: "Strength", value: row.total,               color: "#004AAD" },
                    { label: "Present",  value: row.present,             color: "#16a34a" },
                    { label: "Absent",   value: row.total - row.present, color: "#dc2626" },
                  ].map((s) => (
                    <Box key={s.label} sx={{ flex: 1, textAlign: "center", py: 1, borderRight: "1px solid #f1f5f9", "&:last-child": { borderRight: "none" } }}>
                      <Typography sx={{ fontSize: "0.6rem", color: "#64748b" }}>{s.label}</Typography>
                      <Typography sx={{ fontSize: "0.95rem", fontWeight: 800, color: s.color }}>{s.value}</Typography>
                    </Box>
                  ))}
                </Box>

                {/* Column headers */}
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1.4fr 0.7fr 0.5fr", gap: 0.5, px: 1.5, py: 0.7, bgcolor: "#e8f0fe" }}>
                  {["Svc No", "Name", "Designation", "IN ", "OUT "].map((h) => (
                    <Typography key={h} sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#004AAD" }}>{h}</Typography>
                  ))}
                </Box>

                {/* Employee rows */}
                {row.employees.map((emp, idx) => {
                  const p = isPresent(emp);
                  return (
                    <Box
                      key={emp.sno || idx}
                      onClick={() => onEmployeeClick(emp)}
                      sx={{
                        display: "grid", gridTemplateColumns: "1fr 1.6fr 1.4fr 0.7fr 0.5fr", gap: 0.5,
                        px: 1.5, py: 0.85,
                        bgcolor: idx % 2 === 0 ? "#fff" : "#f8faff",
                        borderTop: "0.5px solid #f1f5f9",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "all 0.18s ease",
                        "&:hover": { bgcolor: "#e8f0fe", transform: "translateX(3px)" },
                      }}
                    >
                      <Typography sx={{ fontSize: "0.65rem", color: "#475569" }}>{emp.sno || "-"}</Typography>
                      <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2, wordBreak: "break-word" }}>{emp.repname || "-"}</Typography>
                      <Typography sx={{ fontSize: "0.6rem", color: "#64748b", lineHeight: 1.2, wordBreak: "break-word" }}>{emp.des || "-"}</Typography>
                      <Typography sx={{ fontSize: "0.68rem", fontWeight: p ? 700 : 400, color: p ? "#16a34a" : "#dc2626" }}>{p ? emp.inn : "NR"}</Typography>
                      <Typography sx={{ fontSize: "0.68rem", fontWeight: p ? 700 : 400, color: p ? "#16a34a" : "#dc2626" }}>{p ? emp.pout : "NR"}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Collapse>
          </Box>
        );
      })}

      {/* Legend */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", pt: "10px", mt: "8px", borderTop: "0.5px solid #f1f5f9" }}>
        {[{ label: "≥80%", color: "#16a34a" }, { label: "60–79%", color: "#d97706" }, { label: "<60%", color: "#dc2626" }].map((l) => (
          <Box key={l.label} sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Box sx={{ width: 7, height: 7, borderRadius: "2px", background: l.color }} />
            <Typography sx={{ fontSize: "0.62rem", color: "#64748b" }}>{l.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

/* ─── Helpers for Chart aggregation ───────────────────────────────────────── */
const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

const getWeekStart = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  return d;
};

const getYear = (date) => {
  return date.getFullYear();
};

const aggregateByPeriod = (data, keyFn, labelFn, sortKeyFn) => {
  const groups = {};
  data.forEach(item => {
    const date = new Date(item.AttDate || item.attDate || item.ATTDATE || item.Date || item.date);
    if (isNaN(date.getTime())) return;
    const key = keyFn(date);
    if (!groups[key]) {
      groups[key] = {
        key,
        sortKey: sortKeyFn(date),
        label: labelFn(date),
        repDate: date,
        eligibleSum: 0,
        attendanceSum: 0,
        count: 0,
      };
    }
    groups[key].eligibleSum += parseInt(item.Eligible || item.eligible || item.ELIGIBLE || 0);
    groups[key].attendanceSum += parseInt(item.Attendance || item.attendance || item.ATTENDANCE || 0);
    groups[key].count += 1;
  });

  return Object.values(groups)
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(g => {
      const avgEligible = g.count ? g.eligibleSum / g.count : 0;
      const avgAttendance = g.count ? g.attendanceSum / g.count : 0;
      const rate = avgEligible ? Math.round((avgAttendance / avgEligible) * 100) : 0;
      return {
        name: g.label,
        eligible: Math.round(avgEligible),
        attendance: Math.round(avgAttendance),
        remaining: Math.max(0, Math.round(avgEligible) - Math.round(avgAttendance)),
        rate,
        fullDate: g.repDate.toISOString(),
        periodDays: g.count,
        hasData: true
      };
    });
};

const formatYLeft = (v) => {
  if (v >= 1000) {
    return `${(v / 1000).toFixed(1).replace(".0", "")}k`;
  }
  return v;
};

const formatYRight = (v) => `${v}%`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const attendance = payload.find(p => p.dataKey === "attendance")?.value || 0;
    const remaining = payload.find(p => p.dataKey === "remaining")?.value || 0;
    const eligible = attendance + remaining;
    const rateVal = payload.find(p => p.dataKey === "rate")?.value;

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
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
          {label}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 0.3 }}>
          <Box sx={{ width: 8, height: 8, backgroundColor: "#3b82f6", borderRadius: "50%" }} />
          <Typography sx={{ fontSize: 11, color: "#64748b" }}>
            Attendance: <span style={{ color: "#1e293b", fontWeight: 700 }}>{attendance}</span>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 0.3 }}>
          <Box sx={{ width: 8, height: 8, backgroundColor: "#bfdbfe", borderRadius: "50%" }} />
          <Typography sx={{ fontSize: 11, color: "#64748b" }}>
            Eligible: <span style={{ color: "#1e293b", fontWeight: 700 }}>{eligible}</span>
          </Typography>
        </Box>
        {rateVal !== undefined && rateVal !== null && (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.5, pt: 0.5, borderTop: "0.5px solid #e2e8f0" }}>
            <Box sx={{ width: 8, height: 8, backgroundColor: "#f59e0b", borderRadius: "50%" }} />
            <Typography sx={{ fontSize: 11, color: "#64748b" }}>
              Rate %: <span style={{ color: "#f59e0b", fontWeight: 800 }}>{rateVal}%</span>
            </Typography>
          </Box>
        )}
      </Box>
    );
  }
  return null;
};

const LegendDot = ({ color, label }) => (
  <Box sx={{ display: "flex", gap: 0.8, alignItems: "center" }}>
    <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
    <Typography sx={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>{label}</Typography>
  </Box>
);

const ChartLegend = () => (
  <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mt: 2, pt: 1.5, borderTop: "0.5px solid #f1f5f9" }}>
    <LegendDot color="#3b82f6" label="Attendance" />
    <LegendDot color="#bfdbfe" label="Eligible" />
    <LegendDot color="#f59e0b" label="Rate %" />
  </Box>
);

/* ─── CDLOverallTrendChart - Overall CDPLC trend chart ────────────────────────── */
const CDLOverallTrendChart = () => {
  const [chartPeriod, setChartPeriod] = useState("month"); // "week" | "month" | "year"
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    weeklyAttendance,
    monthlyAttendance,
    yearlyAttendance,
  } = useSelector((state) => state.attendanceCard);

  // Helper function to process data based on current period
  const chartData = useMemo(() => {
    if (chartPeriod === "month") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentMonth = new Date().getMonth();
      
      let lastEligible = 1400;
      const rawMonths = monthlyAttendance || [];
      rawMonths.forEach(item => {
        const eligible = parseInt(item.Eligible || item.eligible || item.ELIGIBLE || 0);
        if (eligible > 0) lastEligible = eligible;
      });

      return months.map((m, index) => {
        const item = rawMonths.find(item => {
          const monthVal = item.Month || item.month || item.MONTH || item.AttMonth || "";
          let monthIndex = -1;
          if (typeof monthVal === "string") {
            const valLower = monthVal.toLowerCase();
            if (valLower.includes("-")) {
              const parts = valLower.split("-");
              monthIndex = parseInt(parts[1]) - 1;
            } else {
              monthIndex = months.findIndex(name => valLower.startsWith(name.toLowerCase()));
            }
          } else if (typeof monthVal === "number") {
            monthIndex = monthVal - 1;
          }
          return monthIndex === index;
        });

        if (item) {
          const attendance = parseInt(item.Attendance || item.attendance || item.ATTENDANCE || 0);
          const eligible = parseInt(item.Eligible || item.eligible || item.ELIGIBLE || lastEligible || 0);
          const rate = item.Rate || item.rate || item.RATE || item.Percentage || item.percentage;
          
          const hasRealData = attendance > 0 || index <= currentMonth;

          return {
            name: m,
            attendance: attendance,
            eligible: eligible,
            remaining: Math.max(0, eligible - attendance),
            rate: hasRealData ? (rate !== undefined ? parseFloat(rate) : Math.round((attendance / eligible) * 100)) : null,
            hasData: hasRealData
          };
        } else {
          return {
            name: m,
            attendance: 0,
            eligible: lastEligible,
            remaining: lastEligible,
            rate: null,
            hasData: false
          };
        }
      });
    } else if (chartPeriod === "week") {
      const rawWeeks = weeklyAttendance || [];
      const hasDate = rawWeeks.some(w => w.AttDate || w.attDate || w.ATTDATE || w.Date || w.date);
      
      if (hasDate) {
        return aggregateByPeriod(
          rawWeeks,
          (date) => {
            const weekStart = getWeekStart(date);
            const weekNum = getWeekNumber(weekStart);
            const year = getYear(weekStart);
            return `${year}-${String(weekNum).padStart(2, '0')}`;
          },
          (date) => {
            const weekStart = getWeekStart(date);
            const weekNum = getWeekNumber(weekStart);
            return `W${weekNum}`;
          },
          (date) => {
            const weekStart = getWeekStart(date);
            const weekNum = getWeekNumber(weekStart);
            const year = getYear(weekStart);
            return new Date(year, 0, 1 + (weekNum - 1) * 7).getTime();
          }
        );
      } else {
        return rawWeeks.map((item, index) => {
          const name = item.DayName || item.dayName || item.DAYNAME || item.Week || item.week || `W${index + 1}`;
          const attendance = parseInt(item.Attendance || item.attendance || item.ATTENDANCE || 0);
          const eligible = parseInt(item.Eligible || item.eligible || item.ELIGIBLE || 0);
          const rate = item.Rate || item.rate || item.RATE || item.Percentage || item.percentage;
          return {
            name,
            attendance,
            eligible,
            remaining: Math.max(0, eligible - attendance),
            rate: eligible > 0 ? (rate !== undefined ? parseFloat(rate) : Math.round((attendance / eligible) * 100)) : null,
            hasData: eligible > 0
          };
        });
      }
    } else {
      const rawYears = yearlyAttendance || [];
      const hasDate = rawYears.some(w => w.AttDate || w.attDate || w.ATTDATE || w.Date || w.date);

      if (hasDate) {
        return aggregateByPeriod(
          rawYears,
          (date) => `${getYear(date)}`,
          (date) => `${getYear(date)}`,
          (date) => new Date(getYear(date), 0, 1).getTime()
        );
      } else {
        return rawYears.map((item, index) => {
          const name = String(item.Year || item.year || item.YEAR || `Year ${index + 1}`);
          const attendance = parseInt(item.Attendance || item.attendance || item.ATTENDANCE || 0);
          const eligible = parseInt(item.Eligible || item.eligible || item.ELIGIBLE || 0);
          const rate = item.Rate || item.rate || item.RATE || item.Percentage || item.percentage;
          return {
            name,
            attendance,
            eligible,
            remaining: Math.max(0, eligible - attendance),
            rate: eligible > 0 ? (rate !== undefined ? parseFloat(rate) : Math.round((attendance / eligible) * 100)) : null,
            hasData: eligible > 0
          };
        });
      }
    }
  }, [chartPeriod, weeklyAttendance, monthlyAttendance, yearlyAttendance]);

  const barSize = chartData.length <= 12 ? 24 : 14;

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      {/* Control row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        {/* Toggle buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {["Week", "Month", "Year"].map((p) => {
            const isSelected = chartPeriod === p.toLowerCase();
            return (
              <Box
                key={p}
                onClick={() => setChartPeriod(p.toLowerCase())}
                sx={{
                  px: 2,
                  py: 0.6,
                  borderRadius: "8px",
                  border: isSelected ? "none" : "1px solid #e2e8f0",
                  bgcolor: isSelected ? "#1E3A8A" : "#fff",
                  color: isSelected ? "#fff" : "#64748b",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  userSelect: "none",
                  "&:hover": {
                    bgcolor: isSelected ? "#1E3A8A" : "#f8faff",
                  }
                }}
              >
                {p}
              </Box>
            );
          })}
        </Box>
        {/* Right label */}
        <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700 }}>
          All Divisions · CDPLC
        </Typography>
      </Box>

      {/* Chart container */}
      {chartData.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 260, bgcolor: "#f8faff", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
          <Typography sx={{ fontSize: "0.85rem", color: "#94a3b8" }}>No chart data available</Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ height: 260, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: -15, left: -20, bottom: 5 }}
                barCategoryGap="30%"
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 10, fontWeight: 500 }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 10, fontWeight: 500 }}
                  tickFormatter={formatYLeft}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 10, fontWeight: 500 }}
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  tickFormatter={formatYRight}
                />
                <ChartTooltip content={<CustomTooltip />} />
                
                {/* Attendance segment (bottom) */}
                <Bar
                  yAxisId="left"
                  dataKey="attendance"
                  name="Attendance"
                  stackId="bars"
                  barSize={barSize}
                  fill="#3b82f6"
                  radius={[0, 0, 4, 4]}
                />

                {/* Eligible segment (top) */}
                <Bar
                  yAxisId="left"
                  dataKey="remaining"
                  name="Eligible"
                  stackId="bars"
                  barSize={barSize}
                  fill="#bfdbfe"
                  radius={[4, 4, 0, 0]}
                />

                {/* Rate % line */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="rate"
                  name="Rate %"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                  connectNulls={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
          <ChartLegend />
        </>
      )}
    </Box>
  );
};

/* ─── Desktop Location Table ──────────────────────────────────────────────── */
const DesktopLocationTable = ({ locationGroups, expandedRow, onExpand, onViewDetails, onEmployeeClick }) => (
  <TableContainer>
    <Table>
      <TableHead sx={{ bgcolor: "#004AAD" }}>
        <TableRow>
          <TableCell sx={{ color: "white", fontWeight: "bold", width: "35%" }}>Location</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Strength</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Present</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Attendance</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(locationGroups).map(([location, employees]) => {
          const strength  = employees.length;
          const present   = employees.filter(isPresent).length;
          const absent    = strength - present;
          const rate      = strength > 0 ? Math.round((present / strength) * 100) : 0;
          const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
          const expanded  = expandedRow === location;
          return (
            <React.Fragment key={location}>
              <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(0,74,173,0.04)" } }}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Business sx={{ color: "#004AAD" }} />
                    <Typography fontWeight={500}>{location}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center"><Chip label={strength} size="small" sx={{ bgcolor: "#e8f0fe", color: "#004AAD", fontWeight: "bold" }} /></TableCell>
                <TableCell align="center"><Chip label={present}  size="small" sx={{ bgcolor: "#dcfce7", color: "#16a34a", fontWeight: "bold" }} /></TableCell>
                <TableCell align="center"><Chip label={`${rate}%`} size="small" sx={{ bgcolor: `${rateColor}18`, color: rateColor, fontWeight: "bold" }} /></TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => onExpand(location)} sx={{ color: "#004AAD" }}>
                    {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                  <Button size="small" variant="outlined" startIcon={<Visibility />}
                    onClick={() => onViewDetails({ location, employees, strength, present, absent, rate })}
                    sx={{ ml: 1, borderColor: "#004AAD", color: "#004AAD", textTransform: "none" }}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 0 }}>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box sx={{ m: 2, bgcolor: "#f8faff", borderRadius: "12px", p: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold", color: "#004AAD" }}>
                        Employee List - {location}
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: "#e8f0fe" }}>
                            {["Service No", "Name", "Designation", "Clock No", "IN Time", "Prev. OUT", "Status"].map((h) => (
                              <TableCell key={h}><b>{h}</b></TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {employees.map((emp, idx) => {
                            const p = isPresent(emp);
                            return (
                              <TableRow key={emp.sno || idx} hover sx={{ cursor: "pointer" }} onClick={() => onEmployeeClick(emp)}>
                                <TableCell>{emp.sno || "-"}</TableCell>
                                <TableCell>{emp.repname || "-"}</TableCell>
                                <TableCell>{emp.des || "-"}</TableCell>
                                <TableCell>{emp.cno || "-"}</TableCell>
                                <TableCell>
                                  <Chip label={p ? emp.inn : "NR"} size="small"
                                    sx={{ bgcolor: p ? "#dcfce7" : "#fee2e2", color: p ? "#16a34a" : "#dc2626", fontSize: "0.7rem" }} />
                                </TableCell>
                                <TableCell>{emp.pout || "-"}</TableCell>
                                <TableCell>
                                  <Chip label={p ? "Present" : "Absent"} size="small"
                                    icon={p ? <CheckCircle sx={{ fontSize: "12px !important" }} /> : <Cancel sx={{ fontSize: "12px !important" }} />}
                                    sx={{ bgcolor: p ? "#dcfce7" : "#fee2e2", color: p ? "#16a34a" : "#dc2626", fontSize: "0.7rem" }} />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
        })}
        {Object.keys(locationGroups).length === 0 && (
          <TableRow>
            <TableCell colSpan={5} sx={{ textAlign: "center", py: 5 }}>
              <Search sx={{ fontSize: 40, color: "#cbd5e1", display: "block", mx: "auto", mb: 1 }} />
              <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No locations match your search</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

/* ─── Detail Drawer ───────────────────────────────────────────────────────── */
const DetailDrawer = ({ open, onClose, data, onEmployeeClick }) => {
  if (!data) return null;
  const { location, employees, strength, present, absent, rate } = data;
  const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
  return (
    <SwipeableDrawer anchor="bottom" open={open} onClose={onClose} onOpen={() => {}} disableSwipeToOpen
      sx={{ "& .MuiDrawer-paper": { borderTopLeftRadius: "24px", borderTopRightRadius: "24px", maxHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden" } }}>
      <Box sx={{ pt: 1.5, pb: 0.5, display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: "#cbd5e1" }} />
      </Box>
      <Box sx={{ px: 2.5, py: 2, bgcolor: "#004AAD", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <Box>
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>{location}</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", mt: 0.3 }}>{strength} employees</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}><Close /></IconButton>
      </Box>
      <Box sx={{ display: "flex", flexShrink: 0, borderBottom: "1px solid #f1f5f9" }}>
        {[{ label: "Total", value: strength, color: "#004AAD" }, { label: "Present", value: present, color: "#16a34a" }, { label: "Absent", value: absent, color: "#dc2626" }, { label: "Rate", value: `${rate}%`, color: rateColor }].map((s) => (
          <Box key={s.label} sx={{ flex: 1, textAlign: "center", py: 1.5, borderRight: "1px solid #f1f5f9", "&:last-child": { borderRight: "none" } }}>
            <Typography sx={{ fontSize: "0.63rem", color: "#64748b" }}>{s.label}</Typography>
            <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: s.color }}>{s.value}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ overflowY: "auto", flex: 1, px: 2, py: 1.5 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr 0.6fr", gap: 0.5, px: 1, py: 0.8, bgcolor: "#e8f0fe", borderRadius: "8px", mb: 1, position: "sticky", top: 0, zIndex: 1 }}>
          {["Svc No", "Name", "Designation", "IN Tie", "Status"].map((h) => (
            <Typography key={h} sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#004AAD" }}>{h}</Typography>
          ))}
        </Box>
        {employees.map((emp, idx) => {
          const p = isPresent(emp);
          return (
            <Box key={emp.sno || idx}
              sx={{
                display: "grid", gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr 0.6fr", gap: 0.5,
                px: 1, py: 1, bgcolor: idx % 2 === 0 ? "#fff" : "#f8faff",
                borderRadius: "8px", mb: 0.5, alignItems: "center", border: "1px solid #f1f5f9",
                cursor: "pointer", transition: "all 0.2s ease",
                "&:hover": { bgcolor: "#e8f0fe", transform: "translateX(4px)" },
              }}
              onClick={() => onEmployeeClick(emp)}
            >
              <Typography sx={{ fontSize: "0.65rem", color: "#475569" }}>{emp.sno || "-"}</Typography>
              <Box>
                <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2 }}>{emp.repname || "-"}</Typography>
                <Typography sx={{ fontSize: "0.6rem", color: "#94a3b8" }}>{emp.cno ? `Clk: ${emp.cno}` : ""}</Typography>
              </Box>
              <Typography sx={{ fontSize: "0.62rem", color: "#64748b", lineHeight: 1.2 }}>{emp.des || "-"}</Typography>
              <Box>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: p ? 700 : 400, color: p ? "#16a34a" : "#94a3b8" }}>{p ? emp.inn : "NR"}</Typography>
                {emp.pout && <Typography sx={{ fontSize: "0.58rem", color: "#94a3b8" }}>OUT: {emp.pout}</Typography>}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p ? <CheckCircle sx={{ fontSize: 16, color: "#16a34a" }} /> : <Cancel sx={{ fontSize: 16, color: "#dc2626" }} />}
              </Box>
            </Box>
          );
        })}
      </Box>
    </SwipeableDrawer>
  );
};

/* ─── Breadcrumb ──────────────────────────────────────────────────────────── */
const Breadcrumb = ({ division, onBack }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
    <IconButton size="small" onClick={onBack}
      sx={{ color: "#004AAD", bgcolor: "#e8f0fe", borderRadius: "8px", "&:hover": { bgcolor: "#d0e2ff" } }}>
      <ArrowBack fontSize="small" />
    </IconButton>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
      <Typography onClick={onBack}
        sx={{ fontSize: "0.8rem", color: "#004AAD", cursor: "pointer", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
        All Divisions
      </Typography>
      <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8" }}>/</Typography>
      <Chip label={division} size="small" sx={{ height: 22, fontSize: "0.72rem", fontWeight: 700, bgcolor: "#004AAD", color: "#fff" }} />
    </Box>
  </Box>
);

/* ─── SearchBar ───────────────────────────────────────────────────────────── */
const SearchBar = ({ value, onChange, placeholder }) => (
  <Box
    sx={{
      display: "flex", alignItems: "center", gap: 1,
      mb: 2, px: 1.5, py: 0.85,
      border: "1.5px solid #e2e8f0", borderRadius: "12px", bgcolor: "#fff",
      transition: "border-color 0.18s ease, box-shadow 0.18s ease",
      "&:focus-within": { borderColor: "#004AAD", boxShadow: "0 0 0 3px rgba(0,74,173,0.08)" },
    }}
  >
    <Search sx={{ fontSize: 18, color: "#94a3b8", flexShrink: 0 }} />
    <Box component="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || "Search…"}
      sx={{ flex: 1, border: "none", outline: "none", fontSize: "0.85rem", color: "#1e293b", bgcolor: "transparent", fontFamily: "inherit", "&::placeholder": { color: "#94a3b8" } }} />
    {value && (
      <IconButton size="small" onClick={() => onChange("")}
        sx={{ color: "#94a3b8", p: 0.3, "&:hover": { color: "#004AAD", bgcolor: "#e8f0fe" }, borderRadius: "6px" }}>
        <Close sx={{ fontSize: 16 }} />
      </IconButton>
    )}
  </Box>
);

/* ─── DGESatt (main component) ────────────────────────────────────────────── */
const DGESatt = ({ data = [], loading = false ,hadDate }) => {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const currentYear = new Date().getFullYear().toString();

  const [activeMainTab,     setActiveMainTab]      = useState(0); // 0 = Divisions, 1 = Chart
  const [selectedDivision,  setSelectedDivision]  = useState(null);
  const [expandedRow,       setExpandedRow]        = useState(null);
  const [drawerOpen,        setDrawerOpen]         = useState(false);
  const [selectedLocation,  setSelectedLocation]   = useState(null);
  const [employeePopupOpen, setEmployeePopupOpen]  = useState(false);
  const [selectedEmployee,  setSelectedEmployee]   = useState(null);
  const [searchTerm,        setSearchTerm]         = useState("");

  const scrollRef = useRef(null);

  const handleDivisionSelect = useCallback((div) => {
    setSelectedDivision(div);
    setExpandedRow(null);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedDivision(null);
    setExpandedRow(null);
    setSearchTerm("");
  }, []);

  const handleToggle      = useCallback((loc) => setExpandedRow((prev) => (prev === loc ? null : loc)), []);
  const handleViewDetails = useCallback((locData) => { setSelectedLocation(locData); setDrawerOpen(true); }, []);
  const handleEmployeeClick = useCallback((emp) => { setSelectedEmployee(emp); setEmployeePopupOpen(true); }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <Typography>Loading CDPLC location attendance...</Typography>
        </Box>
      </Paper>
    );
  }

  /* ── Filtered data ── */
  const term = searchTerm.toLowerCase().trim();
  const filteredData = term
    ? data.filter((d) =>
        d.repname?.toLowerCase().includes(term) ||
        d.sno?.toLowerCase().includes(term) ||
        d.des?.toLowerCase().includes(term) ||
        d.division?.toLowerCase().includes(term) ||
        d.loc?.toLowerCase().includes(term)
      )
    : data;

  const divisions = [...new Set(filteredData.map((d) => d.division).filter(Boolean))].sort();

  const locationGroups = {};
  if (selectedDivision) {
    filteredData.filter((d) => d.division === selectedDivision).forEach((item) => {
      const loc = item.loc?.trim() || "Unknown";
      if (!locationGroups[loc]) locationGroups[loc] = [];
      locationGroups[loc].push(item);
    });
  }

  const totalLocations = Object.keys(locationGroups).length;
  const divEmployees   = selectedDivision ? filteredData.filter((d) => d.division === selectedDivision) : [];
  const totalPresent   = divEmployees.filter(isPresent).length;

  const mainTitle = selectedDivision ? `Division Overview - ${selectedDivision}` : "Division Overview";
  const mainSubtitle = selectedDivision
    ? `${totalLocations} locations · ${divEmployees.length} employees · ${totalPresent} present${term ? ` · filtered by "${searchTerm}"` : ""}`
    : `${divisions.length || 8} divisions · click any division to view locations${term ? ` · filtered by "${searchTerm}"` : ""}`;

  const searchPlaceholder = selectedDivision
    ? "Search by name, service no, designation, location…"
    : "Search by name, service no, designation, division…";

  return (
    <>
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,74,173,0.05)" }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700, color: "#004AAD", fontSize: "1.1rem" }}>
             {mainTitle}
          </Typography>
          <Typography sx={{ color: "#64748b", fontSize: "0.8rem", fontWeight: 500 }}>
            {mainSubtitle}
          </Typography>
        </Box>

        {/* Tab navigation */}
        <Tabs
          value={activeMainTab}
          onChange={(_, v) => setActiveMainTab(v)}
          variant="fullWidth"
          sx={{
            borderBottom: "1px solid #e2e8f0",
            mb: 2.5,
            minHeight: 40,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              minHeight: 40,
              py: 0.75,
              color: "#94a3b8",
            },
            "& .Mui-selected": { color: "#004AAD" },
            "& .MuiTabs-indicator": { backgroundColor: "#004AAD", height: 2.5 },
          }}
        >
          <Tab label="Divisions" />
          <Tab label="Chart" />
        </Tabs>

        {activeMainTab === 0 ? (
          <>
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder={searchPlaceholder} />

            {!selectedDivision ? (
              <>
                <DivisionLevelChart 
                  data={filteredData} 
                  onDivisionClick={handleDivisionSelect} 
                />
                <Box sx={{ mt: 3 }}>
                  <DivisionStep divisions={divisions} data={filteredData} onSelect={handleDivisionSelect} />
                </Box>
              </>
            ) : (
              <>
                <Breadcrumb division={selectedDivision} onBack={handleBack} />

                {/* Location Chart within selected division */}
                <InlineLocationChart
                  data={filteredData}
                  division={selectedDivision}
                  onEmployeeClick={handleEmployeeClick}
                />

                {isMobile ? (
                  <Box
                    ref={scrollRef}
                    sx={{
                      maxHeight: "calc(100vh - 260px)", overflowY: "auto", overflowX: "hidden", pr: 0.5,
                      "&::-webkit-scrollbar": { width: 4 },
                      "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
                      "&::-webkit-scrollbar-thumb": { bgcolor: "#cbd5e1", borderRadius: 4 },
                    }}
                  >
                    {Object.keys(locationGroups).length === 0 && (
                      <Box sx={{ textAlign: "center", py: 6 }}>
                        <Search sx={{ fontSize: 44, color: "#cbd5e1", mb: 1 }} />
                        <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No locations match your search</Typography>
                      </Box>
                    )}
                    <Box sx={{ height: 80 }} />
                  </Box>
                ) : (
                  <DesktopLocationTable
                    locationGroups={locationGroups}
                    expandedRow={expandedRow}
                    onExpand={handleToggle}
                    onViewDetails={handleViewDetails}
                    onEmployeeClick={handleEmployeeClick}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <CDLOverallTrendChart />
        )}
      </Paper>

      <DetailDrawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setTimeout(() => setSelectedLocation(null), 300); }}
        data={selectedLocation}
        onEmployeeClick={handleEmployeeClick}
      />

      <EmployeeDetailsPopup
        open={employeePopupOpen}
        onClose={() => { setEmployeePopupOpen(false); setTimeout(() => setSelectedEmployee(null), 300); }}
        employee={selectedEmployee}
        currentYear={currentYear}
      />
    </>
  );
};

/* ─── Data Wrapper (exported) ─────────────────────────────────────────────── */
export const CDLLocBaseAttendance = ({ hadDate } ) => {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response  = await CommonService.GetCdllocbaseAttendance(hadDate);
        const resultSet = response?.data?.ResultSet || [];
        const normalized = resultSet.map(normalizeRow);
        if (active) setData(normalized);
      } catch (err) {
        if (active) setError("Failed to load CDPLC location attendance.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    return () => { active = false; };
  },[hadDate]);

  if (error) {
    return (
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        <Typography sx={{ color: "#dc2626", fontWeight: 600 }}>{error}</Typography>
      </Paper>
    );
  }

  return <DGESatt data={data} loading={loading} hadDate={hadDate} />;
};