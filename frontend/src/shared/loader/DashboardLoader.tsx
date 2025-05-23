import { DashboardEventsLoader } from "./DashboardEventsLoader";

export const DashboardLoader = () => {
  return (
    <div className="p-8 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-6 bg-gray-300 rounded w-1/3" />
        <div className="h-6 w-6 bg-gray-300 rounded" />
      </div>

      <DashboardEventsLoader />
    </div>
  );
};
