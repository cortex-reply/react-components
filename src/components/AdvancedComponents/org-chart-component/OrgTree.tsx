import React, { useState } from 'react';
import { OrgChartNode, User } from './types';
import { OrgNode } from './OrgNode';

interface OrgTreeProps {
  nodes: OrgChartNode[];
  onNodeClick?: (user: User) => void;
  expandable?: boolean;
  initiallyExpanded?: boolean;
}

export const OrgTree: React.FC<OrgTreeProps> = ({
  nodes,
  onNodeClick,
  expandable = false,
  initiallyExpanded = true,
}) => {
  return (
    <div className="flex flex-col items-center gap-0">
      {nodes.map((node, index) => (
        <OrgTreeNode
          key={node.id}
          node={node}
          onNodeClick={onNodeClick}
          expandable={expandable}
          initiallyExpanded={initiallyExpanded}
          isLast={index === nodes.length - 1}
        />
      ))}
    </div>
  );
};

interface OrgTreeNodeProps {
  node: OrgChartNode;
  onNodeClick?: (user: User) => void;
  expandable?: boolean;
  initiallyExpanded?: boolean;
  isLast?: boolean;
}

const OrgTreeNode: React.FC<OrgTreeNodeProps> = ({
  node,
  onNodeClick,
  expandable,
  initiallyExpanded = true,
  isLast = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const hasChildren = node.children.length > 0;

  return (
    <div className={`flex flex-col items-center ${!isLast ? 'mb-8' : ''}`}>
      {/* Current Node */}
      <OrgNode
        node={node}
        onNodeClick={onNodeClick}
        expandable={expandable}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center mt-0">
          {/* Horizontal connector for multiple children */}
          {node.children.length > 1 && (
            <div className="relative w-full flex justify-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px]">
                {/* Horizontal line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-border" />
                {/* Vertical connectors to each child */}
                <div className="flex justify-around">
                  {node.children.map((_, idx) => (
                    <div key={idx} className="w-0.5 h-8 bg-border" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Children Nodes */}
          <div
            className={`
              flex gap-8 mt-8
              ${node.children.length === 1 ? 'flex-col items-center' : 'flex-row items-start justify-center flex-wrap'}
            `}
          >
            {node.children.map((child, idx) => (
              <OrgTreeNode
                key={child.id}
                node={child}
                onNodeClick={onNodeClick}
                expandable={expandable}
                initiallyExpanded={initiallyExpanded}
                isLast={idx === node.children.length - 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
