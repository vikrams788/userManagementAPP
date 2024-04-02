import { useState, useEffect } from 'react';
import axios from 'axios';

const TeamInfo = ({ team }) => {
    const [membersDetails, setMembersDetails] = useState([]);

    useEffect(() => {
        const fetchMembersDetails = async () => {
            try {
                const promises = team.members.map(memberId =>
                    axios.get(`https://usermanagementapp-qz6g.onrender.com/api/users/${memberId}`)
                );
                const responses = await Promise.all(promises);
                const membersData = responses.map(response => response.data);
                setMembersDetails(membersData);
            } catch (error) {
                console.error('Error fetching members details:', error);
            }
        };

        fetchMembersDetails();
    }, [team.members]);

    return (
        <div className="container py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">{team.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                {membersDetails.map(member => (
                    <div key={member._id} className="bg-blue-50 rounded-lg shadow-md p-6">
                        <img src={member.avatar} alt={`${member.first_name} ${member.last_name}`} className="w-20 h-20 rounded-full mx-auto mb-4" />
                        <div className="text-xl font-bold mb-2 text-blue-900">{member.first_name} {member.last_name}</div>
                        <div className="text-gray-700 overflow-hidden overflow-ellipsis">Email: {member.email}</div>
                        <div className="text-gray-700">Gender: {member.gender}</div>
                        <div className="text-gray-700">Domain: {member.domain}</div>
                        <div className="text-gray-700">Available: {member.available ? 'Yes' : 'No'}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamInfo;