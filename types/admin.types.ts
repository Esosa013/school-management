export interface Admin {
    _id: string;
    userType: "admin";
    personalInfo: AdminPersonalInfo;
    professionalInfo: AdminProfessionalInfo;
    accountCredentials: AdminAccountCredentials;
    permissions: AdminPermissions;
    activityLogs: AdminActivityLog[];
    metadata: Metadata;
  }
  
  export interface AdminPersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    profilePicture: string;
  }
  
  export interface AdminProfessionalInfo {
    adminId: string;
    role: string;
    department: string;
    hireDate: string;
    employmentType: string;
    yearsOfExperience: number;
  }
  
  export interface AdminAccountCredentials {
    username: string;
    password: string;
    lastLogin: string;
    loginAttempts: number;
    accountStatus: string;
  }
  
  export interface AdminPermissions {
    canManageUsers: boolean;
    canEditSystemSettings: boolean;
    canAccessSensitiveData: boolean;
    canMonitorActivities: boolean;
    canAssignRoles: boolean;
  }
  
  export interface AdminActivityLog {
    action: string;
    details: string;
    timestamp: string;
  }
  
  export interface Metadata {
    createdAt: string;
    updatedAt: string;
    version: number;
  }
  