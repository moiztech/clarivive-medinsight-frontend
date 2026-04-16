import React from 'react';
import { Search, X } from 'lucide-react';

interface BundleFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
  showStatus?: boolean;
}

const BundleFilters: React.FC<BundleFiltersProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onReset,
  showStatus = true,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-end">
      <div className="flex-grow w-full">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search Bundles
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by title or description..."
          />
        </div>
      </div>

      {showStatus && (
        <div className="min-w-[150px] w-full md:w-auto">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      )}

      <div className="flex shrink-0">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 h-[38px]"
        >
          <X className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default BundleFilters;
