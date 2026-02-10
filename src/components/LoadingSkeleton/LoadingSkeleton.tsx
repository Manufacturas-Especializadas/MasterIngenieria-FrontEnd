export const LoadingSkeleton = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen animate-pulse">
      <div className="h-12 w-1/3 bg-slate-200 rounded mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-white rounded-xl border border-slate-200"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 h-100 bg-white rounded-xl border border-slate-200"></div>
        <div className="col-span-1 h-100 bg-white rounded-xl border border-slate-200"></div>
      </div>
    </div>
  );
};
