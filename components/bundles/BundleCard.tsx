import Link from "next/link";
import { Bundle } from "@/lib/types/bundle";

interface BundleCardProps {
  bundle: Bundle;
  isAdmin?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const STORAGE_BASE = API_BASE.replace(/\/api$/, "") + "/storage/";

const BundleCard = ({ bundle, isAdmin = false, onEdit, onDelete }: BundleCardProps) => {
  const getImageUrl = (url: string | null | undefined) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return STORAGE_BASE + url;
  };

  // Calculate total value of individual courses to show discount
  const originalPrice = bundle.courses?.reduce((sum, course) => sum + Number(course.price), 0) || 0;
  const currentPrice = Number(bundle.price);
  const discountPercent = originalPrice > 0 ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  const formattedPrice = bundle.is_free ? "FREE" : `Rs. ${currentPrice.toLocaleString()}`;
  const formattedOriginalPrice = `Rs. ${originalPrice.toLocaleString()}`;

  return (
    <div className="group relative flex flex-col bg-white overflow-hidden transition-all duration-300">
      {/* Image Container - Square Aspect Ratio */}
      <Link href={`/bundles/${bundle.id}`} className="relative aspect-square overflow-hidden bg-[#F1F1F1] block group">
        {getImageUrl(bundle.banner_url || bundle.banner_path) ? (
          <img
            src={getImageUrl(bundle.banner_url || bundle.banner_path)!}
            alt={bundle.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-50 text-gray-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        )}

        {/* Discount Badge - Top Left as in image */}
        {discountPercent > 0 && !bundle.is_free && (
          <div className="absolute top-4 left-4 bg-[#B10000] text-white text-[11px] font-bold px-2 py-1 rounded-sm shadow-md">
            -{discountPercent}% OFF
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="mt-4 flex flex-col space-y-1">
        <Link href={`/bundles/${bundle.id}`}>
          <h3 className="text-[15px] font-medium text-[#222] hover:underline underline-offset-4 decoration-1">
            {bundle.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-3">
          {discountPercent > 0 && !bundle.is_free && (
            <span className="text-[13px] text-[#999] line-through">
              {formattedOriginalPrice}
            </span>
          )}
          <span className="text-[15px] font-bold text-[#222]">
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* Admin Actions Overlay (Only if Admin) */}
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.preventDefault(); onEdit?.(bundle.id); }}
            className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onDelete?.(bundle.id); }}
            className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white text-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default BundleCard;
