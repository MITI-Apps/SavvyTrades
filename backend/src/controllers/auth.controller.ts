import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';


const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email }});
    if (!user){
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret){
      return res.status(500).json({ error: 'JWT secret not found' });
    }
    const token = jwt.sign(
      {userId: user.id, email: user.email },
      jwtSecret,
      {expiresIn: '7d'}
    );
    
    res.status(200).json({ message: 'Login successful', token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password']}
    });

    if (!user){
      return res.status(404).json({ error: 'User not found' })
    };

    return res.status(200).json({  user });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user profile'})
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try{
    const { name, email } = req.body
    const userId = req.auth?.userId
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingUser = await User.findOne({
      where: {
        email, 
        id: { [Op.ne]: userId}
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use by another account' });
    };
    
    //update fields
    user.name = name;
    user.email = email;
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        updatedAt: user.updatedAt,
      },
    });

  }catch (error){
    res.status(500).json({ error: 'Failed to update profile' })
  }
};

const changePassword = async (req: Request, res: Response) => {
  try{
    const userId = req.auth?.userId;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch){
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    const password = await bcrypt.hash(newPassword, 10);
    user.password = password;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error){
    res.status(500).json({ error: "Failed to change password"})
  }
}

export { registerUser, loginUser, getMe, updateProfile, changePassword };