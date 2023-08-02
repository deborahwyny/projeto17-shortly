import { db } from "../database/database.connection.js"

export async function cadastroLogin (req, res){

    const {name, email, password, confirmPassword} = req.body


    try{

        const emailValidate = await db.query('SELECT * FROM users WHERE email=$1;', [email])
        if (emailValidate.rows.length !== 0)  return res.status(409).send("email invalido")

        const cadastroUser = await db.query('INSERT INTO users (name, email, password, "confirmPassword") VALUES ($1, $2, $3, $4);', [name, email, password, confirmPassword])


        res.sendStatus(201)

    } catch(err){
        res.status(500).send(err.message)
    }

}