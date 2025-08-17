'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, AlertCircle, CheckCircle, AlarmClock } from 'lucide-react';

interface AttendanceRecord {
  courseName: string;
  date: string;
  status: string;
  notes?: string;
}

const AttendancePage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'present':
        return <CheckCircle className="h-4 w-4" />;
      case 'absent':
        return <AlertCircle className="h-4 w-4" />;
      case 'late':
        return <AlarmClock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        // Mock data for attendance records
        const mockAttendance: AttendanceRecord[] = [
          { courseName: 'Mathematics', date: '2024-12-01', status: 'Present' },
          { courseName: 'Physics', date: '2024-12-03', status: 'Absent', notes: 'Family emergency' },
          { courseName: 'Computer Science', date: '2024-12-05', status: 'Late', notes: 'Traffic delay' },
          { courseName: 'Biology', date: '2024-12-07', status: 'Present' },
          { courseName: 'Chemistry', date: '2024-12-09', status: 'Absent', notes: 'Sick' },
        ];

        setAttendanceRecords(mockAttendance);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        setError('Unable to load attendance records. Please try again later.');
      }
    };

    fetchAttendanceRecords();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const calculateAttendanceStats = () => {
    if (!attendanceRecords) return { present: 0, absent: 0, late: 0, total: 0 };
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(r => r.status.toLowerCase() === 'present').length;
    const absent = attendanceRecords.filter(r => r.status.toLowerCase() === 'absent').length;
    const late = attendanceRecords.filter(r => r.status.toLowerCase() === 'late').length;
    return { present, absent, late, total };
  };

  const stats = calculateAttendanceStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-[#ff9a8b]">
          Attendance Dashboard
        </h1>

        {/* Attendance Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              </div>
              <div className="rounded-lg bg-red-50 p-4 text-center">
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              </div>
              <div className="rounded-lg bg-yellow-50 p-4 text-center">
                <p className="text-sm text-gray-600">Late</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Records */}
        <div className="space-y-4">
          {!attendanceRecords ? (
            <LoadingSkeleton />
          ) : (
            attendanceRecords.map((record, index) => (
              <Card key={index} className="overflow-hidden transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-[#ff9a8b]">
                        {record.courseName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {formatDate(record.date)}
                      </div>
                    </div>
                    <Badge className={`flex items-center gap-1 ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status}
                    </Badge>
                  </div>
                  {record.notes && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                      <p className="font-medium">Notes:</p>
                      <p>{record.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;