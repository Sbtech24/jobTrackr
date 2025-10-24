import {pool}from "./db"

export async function initDb(){
    await pool.query(`
        CREATE TABLE IF NOT EXISTS jobs(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending,
        created_at TIMESTAMP DEFAULT NOW()
        )
        
        `)
        console.log('Database Initailized')
}
