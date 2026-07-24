import React from "react";
import {
  Modal,
  Box,
  Typography,
  Fade,
  Backdrop,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LeaveBalance from "../../../src/layouts/leave/LeaveBalance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 440 },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  p: 3,
  borderRadius: 4,
  border: "1px solid #e2e8f0",
};

export default function LeaveSummaryModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 400,
        sx: { backgroundColor: "rgba(15, 23, 42, 0.5)" },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "#64748b",
            }}
            aria-label="close"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 2, fontWeight: 700, fontSize: "1.1rem", color: "#0f172a" }}
          >
            Leave Summary
          </Typography>
          <LeaveBalance />
        </Box>
      </Fade>
    </Modal>
  );
}
