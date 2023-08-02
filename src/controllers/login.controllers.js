import { db } from "../database/database.connection.js"
import { v4 as uuid } from 'uuid'


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


export async function loginUser (req, res){

    const {email, password} = req.body

    try {

        const verificadorUserSenha = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2;',[email, password])
        if (verificadorUserSenha.rows.length === 0) { return res.status(401).send("Invalid email or password")}

        const user = verificadorUserSenha.rows[0]

        if (user.password !== password) {
        return res.status(401).send("Invalid email or password")}

        const token = uuid()

        const login = await db.query('INSERT INTO user_tokens (user_id, token) VALUES ($1, $2);', [user.id, token])

        res.status(200).send(token);

    } catch(err) {        
        res.status(500).send(err.message)

    }
}