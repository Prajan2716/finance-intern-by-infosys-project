
export type PolicyType = 'Auto' | 'Home' | 'Life' | 'Health';

export interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
}

export interface Transaction {
  id: string;
  policyId: string;
  amount: number;
  date: string;
  status: 'Successful' | 'Pending' | 'Failed';
  method: string;
}

export interface Policy {
  id: string;
  type: PolicyType;
  provider: string;
  premium: number;
  coverage: number;
  status: 'Active' | 'Pending' | 'Expired';
  renewalDate: string;
  icon: string;
}

export interface Claim {
  id: string;
  policyId: string;
  date: string;
  amount: number;
  description: string;
  status: 'In Review' | 'Approved' | 'Rejected';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface DamageReport {
  estimateRange: string;
  severity: 'Low' | 'Medium' | 'High';
  recommendation: string;
  detectedIssues: string[];
}
