import User from "../models/user.model.js"
export const getUsersForSidebar = async (req, res) => {

    try {
        const loggedInUserId = req.user._id//first find logged In user by middleware that is protect route

        //now find all user that are not equal to curent loggedIn user

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        //all users except current user but deselect passwords

        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}