import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ userData }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        domain: '',
        available: true
    });

    useEffect(() => {
        if (userData) {
            setFormData(userData);
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : (name === 'available' ? (value === 'Yes') : value)
        });
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userData) {
                await axios.put(`https://user-management-app-flame.vercel.app/api/users/${userData._id}`, formData);
                console.log('User updated successfully');
                navigate('/');
            } else {
                await axios.post(`https://user-management-app-flame.vercel.app/api/users`, formData);
                console.log('User created successfully');
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="container mx-auto px-4 py-8 lg:px-6">
                <h2 className="text-2xl font-bold text-center mb-4">Create New User</h2>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-gray-700">First Name</label>
                        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-gray-700">Last Name</label>
                        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-gray-700">Gender</label>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Polygender">Polygender</option>
                            <option value="Agender">Agender</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="domain" className="block text-gray-700">Domain</label>
                        <input type="text" id="domain" name="domain" value={formData.domain} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="available_yes" className="inline-flex items-center cursor-pointer">
                            <input type="radio" id="available_yes" name="available" value="Yes" checked={formData.available === true} onChange={handleChange} className="mr-2" />
                            <span className="text-gray-700">Yes</span>
                        </label>
                        <label htmlFor="available_no" className="inline-flex items-center cursor-pointer">
                            <input type="radio" id="available_no" name="available" value="No" checked={formData.available === false} onChange={handleChange} className="mx-2" />
                            <span className="text-gray-700">No</span>
                        </label>
                    </div>
                    <button type="submit" className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">{userData ? 'Update User' : 'Create User'}</button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;