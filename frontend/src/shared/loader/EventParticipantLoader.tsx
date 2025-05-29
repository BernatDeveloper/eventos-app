export const EventParticipantLoader = () => {
  return (
    <ul className="space-y-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          className="bg-[var(--background-secondary-color)] rounded-xl p-4 flex items-center gap-4"
        >
          <div className="w-[60px] h-[60px] rounded-full bg-[var(--background-color)]"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-1/2 h-4 bg-[var(--background-color)] rounded"></div>
            <div className="w-1/3 h-3 bg-[var(--background-color)] rounded"></div>
          </div>
        </li>
      ))}
    </ul>
  );
}
