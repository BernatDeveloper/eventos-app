export const EventParticipantLoader = () => {
  return (
    <ul className="space-y-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          className="bg-gray-200 rounded-xl p-4 flex items-center gap-4 border border-gray-300"
        >
          <div className="w-[60px] h-[60px] rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/3 h-3 bg-gray-300 rounded"></div>
          </div>
        </li>
      ))}
    </ul>
  );
}
