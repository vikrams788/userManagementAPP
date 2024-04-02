import { useState, useEffect } from 'react';
import UserList from './UserList';
import Pagination from './Pagination';
import axios from 'axios';
import CreateUser from './CreateUser';
import { RiCloseLine } from 'react-icons/ri';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [domainFilters, setDomainFilters] = useState([]);
    const [genderFilters, setGenderFilters] = useState([]);
    const [availabilityFilters, setAvailabilityFilters] = useState([]);
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://usermanagementapp-qz6g.onrender.com/api/users', {
                    params: {
                        page: currentPage + 1,
                        searchTerm: searchTerm,
                        domainFilters: domainFilters,
                        genderFilters: genderFilters,
                        availabilityFilters: availabilityFilters
                    }
                });
                const data = response.data;
                setUsers(data.users);
                setPageCount(data.totalPages);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [currentPage, searchTerm, domainFilters, genderFilters, availabilityFilters]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleCreateUser = () => {
        setIsCreateUserOpen(true);
    };

    const handleCloseCreateUser = () => {
        setIsCreateUserOpen(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 lg:px-6">
            <div className="mx-auto max-w-full">
                <div className="flex justify-between mb-4">
                    <button onClick={handleCreateUser} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Create New User
                    </button>
                </div>
                <UserList
                    users={users}
                    searchTerm={searchTerm}
                    domainFilters={domainFilters}
                    genderFilters={genderFilters}
                    availabilityFilters={availabilityFilters}
                    setSearchTerm={setSearchTerm}
                    setDomainFilters={setDomainFilters}
                    setGenderFilters={setGenderFilters}
                    setAvailabilityFilters={setAvailabilityFilters}
                />
                <div className="flex justify-center mt-8">
                    <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
                </div>
                {isCreateUserOpen && (
                    <div className="fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-end">
                            <button onClick={handleCloseCreateUser} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                                <RiCloseLine size={24} className='hover:bg-red-500 hover:text-white rounded' />
                            </button>
                        </div>
                        <CreateUser />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
