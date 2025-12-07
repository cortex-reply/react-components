import { OrgChartUser, OrgChartNode } from './types';

/**
 * Build a hierarchical tree structure from flat user list
 */
export function buildOrgTree(users: OrgChartUser[]): OrgChartNode[] {
  const userMap = new Map<string, OrgChartNode>();
  const roots: OrgChartNode[] = [];

  // Initialize all users as nodes
  users.forEach((user) => {
    userMap.set(user.id, {
      ...user,
      children: [],
      level: 0,
    });
  });

  // Build parent-child relationships
  users.forEach((user) => {
    const node = userMap.get(user.id);
    if (!node) return;

    const managerId = typeof user.manager === 'string' 
      ? user.manager 
      : user.manager?.id;

    if (managerId) {
      const managerNode = userMap.get(managerId);
      if (managerNode) {
        managerNode.children.push(node);
        node.level = managerNode.level + 1;
      } else {
        // Manager not found in list, treat as root
        roots.push(node);
      }
    } else {
      // No manager, this is a root node
      roots.push(node);
    }
  });

  // Update levels recursively
  const updateLevels = (node: OrgChartNode, level: number) => {
    node.level = level;
    node.children.forEach((child) => updateLevels(child, level + 1));
  };

  roots.forEach((root) => updateLevels(root, 0));

  return roots;
}

/**
 * Get initials from name for avatar fallback
 */
export function getInitials(name: string): string {
  if (!name) return '?';
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Get color class based on job role level
 */
export function getRoleBadgeColor(jobRole?: string): string {
  if (!jobRole) return 'bg-muted text-muted-foreground';
  
  const roleColors: Record<string, string> = {
    P: 'bg-primary/20 text-primary border-primary/30',
    SM: 'bg-accent/20 text-accent border-accent/30',
    M: 'bg-accent/15 text-accent border-accent/25',
    SC2: 'bg-card text-card-foreground border-border',
    SC1: 'bg-card text-card-foreground border-border',
    C3: 'bg-muted text-muted-foreground border-border',
    C2: 'bg-muted text-muted-foreground border-border',
    C1: 'bg-muted text-muted-foreground border-border',
  };
  
  return roleColors[jobRole] || 'bg-muted text-muted-foreground';
}
