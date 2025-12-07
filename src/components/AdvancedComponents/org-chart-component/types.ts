
export interface OrgChartUser {
  id: string;
  name: string;
  email: string;
  jobRole?: 'P' | 'SM' | 'M' | 'SC1' | 'SC2' | 'C1' | 'C2' | 'C3';
  manager?: string | { id: string } | null;
  about?: string;
  profilePicture?: {
    url: string;
    alt?: string;
  };
}

export interface OrgChartNode extends OrgChartUser {
  children: OrgChartNode[];
  level: number;
}

export interface CompanyInfo {
  name: string;
  logo?: {
    url: string;
    alt?: string;
  };
}

export interface OrgChartProps {
  users: OrgChartUser[];
  onNodeClick?: (user: OrgChartUser) => void;
  className?: string;
  expandable?: boolean;
  initiallyExpanded?: boolean;
  companyInfo?: CompanyInfo;
  defaultExpandedLevels?: number;
}

export interface OrgNodeProps {
  node: OrgChartNode;
  onNodeClick?: (user:  OrgChartUser) => void;
  expandable?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const jobRoleLabels: Record<string, string> = {
  P: 'Partner',
  SM: 'Senior Manager',
  M: 'Manager',
  SC1: 'Senior Consultant 1',
  SC2: 'Senior Consultant 2',
  C1: 'Consultant 1',
  C2: 'Consultant 2',
  C3: 'Consultant 3',
};