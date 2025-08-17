import { NextResponse } from 'next/server';
import { Student } from '@/types';

export async function GET() {
  try {
    const mockStudent = {
      personalInfo: {
        fullName: "Emma-leke Omatade Peace",
        email: "Omotade.emma-leke@binghamuni.edu.ng"
      },
      academicInfo: {
        studentId: "BHU/21/04/10/0019",
        entryYear: "2021"
      },
      enrolledCourses: ['Data Structures and Algorithms', 'Software Engineering'],
      academicHistory: {
        cgpa: 3.45
      },
      financialInfo: {
        tuitionDetails: {
          outstandingBalance: 100000
        }
      },
      classSchedule: [
        {
          courseId: 'CS101',
          courseName: 'Mathematics',
          semester: 'Fall 2024',
          courseType: 'Core',
          lecturer: {
            name: 'Dr. John Doe',
            department: 'Computer Science',
            email: 'john.doe@binghamuni.edu.ng'
          },
          schedule: [
            { day: 'Monday', time: '9:00 AM - 11:00 AM' },
            { day: 'Wednesday', time: '9:00 AM - 11:00 AM' }
          ]
        },
        {
          courseId: 'CS102',
          courseName: 'Physics',
          semester: 'Fall 2024',
          courseType: 'Core',
          lecturer: {
            name: 'Prof. Jane Smith',
            department: 'Computer Science',
            email: 'jane.smith@binghamuni.edu.ng'
          },
          schedule: [
            { day: 'Tuesday', time: '1:00 PM - 3:00 PM' },
            { day: 'Thursday', time: '1:00 PM - 3:00 PM' }
          ]
        }
      ]
    };

    // Return mock student data with class schedule
    return NextResponse.json({ student: mockStudent });
  } catch (error) {
    console.error('Class Schedule error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch class schedule data' },
      { status: 500 }
    );
  }
}
