export const Icon = ({ children, className }) => {
  return (
    <div className={`w-8 h-8 relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
