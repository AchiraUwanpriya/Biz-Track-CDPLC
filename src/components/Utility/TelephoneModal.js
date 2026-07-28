import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, Button, Paper, Avatar } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import ExtensionIcon from "@mui/icons-material/Extension";
import BadgeIcon from "@mui/icons-material/Badge";
import axios from "axios";

const defaultAvatar = require("../../assets/images/man.png");

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  maxHeight: "90vh",
  bgcolor: "#ffffff",
  borderRadius: "20px",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.16)",
  outline: "none",
  overflow: "hidden",
};

const TelephoneModal = ({ open, onClose, data }) => {
  const [imgError, setImgError] = useState(false);

  const {
    Service_no,
    Name,
    Telephone,
    Extension,
    Email,
    Designation,
    DDescription,
    DeptDesc,
  } = data || {};

  const hasImage = Boolean(Service_no) && !imgError;
  const imageSrc = hasImage
    ? `${axios.defaults.baseURL}home/GetUserImg?serviceNo=${Service_no}`.replace(/"/g, "")
    : defaultAvatar;

  const departmentText = DeptDesc || DDescription || "";
  const designationText = Designation || "";

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="telephone-modal-title"
      aria-describedby="telephone-modal-description"
    >
      <Box sx={modalStyle}>
        {/* Top Header with Gradient and Avatar */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
            p: 3,
            pt: 3.5,
            textAlign: "center",
            position: "relative",
            color: "#ffffff",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "#ffffff",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(4px)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.35)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>

          {/* Profile Avatar Image */}
          <Box
            sx={{
              display: "inline-flex",
              p: 0.5,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
              mb: 1.2,
            }}
          >
            <Avatar
              src={imageSrc}
              onError={() => setImgError(true)}
              alt={Name || "Contact"}
              sx={{
                width: 76,
                height: 76,
                border: "2px solid #ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backgroundColor: "#ffffff",
              }}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "#ffffff",
              lineHeight: 1.2,
              mb: 0.3,
            }}
          >
            {Name || "Contact Details"}
          </Typography>

          {designationText && (
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.85)",
              }}
            >
              {designationText}
            </Typography>
          )}
        </Box>

        {/* Info Cards Body */}
        <Box sx={{ p: 2.2, display: "flex", flexDirection: "column", gap: 1.2 }}>
          {/* Service No & Extension Row */}
          <Box sx={{ display: "flex", gap: 1.2 }}>
            {Service_no && (
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 1.2,
                  borderRadius: "12px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <BadgeIcon sx={{ fontSize: 18, color: "#2563eb" }} />
                <Box>
                  <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#64748b" }}>
                    Service No
                  </Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
                    {Service_no}
                  </Typography>
                </Box>
              </Paper>
            )}

            {Extension && (
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 1.2,
                  borderRadius: "12px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ExtensionIcon sx={{ fontSize: 18, color: "#2563eb" }} />
                <Box>
                  <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#64748b" }}>
                    Extension
                  </Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
                    {Extension}
                  </Typography>
                </Box>
              </Paper>
            )}
          </Box>

          {/* Telephone Row */}
          {Telephone && (
            <Paper
              elevation={0}
              sx={{
                p: 1.2,
                borderRadius: "12px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: 1.2,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  backgroundColor: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2563eb",
                  flexShrink: 0,
                }}
              >
                <PhoneIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#64748b" }}>
                  Mobile / Phone Number
                </Typography>
                <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                  {Telephone}
                </Typography>
              </Box>
            </Paper>
          )}

          {/* Email Row */}
          {Email && Email !== "email@example.com" && (
            <Paper
              elevation={0}
              sx={{
                p: 1.2,
                borderRadius: "12px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: 1.2,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  backgroundColor: "#fdf2f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#db2777",
                  flexShrink: 0,
                }}
              >
                <EmailIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#64748b" }}>
                  Email Address
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#0f172a",
                    wordBreak: "break-all",
                  }}
                >
                  {Email}
                </Typography>
              </Box>
            </Paper>
          )}

          {/* Department Row */}
          {departmentText && (
            <Paper
              elevation={0}
              sx={{
                p: 1.2,
                borderRadius: "12px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: 1.2,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  backgroundColor: "#f0fdf4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#16a34a",
                  flexShrink: 0,
                }}
              >
                <BusinessIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#64748b" }}>
                  Department / Section
                </Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
                  {departmentText}
                </Typography>
              </Box>
            </Paper>
          )}

          {/* Action Buttons Footer */}
          {(Telephone || (Email && Email !== "email@example.com")) && (
            <Box sx={{ display: "flex", gap: 1.2, mt: 1 }}>
              {Telephone && (
                <Button
                  component="a"
                  href={`tel:${Telephone}`}
                  fullWidth
                  variant="contained"
                  startIcon={<PhoneIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: "12px",
                    py: 1,
                    fontWeight: 700,
                    fontSize: "12px",
                    textTransform: "none",
                    backgroundColor: "#2563eb",
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
                    "&:hover": {
                      backgroundColor: "#1d4ed8",
                      boxShadow: "0 6px 16px rgba(37, 99, 235, 0.3)",
                    },
                  }}
                >
                  Call Now
                </Button>
              )}

              {Email && Email !== "email@example.com" && (
                <Button
                  component="a"
                  href={`mailto:${Email}`}
                  fullWidth
                  variant="outlined"
                  startIcon={<EmailIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: "12px",
                    py: 1,
                    fontWeight: 700,
                    fontSize: "12px",
                    textTransform: "none",
                    borderColor: "#db2777",
                    color: "#db2777",
                    "&:hover": {
                      borderColor: "#be185d",
                      backgroundColor: "rgba(219, 39, 119, 0.04)",
                    },
                  }}
                >
                  Send Email
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default TelephoneModal;

