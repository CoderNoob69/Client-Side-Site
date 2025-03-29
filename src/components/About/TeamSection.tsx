import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import TeamList from './TeamList';
import TeamForm from './TeamForm';

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  domain: string;
  branch: string;
  year: string;
  image: string;
  linkedin: string;
}

const TeamSection: React.FC = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    // Sample data - replace with actual data from your backend
    {
      id: '1',
      name: 'Default Profile',
      designation: 'President',
      domain: 'Web Development',
      branch: 'Computer Science',
      year: '2023',
      image: 'https://via.placeholder.com/150',
      linkedin: 'https://linkedin.com/in/johndoe'
    }
  ]);

  const handleDelete = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const handleEdit = (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      setEditingMember(member);
      setShowForm(true);
    }
  };

  const handleAddProfile = () => {
    setEditingMember(null);
    setShowForm(true);
  };

  const handleFormSubmit = (memberData: Omit<TeamMember, 'id'>) => {
    if (editingMember) {
      // Update existing member
      setTeamMembers(teamMembers.map(member => 
        member.id === editingMember.id 
          ? { ...memberData, id: member.id }
          : member
      ));
    } else {
      // Add new member
      const newMember = {
        ...memberData,
        id: Date.now().toString() // Simple ID generation
      };
      setTeamMembers([...teamMembers, newMember]);
    }
    setShowForm(false);
    setEditingMember(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={handleAddProfile}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add Profile
        </button>
      </div>

      <TeamList
        members={teamMembers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <TeamForm
          onSubmit={handleFormSubmit}
          initialData={editingMember}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default TeamSection;
