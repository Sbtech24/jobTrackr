import {conn}from "./db"

export async function initDb(){
    try{
        await conn.query(`
        CREATE TABLE IF NOT EXISTS jobs(
        id UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        status TEXT, 
        description VARCHAR(255),
        date_applied TIMESTAMP DEFAULT NOW()
        )
        `)
        console.log(`Database connected successfully`)
    }catch(err){
        console.log('Erro connecting to db')

    }
    
}
