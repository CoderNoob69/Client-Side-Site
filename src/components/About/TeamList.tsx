import React from 'react';
import TeamCard from './TeamCard';

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

interface TeamListProps {
  members: TeamMember[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({ members, onEdit, onDelete }) => {
  // Sort members based on designation priority
  const sortedMembers = [...members].sort((a, b) => {
    const getPriority = (designation: string) => {
      if (designation.toLowerCase().includes('president')) return 0;
      if (designation.toLowerCase().includes('head coordinator')) return 1;
      if (designation.toLowerCase().includes('core coordinator')) return 2;
      return 3; // Default priority for other designations
    };

    return getPriority(a.designation) - getPriority(b.designation);
  });

  const president = sortedMembers.filter(member => 
    member.designation === 'President'
  );

  const headCoordinators = sortedMembers.filter(member => 
    member.designation === 'Head Coordinator'
  );

  const coreCoordinators = sortedMembers.filter(member => 
    member.designation === 'Core Coordinator'
  );

  const executiveBody = sortedMembers.filter(member => 
    member.designation === 'Executive'
  );

  const regularMembers = sortedMembers.filter(member => 
    member.designation === 'Member'
  );

  const renderSubSection = (title: string, members: TeamMember[]) => (
    <div className="mb-8">
      <h3 className="text-4xl font-bold text-yellow-500 mb-6 text-center">{title}</h3>
      <div className="flex flex-wrap justify-center gap-8">
        {members.map((member) => (
          <div key={member.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]">
            <TeamCard
              member={member}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderSection = (title: string, members: TeamMember[]) => (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-yellow-500 mb-8 text-center">{title}</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {members.map((member) => (
          <div key={member.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]">
            <TeamCard
              member={member}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h2 className="text-5xl font-bold text-yellow-500 mb-8 text-center">Steering Body</h2>
        <div className="space-y-8">
          {president.length > 0 && renderSubSection('President', president)}
          {headCoordinators.length > 0 && renderSubSection('Head Coordinators', headCoordinators)}
          {coreCoordinators.length > 0 && renderSubSection('Core Coordinators', coreCoordinators)}
        </div>
      </div>
      {executiveBody.length > 0 && renderSection('Executive Body', executiveBody)}
      {regularMembers.length > 0 && renderSection('Members', regularMembers)}
    </div>
  );
};

export default TeamList;
