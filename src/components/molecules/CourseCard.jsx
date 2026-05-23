function CourseCard({ course }) {
  const {
    image,
    title,
    description,
    mentor,
    jobTitle,
    rating,
    price
  } = course;

  // Extract rating and fill percentage
  const numericRating = parseFloat(String(rating).match(/^\d+(\.\d+)?/)?.[0] || '0');
  const ratingCount = String(rating).match(/\(([^)]+)\)/)?.[1] || '';
  const ratingFill = Math.min(Math.max(numericRating / 5, 0), 1) * 100;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-row items-start gap-3 sm:flex-col sm:items-start sm:gap-4 mb-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 shadow-sm shrink-0 sm:w-full sm:h-48">
            <img
              src={image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'}
              alt={title || 'Course'}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 leading-snug mb-2">
              {title}
            </h3>
            <div className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(mentor || 'mentor')}&backgroundColor=ffdfbf`}
                alt={`${mentor} avatar`}
                className="w-9 h-9 rounded-full bg-gray-50 object-cover border border-gray-100 shadow-inner"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate leading-snug">{mentor}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{jobTitle || 'Professional Mentor'}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="hidden sm:block text-xs sm:text-sm text-gray-500 leading-relaxed mb-5">
          {description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <div className="relative inline-block text-gray-200 text-xs">
              <div className="flex">★★★★★</div>
              <div
                className="absolute top-0 left-0 overflow-hidden text-amber-400"
                style={{ width: `${ratingFill}%` }}
              >
                <div className="flex">★★★★★</div>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-700 mt-0.5 ml-1">{numericRating}</span>
            {ratingCount && <span className="text-[10px] text-gray-400 mt-0.5">({ratingCount})</span>}
          </div>

          <span className="text-sm font-bold text-primary whitespace-nowrap">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
