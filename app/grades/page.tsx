'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Book, GraduationCap, Trophy, Award } from 'lucide-react';

interface GradeRecord {
  courseName: string;
  grade: string;
  semester: string;
  creditUnits: number;
}

const GradesPage = () => {
  const [grades, setGrades] = useState<GradeRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gradeToGPA = (grade: string): number => {
    const gradePoints: { [key: string]: number } = {
      'A+': 4.2, 'A': 4.0, 'A-': 3.7,
      'B+': 3.7, 'B': 3.0, 'B-': 2.7,
      'C+': 2.6, 'C': 2.0, 'C-': 1.7,
      'D+': 1.8, 'D': 1.0, 'F': 0.0
    };
    return gradePoints[grade] || 0;
  };

  const getGradeColor = (grade: string): string => {
    const firstChar = grade.charAt(0);
    switch (firstChar) {
      case 'A': return 'text-green-600';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-yellow-600';
      case 'D': return 'text-orange-600';
      case 'F': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // Mock data for grades
        const mockGrades: GradeRecord[] = [
          { courseName: 'MTH', grade: 'A', semester: 'Fall 2024', creditUnits: 3 },
          { courseName: 'BIO', grade: 'B+', semester: 'Fall 2024', creditUnits: 4 },
          { courseName: 'CHM', grade: 'A-', semester: 'Fall 2024', creditUnits: 3 },
          { courseName: 'CMP', grade: 'B', semester: 'Fall 2024', creditUnits: 2 },
          { courseName: 'PHY', grade: 'C+', semester: 'Fall 2024', creditUnits: 3 },
        ];
        setGrades(mockGrades);
      } catch (error) {
        console.error('Error fetching grades:', error);
        setError('Unable to load grades. Please try again later.');
      }
    };
    fetchGrades();
  }, []);

  const calculateStats = () => {
    if (!grades) return { gpa: 0, totalCredits: 0, highestGrade: '-', lowestGrade: '-' };
    
    let totalPoints = 0;
    let totalCredits = 0;
    let highest = 0;
    let lowest = 4;
    
    grades.forEach(record => {
      const gradePoint = gradeToGPA(record.grade);
      totalPoints += gradePoint * record.creditUnits;
      totalCredits += record.creditUnits;
      highest = Math.max(highest, gradePoint);
      lowest = Math.min(lowest, gradePoint);
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
    const highestGrade = grades.find(r => gradeToGPA(r.grade) === highest)?.grade || '-';
    const lowestGrade = grades.find(r => gradeToGPA(r.grade) === lowest)?.grade || '-';

    return { gpa, totalCredits, highestGrade, lowestGrade };
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

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-[#ff9a8b]">
          Academic Performance
        </h1>

        {/* Statistics Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <GraduationCap className="mr-4 h-8 w-8 text-[#ff9a8b]" />
              <div>
                <p className="text-sm text-gray-600">Current GPA</p>
                <p className="text-2xl font-bold">{stats.gpa.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Book className="mr-4 h-8 w-8 text-[#ff9a8b]" />
              <div>
                <p className="text-sm text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold">{stats.totalCredits}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Trophy className="mr-4 h-8 w-8 text-[#ff9a8b]" />
              <div>
                <p className="text-sm text-gray-600">Highest Grade</p>
                <p className="text-2xl font-bold">{stats.highestGrade}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Award className="mr-4 h-8 w-8 text-[#ff9a8b]" />
              <div>
                <p className="text-sm text-gray-600">Credits This Semester</p>
                <p className="text-2xl font-bold">{stats.totalCredits}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grades List */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Course Grades</CardTitle>
          </CardHeader>
          <CardContent>
            {!grades ? (
              <LoadingSkeleton />
            ) : (
              <div className="space-y-4">
                {grades.map((gradeRecord, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{gradeRecord.courseName}</p>
                      <p className="text-sm text-gray-600">
                        {gradeRecord.semester} • {gradeRecord.creditUnits} Credits
                      </p>
                    </div>
                    <div className={`text-2xl font-bold ${getGradeColor(gradeRecord.grade)}`}>
                      {gradeRecord.grade}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* GPA Chart */}
        <Card>
          <CardHeader>
            <CardTitle>GPA Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={grades?.map(g => ({
                  course: g.courseName,
                  gpa: gradeToGPA(g.grade)
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis domain={[0, 4]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="gpa"
                  stroke="#ff9a8b"
                  strokeWidth={2}
                  dot={{ fill: '#ff9a8b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GradesPage;