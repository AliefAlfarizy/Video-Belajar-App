function Typography({ 
  as: Component = 'p', 
  variant = 'body', 
  children, 
  className = '' 
}) {
  const styles = {
    h1: "font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight",
    h2: "font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900",
    h3: "font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold text-gray-900",
    subtitle: "font-[family-name:var(--font-sans)] text-lg font-medium text-gray-600",
    body: "font-[family-name:var(--font-sans)] text-sm sm:text-base text-gray-600 leading-relaxed",
    caption: "font-[family-name:var(--font-sans)] text-xs font-medium text-gray-400",
  };

  return (
    <Component className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
}

export default Typography;
