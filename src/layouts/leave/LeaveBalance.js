import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, CardContent, Grid, Typography, Paper } from "@mui/material";
import CircularProgressWithLabel from "../../components/Prograss";

import { useSelector } from "react-redux";
import Loader from "../../components/Utility/Loader";
import NotFound from "../../components/Utility/NotFound";

function FacebookCircularProgress({ total_Leave, total_Leave_Pcn }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 1,
        }}
      >
        <CircularProgress
          variant="determinate"
          sx={{
            color: "#f1f5f9",
          }}
          size={160}
          thickness={4.5}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          value={total_Leave_Pcn || 0}
          disableShrink
          sx={{
            color: "#2563eb",
            animationDuration: "550ms",
            position: "absolute",
            strokeLinecap: "round",
          }}
          size={160}
          thickness={4.5}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1,
            }}
          >
            {total_Leave}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            sx={{
              color: "#64748b",
              fontSize: 11,
              fontWeight: 700,
              mt: 0.5,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
            }}
          >
            Total Balance
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function LeaveBalance() {
  const { responseBody, total_Leave, total_Leave_Pcn, msg, loading } =
    useSelector((state) => state.leaveBalance);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Card
            elevation={0}
            sx={{
              width: "100%",
              backgroundColor: "transparent",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {msg === null ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FacebookCircularProgress
                    total_Leave={total_Leave}
                    total_Leave_Pcn={total_Leave_Pcn}
                  />

                  <Grid
                    container
                    spacing={1.5}
                    sx={{
                      mt: 1.5,
                      justifyContent: "center",
                    }}
                  >
                    {/* Annual Leaves */}
                    <Grid item xs={12} sm={4}>
                      <Paper
                        elevation={0}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          p: 1.8,
                          borderRadius: "16px",
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 18px rgba(16, 185, 129, 0.12)",
                          },
                        }}
                      >
                        <CircularProgressWithLabel
                          value={
                            responseBody === null || !responseBody[0]
                              ? 0
                              : (100 / 14) * responseBody[0].Taken
                          }
                          size={60}
                          bgcolor={"#10b981"}
                        >
                          {responseBody && responseBody[0]
                            ? responseBody[0].Taken
                            : 0}
                        </CircularProgressWithLabel>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            mt: 1.2,
                            px: 1.2,
                            py: 0.3,
                            borderRadius: "14px",
                            backgroundColor: "#ecfdf5",
                            border: "1px solid #a7f3d0",
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
                          <Typography
                            sx={{
                              color: "#065f46",
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            Annual Leaves
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Casual Leaves */}
                    <Grid item xs={12} sm={4}>
                      <Paper
                        elevation={0}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          p: 1.8,
                          borderRadius: "16px",
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 18px rgba(6, 182, 212, 0.12)",
                          },
                        }}
                      >
                        <CircularProgressWithLabel
                          value={
                            responseBody === null || !responseBody[1]
                              ? 0
                              : (100 / 7) * responseBody[1].Taken
                          }
                          size={60}
                          bgcolor={"#06b6d4"}
                        >
                          {responseBody && responseBody[1]
                            ? responseBody[1].Taken
                            : 0}
                        </CircularProgressWithLabel>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            mt: 1.2,
                            px: 1.2,
                            py: 0.3,
                            borderRadius: "14px",
                            backgroundColor: "#ecfeff",
                            border: "1px solid #a5f3fc",
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
                          <Typography
                            sx={{
                              color: "#155e75",
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            Casual Leaves
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Sick Leaves */}
                    <Grid item xs={12} sm={4}>
                      <Paper
                        elevation={0}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          p: 1.8,
                          borderRadius: "16px",
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 18px rgba(245, 158, 11, 0.12)",
                          },
                        }}
                      >
                        <CircularProgressWithLabel
                          value={
                            responseBody === null || !responseBody[2]
                              ? 0
                              : (100 / 21) * responseBody[2].Taken
                          }
                          size={60}
                          bgcolor={"#f59e0b"}
                        >
                          {responseBody && responseBody[2]
                            ? responseBody[2].Taken
                            : 0}
                        </CircularProgressWithLabel>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            mt: 1.2,
                            px: 1.2,
                            py: 0.3,
                            borderRadius: "14px",
                            backgroundColor: "#fffbeb",
                            border: "1px solid #fde68a",
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              backgroundColor: "#f59e0b",
                              mr: 0.8,
                            }}
                          />
                          <Typography
                            sx={{
                              color: "#92400e",
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            Sick Leaves
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <NotFound text={msg} />
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}
