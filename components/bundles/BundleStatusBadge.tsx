import React from 'react';
import { BUNDLE_STATUS_LABELS } from '@/lib/types/bundle';

interface BundleStatusBadgeProps {
  status: 'published' | 'draft' | 'archived' | 'active';
}

const BundleStatusBadge: React.FC<BundleStatusBadgeProps> = ({ status }) => {
  const colors = {
    published: 'bg-green-100 text-green-800 border-green-200',
    active: 'bg-blue-100 text-blue-800 border-blue-200',
    draft: 'bg-amber-100 text-amber-800 border-amber-200',
    archived: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status]}`}>
      {BUNDLE_STATUS_LABELS[status]}
    </span>
  );
};

export default BundleStatusBadge;
