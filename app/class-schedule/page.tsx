'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Book, User, Calendar } from 'lucide-react';

interface Lecturer {
  name: string;
  department: string;
  email: string;
}

interface Schedule {
  day: string;
  time: string;
}

interface ClassSchedule {
  courseId: string;
  courseName: string;
  semester: string;
  courseType: string;
  lecturer: Lecturer;
  schedule: Schedule[];
}

const ClassSchedulePage = () => {
  const [classSchedule, setClassSchedule] = useState<ClassSchedule[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassSchedule = async () => {
      try {
        const response = await fetch('/api/student/class-schedule');
        if (!response.ok) {
          throw new Error('Failed to fetch class schedule');
        }
        const data = await response.json();
        setClassSchedule(data.student.classSchedule);
      } catch (error) {
        console.error('Error fetching class schedule:', error);
        setError('Unable to load class schedule. Please try again later.');
      }
    };

    fetchClassSchedule();
  }, []);

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const LoadingSkeleton = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="w-full">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
      <div className="bg-[#576086] p-6 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">
            Class Schedule
          </h1>
        </div>
      </div>

        {!classSchedule ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classSchedule.map((course) => (
              <Card key={course.courseId} className="overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <CardTitle className="line-clamp-2 text-lg font-semibold text-[#576086]">
                    {course.courseName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Semester:</span> {course.semester}
                    </div>
                    {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Book className="h-4 w-4" />
                      <span className="font-medium">Credits:</span> {course.creditUnits} units | {course.courseType}
                    </div> */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span className="font-medium">Lecturer:</span> Mr Francis James
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="flex items-center gap-2 font-medium text-gray-900">
                      <Clock className="h-4 w-4" /> Schedule
                    </h3>
                    <div className="rounded-lg bg-gray-50 p-3">
                      {course.schedule.map((entry, index) => (
                        <div
                          key={index}
                          className="flex justify-between border-b border-gray-200 py-2 text-sm last:border-0"
                        >
                          <span className="font-medium">{entry.day}</span>
                          <span className="text-gray-600">{entry.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassSchedulePage;