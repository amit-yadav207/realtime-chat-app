import User from "../models/user.model.js"
import generateTokenAndSetCookie from "../utils/generateToken.js"
import bcrypt from "bcryptjs"


//signup controller function

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPass, gender } = req.body;

        // Check if passwords match
        if (password !== confirmPass) {
            return res.status(400).json({ error: "Passwords didn't match" });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const hashedPass = bcrypt.hashSync(password, 10);

        // Determine profile picture URL based on gender
        const boyPicUrl = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPicUrl = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const profilePicture = gender === "male" ? boyPicUrl : girlPicUrl;

        // Create a new user object using User schema
        const newUser = new User({
            fullName,
            username,
            password: hashedPass,
            gender,
            profilePicture
        });

        // Save the new user in the database
        await newUser.save();

        // Generate JWT token
        const token = generateTokenAndSetCookie(newUser._id);

        // Construct user object to send in the response
        const userToSend = {
            _id: newUser._id,
            fullName: newUser.fullName,
            profilePicture: newUser.profilePicture
        };

        // Send response with access token and user information
        ///VHAMED (*****************************)
     
        return res.status(201).json({ accessToken: token, user: userToSend });
    } catch (err) {
        console.error("Error occurred:", err.message);
        res.status(500).json({ error: err.message });
    }
};

//logIn controller function
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        let user = await User.findOne({ username })
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {

                const userToSend = {
                    _id: user._id,
                    fullName: user.fullName,
                    profilePicture: user.profilePicture
                };
                // console.log("use copy ", userToSend)
                // /ADDEDED HERE **********
                const token = generateTokenAndSetCookie(user._id)
                // res.cookie('jwt', token, { httpOnly: true });
                return  res.status(200).json({ accessToken: token, user: userToSend })//in rsponse send accestoken

            } else {
                return res.status(200).json({ error: "Password didn't match!" })
            }
        }
        return res.status(400).json({ error: "No such user exists" })

    } catch (err) {
        res.json({ error: err })
        console.log("error:" + err)
    }
}



//for logout just clear the cookie token
export const logout = async (req, res) => {
    try {

        return res.status(200).json({ msg: "Logged Out successfully" })
    } catch (err) {
        res.json({ error: err })
        console.log("error:" + err)
    }
}