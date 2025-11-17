import React, { useState, useRef, useEffect } from 'react';
import { OrgChartNode, User } from './types';
import { OrgNode } from './OrgNode';
import { CompanyNode } from './CompanyNode';

interface CompanyInfo {
  name: string;
  logo?: {
    url: string;
    alt?: string;
  };
}

// Helper function to recursively adjust node levels
const adjustLevelsRecursively = (node: OrgChartNode, increment: number): OrgChartNode => ({
  ...node,
  level: node.level + increment,
  children: node.children.map(child => adjustLevelsRecursively(child, increment))
});

interface OrgTreeProps {
  nodes: OrgChartNode[];
  onNodeClick?: (user: User) => void;
  expandable?: boolean;
  initiallyExpanded?: boolean;
  companyInfo?: CompanyInfo;
  defaultExpandedLevels?: number;
}

export const OrgTree: React.FC<OrgTreeProps> = ({
  nodes,
  onNodeClick,
  expandable = false,
  initiallyExpanded = true,
  companyInfo,
  defaultExpandedLevels = 2,
}) => {
  // If we have companyInfo and multiple nodes, treat them as children of the company
  if (companyInfo && nodes.length > 1) {
    // Adjust levels for nodes that are now children of the company
    const adjustedNodes = nodes.map(node => ({
      ...node,
      level: node.level + 1,
      children: node.children.map(child => adjustLevelsRecursively(child, 1))
    }));

    return (
      <OrgTreeNode
        node={{
          id: 'company',
          name: companyInfo.name,
          email: '',
          children: adjustedNodes,
          level: 0,
        }}
        onNodeClick={onNodeClick}
        expandable={expandable}
        initiallyExpanded={initiallyExpanded}
        isCompanyNode={true}
        companyInfo={companyInfo}
        defaultExpandedLevels={defaultExpandedLevels}
      />
    );
  }

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
          defaultExpandedLevels={defaultExpandedLevels}
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
  isCompanyNode?: boolean;
  companyInfo?: CompanyInfo;
  defaultExpandedLevels?: number;
}

const OrgTreeNode: React.FC<OrgTreeNodeProps> = ({
  node,
  onNodeClick,
  expandable,
  initiallyExpanded = true,
  isLast = false,
  isCompanyNode = false,
  companyInfo,
  defaultExpandedLevels = 2,
}) => {
  // Determine if this node should be initially expanded based on its level
  const shouldBeExpanded = isCompanyNode || node.level < defaultExpandedLevels;
  const [isExpanded, setIsExpanded] = useState(shouldBeExpanded);
  const hasChildren = node.children.length > 0;
  const childrenContainerRef = useRef<HTMLDivElement>(null);
  const [connectionInfo, setConnectionInfo] = useState<{
    childPositions: number[];
    containerWidth: number;
  }>({ childPositions: [], containerWidth: 0 });

  // Calculate child positions for connection lines
  useEffect(() => {
    if (!hasChildren || !isExpanded || !childrenContainerRef.current) {
      setConnectionInfo({ childPositions: [], containerWidth: 0 });
      return;
    }

    // Use setTimeout to ensure DOM has updated after any expand/collapse changes
    const timeoutId = setTimeout(() => {
      const container = childrenContainerRef.current;
      if (!container) return;
      
      const childElements = Array.from(container.children) as HTMLElement[];
      
      if (childElements.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const positions = childElements.map(child => {
        const childRect = child.getBoundingClientRect();
        // Calculate the center position of each child relative to the container
        return (childRect.left + childRect.width / 2) - containerRect.left;
      });

      setConnectionInfo({
        childPositions: positions,
        containerWidth: containerRect.width,
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [hasChildren, isExpanded, node.children.length]);

  // Also recalculate when any child in the tree changes (for nested expansions)
  useEffect(() => {
    if (!hasChildren || !isExpanded) return;
    
    const observer = new ResizeObserver(() => {
      if (!childrenContainerRef.current) return;
      
      const container = childrenContainerRef.current;
      const childElements = Array.from(container.children) as HTMLElement[];
      
      if (childElements.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const positions = childElements.map(child => {
        const childRect = child.getBoundingClientRect();
        return (childRect.left + childRect.width / 2) - containerRect.left;
      });

      setConnectionInfo({
        childPositions: positions,
        containerWidth: containerRect.width,
      });
    });

    if (childrenContainerRef.current) {
      observer.observe(childrenContainerRef.current);
    }

    return () => observer.disconnect();
  }, [hasChildren, isExpanded]);

  return (
    <div className={`flex flex-col items-center ${!isLast ? 'mb-8' : ''}`}>
      {/* Current Node */}
      {isCompanyNode && companyInfo ? (
        <CompanyNode companyInfo={companyInfo} />
      ) : (
        <OrgNode
          node={node}
          onNodeClick={onNodeClick}
          expandable={expandable}
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
        />
      )}

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative">
          {/* Connection Lines for multiple children */}
          {node.children.length > 1 && connectionInfo.childPositions.length > 0 && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-10">
              {/* Vertical line down from parent */}
              <div className="absolute top-0 left-0 w-0.5 h-8 bg-border -translate-x-1/2" />
              
              {/* Horizontal line connecting children */}
              <div 
                className="absolute top-8 h-0.5 bg-border"
                style={{
                  left: `${Math.min(...connectionInfo.childPositions) - connectionInfo.containerWidth / 2}px`,
                  width: `${Math.max(...connectionInfo.childPositions) - Math.min(...connectionInfo.childPositions)}px`,
                }}
              />
              
              {/* Vertical lines down to each child */}
              {connectionInfo.childPositions.map((position, idx) => (
                <div
                  key={idx}
                  className="absolute w-0.5 bg-border -translate-x-1/2"
                  style={{
                    left: `${position - connectionInfo.containerWidth / 2}px`,
                    top: '32px',
                    height: '32px',
                  }}
                />
              ))}
            </div>
          )}

          {/* Single child connection line */}
          {node.children.length === 1 && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-border pointer-events-none z-10" />
          )}

          {/* Children Container with Horizontal Scroll */}
          <div className="mt-16 w-full overflow-x-auto">
            <div 
              ref={childrenContainerRef}
              className={`
                flex gap-8 pb-4
                ${node.children.length === 1 
                  ? 'justify-center' 
                  : 'justify-start min-w-max px-4'
                }
              `}
            >
              {node.children.map((child) => (
                <div key={child.id} className="flex-shrink-0">
                  <OrgTreeNode
                    node={child}
                    onNodeClick={onNodeClick}
                    expandable={expandable}
                    initiallyExpanded={initiallyExpanded}
                    defaultExpandedLevels={defaultExpandedLevels}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
