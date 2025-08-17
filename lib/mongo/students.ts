import { Student, Teacher, Admin } from '@/types';

type User = Student | Teacher | Admin;

// ---- MOCK DATA ----
const mockUsers = [
  {
    _id: "660b8c3f4d2d9d5c6e9f2a3b",
    userType: "teacher",
    personalInfo: {},
    professionalInfo: { teacherId: "TC2024-0015" },
    currentCourses: [],
    teachingSchedule: {},
    gradingActivities: {},
    performanceReview: {},
    communications: {},
    professionalDevelopment: {},
    accountCredentials: {},
    permissions: {},
    metadata: {},
  },
  {
    _id: "6762e22628d464744d389399",
    userType: "student",
    personalInfo: {
      firstName: "Dillum",
      lastName: "Lan’Ngwaldi",
      middleName: "Mark",
      fullName: "Dillum Mark Lan’Ngwaldi",
      email: "Omotade.emma-leke@binghamuni.edu.ng",
      personalEmail: "adebayoemmanuel@gmail.com",
      phoneNumber: "+234-813-456-7890",
      alternatePhoneNumber: "+234-802-345-6789",
      dateOfBirth: "2001-09-15T00:00:00Z",
      gender: "male",
      maritalStatus: "single",
      nationality: "Nigerian",
      stateOfOrigin: "Enugu",
      localGovernmentArea: "Enugu East",
      religion: "Christianity",
      tribe: "Igbo",
      profilePicture: "/uploads/profile/adebayo-okonkwo.jpg",
    },
    academicInfo: {
      studentId: "BHU/21/04/10/0019",
      entryYear: 2021,
    },
    contactInfo: {},
    enrolledCourses: [
      {
        courseId: "CSC311",
        courseName: "Mathematics",
        semester: "First Semester 2023/2024",
        creditUnits: 3,
        courseType: "Compulsory",
      },
      {
        courseId: "CSC312",
        courseName: "Physics",
        semester: "First Semester 2023/2024",
        creditUnits: 3,
        courseType: "Compulsory",
      },
      {
        courseId: "CSC313",
        courseName: "Chemistry",
        semester: "First Semester 2023/2024",
        creditUnits: 3,
        courseType: "Compulsory",
      },
      {
        courseId: "CSC314",
        courseName: "Biology",
        semester: "First Semester 2023/2024",
        creditUnits: 3,
        courseType: "Compulsory",
      },
    ],
    academicHistory: {
      cgpa: 3.45,
      totalCreditUnitsPassed: 45,
    },
    financialInfo: {
      tuitionDetails: {
        totalTuitionFee: 250000,
        amountPaid: 150000,
        outstandingBalance: 100000,
        paymentDeadline: "2024-02-28T00:00:00Z",
        paymentPlan: "Semester Installment",
      },
    },
    disciplinaryRecord: {},
    extracurricularActivities: [
  {
    activityId: "EC001",
    type: "Club",
    name: "Debate Club",
    role: "Member",
    academicYear: "2022/2023",
    responsibilities: [
      "Participated in weekly debates",
      "Represented university in competitions",
    ],
  },
  {
    activityId: "EC002",
    type: "Sports",
    name: "Football Team",
    role: "Captain",
    academicYear: "2021/2022",
    responsibilities: [
      "Led training sessions",
      "Organized team strategies",
      "Represented team in tournaments",
    ],
  },
],

    healthAndWellness: {},
    accountCredentials: {},
    metadata: {},
  },
  {
    _id: "64d9c6f4d9d5c6e9f2a3b7a1",
    userType: "admin",
    personalInfo: {},
    professionalInfo: { adminId: "ADM-2024-001" },
    accountCredentials: {},
    permissions: {},
    activityLogs: [],
    metadata: {},
  },
];

// ---- MOCK FUNCTION ----
export async function getUserByLogin(
  email: string,
  id: string
): Promise<{ user?: any; error?: string }> {
  try {
    const user = mockUsers.find((u) => {
      const userEmail = u.personalInfo?.email?.toLowerCase();
      const matchesEmail =
        userEmail && userEmail === email.toLowerCase();

      const matchesId =
        u.academicInfo?.studentId === id ||
        u.professionalInfo?.teacherId === id ||
        u.professionalInfo?.adminId === id;

      return matchesEmail && matchesId;
    });

    if (!user) {
      console.log("User not found in mock data.");
      return { error: "User not found" };
    }

    console.log("User found (mock):", user);
    return { user };
  } catch (error) {
    console.error("Error during mock user fetch:", error);
    return { error: "Failed to fetch user" };
  }
}
