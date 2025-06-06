import { ChangeEvent, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useUsers } from "../../../hooks/useUsers";
import BackToDashboard from "../../../shared/redirect/BackToDashboard";
import { ProfileImageUploader } from "./component/ProfileImageUploader";
import { ProfileInfo } from "./component/ProfileInfo";
import { ProfileActions } from "./component/ProfileActions";
import { Loader } from "../../../shared/loader/Loader";
import { ProfileSettingsPanel } from "./component/ProfileSettingsPanel";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const { user, setUser } = useAuth();
  const { handleUpdateUsername, handleUpdateProfileImage } = useUsers();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const { t } = useTranslation('profile')

  if (!user) {
    return <Loader />
  }

  if (!editing && name !== user.name) {
    setName(user.name);
  }

  const handleSave = async () => {
    await handleUpdateUsername(name);
    setEditing(false);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const formData = new FormData();
      formData.append("profile_image", file);
      await handleUpdateProfileImage(formData);
    }
  };

  return (
    <>
      <BackToDashboard />
      <div className="max-w-4xl mx-auto p-6 bg-[var(--background-secondary-color)] rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <ProfileImageUploader
            profileImage={user.profile_image}
            onImageChange={handleImageChange}
          />

          <div>
            <ProfileInfo
              editing={editing}
              name={name}
              user={user}
              onNameChange={setName}
            />

            <ProfileActions
              editing={editing}
              onSave={handleSave}
              onCancel={() => {
                setName(user.name);
                setEditing(false);
              }}
              onEdit={() => setEditing(true)}
            />
          </div>
        </div>
      </div>

      <ProfileSettingsPanel user={user} />
    </>
  );
};
