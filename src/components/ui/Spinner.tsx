type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className = '' }: SpinnerProps) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600" />
  </div>
);
