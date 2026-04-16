'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAdminBundles, deleteBundle } from '@/lib/axios/bundles';
import { Bundle, PaginatedBundles } from '@/lib/types/bundle';
import BundleStatusBadge from '@/components/bundles/BundleStatusBadge';
import BundleFilters from '@/components/bundles/BundleFilters';
import DeleteBundleModal from '@/components/bundles/DeleteBundleModal';

export default function AdminBundlesPage() {
  const router = useRouter();
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedBundles, 'data'>>({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bundleToDelete, setBundleToDelete] = useState<Bundle | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBundles = useCallback(async (page = 1, searchQuery = '', statusFilter = '') => {
    try {
      setLoading(true);
      const res = await getAdminBundles({
        page,
        search: searchQuery,
        status: statusFilter,
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
      fetchBundles(1, search, status);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, status, fetchBundles]);

  const handlePageChange = (newPage: number) => {
    fetchBundles(newPage, search, status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDeleteModal = (bundle: Bundle) => {
    setBundleToDelete(bundle);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bundleToDelete) return;
    try {
      setIsDeleting(true);
      await deleteBundle(bundleToDelete.id);
      toast.success('Bundle deleted successfully');
      setIsDeleteModalOpen(false);
      fetchBundles(pagination.current_page, search, status);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete bundle');
    } finally {
      setIsDeleting(false);
      setBundleToDelete(null);
    }
  };

  const handleReset = () => {
    setSearch('');
    setStatus('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bundles Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your course bundles and their configurations</p>
        </div>
        <Link
          href="/super-admin/bundles/add"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Bundle
        </Link>
      </div>

      <BundleFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onReset={handleReset}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 animate-pulse">Loading bundles...</p>
          </div>
        ) : bundles.length === 0 ? (
          <div className="p-12 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No bundles found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your filters or create a new bundle.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Analytics</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created By</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bundles.map((bundle) => (
                  <tr key={bundle.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{bundle.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{bundle.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[200px]">{bundle.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {bundle.is_free ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${Number(bundle.price).toFixed(2)}`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <BundleStatusBadge status={bundle.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col gap-1">
                        <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          {bundle.courses?.length || 0} Courses
                        </span>
                        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                          {bundle.schedules?.length || 0} Sessions
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-sm font-medium text-gray-900">
                        {bundle.analytics?.enrollments || 0} enrollments
                      </div>
                      <div className="text-xs text-gray-500">
                        ${Number(bundle.analytics?.revenue || 0).toFixed(2)} revenue
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bundle.creator?.name || 'Admin'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/super-admin/bundles/edit/${bundle.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Bundle"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(bundle)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Bundle"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {bundles.length > 0 && (
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
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
      </div>

      <DeleteBundleModal
        bundleId={bundleToDelete?.id || null}
        bundleTitle={bundleToDelete?.title || null}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
