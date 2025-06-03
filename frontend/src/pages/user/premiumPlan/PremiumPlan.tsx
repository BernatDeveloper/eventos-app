import React, { useEffect, useState } from "react";
import { usePremiumPlan } from "../../../hooks/usePremiumPlan";
import { Loader } from "../../../shared/loader/Loader";
import { CountdownTimer } from "../../../shared/countdowunTimer/CountDownTimer";
import { FaRegClock, FaStar } from "react-icons/fa";

function formatDuration(ms: number) {
  if (ms <= 0) return "00:00:00";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${days > 0 ? days + "d " : ""}${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export const PremiumPlan = () => {
  const { activePremium, fetchPremiumStatus, premiumStatus, loading, error } = usePremiumPlan();

  const [countdown, setCountdown] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState<string | null>(null);

  useEffect(() => {
    fetchPremiumStatus();
  }, []);

  useEffect(() => {
    if (!premiumStatus) return;

    const interval = setInterval(() => {
      const now = Date.now();

      if (premiumStatus.expired_at) {
        const expiredAt = new Date(premiumStatus.expired_at).getTime();
        const diff = expiredAt - now;
        setCountdown(diff > 0 ? formatDuration(diff) : null);
      }

      if (premiumStatus.retry_available_at) {
        const retryAt = new Date(premiumStatus.retry_available_at).getTime();
        const diffRetry = retryAt - now;
        setRetryCountdown(diffRetry > 0 ? formatDuration(diffRetry) : null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [premiumStatus]);

  const handleActivate = async () => {
    await activePremium();
    await fetchPremiumStatus();
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-[var(--background-secondary-color)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-medium)] border border-[var(--border-color)]">
      <div className="flex flex-col items-center text-center">
        {/* Icono con círculo bordeado */}
        <div className="mb-4 w-20 h-20 flex items-center justify-center rounded-full border-4 border-[var(--primary-color)]">
          {premiumStatus?.is_premium ? (
            <FaStar className="text-[var(--primary-color)] text-3xl" />
          ) : (
            <FaRegClock className="text-[var(--primary-color)] text-3xl" />
          )}
        </div>

        <h2 className="text-3xl font-bold mb-4 text-[var(--primary-color)]">
          Activar Plan Premium
        </h2>

        {premiumStatus?.is_premium ? (
          <div className="flex flex-col gap-2 text-lg font-medium text-[var(--text-primary-color)]">
            <span>Tu plan premium está activo.</span>
            {premiumStatus.expired_at && (
              <CountdownTimer endTime={premiumStatus.expired_at} label="Expira en:" />
            )}
          </div>
        ) : (
          <>
            <button
              onClick={handleActivate}
              disabled={loading || premiumStatus?.is_premium}
              className="custom-button primary-button w-full mt-2"
            >
              {loading ? <Loader /> : "Activar ahora (Prueba 2 días)"}
            </button>

            {retryCountdown && (
              <p className="mt-4 font-medium text-[var(--primary-color)]">
                No puedes activar la prueba aún. Intenta de nuevo en: {retryCountdown}
              </p>
            )}
          </>
        )}

        {error && (
          <p
            className="mt-4 text-center font-semibold text-[var(--reject-color)]"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );

};
