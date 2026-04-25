import React from 'react';
import { ChevronDown } from 'lucide-react';

interface BundleFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
  showStatus?: boolean;
  total?: number;
}

const BundleFilters: React.FC<BundleFiltersProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onReset,
  showStatus = true,
  total = 0,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-8 border-b border-gray-100 mb-16 gap-6">
      {/* Left Filters */}
      <div className="flex items-center gap-10">
        <span className="text-[15px] font-medium text-gray-500">Filter:</span>
        
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2 group">
            <span className="text-[15px] text-gray-700 group-hover:text-black transition-colors font-medium">Availability</span>
            <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-black transition-transform" />
          </button>
          
          <button className="flex items-center gap-2 group">
            <span className="text-[15px] text-gray-700 group-hover:text-black transition-colors font-medium">Price</span>
            <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-black transition-transform" />
          </button>
        </div>
      </div>

      {/* Right Sort & Count */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3">
          <span className="text-[15px] text-gray-500">Sort by:</span>
          <button className="flex items-center gap-2 group">
            <span className="text-[15px] font-bold text-gray-800">Featured</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        
        <div className="text-[15px] font-medium text-gray-500 min-w-[80px] text-right">
          {total} bundles
        </div>
      </div>
    </div>
  );
};

export default BundleFilters;
