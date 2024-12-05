'use client';

import { useAction } from 'next-safe-action/hooks';
import { uploadAvatarAction } from '@dashboard/profile/actions';
import { useState } from 'react';

function UploadAvatar({ image }: { image?: string | null }) {
  const [previewImage, setPreviewImage] = useState<string | null>(image || null);
  const { executeAsync, status } = useAction(uploadAvatarAction);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      await executeAsync({ image: file });
    }
  };

  return (
    <div className="flex items-start gap-4">
      {previewImage && (
        <img src={previewImage} alt="avatar" className="mb-4 h-20 w-20 rounded-full border-2" />
      )}
      <div>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-1 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        />
        {status === 'executing' && <p>Uploading...</p>}
      </div>
    </div>
  );
}

export default UploadAvatar;
