import { useState } from 'react';
import axios from 'axios';

const CreateTeam = ({ onSuccess, selectedUsers }) => {

    const [teamName, setTeamName] = useState('');

    const handleCreateTeam = async () => {
        try {
            const response = await axios.post(`https://user-management-app-flame.vercel.app/api/team`, {
                teamName,
                selectedUserIds: selectedUsers
            });
            console.log('Team created successfully');
            onSuccess(response.data);
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Create New Team</h2>
            <div className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="teamName" className="block text-gray-700">Team Name</label>
                    <input type="text" id="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                </div>
                <button onClick={handleCreateTeam} className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Create Team</button>
            </div>
        </div>
    );
};

export default CreateTeam;
