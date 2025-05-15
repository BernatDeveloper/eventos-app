import { DashboardEventsLoader } from "./DashboardEventsLoader";

export const DashboardLoader = () => {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-6" />

      <div className="h-10 bg-gray-300 rounded w-40 mb-8" />

      <div className="h-5 bg-gray-300 rounded w-1/4 mb-4" />

      <DashboardEventsLoader />
    </div>
  );
};
