import logoImage from '../../assets/images/Logo-videobelajar.png';

function AuthCard({ children, title, subtitle }) {
  return (
    <div className="bg-white/95 w-full max-w-[460px] p-6 sm:p-10 rounded-3xl border border-emerald-100 shadow-[0_18px_60px_rgb(16,185,129,0.08)] flex flex-col">
      {/* Brand logo container */}
      <div className="flex justify-center mb-8">
        <img src={logoImage} alt="VideoBelajar Logo" className="h-9 object-contain select-none" />
      </div>

      {/* Title section */}
      <div className="text-center mb-7">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-2">
          {title}
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          {subtitle}
        </p>
      </div>

      {/* Form and items container */}
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}

export default AuthCard;
