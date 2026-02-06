
export default function AuthLayout  ({ title, subtitle, children })  {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <section
        className="
          bg-white w-full max-w-md rounded-xl shadow-lg
          border border-gray-200
          p-6 sm:p-8 md:p-10
        "
      >
        <div className="text-center mb-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-800">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {subtitle}
          </p>
        </div>

        {children}
      </section>
    </div>
  );
};
