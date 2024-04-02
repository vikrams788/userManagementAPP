const User = require('../models/User');
const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
    const selectedUserIds = req.body.selectedUserIds;

    try {
        const selectedUsers = await User.find({ _id: { $in: selectedUserIds } });

        const domainsSet = new Set();
        for (const user of selectedUsers) {
            if (!user.available || domainsSet.has(user.domain)) {
                return res.status(400).json({ message: 'Selected users must have unique domains and availability set to Yes' });
            }
            domainsSet.add(user.domain);
        }

        const newTeam = new Team({
            name: req.body.teamName,
            members: selectedUsers.map(user => user._id)
        });

        const savedTeam = await newTeam.save();

        res.status(201).json(savedTeam);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getTeamById = async (req, res) => {
    const teamId = req.params.id;

    try {
        const team = await Team.findById(teamId).populate('members');

        if (!team) {
        return res.status(404).json({ message: 'Team not found' });
        }

        res.json(team);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};