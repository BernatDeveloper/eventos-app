import { useStats } from '../../../hooks/useAdminStats';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Loader } from '../../../shared/loader/Loader';

Chart.register(ArcElement, Tooltip, Legend);

const chartColors = [
    '#f7b267',
    '#f79d65',
    '#f4845f',
    '#f27059',
];

export function AdminDashboard() {
    const { stats, loading, error } = useStats();

    if (loading) return <Loader />;
    if (error) return <p className="error-message">Error al cargar: {error.message}</p>;
    if (!stats) return null;

    const data = {
        labels: ['Usuarios', 'Eventos', 'Invitaciones', 'Categorías'],
        datasets: [
            {
                data: [
                    stats.users,
                    stats.events,
                    stats.invitations,
                    stats.categories,
                ],
                backgroundColor: chartColors,
                borderWidth: 3,
            },
        ],
    };

    const statCards = [
        { label: 'Usuarios', value: stats.users, color: '#f7b267' },
        { label: 'Eventos', value: stats.events, color: '#f79d65' },
        { label: 'Invitaciones', value: stats.invitations, color: '#f4845f' },
        { label: 'Categorías', value: stats.categories, color: '#f27059' },
    ];


    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className=" md:w-1/2 bg-[var(--background-secondary-color)] shadow-md rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Resumen de actividad
                </h2>
                <Doughnut data={data} />
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statCards.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-[var(--background-secondary-color)] shadow-sm rounded-[var(--border-radius-medium)] p-4 border-l-4"
                        style={{ borderColor: stat.color }}
                    >
                        <h3 className=" text-[var(--text-secondary-color)] ">{stat.label}</h3>
                        <p className="text-3xl font-bold text-[var(--text-primary-color)]">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}
