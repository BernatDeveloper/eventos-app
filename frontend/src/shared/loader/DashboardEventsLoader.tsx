export const DashboardEventsLoader = () => {
    return (
        <div className="flex flex-wrap justify-center gap-4 animate-pulse">
            {Array.from({ length: 2 }).map((_, i) => (
                <div
                    key={i}
                    className="w-full sm:w-[350px] h-[200px] bg-gray-200 rounded-lg shadow"
                >
                </div>
            ))}
        </div>
    )
}
