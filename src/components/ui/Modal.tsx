import React from 'react';

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({
  isOpen,
  children,
}) => {
  if (!isOpen) return null;
  return <div>{children}</div>;
};
