'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarDays, Clock, MapPin, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

interface Assignment {
  courseName: string;
  title: string;
  dueDate: string;
  status: string;
}

interface Exam {
  courseName: string;
  examDate: string;
  venue: string;
  time: string;
}

const AssignmentAndExamPage = () => {
  const [assignments, setAssignments] = useState<Assignment[] | null>(null);
  const [exams, setExams] = useState<Exam[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const peachColor = '#ff9a8b';

  useEffect(() => {
    const fetchAssignmentsAndExams = async () => {
      try {
        // Mock data for assignments and exams
        const mockAssignments: Assignment[] = [
          { courseName: 'Mathematics', title: 'Algebra Assignment', dueDate: '2024-12-20', status: 'Pending' },
          { courseName: 'Physics', title: 'Lab Report', dueDate: '2024-12-22', status: 'Submitted' },
          { courseName: 'Computer Science', title: 'Project Submission', dueDate: '2024-12-25', status: 'Pending' }
        ];

        const mockExams: Exam[] = [
          { courseName: 'Mathematics', examDate: '2024-12-30', venue: 'Hall A', time: '10:00 AM' },
          { courseName: 'Physics', examDate: '2024-12-31', venue: 'Hall B', time: '2:00 PM' },
          { courseName: 'Computer Science', examDate: '2025-01-05', venue: 'Hall C', time: '9:00 AM' }
        ];

        setAssignments(mockAssignments);
        setExams(mockExams);
      } catch (error) {
        console.error('Error fetching assignments and exams:', error);
        setError('Unable to load data. Please try again later.');
      }
    };

    fetchAssignmentsAndExams();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold" style={{ color: peachColor }}>
          Academic Dashboard
        </h1>

        <Tabs defaultValue="assignments" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Exams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assignments">
            {!assignments ? (
              <LoadingSkeleton />
            ) : (
              <div className="grid gap-4">
                {assignments.map((assignment, index) => (
                  <Card key={index} className="overflow-hidden transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold" style={{ color: peachColor }}>
                            {assignment.title}
                          </h3>
                          <p className="flex items-center gap-2 text-sm text-gray-600">
                            <BookOpen className="h-4 w-4" />
                            {assignment.courseName}
                          </p>
                        </div>
                        <Badge
                          className={`${
                            assignment.status === 'Submitted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {assignment.status === 'Submitted' ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <AlertCircle className="mr-1 h-3 w-3" />
                          )}
                          {assignment.status}
                        </Badge>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <CalendarDays className="h-4 w-4" />
                        Due: {formatDate(assignment.dueDate)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="exams">
            {!exams ? (
              <LoadingSkeleton />
            ) : (
              <div className="grid gap-4">
                {exams.map((exam, index) => (
                  <Card key={index} className="overflow-hidden transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold" style={{ color: peachColor }}>
                            {exam.courseName}
                          </h3>
                          <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CalendarDays className="h-4 w-4" />
                              {formatDate(exam.examDate)}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              {exam.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              {exam.venue}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AssignmentAndExamPage;