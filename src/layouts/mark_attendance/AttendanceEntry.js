
import React, { useState, useEffect } from 'react';
import {
  Container, Paper, TextField, Button, Box, Typography, Alert,
  CircularProgress, Card, CardContent, Grid, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
} from '@mui/material';
import {
  CheckCircle, LocationOn, AccessTime, Person, Logout, Login,
  Warning, MyLocation,
} from '@mui/icons-material';
import bgImage from "../../assets/images/Attend.jpg";
import axios from "axios";


const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'auth-key': JSON.parse(sessionStorage.getItem('token') || '""'),
});

// ─── LOCATION OUTSIDE DIALOG ──────────────────────────────────────────────────

const LocationOutsideDialog = ({ open, distanceMeters, onClose }) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogTitle
        sx={{
          backgroundColor: '#ffebee',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: '#c62828',
          fontWeight: 'bold',
        }}
      >
        <Warning sx={{ color: '#d32f2f' }} />
        Outside Allowed Location
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box
          sx={{
            backgroundColor: '#ffebee',
            border: '1px solid #ef9a9a',
            borderRadius: 2,
            p: 2,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <MyLocation sx={{ color: '#d32f2f', fontSize: 36 }} />
          <Box>
            <Typography variant="body2" color="#b71c1c" sx={{ mt: 1, fontWeight: 'bold' }}>
              📍 You are currently{' '}
              {/* {distanceMeters >= 1000
                ? `${(distanceMeters / 1000).toFixed(2)} km`
                : `${Math.round(distanceMeters)} m`}{' '} */}
              <span style={{ color: '#191cd2', fontWeight: 'bold' }}>
                {distanceMeters >= 1000
                  ? `${(distanceMeters / 1000).toFixed(2)}km`
                  : `${Math.round(distanceMeters)}m`}
              </span>{' '}
              away from the nearest site location.
            </Typography>
            {/* <Typography variant="body2" color="#b71c1c" sx={{ mt: 1, fontWeight: 'bold' }}>
              ⚠️ You must be within 50 meters of a site location to check in/out.
            </Typography> */}

            <Typography variant="body2" color="#b71c1c" sx={{ mt: 1, fontWeight: 'bold' }}>
              ⚠️ You must be within 50 meters of a site location to check in/out.
              <span style={{ color: '#191cd2', fontWeight: 'bold' }}>
                {distanceMeters > 50 &&
                  ` Please move ${distanceMeters - 50 >= 1000
                    ? `${((distanceMeters - 50) / 1000).toFixed(2)}km`
                    : `${Math.round(distanceMeters - 50)}m`
                  } closer.`}
              </span>
            </Typography>
          </Box>
        </Box>

        <DialogContentText
          sx={{
            color: '#555',
            textAlign: 'center',
          }}
        >
          Please move closer to your site location and try again.
          <br />
          The allowed radius is <strong>50m</strong> from any of your assigned site locations.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: '#d32f2f',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#c62828' },
          }}
        >
          OK, I Understand
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const AttendanceEntry = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [attendanceRecord, setAttendanceRecord] = useState(null);

  const [siteLocations, setSiteLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [validatingLocation, setValidatingLocation] = useState(false);

  // ── Location outside dialog state ──
  const [outsideDialog, setOutsideDialog] = useState({
    open: false,
    distanceMeters: 0,
  });

  // ─── HELPERS ──────────────────────────────────────────────────────────────

  const getCurrentDate = () => new Date().toISOString().split('T')[0];
  const getCurrentTime = () => new Date().toTimeString().slice(0, 5);

  const formatDateTimeForAPI = (date = new Date()) => {
    const pad = (n) => String(n).padStart(2, '0');
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${month}/${day}/${year} ${pad(hours)}:${minutes}:${seconds} ${ampm}`;
  };

  const calculateWorkHours = (checkIn, checkOut) => {
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    let hours = outHour - inHour;
    let minutes = outMin - inMin;
    if (minutes < 0) { hours--; minutes += 60; }
    return `${hours}h ${minutes}m`;
  };

  // ─── DISTANCE CALCULATION (returns meters) ────────────────────────────────

  const getDistanceMeters = (lat1, lng1, lat2, lng2) => {
    const R = 6371000;
    const dLat = (lat1 - lat2) * (Math.PI / 180);
    const dLng = (lng1 - lng2) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const ALLOWED_RADIUS_M = 50;

  const validateLocationWithinAnySite = (deviceLat, deviceLng, siteLocations) => {
    for (let site of siteLocations) {
      const distance = getDistanceMeters(deviceLat, deviceLng,
        parseFloat(site.Lat), parseFloat(site.Lon));
      if (distance <= ALLOWED_RADIUS_M) {
        return { isWithin: true, site: site, distance: distance };
      }
    }
    let minDistance = Infinity;
    let nearestSite = null;
    for (let site of siteLocations) {
      const distance = getDistanceMeters(deviceLat, deviceLng,
        parseFloat(site.Lat), parseFloat(site.Lon));
      if (distance < minDistance) {
        minDistance = distance;
        nearestSite = site;
      }
    }
    return { isWithin: false, site: nearestSite, distance: minDistance };
  };

  const fetchSiteLocations = async () => {
    const serviceNo = localStorage.getItem('ServiceNo');
    if (!serviceNo) throw new Error('Service number not found. Please log in again.');

    const response = await fetch(
      `${axios.defaults.baseURL}Attendance/GetLocbySno?p_sno=${serviceNo}`,
      { headers: getAuthHeaders() }
    );
    if (!response.ok) throw new Error('Failed to fetch site location.');

    const data = await response.json();
    if (data.StatusCode !== 200 || !data.ResultSet || data.ResultSet.length === 0) {
      throw new Error('No site location found for your service number.');
    }

    setSiteLocations(data.ResultSet);
    return data.ResultSet;
  };

  // ─── GET DEVICE LOCATION ─────────────────────────────────────────────────

  const getDeviceLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation({ latitude, longitude });
          resolve({ latitude, longitude });
        },
        () => reject(new Error('Unable to access location. Please enable location services.'))
      );
    });


  const postAttendance = async ({
    barcodeNo, barcodeDate, pStatus, hstatus,
    latitude, longitude, clockNo,
  }) => {
    const body = {
      p_barcode_no: barcodeNo,
      p_barcode_date: barcodeDate,
      p_employee_type: '0',
      p_clock_no: clockNo,
      p_status: pStatus,
      p_hstatus: hstatus,
      p_latitude: String(latitude),
      p_longitude: String(longitude),
      p_reason: ' ',
    };

    const response = await fetch(
      `${axios.defaults.baseURL}Attendance/BizPostAttendance`,
      { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(body) }
    );
    if (!response.ok) throw new Error('Failed to submit attendance. Please try again.');

    const data = await response.json();
    if (data.StatusCode && data.StatusCode !== 200 && data.StatusCode !== 201) {
      throw new Error(data.Result || 'Attendance submission failed.');
    }
    return data;
  };

  // ─── CHECK IN HANDLER ─────────────────────────────────────────────────────

  const handleCheckIn = async () => {
    if (checkedIn) {
      setMessage({ type: 'info', text: 'You are already checked in!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      setValidatingLocation(true);
      const sites = await fetchSiteLocations();
      const device = await getDeviceLocation();
      setValidatingLocation(false);

      const validationResult = validateLocationWithinAnySite(
        device.latitude,
        device.longitude,
        sites
      );

      const now = new Date();
      const barcodeDate = formatDateTimeForAPI(now);
      const currentTime = getCurrentTime();

      if (!validationResult.isWithin) {
        setOutsideDialog({
          open: true,
          distanceMeters: validationResult.distance,
        });
        setLoading(false);
        return;
      }

      await postAttendance({
        barcodeNo: validationResult.site.Pro_no,
        barcodeDate,
        pStatus: 'I',
        hstatus: 'I',
        latitude: device.latitude,
        longitude: device.longitude,
        clockNo: 38,
      });

      setAttendanceRecord({
        checkInTime: currentTime,
        checkInDate: getCurrentDate(),
        checkInLocation: device,
        status: 'checked_in',
      });
      setCheckedIn(true);
      setCheckInTime(currentTime);
      setMessage({ type: 'success', text: `Check-in successful! Time: ${currentTime}` });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
    setValidatingLocation(false);
    setLoading(false);
  };

  // ─── CHECK OUT HANDLER ────────────────────────────────────────────────────

  const handleCheckOut = async () => {
    if (checkedOut) {
      setMessage({ type: 'info', text: 'You are already checked out!' });
      return;
    }


    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      setValidatingLocation(true);
      const sites = await fetchSiteLocations();
      const device = await getDeviceLocation();
      setValidatingLocation(false);

      const validationResult = validateLocationWithinAnySite(
        device.latitude,
        device.longitude,
        sites
      );

      const now = new Date();
      const barcodeDate = formatDateTimeForAPI(now);
      const checkoutTime = getCurrentTime();

      if (!validationResult.isWithin) {
        setOutsideDialog({
          open: true,
          distanceMeters: validationResult.distance,
        });
        setLoading(false);
        return;
      }

      await postAttendance({
        barcodeNo: validationResult.site.Pro_no,
        barcodeDate,
        pStatus: 'O',
        hstatus: 'O',
        latitude: device.latitude,
        longitude: device.longitude,
        clockNo: 39,
      });

      const totalHours = checkInTime ? calculateWorkHours(checkInTime, checkoutTime) : null;
      setAttendanceRecord((prev) => ({
        ...prev,
        checkOutTime: checkoutTime,
        checkOutDate: getCurrentDate(),
        checkOutLocation: device,
        status: 'completed',
        totalHours,
      }));
      setCheckedOut(true);
      setCheckOutTime(checkoutTime);
      setMessage({
        type: 'success',
        text: `Check-out successful! Time: ${checkoutTime}.${totalHours ? ` Total hours: ${totalHours}` : ''}`,
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
    setValidatingLocation(false);
    setLoading(false);
  };

  const resetForm = () => {
    setCheckedIn(false);
    setCheckedOut(false);
    setCheckInTime(null);
    setCheckOutTime(null);
    setLocation(null);
    setSiteLocations([]);
    setAttendanceRecord(null);
    setMessage({ type: '', text: '' });
    setOutsideDialog({ open: false, distanceMeters: 0 });
  };

  const renderMainScreen = () => (
    <Container maxWidth="sm" sx={{ py: 1 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
        <Box
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 100,
            borderRadius: 2,
            mb: 3,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            padding: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        />

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 2 }} onClose={() => setMessage({ type: '', text: '' })}>
            {message.text}
          </Alert>
        )}

        {validatingLocation && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} />
              Validating your location...
            </Box>
          </Alert>
        )}

        {checkedIn && !checkedOut && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Currently Checked In</strong><br />
            Check-in time: {checkInTime}
          </Alert>
        )}

        {checkedOut && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>Attendance Completed for Today</strong><br />
            Check-in: {attendanceRecord?.checkInTime || checkInTime} | Check-out: {attendanceRecord?.checkOutTime}<br />
            {attendanceRecord?.totalHours && <>Total Hours: {attendanceRecord.totalHours}</>}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth variant="contained" size="large"
              sx={{
                py: 2, fontSize: '1.1rem', fontWeight: 'bold',
                backgroundColor: checkedIn ? '#4caf50' : '#1976d2',
                '&:hover': {
                  backgroundColor: checkedIn ? '#388e3c' : '#1565c0'
                },
              }}
              onClick={handleCheckIn}
              disabled={loading || checkedIn}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" />
                  : checkedIn ? <CheckCircle /> : <Login />
              }
            >
              {checkedIn ? 'Checked In ✓' : loading ? 'Processing...' : 'Check In'}
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth variant="contained" size="large"
              sx={{
                py: 2, fontSize: '1.1rem', fontWeight: 'bold',
                backgroundColor: checkedOut ? '#4caf50' : '#f57c00',
                '&:hover': {
                  backgroundColor: checkedOut ? '#388e3c' : '#ef6c00'
                },
              }}
              onClick={handleCheckOut}
              disabled={loading || checkedOut}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" />
                  : checkedOut ? <CheckCircle /> : <Logout />
              }
            >
              {checkedOut ? 'Checked Out ✓' : loading ? 'Processing...' : 'Check Out'}
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>

          {checkedOut && (
            <Typography variant="caption" color="success.main">
              ✅ Attendance completed for today
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Card sx={{ mb: 2, backgroundColor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
              Today's Attendance
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccessTime sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body2">Current Time: {getCurrentTime()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body2">
                {location
                  ? `Location: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                  : 'Location: Not detected'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body2">
                Device: {localStorage.getItem('deviceName') || 'Mobile Device'}
              </Typography>
            </Box>
            {siteLocations.length > 0 && (
              <Box sx={{ mt: 1, p: 1, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  {siteLocations.length} site location(s) available (50m radius)
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Paper>

      {/* ── OUTSIDE LOCATION DIALOG (BLOCKED) ── */}
      <LocationOutsideDialog
        open={outsideDialog.open}
        distanceMeters={outsideDialog.distanceMeters}
        onClose={() => setOutsideDialog({ open: false, distanceMeters: 0 })}
      />
    </Container>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {renderMainScreen()}
    </Box>
  );
};

export default AttendanceEntry;