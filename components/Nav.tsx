'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  ListItemButton,
  Box
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GradeIcon from '@mui/icons-material/Grade';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from './ui/button';

// Define type for route
interface NavRoute {
  name: string;
  icon: React.ReactNode;
  href: string;
}

export const Nav: React.FC = () => {
  const router = useRouter();
  const currentRoute = usePathname();

  // Define the routes for the student
  const studentNavRoutes: NavRoute[] = [
    { name: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
    { name: 'My Courses', icon: <SchoolIcon />, href: '/my-courses' },
    { name: 'Class Schedule', icon: <ScheduleIcon />, href: '/class-schedule' },
    { name: 'Assignments & Exams', icon: <AssignmentIcon />, href: '/assignment-and-exam' },
    { name: 'Attendance', icon: <CheckCircleIcon />, href: '/attendance' },
    { name: 'Grades', icon: <GradeIcon />, href: '/grades' },
  ];

  // Bottom routes (Settings & Logout)
  const bottomRoutes: NavRoute[] = [
    // { name: 'Settings', icon: <SettingsIcon />, href: '/settings' },
    { name: 'Logout', icon: <ExitToAppIcon />, href: '/login' },
  ];

  // Render navigation items with consistent styling
  const renderNavItems = (routes: NavRoute[]) => (
    <div>
      {routes.map((route) => {
        const isActive = currentRoute === route.href;
        return (
          <ListItem 
            key={route.href} 
            disablePadding
            className="my-1"
            onClick={() => router.push(route.href)}
          >
            <ListItemButton
              selected={isActive}
              sx={{
                borderRadius: '8px',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0,0,0,0.1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                },
              }}
              className={`
                w-full 
                transition-colors 
                duration-200
              `}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive ? '#F5B596' : 'inherit',
                }}
              >
                {route.icon}
              </ListItemIcon>
              <ListItemText 
                primary={route.name}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'text.primary' : 'text.secondary',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </div>
  );

  return (
    <nav className="h-screen w-64 bg-slate-200 shadow-lg flex flex-col justify-between p-4 overflow-y-auto">
      <div className="flex flex-col flex-grow">
        
        {renderNavItems(studentNavRoutes)}
      </div>

      
      <div className="mt-auto border-t pt-4">
        {renderNavItems(bottomRoutes)}
      </div>
    </nav>
  );
};