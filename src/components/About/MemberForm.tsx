import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  branch: string;
  year: string;
  image: string;
  linkedin: string;
}

const MemberForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<TeamMember>({
    id: '',
    name: '',
    designation: '',
    branch: '',
    year: '',
    image: '',
    linkedin: ''
  });

  useEffect(() => {
    if (isEditing) {
      // Fetch member data if editing
      // Replace this with actual API call
      const fetchMember = async () => {
        // const member = await api.getMember(id);
        // setFormData(member);
      };
      fetchMember();
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call here to save/update member
    navigate('/about');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-yellow-900/10 to-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
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
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
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
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
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
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
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
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">LinkedIn Profile URL</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              {isEditing ? 'Update Member' : 'Add Member'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/about')}
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

export default MemberForm; 