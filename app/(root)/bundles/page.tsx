'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { getBundles } from '@/lib/axios/bundles';
import { Bundle, PaginatedBundles } from '@/lib/types/bundle';
import BundleCard from '@/components/bundles/BundleCard';
import BundleFilters from '@/components/bundles/BundleFilters';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { StatsBar } from '@/components/stats-bar';

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
    <div className="bg-white min-h-screen">
      {/* Main Banner Hero Section (Space kept as requested) */}
      <div className="w-full bg-[#E5E5E5] h-[400px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 to-indigo-50/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BundleFilters
          search={search}
          status=""
          onSearchChange={setSearch}
          onStatusChange={() => {}}
          onReset={handleReset}
          showStatus={false}
          total={pagination.total}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-square bg-gray-100 rounded-lg"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : bundles.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50">
               <span className="text-4xl opacity-20">📦</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">No bundles found</h3>
            <p className="text-gray-500 mt-2">We couldn&apos;t find any bundles matching your search.</p>
            <button onClick={handleReset} className="mt-6 text-blue-600 font-medium hover:underline">Clear all filters</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              {bundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.last_page > 1 && (
              <div className="mt-24 flex justify-center border-t border-gray-100 pt-12">
                <nav className="flex items-center gap-6">
                  <button
                    disabled={pagination.current_page === 1}
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-black disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" /> Previous
                  </button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: pagination.last_page }).map((_, i) => (
                       <button
                         key={i+1}
                         onClick={() => handlePageChange(i+1)}
                         className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                           pagination.current_page === i + 1 
                           ? "bg-[#1A1A2E] text-white shadow-lg" 
                           : "text-gray-500 hover:bg-gray-100"
                         }`}
                       >
                         {i+1}
                       </button>
                    ))}
                  </div>
                  <button
                    disabled={pagination.current_page === pagination.last_page}
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-black disabled:opacity-30 transition-all"
                  >
                    Next <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      <StatsBar />
    </div>
  );
}
