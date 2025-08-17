// app/api/student/dashboard/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import { getUserByLogin } from '@/lib/mongo/students';
import { Student } from '@/types';

export async function GET() {
  try {
    const email = "Mark.dillum@binghamuni.edu.ng";
    const id = "BHU/21/04/10/0019";

    const { user, error } = await getUserByLogin(email, id);
    const student = user as Student;

    if (error || !student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    const dashboardData = {
      fullName: student.personalInfo.fullName,
      email: student.personalInfo.email,
      courses: student.enrolledCourses || [],
      academicYear: student.academicInfo.entryYear,
      gpa: student.academicHistory.cgpa,
      financialStatus: student.financialInfo.tuitionDetails.outstandingBalance,
      extracurricularActivities: student.extracurricularActivities || [],
    };
    return NextResponse.json({ student: dashboardData });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student data' },
      { status: 500 }
    );
  }
}