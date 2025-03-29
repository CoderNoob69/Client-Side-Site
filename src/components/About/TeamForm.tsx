import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  domain: string;
  branch: string;
  year: string;
  image: string;
  linkedin?: string;
}

interface TeamFormProps {
  onSubmit: (member: Omit<TeamMember, 'id'>) => void;
  initialData?: TeamMember;
  onCancel: () => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    designation: '',
    domain: '',
    branch: '',
    year: '',
    image: '',
    linkedin: '',
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData({
        name: rest.name,
        designation: rest.designation,
        domain: rest.domain,
        branch: rest.branch,
        year: rest.year,
        image: rest.image,
        linkedin: rest.linkedin || '',
      });
      setPreviewImage(rest.image);
    }
  }, [initialData]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      linkedin: formData.linkedin.trim() || undefined,
    };
    onSubmit(submissionData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const removeImage = () => {
    setPreviewImage(null);
    setUploadedFile(null);
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-yellow-500 mb-8 text-center">
          {isEditing ? 'Edit Team Member' : 'Add New Team Member'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Domain</label>
            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Branch</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Profile Image</label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 hover:border-yellow-500'}`}
            >
              <input {...getInputProps()} />
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FiX className="w-5 h-5 text-white" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <FiUpload className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="text-gray-400">
                    {isDragActive
                      ? 'Drop the image here'
                      : 'Drag and drop an image here, or click to select'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, JPEG, PNG, GIF
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">LinkedIn Profile URL</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              {isEditing ? 'Update Profile' : 'Add Profile'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-yellow-500 text-yellow-500 rounded-lg font-semibold hover:bg-yellow-500/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
