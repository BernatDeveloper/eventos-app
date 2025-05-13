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
                    className="absolute top-56 right-25 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer shadow-lg"
                    title="Cambiar imagen"
                >
                    ➕
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
