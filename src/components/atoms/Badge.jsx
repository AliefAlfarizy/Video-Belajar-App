
function Badge({ children, variant = "primary" }) {
  const baseStyle = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold select-none leading-none";
  
  const variants = {
    primary: "bg-amber-100 text-secondary",
    secondary: "bg-gray-100 text-gray-800",
    price: "bg-emerald-100 text-primary font-bold text-sm",
    new: "bg-blue-50 text-blue-700",
    rating: "bg-amber-50 text-amber-700 font-bold gap-1"
  };


  return (
    <span className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </span>
  );
}



export default Badge;
