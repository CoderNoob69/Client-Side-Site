import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

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

interface TeamCardProps {
  member: TeamMember;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, onEdit, onDelete }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if (!member.linkedin) return;
    
    if ((e.target as HTMLElement).closest('.action-buttons')) {
      return;
    }
    window.open(member.linkedin, '_blank');
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`relative bg-gray-800/50 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 ${member.linkedin ? 'cursor-pointer' : 'cursor-default'} group overflow-hidden`}
    >
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500 transition-all duration-300 rounded-xl" />
      
      <div className="relative">
        <img
          src={member.image}
          alt={member.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-yellow-500"
        />
        <div className="absolute top-0 right-0 flex gap-2 action-buttons opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(member.id)}
            className="p-2 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors shadow-lg"
            title="Edit Profile"
          >
            <FiEdit2 className="w-5 h-5 text-gray-900" />
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="p-2 bg-red-500 rounded-full hover:bg-red-400 transition-colors shadow-lg"
            title="Delete Profile"
          >
            <FiTrash2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <h3 className={`text-xl font-semibold text-yellow-500 mb-2 ${member.linkedin ? 'hover:text-yellow-400' : ''} text-center`}>
        {member.name}
      </h3>
      
      <div className="text-center space-y-2">
        <p className="text-gray-300 font-medium">{member.designation}</p>
        <p className="text-gray-300 font-medium">{member.domain}</p>
        <p className="text-gray-400">{member.branch}</p>
        <p className="text-gray-400">Batch of {member.year}</p>
      </div>
    </div>
  );
};

export default TeamCard;
