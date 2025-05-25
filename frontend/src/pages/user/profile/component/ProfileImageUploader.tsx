import { MdEdit } from "react-icons/md";
import { ProfileImage } from "../../../../shared/image/ProfileImage";
import { ProfileImageUploaderProps } from "../../../../types/user";

export const ProfileImageUploader = ({ profileImage, onImageChange }: ProfileImageUploaderProps) => {
    const inputId = "profile-image-upload";

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
                <ProfileImage profileImage={profileImage} size={246} />
                <label
                    htmlFor={inputId}
                    className="absolute top-56 right-25 bg-[var(--primary-color)] hover:opacity-90 text-white 
                     rounded-full p-2 cursor-pointer shadow-lg transition"
                    title="Cambiar imagen"
                >
                    <MdEdit className="text-xl" />
                </label>
            </div>
            <input
                id={inputId}
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
            />
        </div>
    );
};
