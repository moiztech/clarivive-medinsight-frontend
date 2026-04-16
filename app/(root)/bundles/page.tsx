'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { getBundles } from '@/lib/axios/bundles';
import { Bundle, PaginatedBundles } from '@/lib/types/bundle';
import BundleCard from '@/components/bundles/BundleCard';
import BundleFilters from '@/components/bundles/BundleFilters';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PublicBundlesPage() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedBundles, 'data'>>({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchBundles = useCallback(async (page = 1, searchQuery = '') => {
    try {
      setLoading(true);
      const res = await getBundles({
        page,
        search: searchQuery,
      });
      setBundles(res.data);
      setPagination({
        current_page: res.current_page,
        last_page: res.last_page,
        per_page: res.per_page,
        total: res.total,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load bundles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBundles(1, search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchBundles]);

  const handlePageChange = (newPage: number) => {
    fetchBundles(newPage, search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSearch('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Our Course Bundles
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl">
            Save more by choosing our curated collections of related courses. 
            Perfect for comprehensive learning paths.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
        <BundleFilters
          search={search}
          status=""
          onSearchChange={setSearch}
          onStatusChange={() => {}}
          onReset={handleReset}
          showStatus={false}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-gray-100">
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded w-1/3 mt-8"></div>
                </div>
              </div>
            ))}
          </div>
        ) : bundles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center mt-8">
            <h3 className="text-lg font-medium text-gray-900">No bundles found</h3>
            <p className="text-gray-500 mt-1">We couldn&apos;t find any bundles matching your search.</p>
            <button
              onClick={handleReset}
              className="mt-4 text-blue-600 font-medium hover:text-blue-500"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>

            {/* Pagination */}
            {bundles.length > 0 && (
              <div className="mt-12 flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    disabled={pagination.current_page === 1}
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    disabled={pagination.current_page === pagination.last_page}
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(pagination.current_page - 1) * pagination.per_page + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(pagination.current_page * pagination.per_page, pagination.total)}
                      </span>{' '}
                      of <span className="font-medium">{pagination.total}</span> results
                    </p>
                  </div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      disabled={pagination.current_page === 1}
                      onClick={() => handlePageChange(pagination.current_page - 1)}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <div className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
                      Page {pagination.current_page} of {pagination.last_page}
                    </div>
                    <button
                      disabled={pagination.current_page === pagination.last_page}
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
