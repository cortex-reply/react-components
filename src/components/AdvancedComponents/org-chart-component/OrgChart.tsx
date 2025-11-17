import React from 'react';
import { OrgChartProps } from './types';
import { buildOrgTree } from './utils';
import { OrgTree } from './OrgTree';

/**
 * OrgChart Component
 * 
 * Displays an organizational hierarchy chart based on user data.
 * 
 * @param users - Array of user objects with manager relationships
 * @param onNodeClick - Optional callback when a node is clicked
 * @param className - Optional additional CSS classes
 * @param expandable - Whether nodes can be collapsed/expanded (default: false)
 * @param initiallyExpanded - Whether nodes start expanded (default: true)
 */
export const OrgChart: React.FC<OrgChartProps> = ({
  users,
  onNodeClick,
  className = '',
  expandable = false,
  initiallyExpanded = true,
}) => {
  // Build hierarchical tree from flat user list
  const orgTree = buildOrgTree(users);

  if (users.length === 0) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <p className="text-muted-foreground">No users to display</p>
        </div>
      </div>
    );
  }

  if (orgTree.length === 0) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <p className="text-muted-foreground">Unable to build organization tree</p>
          <p className="text-xs text-muted-foreground mt-1">
            Check that manager relationships are properly configured
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`org-chart w-full overflow-x-auto ${className}`}>
      <div className="inline-block min-w-full p-8">
        <OrgTree
          nodes={orgTree}
          onNodeClick={onNodeClick}
          expandable={expandable}
          initiallyExpanded={initiallyExpanded}
        />
      </div>
    </div>
  );
};

export default OrgChart;
