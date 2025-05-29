import React, { useEffect, useState } from "react";
import { User, InviteUserModalProps } from "../../types/user";
import { useInvitations } from "../../hooks/useInvitations";
import { useUsers } from "../../hooks/useUsers";
import { CloseModal } from "./CloseModal";

export const InviteUserModal: React.FC<InviteUserModalProps> = ({
    isOpen,
    eventId,
    onClose,
}) => {
    const [query, setQuery] = useState("");
    const [foundUsers, setFoundUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [invitingUserId, setInvitingUserId] = useState<string | null>(null);

    const { handleSendInvitation } = useInvitations();
    const { searchUsers } = useUsers();

    const handleSearch = async () => {
        setLoading(true);
        setError("");

        try {
            const results = await searchUsers(query, eventId);
            if (results.length > 0) {
                setFoundUsers(results);
            } else {
                setFoundUsers([]);
                setError("No users found.");
            }
        } catch {
            setError("An error occurred while searching.");
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async (userId: string) => {
        try {
            setInvitingUserId(userId);
            const response = await handleSendInvitation(eventId, userId);
            if (response) onClose()
        } catch {
            setError("Failed to invite user.");
        } finally {
            setInvitingUserId(null);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setQuery("");
            setFoundUsers([]);
            setError("");
            setLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[var(--background-secondary-color)] p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Invite User</h2>
                    <CloseModal onClose={onClose} />
                </div>

                <input
                    type="text"
                    placeholder="Search by name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="custom-input mb-[var(--spacing-sm)]"
                />
                <button
                    onClick={handleSearch}
                    className="custom-button primary-button w-full"
                    disabled={loading}
                >
                    {loading ? "Searching..." : "Search"}
                </button>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                {foundUsers.length > 0 && (
                    <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                        {foundUsers.map((user) => (
                            <div
                                key={user.id}
                                className="custom-card flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => handleInvite(user.id)}
                                    disabled={invitingUserId === user.id}
                                    className="custom-button accept-button"
                                >
                                    {invitingUserId === user.id ? "Inviting..." : "Invite"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
