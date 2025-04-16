import React from 'react';

export const GameDashboardLayout: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  return <div className="container space-y-4">{children}</div>;
};
