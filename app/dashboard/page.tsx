'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Calendar, GraduationCap, BookOpen, Activity, Heart } from 'lucide-react';

interface DashboardData {
  fullName: string;
  email: string;
  courses: any[];
  academicYear: number | string;
  gpa: number | string;
  attendance: any[]; // Updated to support an array
  financialStatus: number | string;
  extracurricularActivities: {
    type: string;
    name: string;
    position?: string;
    academicYear: string;
    responsibilities: string[];
  }[];
  healthStatus: string[]; // Array of allergies
}

const mockGradeData = [
  { month: 'Jan', grade: 3.8 },
  { month: 'Feb', grade: 3.9 },
  { month: 'Mar', grade: 3.7 },
  { month: 'Apr', grade: 3.85 },
  { month: 'May', grade: 3.95 }
];

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/student/dashboard');
        if (!response.ok) throw new Error('Failed to fetch dashboard data');
        const data = await response.json();
        setDashboardData(data.student);
      } catch (err) {
        console.error('Dashboard Error:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#576086] p-6 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">
            Welcome, {dashboardData?.fullName || 'Student'}
          </h1>
          <p className="mt-2 text-gray-200">{dashboardData?.email || 'N/A'}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Academic Performance Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#576086]">Academic Performance</h2>
              <GraduationCap className="text-[#F5B596]" size={24} />
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockGradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 4]} />
                  <Line type="monotone" dataKey="grade" stroke="#F5B596" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-[#576086]">{dashboardData?.gpa || 'N/A'}</p>
              <p className="text-sm text-gray-500">Current GPA</p>
            </div>
          </div>

          {/* Courses Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#576086]">My Courses</h2>
              <BookOpen className="text-[#F5B596]" size={24} />
            </div>
            <div className="mt-4 space-y-2">
              {dashboardData?.courses.map((course, index) => (
                <div key={index} className="rounded-md bg-gray-50 p-3">
                  <p className="text-gray-700">{course.courseName}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => router.push('/my-courses')}
              className="mt-4 w-full rounded-md bg-[#F5B596] px-4 py-2 text-white transition-colors hover:bg-[#576086]">
              View All Courses
            </button>
          </div>

          {/* Financial Status Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#576086]">Financial Status</h2>
              <Calendar className="text-[#F5B596]" size={24} />
            </div>
            <div className="mt-8 text-center">
              <p className="text-3xl font-bold text-[#576086]">
                ${dashboardData?.financialStatus || 0}
              </p>
              <p className="mt-2 text-gray-500">Outstanding Balance</p>
            </div>
            <button 
              onClick={() => router.push('/student/financials')}
              className="mt-8 w-full rounded-md bg-[#F5B596] px-4 py-2 text-white transition-colors hover:bg-[#576086]">
              View Financial Details
            </button>
          </div>

          {/* Activities Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#576086]">Activities</h2>
              <Activity className="text-[#F5B596]" size={24} />
            </div>
            <div className="mt-4 space-y-2">
              {dashboardData?.extracurricularActivities?.map((activity, index) => (
                <div key={index} className="rounded-md bg-gray-50 p-3">
                  <p className="text-gray-700"><strong>Type:</strong> {activity.type}</p>
                  <p className="text-gray-700"><strong>Name:</strong> {activity.name}</p>
                  {activity.position && <p className="text-gray-700"><strong>Position:</strong> {activity.position}</p>}
                  <p className="text-gray-700"><strong>Academic Year:</strong> {activity.academicYear}</p>
                  <p className="text-gray-700">
                    <strong>Responsibilities:</strong> {activity.responsibilities.join(', ')}
                  </p>
                </div>
              )) || <p className="text-gray-500">No activities found.</p>}
            </div>
          </div>

          {/* Health Status Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#576086]">Health Status</h2>
              <Heart className="text-[#F5B596]" size={24} />
            </div>
            <div className="mt-4">
              <p className="text-gray-700">
                <strong>Allergies:</strong> {dashboardData?.healthStatus?.join(', ') || 'None'}
              </p>
            </div>
            <button 
              onClick={() => router.push('/student/health')}
              className="mt-4 w-full rounded-md bg-[#F5B596] px-4 py-2 text-white transition-colors hover:bg-[#576086]">
              View Health Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
