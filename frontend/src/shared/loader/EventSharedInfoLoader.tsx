export const EventSharedInfoLoader = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-3/5 bg-gray-300 rounded"></div>
      <div className="h-6 w-4/5 bg-gray-200 rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 p-6 rounded-2xl h-32 space-y-4">
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}

        <div className="md:col-span-2 bg-gray-100 p-6 rounded-2xl space-y-4">
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-300 rounded" />
          <div className="h-8 w-32 bg-gray-400 rounded" />
        </div>
      </div>
    </div>
  );
};
