import { FC, useEffect, useState } from "react";
import { ProfileImageProps } from "../../types/user";

const DEFAULT_AVATAR = "/images/default-avatar.avif";

export const ProfileImage: FC<ProfileImageProps> = ({ profileImage, size }) => {
  const [showModal, setShowModal] = useState(false);
  // True when the user's image could not be loaded (deleted, blocked, offline...)
  const [hasError, setHasError] = useState(false);
  const API_BASE_URL = (import.meta.env.VITE_BASE_URL ?? "").replace(/\/+$/, "");
  const imageUrl = profileImage && !hasError ? `${API_BASE_URL}/storage/${profileImage}` : DEFAULT_AVATAR;
  const imageSize = `${size}px`;

  // Try again when the user uploads a new image
  useEffect(() => {
    setHasError(false);
  }, [profileImage]);

  return (
    <>
      <img
        src={imageUrl}
        alt="Avatar"
        style={{ width: imageSize, height: imageSize }}
        className="rounded-full object-cover border border-[var(--border-color)] cursor-pointer"
        onClick={() => setShowModal(true)}
        onError={() => setHasError(true)}
      />

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="rounded-lg max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt="Avatar grande"
              style={{ width: "400px", height: "400px" }}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};
