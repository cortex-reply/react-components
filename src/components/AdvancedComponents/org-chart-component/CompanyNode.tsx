import React from 'react';
import { CompanyInfo } from './types';

interface CompanyNodeProps {
  companyInfo: CompanyInfo;
}

export const CompanyNode: React.FC<CompanyNodeProps> = ({ companyInfo }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Company Logo Node */}
      <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shadow-sm">
        {companyInfo.logo?.url ? (
          <img
            src={companyInfo.logo.url}
            alt={companyInfo.logo.alt || companyInfo.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">
              {companyInfo.name.split(' ').map(word => word[0]).join('').slice(0, 3).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      
      {/* Company Name */}
      <div className="mt-2 text-center">
        <p className="text-sm font-semibold text-card-foreground">{companyInfo.name}</p>
      </div>

      {/* Connection line down to partners */}
      <div className="w-0.5 h-1 bg-border mt-2" />
    </div>
  );
};