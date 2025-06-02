import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: string | Date;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

function formatDuration(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${days > 0 ? days + "d " : ""}${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endTime,
  label,
  className,
  style
}) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const end = typeof endTime === "string" ? new Date(endTime).getTime() : endTime.getTime();

    const update = () => {
      const now = Date.now();
      const diff = end - now;
      setTimeLeft(diff > 0 ? formatDuration(diff) : "00:00:00");
    };

    update(); // Inicial
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className={`countdown-timer ${className ?? ""}`} style={style}>
      {label && <span className="block text-sm text-gray-500">{label}</span>}
      <span className="text-xl font-mono font-semibold tracking-widest text-[var(--primary-color)]">
        {timeLeft}
      </span>
    </div>
  );
};
