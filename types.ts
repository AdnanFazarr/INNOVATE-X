
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  difficulty: 'Low' | 'Medium' | 'High';
  progress: number;
  aiTip: string;
}

export interface ExamPrep {
  subject: string;
  examDate: string;
  readiness: number; // 0-100
  topics: { name: string; mastery: number }[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  unlocked: boolean;
}

export interface PerformanceData {
  day: string;
  attendance: number;
  participation: number;
  wellbeing: number;
}
