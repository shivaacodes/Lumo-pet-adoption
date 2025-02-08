export const Spinner = ({ size = "md" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`animate-spin border-t-2 border-b-2 border-blue-600 border-solid rounded-full ${sizes[size]}`}
    />
  );
};
