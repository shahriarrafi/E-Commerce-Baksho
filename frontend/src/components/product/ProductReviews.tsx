"use client";

import { useState } from "react";
import { Star, Quote, MessageSquare, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductReviewsProps {
   reviews: { author: string, rating: number, comment: string, date: string }[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
   const [currentPage, setCurrentPage] = useState(1);
   const reviewsPerPage = 4;

   const totalPages = Math.ceil(reviews.length / reviewsPerPage);
   const indexOfLastReview = currentPage * reviewsPerPage;
   const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
   const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

   const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
   };

   return (
      <section className="py-10 bg-white border-t border-brand-cream" id="reviews">
         <div className="container mx-auto px-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-brand-navy/30 mb-8 font-serif italic">Ratings & Affirmations</h2>

            {/* Daraz-Style Summary Header */}
            <div className="bg-brand-cream/5 rounded-3xl border border-brand-cream p-6 md:p-8 flex flex-col md:flex-row gap-10 md:items-center">
               {/* 1. Large Score */}
               <div className="flex flex-col items-center gap-2 md:pr-10 md:border-r border-brand-cream">
                  <div className="text-5xl font-black text-brand-navy tracking-tighter">
                     4.8<span className="text-xl text-brand-navy/20 font-light">/5</span>
                  </div>
                  <div className="flex gap-0.5">
                     {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-brand-orange text-brand-orange" />)}
                  </div>
                  <p className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-widest">{reviews.length} Ratings</p>
               </div>

               {/* 2. Star Breakdown */}
               <div className="flex-1 max-sm space-y-2">
                  {[5, 4, 3, 2, 1].map(star => (
                     <div key={star} className="flex items-center gap-4 group">
                        <div className="flex gap-0.5 w-16">
                           {[1, 2, 3, 4, 5].map(s => <Star key={s} size={8} className={s <= star ? "fill-brand-orange text-brand-orange" : "text-brand-navy/10"} />)}
                        </div>
                        <div className="flex-1 h-1 bg-brand-cream rounded-full overflow-hidden">
                           <div className="h-full bg-brand-orange transition-all duration-1000" style={{ width: star === 5 ? '92%' : star === 4 ? '12%' : '2%' }} />
                        </div>
                        <span className="text-[9px] font-bold text-brand-navy/20 w-4">{star === 5 ? '40' : star === 4 ? '2' : '0'}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Simplified Review List */}
            <div className="mt-8 space-y-6">
               {currentReviews.length > 0 ? (
                  <>
                     {currentReviews.map((review, i) => (
                        <div key={i} className="py-6 border-b border-brand-cream last:border-0 group">
                           <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center text-brand-navy/40">
                                    <MessageSquare size={14} />
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-black text-brand-navy uppercase tracking-widest">{review.author}</p>
                                    <div className="flex items-center gap-2">
                                       <div className="flex gap-0.5">
                                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={8} className={s <= review.rating ? "fill-brand-orange text-brand-orange" : "text-brand-navy/10"} />)}
                                       </div>
                                       <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest bg-green-50 px-1.5 py-0.5 rounded">Verified Ritual</span>
                                    </div>
                                 </div>
                              </div>
                              <span className="text-[9px] font-bold text-brand-navy/20 uppercase">{review.date}</span>
                           </div>
                           <p className="text-sm text-brand-navy/70 leading-relaxed pl-11 italic font-medium">"{review.comment}"</p>
                        </div>
                     ))}

                     {/* Pagination Controls */}
                     {totalPages > 1 && (
                        <div className="flex items-center justify-end gap-2 pt-6">
                           <button
                              disabled={currentPage === 1}
                              onClick={() => paginate(currentPage - 1)}
                              className="p-2 rounded-lg border border-brand-cream text-brand-navy disabled:opacity-20 hover:bg-brand-cream/30 transition-all"
                           >
                              <ChevronLeft size={14} />
                           </button>
                           <div className="flex gap-1">
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                 <button
                                    key={num}
                                    onClick={() => paginate(num)}
                                    className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${currentPage === num ? 'bg-brand-navy text-white' : 'hover:bg-brand-cream/50 text-brand-navy'}`}
                                 >
                                    {num}
                                 </button>
                              ))}
                           </div>
                           <button
                              disabled={currentPage === totalPages}
                              onClick={() => paginate(currentPage + 1)}
                              className="p-2 rounded-lg border border-brand-cream text-brand-navy disabled:opacity-20 hover:bg-brand-cream/30 transition-all"
                           >
                              <ChevronRight size={14} />
                           </button>
                        </div>
                     )}
                  </>
               ) : (
                  <div className="py-20 text-center space-y-4 bg-brand-cream/5 rounded-[40px] border border-dashed border-brand-cream">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Quote size={24} className="text-brand-cream" />
                     </div>
                     <p className="text-[10px] font-black text-brand-navy/20 uppercase tracking-widest">No Affirmations Yet</p>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}
