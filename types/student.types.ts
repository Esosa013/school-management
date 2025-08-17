import { ObjectId } from "mongodb";

export interface Student {
  _id: ObjectId | string;
  userType: "student";
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  contactInfo: ContactInfo;
  enrolledCourses: EnrolledCourse[];
  academicHistory: AcademicHistory;
  financialInfo: FinancialInfo;
  disciplinaryRecord: DisciplinaryRecord;
  extracurricularActivities?: ExtracurricularActivity[];
  healthAndWellness: HealthAndWellness;
  accountCredentials: AccountCredentials;
  metadata: Metadata;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  fullName: string;
  email: string;
  personalEmail: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  maritalStatus: "single" | "married" | "divorced" | "widowed";
  nationality: string;
  stateOfOrigin: string;
  localGovernmentArea: string;
  religion: string;
  tribe?: string;
  profilePicture?: string;
}

interface AcademicInfo {
  studentId: string;
  matriculationNumber: string;
  faculty: string;
  department: string;
  currentLevel: number;
  program: Program;
  entryYear: number;
  expectedGraduationYear: number;
  admissionType: string;
  studentCategory: string;
  previousEducation: PreviousEducation[];
  jamb: JambDetails;
}

interface Program {
  type: string;
  discipline: string;
  duration: string;
  modeOfStudy: string;
}

interface PreviousEducation {
  institutionName: string;
  certificateType: string;
  graduationYear: number;
  resultDetails: ResultDetails;
}

interface ResultDetails {
  totalSubjects: number;
  passedSubjects: number;
  bestSubjects: string[];
  aggregateScore: number;
  positionInClass?: number;
}

interface JambDetails {
  registrationNumber: string;
  score: number;
  yearOfExamination: number;
}

interface ContactInfo {
  permanentHome: PermanentHome;
  campusResidence?: CampusResidence;
  guardianInformation: GuardianInformation;
}

interface PermanentHome {
  streetAddress: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  nearestBusStop?: string;
}

interface CampusResidence {
  hostel: string;
  block: string;
  roomNumber: string;
  roomType: string;
}

interface GuardianInformation {
  primaryGuardian: Guardian;
  secondaryGuardian?: Guardian;
}

interface Guardian {
  name: string;
  relationship: string;
  occupation?: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  email?: string;
}

interface EnrolledCourse {
  courseId: string;
  courseName: string;
  semester: string;
  creditUnits: number;
  courseType: string;
  lecturer: Lecturer;
  coursePerformance: CoursePerformance;
  courseSchedule: CourseSchedule;
}

interface Lecturer {
  name: string;
  department: string;
  email: string;
}

interface CoursePerformance {
  continuousAssessment?: number;
  midSemesterExam?: number;
  finalExamScore?: number | null;
  preliminaryGrade?: string | null;
  expectedGrade?: string | null;
}

interface CourseSchedule {
  days: string[];
  time: string;
  venue: string;
}

interface AcademicHistory {
  cgpa: number;
  totalCreditUnitsPassed: number;
  semesterResults: SemesterResult[];
  academicAdvisor: AcademicAdvisor;
}

interface SemesterResult {
  academicYear: string;
  semester: string;
  gpa: number;
  totalCreditUnits: number;
  status: string;
}

interface AcademicAdvisor {
  name: string;
  department: string;
  contactEmail: string;
}

interface FinancialInfo {
  tuitionDetails: TuitionDetails;
  scholarships?: Scholarship[];
  feeBreakdown: FeeBreakdown;
}

interface TuitionDetails {
  totalTuitionFee: number;
  amountPaid: number;
  outstandingBalance: number;
  paymentDeadline: string;
  paymentPlan: string;
}

interface Scholarship {
  name: string;
  amount: number;
  period: string;
  criteria: string;
}

interface FeeBreakdown {
  tuition: number;
  healthLevy?: number;
  studentUnionFee?: number;
  developmentLevy?: number;
}

interface DisciplinaryRecord {
  status: string;
  warnings: string[];
  disciplinaryActions: string[];
}

interface ExtracurricularActivity {
  type: string;
  name: string;
  position?: string;
  academicYear: string;
  responsibilities: string[];
}

interface HealthAndWellness {
  medicalRecord: MedicalRecord;
  emergencyContact: EmergencyContact;
}

interface MedicalRecord {
  bloodGroup: string;
  genotype: string;
  allergies: string[];
  chronicConditions: string[];
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

interface AccountCredentials {
  username: string;
  institutionalEmail: string;
  lastLogin: string; // ISO 8601 Date string
  loginAttempts: number;
  accountStatus: "active" | "inactive" | "locked";
  twoFactorAuthentication: boolean;
}

interface Metadata {
  createdAt: string; // ISO 8601 Date string
  updatedAt: string; // ISO 8601 Date string
  version: number;
  dataSource: string;
}



