import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { conn } from "../config/db";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    const query = `SELECT * from users WHERE username = $1`;
    const existing = await conn.query(query, [username]);
    const checkUser = existing.rows[0]
    if (checkUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insert = await conn.query(
      `INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *`,
      [username, hashedPassword]
    );
    const result = insert.rows[0];

    return res
      .status(201)
      .json({ message: `User ${result.username} created successfully` });
  } catch (err) {
    next(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    const query = `SELECT * from users WHERE username = $1`;
    const result = await conn.query(query, [username]);
    if(result.rows.length === 0 ) return res.status(404).json({mesage:"User not found"})
    const user = result.rows[0];
    const hash = result.rows[0].password;
    const comparePassword = await bcrypt.compare(password, hash);

    if (!comparePassword) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
      return res.status(500).json({ message: "Internal server error" });
    }

    const accessToken = jwt.sign(
      { username: user.username, password: user.password },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );
    console.log(refreshToken)

    const insertQuery =await conn.query( `UPDATE users SET refresh_token = $1 WHERE id = $2 RETURNING id`,
      [refreshToken,user.id]
    );

    if (result.rowCount === 0) {
  throw new Error("User not found");
}

    const dbresult = insertQuery.rows[0]

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ accessToken });
  } catch (err) {
    next(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
