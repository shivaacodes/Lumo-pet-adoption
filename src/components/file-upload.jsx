"use client";

import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function FileUpload({ onFileSelect, register }) {
  const [fileError, setFileError] = useState('');

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setFileError('Invalid file type. Only JPEG, PNG and WebP are allowed');
      return false;
    }

    if (file.size > maxSize) {
      setFileError('File size too large. Maximum size is 5MB');
      return false;
    }

    setFileError('');
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect?.(file);
    }
  };

  return (
    <div>
      <Label className="text-xl">Pet Image</Label>
      <Input
        type="file"
        className="text-lg p-2 rounded-xl"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        {...register}
      />
      {fileError && (
        <p className="text-red-500 text-sm mt-1">{fileError}</p>
      )}
    </div>
  );
} 