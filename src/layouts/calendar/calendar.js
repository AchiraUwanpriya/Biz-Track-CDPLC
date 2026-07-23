import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  Chip,
  Tooltip,
  CircularProgress,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import axios from "axios";

const INK = "#0E2A4A"; 
const COBALT = "#2E5CFF";
const SKY = "#EAF1FF";
const SKY_SOFT = "#F5F8FF";


const HOLIDAY_TYPES = {
  PD: { label: "Poya ", color: "#f3970c" },
  MD: { label: "Mercantile ", color: "#f30c0c" },
  CD: { label: "Common Holiday", color: "#0cf3e7" },
  default: { label: "Holiday", color: "#f30c0c" },
};

const WEEKEND_TINT = alpha("#2E5CFF", 0.05);

const getHolidayMeta = (type) => HOLIDAY_TYPES[type] || HOLIDAY_TYPES.default;

const WEEKDAYS = [ "Mo", "Tu", "We", "Th", "Fr", "Sa","Su"];

const HeaderCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: 28,
  padding: theme.spacing(3, 2.5, 4),
  background: `linear-gradient(135deg, ${INK} 0%, ${COBALT} 100%)`,
  color: "#fff",
  boxShadow: "0 20px 40px -18px rgba(46,92,255,0.55)",
}));

const HeaderBlob = styled("div")({
  position: "absolute",
  top: -60,
  right: -40,
  width: 180,
  height: 180,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.08)",
});

const DayCell = styled(Box, {
  shouldForwardProp: (p) => !["isToday", "isSelected", "isHoliday", "faded", "isWeekend", "holidayColor"].includes(p),
})(({ isToday, isSelected, isHoliday, faded, isWeekend, holidayColor, theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: isToday || isSelected || isHoliday ? 700 : isWeekend ? 600 : 500,
  color: faded
    ? alpha(INK, 0.28)
    : isSelected
    ? "#fff"
    : isHoliday
    ? holidayColor
    : isToday
    ? COBALT
    : isWeekend
    ? alpha(INK, 0.55)
    : INK,
  background: isSelected
    ? `linear-gradient(135deg, ${COBALT}, ${INK})`
    : isHoliday && !faded
    ? alpha(holidayColor, 0.14)
    : isToday
    ? alpha(COBALT, 0.12)
    : isWeekend && !faded
    ? WEEKEND_TINT
    : "transparent",
  border: isHoliday && !isSelected && !faded
    ? `1.5px solid ${alpha(holidayColor, 0.45)}`
    : isToday && !isSelected
    ? `1.5px solid ${alpha(COBALT, 0.5)}`
    : "1.5px solid transparent",
  transition: "all 0.18s ease",
  "&:hover": {
    background: isSelected
      ? `linear-gradient(135deg, ${COBALT}, ${INK})`
      : isHoliday
      ? alpha(holidayColor, 0.22)
      : alpha(COBALT, 0.08),
  },
}));

function toKey(d) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function parseApiDate(raw) {
  const [datePart] = raw.split(" ");
  const [m, d, y] = datePart.split("/").map(Number);
  return new Date(y, m - 1, d);
}

function buildMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  let startOffset = firstOfMonth.getDay();
  startOffset = startOffset === 0 ? 6 : startOffset - 1;
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), faded: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), faded: false });
  }
  while (cells.length % 7 !== 0) {
    const next = cells.length - (startOffset + daysInMonth) + 1;
    cells.push({ date: new Date(year, month + 1, next), faded: true });
  }
  return cells;
}

export default function DgesCalendar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);
  const [holidaysByDate, setHolidaysByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const fetchHolidays = useCallback(async (y) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/Attendance/Getcalendar", {
  params: { p_year: y },
});
      const list = res?.data?.ResultSet || [];
      const map = {};
      list.forEach((h) => {
        const d = parseApiDate(h.date);
        map[toKey(d)] = { ...h, dateObj: d };
      });
      setHolidaysByDate(map);
    } catch (err) {
      setError("Couldn't load holidays. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHolidays(year);
  }, [year]);

  const grid = useMemo(() => buildMonthGrid(year, month), [year, month]);

  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectedHoliday = holidaysByDate[toKey(selectedDate)];

  const monthHolidays = useMemo(() => {
    return Object.values(holidaysByDate)
      .filter((h) => h.dateObj.getFullYear() === year && h.dateObj.getMonth() === month)
      .sort((a, b) => a.dateObj - b.dateObj);
  }, [holidaysByDate, year, month]);

  return (
    <Box sx={{ maxWidth: 460, mx: "auto", p: isMobile ? 1.5 : 2.5, bgcolor: SKY_SOFT, minHeight: "100%" }}>
      {/* Header */}
      <HeaderCard elevation={0}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ position: "relative", zIndex: 1 }}>
          <IconButton onClick={goPrevMonth} sx={{ color: "#fff", bgcolor: alpha("#fff", 0.12), "&:hover": { bgcolor: alpha("#fff", 0.22) } }}>
            <ChevronLeftRoundedIcon />
          </IconButton>
          <Stack alignItems="center">
            <Typography variant="overline" sx={{ opacity: 0.75, letterSpacing: 2 }}>
              {year}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5, mt: -0.5 }}>
              {monthLabel.split(" ")[0].toUpperCase()}
            </Typography>
          </Stack>
          <IconButton onClick={goNextMonth} sx={{ color: "#fff", bgcolor: alpha("#fff", 0.12), "&:hover": { bgcolor: alpha("#fff", 0.22) } }}>
            <ChevronRightRoundedIcon />
          </IconButton>
        </Stack>

        {/* Weekday row */}
        <Stack direction="row" sx={{ mt: 3, position: "relative", zIndex: 1 }}>
          {WEEKDAYS.map((w, i) => {
            const isWeekend = i === 0 || i === 6;
            return (
              <Box key={`${w}-${i}`} sx={{ flex: 1, textAlign: "center" }}>
                <Typography
                  variant="caption"
                  sx={{ opacity: isWeekend ? 0.95 : 0.7, fontWeight: isWeekend ? 800 : 600 }}
                >
                  {w}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </HeaderCard>

      {/* Calendar grid card, overlapping the header slightly */}
      <Paper
        elevation={0}
        sx={{
          mt: -3,
          mx: 1,
          position: "relative",
          zIndex: 2,
          borderRadius: 5,
          p: 2,
          boxShadow: "0 12px 30px -14px rgba(14,42,74,0.18)",
        }}
      >
        {loading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
            <CircularProgress size={26} sx={{ color: COBALT }} />
          </Stack>
        ) : error ? (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 0.75,
            }}
          >
            {grid.map(({ date, faded }, idx) => {
              const key = toKey(date);
              const holiday = holidaysByDate[key];
              const isToday = key === toKey(today);
              const isSelected = key === toKey(selectedDate);
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const meta = holiday ? getHolidayMeta(holiday.holType) : null;

              const cell = (
                <DayCell
                  key={idx}
                  isToday={isToday}
                  isSelected={isSelected}
                  isHoliday={!!holiday}
                  faded={faded}
                  isWeekend={isWeekend}
                  holidayColor={meta?.color}
                  onClick={() => setSelectedDate(date)}
                >
                  {date.getDate()}
                </DayCell>
              );

              return holiday ? (
                <Tooltip key={idx} title={holiday.holDes} arrow placement="top">
                  {cell}
                </Tooltip>
              ) : (
                cell
              );
            })}
          </Box>
        )}
      </Paper>

      {/* Legend — which color maps to which holiday type code */}
      {!loading && !error && (
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2, px: 1 }}>
          {Object.entries(HOLIDAY_TYPES)
            .filter(([code]) => code !== "default")
            .map(([code, meta]) => (
              <Stack
                key={code}
                direction="row"
                alignItems="center"
                spacing={0.75}
                sx={{
                  px: 1.1,
                  py: 0.5,
                  borderRadius: 10,
                  bgcolor: alpha(meta.color, 0.1),
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: meta.color }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: INK }}>
                  {code}
                </Typography>
                <Typography variant="caption" sx={{ color: alpha(INK, 0.55) }}>
                  {meta.label}
                </Typography>
              </Stack>
            ))}
        </Stack>
      )}

      {/* Selected day / holiday info panel */}
      <Box sx={{ mt: 3, px: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: INK }}>
            {toKey(selectedDate) === toKey(today) ? "Today" : selectedDate.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short" })}
          </Typography>
          {monthHolidays.length > 0 && (
            <Chip
              size="small"
              label={`${monthHolidays.length} holiday${monthHolidays.length > 1 ? "s" : ""} this month`}
              sx={{ bgcolor: SKY, color: COBALT, fontWeight: 700 }}
            />
          )}
        </Stack>

        {selectedHoliday ? (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: SKY,
              borderLeft: `4px solid ${getHolidayMeta(selectedHoliday.holType).color}`,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <EventNoteRoundedIcon sx={{ color: getHolidayMeta(selectedHoliday.holType).color, mt: 0.3 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: INK }}>
                  {selectedHoliday.holDes}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 0.25 }}>
                  <Chip
                    label={selectedHoliday.holType}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: 10,
                      fontWeight: 800,
                      bgcolor: alpha(getHolidayMeta(selectedHoliday.holType).color, 0.15),
                      color: getHolidayMeta(selectedHoliday.holType).color,
                    }}
                  />
                  <Typography variant="caption" sx={{ color: alpha(INK, 0.6) }}>
                    {getHolidayMeta(selectedHoliday.holType).label}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: SKY_SOFT,
              border: `1px dashed ${alpha(COBALT, 0.3)}`,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: alpha(INK, 0.55) }}>
              No holiday on this date — regular working day.
            </Typography>
          </Paper>
        )}

        {/* Rest of month's holidays, quick list */}
        {monthHolidays.length > 0 && (
          <Stack spacing={1} sx={{ mt: 2 }}>
            {monthHolidays.map((h) => {
              const meta = getHolidayMeta(h.holType);
              const active = toKey(h.dateObj) === toKey(selectedDate);
              return (
                <Paper
                  key={toKey(h.dateObj)}
                  elevation={0}
                  onClick={() => setSelectedDate(h.dateObj)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    cursor: "pointer",
                    bgcolor: active ? SKY : "#fff",
                    border: `1px solid ${active ? alpha(COBALT, 0.35) : alpha(INK, 0.08)}`,
                    transition: "all 0.15s ease",
                    "&:hover": { borderColor: alpha(COBALT, 0.35) },
                  }}
                >
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: 2,
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(meta.color, 0.12),
                      color: meta.color,
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 800, fontSize: 13 }}>
                      {h.dateObj.getDate()}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body2" noWrap sx={{ fontWeight: 600, color: INK }}>
                      {h.holDes}
                    </Typography>
                    <Typography variant="caption" sx={{ color: alpha(INK, 0.5) }}>
                      {meta.label}
                    </Typography>
                  </Box>
                  <Chip
                    label={h.holType}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: 10,
                      fontWeight: 800,
                      flexShrink: 0,
                      bgcolor: alpha(meta.color, 0.15),
                      color: meta.color,
                    }}
                  />
                </Paper>
              );
            })}
          </Stack>
        )}
      </Box>
    </Box>
  );
}