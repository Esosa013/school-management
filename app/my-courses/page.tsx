'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Filter, ChevronRight } from 'lucide-react';

interface EnrolledCourse {
  courseId: string;
  courseName: string;
  semester: string;
  creditUnits: number;
  courseType: string;
  lecturer: Lecturer;
}

interface Lecturer {
  name: string;
  department: string;
  email: string;
}

const MyCourses = () => {
  const [courses, setCourses] = useState<EnrolledCourse[] | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<EnrolledCourse[] | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/student/dashboard');
        if (!response.ok) throw new Error('Failed to fetch courses data');
        const data = await response.json();
        setCourses(data.student.courses || []);
        console.log("dates:",data.student)
        setFilteredCourses(data.student.courses || []);
      } catch (err) {
        console.error('Courses Error:', err);
        setError('Failed to load courses data.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredCourses(
      courses?.filter(course =>
        course.courseName.toLowerCase().includes(value) || 
        course.semester.toLowerCase().includes(value)
      ) || []
    );
  };

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
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="mt-2 text-gray-200">
            Manage and view details of your enrolled courses.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl p-6">
        {/* Filter Input */}
        <div className="mb-6 flex items-center space-x-3">
          <Filter className="text-[#576086]" size={20} />
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search by course name or semester..."
            className="w-full rounded-md border border-gray-300 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#576086]"
          />
        </div>

        {/* Courses List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div
                key={course.courseId}
                className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#576086]">
                    {course.courseName}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Semester:</strong> {course.semester}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    <strong>Credit Units:</strong> {course.creditUnits}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    <strong>Type:</strong> {course.courseType}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    <strong>Lecturer:</strong> Mr Francis James
                  </p>
                </div>
                <button
                  onClick={() => router.push(`/courses/${course.courseId}`)}
                  className="mt-4 flex items-center justify-center rounded-md bg-[#F5B596] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#576086]"
                >
                  View Details <ChevronRight className="ml-2" size={18} />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No courses found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
