import { useEffect, useState } from 'react';
import { fetchStats, Stats } from '../services/admin/adminStatsService';

export function useStats() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchAdminStats = async () => {
            setLoading(true);
            try {
                const response = await fetchStats();
                setStats(response.stats);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminStats();
    }, []);

    return { stats, loading, error };
}
