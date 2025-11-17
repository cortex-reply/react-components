import React from 'react';
import { OrgNodeProps } from './types';
import { getInitials, getRoleBadgeColor } from './utils';
import { jobRoleLabels } from './types';

export const OrgNode: React.FC<OrgNodeProps> = ({
  node,
  onNodeClick,
  expandable = false,
  isExpanded = true,
  onToggleExpand,
}) => {
  const hasChildren = node.children.length > 0;
  const showExpandButton = expandable && hasChildren;

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div
        className={`
          relative bg-card border border-border rounded-lg shadow-sm
          transition-all duration-200 hover:shadow-md hover:border-primary/50
          ${onNodeClick ? 'cursor-pointer' : ''}
          w-64 p-4
        `}
        onClick={() => onNodeClick?.(node)}
      >
        {/* Profile Section */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {node.profilePicture?.url ? (
              <img
                src={node.profilePicture.url}
                alt={node.profilePicture.alt || node.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {getInitials(node.name)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground text-sm truncate">
              {node.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {node.email}
            </p>
            {node.jobRole && (
              <div className="mt-2">
                <span
                  className={`
                    inline-block px-2 py-0.5 rounded text-xs font-medium border
                    ${getRoleBadgeColor(node.jobRole)}
                  `}
                >
                  {jobRoleLabels[node.jobRole]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        {node.about && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground line-clamp-2">
              {node.about}
            </p>
          </div>
        )}

        {/* Expand/Collapse Button */}
        {showExpandButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand?.();
            }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-card border-2 border-border hover:border-primary/50 flex items-center justify-center transition-colors z-30"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <svg
              className={`w-3 h-3 text-muted-foreground transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>


    </div>
  );
};
