import { ObjectId } from "mongodb";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
  profilePicture: string;
}

interface Qualification {
  degree: string;
  institution: string;
  graduationYear: number;
}

interface ProfessionalInfo {
  teacherId: string;
  department: string;
  subjects: string[];
  qualifications: Qualification[];
  hireDate: Date;
  employmentType: "Full-time" | "Part-time" | "Contract";
  yearsOfExperience: number;
}

interface ClassTime {
  day: string;
  startTime: string; // e.g., "10:00"
  endTime: string;   // e.g., "11:30"
  room: string;
}

interface StudentRoster {
  _id: ObjectId;
  studentId: string;
  name: string;
  currentGrade: number;
}

interface CurrentCourse {
  courseId: string;
  courseName: string;
  semester: string;
  classTimes: ClassTime[];
  enrolledStudents: number;
  studentRoster: StudentRoster[];
}

interface TeachingSchedule {
  totalTeachingHours: number;
  classesByDay: {
    [day: string]: number; // e.g., "Monday": 4
  };
}

interface PendingGrading {
  assignmentId: string;
  courseName: string;
  assignmentName: string;
  dueDate: Date;
  totalSubmissions: number;
  gradedSubmissions: number;
}

interface RecentGradingActivity {
  date: Date;
  courseName: string;
  assignmentName: string;
  totalGraded: number;
  averageScore: number;
}

interface GradingActivities {
  pendingGrading: PendingGrading[];
  recentGradingActivity: RecentGradingActivity[];
}

interface PerformanceReview {
  lastReviewDate: Date;
  nextReviewDate: Date;
  performanceRating: string;
  administrativeNotes: string;
}

interface ParentMeeting {
  studentName: string;
  parentName: string;
  meetingDate: Date;
  notes: string;
}

interface SystemMessage {
  date: Date;
  type: string;
  content: string;
}

interface Communications {
  parentMeetings: ParentMeeting[];
  systemMessages: SystemMessage[];
}

interface Workshop {
  title: string;
  date: Date;
  provider: string;
  certificateEarned: boolean;
}

interface OngoingTraining {
  course: string;
  status: string;
  expectedCompletion: Date;
}

interface ProfessionalDevelopment {
  workshops: Workshop[];
  ongoingTraining: OngoingTraining[];
}

interface AccountCredentials {
  username: string;
  lastLogin: Date;
  loginAttempts: number;
  accountStatus: "active" | "inactive" | "locked";
}

interface Permissions {
  canEditGrades: boolean;
  canAccessStudentRecords: boolean;
  canSendSystemMessages: boolean;
}

interface Metadata {
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface Teacher {
  _id: ObjectId | string;
  userType: "teacher";
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
  currentCourses: CurrentCourse[];
  teachingSchedule: TeachingSchedule;
  gradingActivities: GradingActivities;
  performanceReview: PerformanceReview;
  communications: Communications;
  professionalDevelopment: ProfessionalDevelopment;
  accountCredentials: AccountCredentials;
  permissions: Permissions;
  metadata: Metadata;
}
