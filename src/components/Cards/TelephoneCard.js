import React, { useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box, Chip } from "@mui/material";
import TelephoneModal from "../Utility/TelephoneModal";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
    color: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 2,
    fontWeight: 700,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    padding: "6px 8px",
    borderBottom: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: "5px 8px",
    borderBottom: "1px solid #f1f5f9",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#ffffff",
  transition: "all 0.15s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f8fafc",
    "& .contact-name": {
      color: "#2563eb",
    },
  },
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));

export default function TelephoneCard({ data, msg }) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const mappedItems = useMemo(() => {
    if (!data || data.length === 0) {
      return (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            width: "100%",
            textAlign: "center",
            borderRadius: "12px",
            border: "1.5px dashed #cbd5e1",
            backgroundColor: "#f8fafc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            my: 1,
          }}
        >
          <ContactPhoneIcon sx={{ fontSize: 36, color: "#94a3b8" }} />
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontWeight: 600,
              fontSize: "12px",
            }}
          >
            {msg || "No contact records found"}
          </Typography>
        </Paper>
      );
    }

    return (
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          maxHeight: { xs: "490px", sm: "560px" },
          width: "100%",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "5px",
            height: "0px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f5f9",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#94a3b8",
          },
        }}
      >
        <Table
          stickyHeader
          aria-label="telephone contacts table"
          size="small"
          sx={{ width: "100%", tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" sx={{ width: "20%" }}>
                Ext
              </StyledTableCell>

              <StyledTableCell align="left" sx={{ width: "48%" }}>
                Name & Info
              </StyledTableCell>

              <StyledTableCell align="center" sx={{ width: "32%" }}>
                Telephone
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow key={index} onClick={() => handleRowClick(row)}>
                {/* Extension Column */}
                <StyledTableCell align="center">
                  {row.Extension ? (
                    <Chip
                      label={row.Extension}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "10px",
                        fontWeight: 700,
                        backgroundColor: "#f1f5f9",
                        color: "#334155",
                        borderRadius: "5px",
                        px: 0.3,
                        maxWidth: "100%",
                      }}
                    />
                  ) : (
                    <Typography sx={{ fontSize: "11px", color: "#94a3b8" }}>-</Typography>
                  )}
                </StyledTableCell>

                {/* Name & Info Column */}
                <StyledTableCell align="left">
                  <Box sx={{ minWidth: 0, overflow: "hidden" }}>
                    <Typography
                      className="contact-name"
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#0f172a",
                        lineHeight: 1.25,
                        transition: "color 0.15s ease-in-out",
                        wordBreak: "break-word",
                      }}
                    >
                      {row.Name || "Unknown Contact"}
                    </Typography>

                    {(row.Designation || row.DDescription || row.DeptDesc) && (
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 500,
                          color: "#64748b",
                          lineHeight: 1.15,
                          mt: 0.1,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "100%",
                        }}
                      >
                        {row.Designation || row.DDescription || row.DeptDesc}
                      </Typography>
                    )}
                  </Box>
                </StyledTableCell>

                {/* Telephone Column */}
                <StyledTableCell align="center">
                  {row.Telephone ? (
                    <Box
                      component="a"
                      href={`tel:${row.Telephone}`}
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.4,
                        px: 0.6,
                        py: 0.2,
                        borderRadius: "14px",
                        backgroundColor: "#eff6ff",
                        color: "#2563eb",
                        border: "1px solid #dbeafe",
                        textDecoration: "none",
                        fontSize: "11px",
                        fontWeight: 700,
                        maxWidth: "100%",
                        overflow: "hidden",
                        transition: "all 0.15s ease-in-out",
                        "&:hover": {
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          borderColor: "#2563eb",
                        },
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: 11, flexShrink: 0 }} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {row.Telephone}
                      </span>
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: "11px", color: "#94a3b8" }}>-</Typography>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [data, msg]);

  return (
    <Box sx={{ width: "100%" }}>
      {mappedItems}

      {selectedRow && (
        <TelephoneModal
          open={open}
          onClose={handleClose}
          data={selectedRow}
        />
      )}
    </Box>
  );
}





