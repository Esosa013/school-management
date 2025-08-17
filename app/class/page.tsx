"use client";

import { Box, Typography, Button, Card, CardContent, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const ClassManagement = () => {

  return (
    <Box className=" bg-gray-50">
      <Typography variant="h4" className="mb-6">
        Class Management
      </Typography>

        <Box>
          {/* Courses Section */}
          <Typography variant="h5" className="mb-4">
            Courses
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Advanced Physics</Typography>
                  <Typography variant="body2" className="mb-4">
                    Teacher: Michael Chen
                  </Typography>
                  <Typography variant="body2">
                    Enrolled Students: 24
                  </Typography>
                  <Button
                    variant="contained"
                    className="mt-4"
                    fullWidth
                    onClick={() => alert("Assign Teacher")}
                  >
                    Assign Teacher
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* Add additional course cards here */}
          </Grid>
        </Box>
      

        <Box>
          {/* Class Schedules Section */}
          <Typography variant="h5" className="mb-4">
            Class Schedules
          </Typography>
          <Typography variant="body1" className="mb-2">
            Timetables for teachers and students, along with room assignments.
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">Monday</Typography>
              <Typography>10:00 AM - Advanced Physics (Room 204)</Typography>
              <Typography>1:00 PM - Calculus II (Room 101)</Typography>
            </CardContent>
          </Card>
          {/* Add more timetable cards for other days */}
        </Box>

        <Box>
          {/* Attendance Tracking Section */}
          <Typography variant="h5" className="mb-4">
            Attendance Tracking
          </Typography>
          <Typography variant="body1" className="mb-2">
            View and manage daily attendance records for students.
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">Advanced Physics</Typography>
              <Typography>Emily Rodriguez - Present</Typography>
              <Typography>James Thompson - Absent</Typography>
              <Typography variant="body2" className="mt-4">
                Reports: 2 absences this week
              </Typography>
            </CardContent>
          </Card>
          {/* Add attendance cards for more classes */}
        </Box>
    </Box>
  );
};

export default ClassManagement;
