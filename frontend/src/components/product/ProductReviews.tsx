"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquare, ChevronLeft, ChevronRight, CheckCircle2, User, Send, Loader2, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { apiFetch } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  is_verified: boolean;
}

interface ProductReviewsProps {
  productId: number;
  productSlug: string;
  collectiveFeedbackData: {
    average_rating: number;
    total_reviews: number;
    reviews: Review[];
  };
}

export default function ProductReviews(props: ProductReviewsProps) {
  const { productId, productSlug: propSlug, collectiveFeedbackData } = props;
  
  // Ritual Fallback: If slug is unmanifested, extract it from the URL tapestry
  const [productSlug, setProductSlug] = useState(propSlug);
  
  const { isAuthenticated, user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const [reviewsData, setReviewsData] = useState({
    average_rating: Number(collectiveFeedbackData?.average_rating || 0),
    total_reviews: Number(collectiveFeedbackData?.total_reviews || 0),
    reviews: Array.isArray(collectiveFeedbackData?.reviews) ? collectiveFeedbackData.reviews : []
  });

  useEffect(() => {
    if (!productSlug) {
      const pathSegments = window.location.pathname.split('/');
      const extractedSlug = pathSegments[pathSegments.length - 1];
      if (extractedSlug && extractedSlug !== 'product') {
        console.log(`Ritual Fallback: Slug unboxed from URL: ${extractedSlug}`);
        setProductSlug(extractedSlug);
      }
    } else if (propSlug && propSlug !== productSlug) {
      setProductSlug(propSlug);
    }
  }, [productSlug, propSlug]);

  const reviewsPerPage = 5;

  const fetchReviews = async () => {
    const activeSlug = productSlug || propSlug;
    if (!activeSlug) {
      console.warn("Review manifestation stalled: no identity (slug) found.");
      return;
    }
    try {
      console.log(`Syncing collective feedback for artifact: ${activeSlug}`);
      const data = await apiFetch<{ average_rating: number, total_reviews: number, reviews: Review[] }>(`/products/${activeSlug}/reviews`);
      if (data) {
        setReviewsData({
          average_rating: Number(data.average_rating || 0),
          total_reviews: Number(data.total_reviews || 0),
          reviews: Array.isArray(data.reviews) ? data.reviews : []
        });
      }
    } catch (err) {
      console.error("Failed to re-manifest reviews:", err);
    }
  };

  useEffect(() => {
    const activeSlug = productSlug || propSlug;
    if (activeSlug) {
      fetchReviews();
    }
  }, [productSlug, propSlug]);

  const totalPages = Math.ceil((reviewsData.reviews?.length || 0) / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = (reviewsData.reviews || []).slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await apiFetch("/reviews", {
        method: "POST",
        body: JSON.stringify({
          product_id: productId,
          rating,
          comment
        })
      });
      setSubmitSuccess(true);
      setComment("");
      setRating(5);
      // Re-manifest reviews to show the new addition
      fetchReviews();
    } catch (err: any) {
      setSubmitError(err.message || "রিভিউ সাবমিট করা যায়নি।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white border-t border-brand-cream" id="reviews">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold font-anek text-brand-navy mb-12">রেটিং ও রিভিউ</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-noto">
          {/* Summary Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-brand-cream/10 rounded-[2.5rem] border border-brand-cream p-8 md:p-10 flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="text-6xl font-black text-brand-navy tracking-tighter">
                  {Number(reviewsData.average_rating).toFixed(1)}<span className="text-xl text-brand-navy/20 font-light">/5</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star 
                      key={s} 
                      size={20} 
                      className={s <= Math.round(reviewsData.average_rating) ? "fill-brand-orange text-brand-orange" : "text-brand-navy/10"} 
                    />
                  ))}
                </div>
                <p className="text-[10px] font-black text-brand-navy/30 uppercase tracking-[0.2em]">{reviewsData.total_reviews}টি রেটিং</p>
              </div>

              <div className="w-full h-[1px] bg-brand-cream" />

              <div className="space-y-3 w-full">
                <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" size={16} />
                    ভেরিফাইড পলিসি
                </h4>
                <p className="text-[11px] text-brand-navy/60 leading-relaxed font-medium">
                    বাকশো শুধুমাত্র সেই গ্রাহকদের রিভিউ গ্রহণ করে যারা পণ্যটি সংগ্রহ করেছেন।
                </p>
              </div>
            </div>

            {/* Review Submission Form Ritual */}
            {isAuthenticated ? (
               <div className="bg-brand-navy rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden group border border-white/5">
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-xl font-bold font-anek">আপনার অভিজ্ঞতা লিখুন।</h3>
                    
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                       <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map(s => (
                            <button
                              key={s}
                              type="button"
                              onMouseEnter={() => setHoveredRating(s)}
                              onMouseLeave={() => setHoveredRating(0)}
                              onClick={() => setRating(s)}
                              className="transition-transform active:scale-95"
                            >
                               <Star 
                                size={24} 
                                className={`${(hoveredRating || rating) >= s ? "fill-brand-orange text-brand-orange" : "text-white/20"} transition-colors`} 
                               />
                            </button>
                          ))}
                       </div>

                       <textarea
                         required
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                         placeholder="আপনার অনুভূতি শেয়ার করুন..."
                         className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-orange transition-all h-28 resize-none font-medium"
                       />

                       <AnimatePresence>
                          {submitError && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-400 text-[10px] font-bold">
                               <AlertCircle size={12} /> {submitError}
                            </motion.div>
                          )}
                          {submitSuccess && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-400 text-[10px] font-bold">
                               <CheckCircle2 size={12} /> রিভিউ সফলভাবে গ্রহণ করা হয়েছে!
                            </motion.div>
                          )}
                       </AnimatePresence>

                       <button 
                         disabled={isSubmitting || !comment.trim()}
                         className="w-full bg-brand-orange text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                       >
                         {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                         সাবমিট করুন
                       </button>
                    </form>
                  </div>
               </div>
            ) : (
               <div className="bg-brand-cream/30 p-8 rounded-[2.5rem] border border-brand-orange/5 text-center space-y-4">
                  <p className="text-xs font-bold text-brand-navy/60 italic">রিভিউ দিতে লগইন করুন।</p>
                  <button onClick={() => window.location.href='/auth'} className="text-[10px] font-black uppercase tracking-widest text-brand-orange border-b border-brand-orange pb-0.5">লগইন পোর্টাল →</button>
               </div>
            )}
          </div>

          <div className="lg:col-span-8 space-y-8">
            {reviewsData.reviews.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentReviews.map((review) => (
                    <div key={review.id} className="p-8 rounded-[2rem] bg-brand-cream/5 border border-brand-cream group transition-all hover:bg-white hover:shadow-xl hover:shadow-brand-navy/5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-orange">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-brand-navy font-anek">{review.user_name}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(s => (
                                  <Star 
                                    key={s} 
                                    size={10} 
                                    className={s <= review.rating ? "fill-brand-orange text-brand-orange" : "text-brand-navy/10"} 
                                  />
                                ))}
                              </div>
                              {review.is_verified && (
                                <span className="flex items-center gap-1 text-[9px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-full font-noto">
                                  <CheckCircle2 size={10} /> ভেরিফাইড
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-brand-navy/20 uppercase font-sans">
                          {new Date(review.created_at).toLocaleDateString('bn-BD')}
                        </span>
                      </div>
                      <p className="text-sm text-brand-navy/70 leading-relaxed italic font-medium font-noto">
                         "{review.comment}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pagination Ritual */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-12">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => paginate(currentPage - 1)}
                      className="p-3 rounded-2xl border border-brand-cream text-brand-navy disabled:opacity-20 hover:bg-brand-navy hover:text-white transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          onClick={() => paginate(num)}
                          className={`w-12 h-12 rounded-2xl text-xs font-black transition-all ${currentPage === num ? 'bg-brand-navy text-white shadow-lg' : 'bg-brand-cream/30 text-brand-navy hover:bg-brand-cream'}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => paginate(currentPage + 1)}
                      className="p-3 rounded-2xl border border-brand-cream text-brand-navy disabled:opacity-20 hover:bg-brand-navy hover:text-white transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-24 text-center space-y-6 bg-brand-cream/5 rounded-[3rem] border-2 border-dashed border-brand-cream font-noto">
                <MessageSquare size={48} className="mx-auto text-brand-cream" />
                <div className="space-y-2">
                   <p className="text-sm font-bold text-brand-navy/40 uppercase tracking-widest">এখনও কোনো রিভিউ নেই</p>
                   <p className="text-xs text-brand-navy/20">এই রিচুয়ালটি প্রথম শুরু করুন।</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
