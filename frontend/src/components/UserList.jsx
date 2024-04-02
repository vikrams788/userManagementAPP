import { useState } from 'react';
import { RiEdit2Line, RiDeleteBin2Line, RiCloseLine } from 'react-icons/ri';
import axios from 'axios';
import CreateUser from './CreateUser';
import CreateTeam from './CreateTeam';
import TeamInfo from './TeamInfo';

const UserList = ({ users, searchTerm, domainFilters, genderFilters, availabilityFilters, setSearchTerm, setDomainFilters, setGenderFilters, setAvailabilityFilters }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [showCreateTeam, setShowCreateTeam] = useState(false);
    const [createdTeam, setCreatedTeam] = useState(null);
    const [showTeamInfo, setShowTeamInfo] = useState(false);

    const filteredUsers = users.filter((user) => {
        const nameMatches = user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || user.last_name.toLowerCase().includes(searchTerm.toLowerCase());
        const domainMatches = domainFilters.length === 0 || domainFilters.includes(user.domain);
        const genderMatches = genderFilters.length === 0 || genderFilters.includes(user.gender);
        const availabilityMatches = availabilityFilters.length === 0 || availabilityFilters.includes(user.available ? true : false);
        return nameMatches && domainMatches && genderMatches && availabilityMatches;
    });

    const handleSearchInputChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        setSearchTerm(localSearchTerm);
    };

    const handleEditUser = async (userId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/${userId}`);
            setSelectedUser(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/${userId}`);
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleCloseCreateUser = () => {
        setSelectedUser(null);
    };

    const handleUserSelect = (userId) => {
        const selectedUser = users.find(user => user._id === userId);
    
        if (!selectedUser.available) {
            console.log("User's availability is set to false. Cannot select.");
            return;
        }
    
        const hasSameDomainSelected = selectedUsers.some(id => users.find(user => user._id === id).domain === selectedUser.domain);
        if (hasSameDomainSelected) {
            console.log("Another user with the same domain is already selected. Cannot select.");
            return;
        }
    
        if (!selectedUsers.includes(userId)) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        }
    };    

    const handleShowCheckboxes = () => {
        setShowCheckboxes(true);
    }

    const handleOpenCreateTeam = () => {
        const selectedUsersForTeam = users.filter(user => 
            selectedUsers.includes(user._id) &&
            !selectedUsers.some(id => id !== user._id && users.find(u => u._id === id).domain === user.domain) &&
            user.available
        );

        setShowCreateTeam(true);
        setSelectedUsers(selectedUsersForTeam.map(user => user._id));
    };

    const handleCloseCreateTeam = () => {
        setShowCreateTeam(false);
    };

    const handleTeamCreationSuccess = (teamData) => {
        setCreatedTeam(teamData);
        setShowCreateTeam(false);
        setShowTeamInfo(true);
    };

    const handleCloseTeamInfo = () => {
        setShowTeamInfo(false);
        setShowCheckboxes(false);
    };

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={localSearchTerm}
                    onChange={handleSearchInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Search
                </button>
            </div>

            <div className="flex justify-center gap-4 mb-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Filter by Domain</h3>
                    {['Marketing', 'IT', 'Sales', 'Management', 'UI Designing', 'Finance', 'Business Development'].map((domain) => (
                        <label key={domain} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value={domain}
                                checked={domainFilters.includes(domain)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setDomainFilters((prevFilters) => [...prevFilters, domain]);
                                    } else {
                                        setDomainFilters((prevFilters) => prevFilters.filter((filter) => filter !== domain));
                                    }
                                }}
                                className="mx-2"
                            />
                            {domain}
                        </label>
                    ))}
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Filter by Gender</h3>
                    {['Male', 'Female', 'Polygender', 'Agender'].map((gender) => (
                        <label key={gender} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value={gender}
                                checked={genderFilters.includes(gender)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setGenderFilters((prevFilters) => [...prevFilters, gender]);
                                    } else {
                                        setGenderFilters((prevFilters) => prevFilters.filter((filter) => filter !== gender));
                                    }
                                }}
                                className="mx-2"
                            />
                            {gender}
                        </label>
                    ))}
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Filter by Availability</h3>
                    {['Yes', 'No'].map((availability) => (
                        <label key={availability} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value={availability === 'Yes' ? true : false}
                                checked={availabilityFilters.includes(availability === 'Yes' ? true : false)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setAvailabilityFilters((prevFilters) => [...prevFilters, availability === 'Yes' ? true : false]);
                                    } else {
                                        setAvailabilityFilters((prevFilters) => prevFilters.filter((filter) => filter !== (availability === 'Yes' ? true : false)));
                                    }
                                }}
                                className="mx-2"
                            />
                            {availability}
                        </label>
                    ))}
                </div>
            </div>

            {showCheckboxes ? (
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        onClick={() => setShowCheckboxes(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        onClick={() => {
                            handleOpenCreateTeam();
                        }}
                    >
                        Add Members
                    </button>
                    <p className='px-4 py-2 text-red-500'>*Make sure to set the availability filter to Yes</p>
                </div>
            ) : (
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        className=" px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 my-4 text-center"
                        onClick={handleShowCheckboxes}
                    >
                        Create Team
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-blue-50 rounded-lg shadow-md p-6 relative">
                        <RiEdit2Line 
                            className="absolute top-2 w-5 h-5 right-2 text-blue-500 hover:text-blue-700 cursor-pointer" 
                            onClick={() => handleEditUser(user._id)}
                        />
                        <RiDeleteBin2Line 
                            className="absolute top-2 w-5 h-5 right-10 text-red-500 hover:text-blue-700 cursor-pointer" 
                            onClick={() => handleDeleteUser(user._id)}
                        />
                        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-20 h-20 rounded-full mx-auto mb-4" />
                        <div className="text-xl font-bold mb-2 text-blue-900">{user.first_name} {user.last_name}</div>
                        <div className="text-gray-700">Email: {user.email}</div>
                        <div className="text-gray-700">Gender: {user.gender}</div>
                        <div className="text-gray-700">Domain: {user.domain}</div>
                        <div className="text-gray-700">Available: {user.available ? 'Yes' : 'No'}</div>
                        {showCheckboxes === true && (
                            <input
                                type="checkbox"
                                onChange={() => handleUserSelect(user._id)}
                                checked={selectedUsers.includes(user._id)}
                            />
                        )}
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div className="fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex justify-end">
                        <button onClick={handleCloseCreateUser} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                            <RiCloseLine size={24} className='hover:bg-red-500 hover:text-white rounded' />
                        </button>
                    </div>
                    <CreateUser userData={selectedUser} />
                </div>
            )}
            {showCreateTeam === true && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex justify-end">
                        <button onClick={handleCloseCreateTeam} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                            <RiCloseLine size={24} className='hover:bg-red-500 hover:text-white rounded' />
                        </button>
                    </div>
                    <CreateTeam selectedUsers={selectedUsers} onSuccess={handleTeamCreationSuccess} />
                </div>
            )}
            {showTeamInfo && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full" style={{ minWidth: '650px' }}>
                    <div className="flex justify-end">
                        <button onClick={handleCloseTeamInfo} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                            <RiCloseLine size={24} className='hover:bg-red-500 hover:text-white rounded' />
                        </button>
                    </div>
                    <TeamInfo team={createdTeam} />
                </div>
            )}
        </div>
    );
};

export default UserList;