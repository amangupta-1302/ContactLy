import User from "../models/userModel.js"
import argon2 from "argon2"
import { generateToken } from "../lib/utils.js"


export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are mandatory" })
        }
        if (password.length < 5) {
            return res.status(400).json({ message: "Password must be atleast 5 characters" })
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(404).json({ message: "User already exists" })
        }

        const hashedPassword = await argon2.hash(password)

        const newUser = new User({ username, email, password: hashedPassword })
        if (newUser) {
            //jwtToken
            generateToken(newUser._id, res)
            await newUser.save()

            return res.status(201).json({ message: "User registered successfully", _id: newUser._id, username: newUser.username, email: newUser.email })
        }
    }
    catch (error) {
        console.log("Error while signup  controller:", error.message)
        return res.status(404).json("Something went wrong!")
    }

}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).json({ message: "All fields are required" })
        }
        const user = await User.findOne({ email })
        const verifiedPassword = await argon2.verify(user.password, password)
        if (user && (verifiedPassword)) {
            generateToken(user._id, res)

            return res.status(200).json({ message: "User logged In", username: user.username, email: user.email })
        }
    } catch (error) {
        console.log("Error in loginUser controller:", error.message)
        return res.status(404).json({ message: "Invalid credentials" })
    }
}

export const checkUser = async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in check current User auth :", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

export const logoutUser = (req, res) => {
    try {
        res.cookie("JwtToken", "", {
            maxAge: 0
        })
        return res.status(200).json({ message: "Logged Out successfully" })
    } catch (error) {
        console.log("Error in logout controller :", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
