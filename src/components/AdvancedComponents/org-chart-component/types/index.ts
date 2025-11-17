export type JobRole = 'C1' | 'C2' | 'C3' | 'SC1' | 'SC2' | 'M' | 'SM' | 'P';

export interface ProfilePicture {
  url: string;
  alt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  jobRole?: JobRole;
  manager?: User | string | null;
  about?: string;
  profilePicture?: ProfilePicture;
}

export interface OrgChartNode extends User {
  children: OrgChartNode[];
  level: number;
}

export interface OrgChartProps {
  users: User[];
  onNodeClick?: (user: User) => void;
  className?: string;
  expandable?: boolean;
  initiallyExpanded?: boolean;
}

export interface OrgNodeProps {
  node: OrgChartNode;
  onNodeClick?: (user: User) => void;
  expandable?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const jobRoleLabels: Record<JobRole, string> = {
  C1: 'Consultant 1',
  C2: 'Consultant 2',
  C3: 'Consultant 3',
  SC1: 'Senior Consultant 1',
  SC2: 'Senior Consultant 2',
  M: 'Manager',
  SM: 'Senior Manager',
  P: 'Partner',
};
