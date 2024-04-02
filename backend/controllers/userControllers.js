const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const searchTerm = req.query.searchTerm || '';
    const domainFilters = req.query.domainFilters || [];
    const genderFilters = req.query.genderFilters || [];
    const availabilityFilters = req.query.availabilityFilters || [];

    try {
        const filterCriteria = {};
        if (searchTerm) {
            filterCriteria.$or = [
                { first_name: { $regex: searchTerm, $options: 'i' } },
                { last_name: { $regex: searchTerm, $options: 'i' } }
            ];
        }
        if (domainFilters.length > 0) {
            filterCriteria.domain = { $in: domainFilters };
        }
        if (genderFilters.length > 0) {
            filterCriteria.gender = { $in: genderFilters };
        }
        if (availabilityFilters.length > 0) {
            filterCriteria.available = { $in: availabilityFilters };
        }       

        const users = await User.find(filterCriteria)
                                .sort({ id: 1 })
                                .skip(skip)
                                .limit(limit);
        
        const totalCount = await User.countDocuments(filterCriteria);

        const totalPages = Math.ceil(totalCount / limit);

        res.json({
            users,
            totalPages,
            currentPage: page,
            totalCount
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createUser = async (req, res) => {
    const { first_name, last_name, email, gender, domain, available } = req.body;

    try {
        const latestUser = await User.findOne({}, {}, { sort: { 'id': -1 } });

        let id = 1000;

        if (latestUser) {
            id = latestUser.id + 1;
        }

        const newUser = new User({
            id,
            first_name,
            last_name,
            email,
            gender,
            avatar: '',
            domain,
            available
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
        first_name,
        last_name,
        email,
        gender,
        avatar,
        domain,
        available
        }, { new: true });

        if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
        }

        res.json(deletedUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};