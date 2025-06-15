import { useState } from "react";
import { activePremiumPlan, getPremiumPlanStatus } from '../services/premiumPlanService';
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

interface PremiumStatus {
  is_premium: boolean;
  expired_at: string | null;
  can_retry: boolean;
  retry_available_at: string | null;
}

export const usePremiumPlan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [premiumStatus, setPremiumStatus] = useState<PremiumStatus | null>(null);
  const { user, setUser } = useAuth()

  const activePremium = async (): Promise<string | null> => {
    try {
      setLoading(true);
      const response = await activePremiumPlan();
      toast.success(response.message);
      if (user && setUser) {
        setUser({ ...user, user_type: "premium" });
      }
      return response.message;
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchPremiumStatus = async (): Promise<void> => {
    try {
      setLoading(true);
      const status = await getPremiumPlanStatus();
      setPremiumStatus(status);
    } catch (error: any) {
      setError(error.message || "Error fetching premium status");
      toast.error(error.message || "Error fetching premium status");
    } finally {
      setLoading(false);
    }
  };

  return {
    activePremium,
    fetchPremiumStatus,
    premiumStatus,
    loading,
    error,
  };
};
