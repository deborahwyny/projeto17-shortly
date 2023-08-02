import { db } from "../database/database.connection.js"
import { nanoid } from 'nanoid'


export async function urlShorten(req, res){

    const {url} = req.body

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {return res.sendStatus(401)}



    const shortUrl = nanoid()

    try {

        const verificardorUser = await db.query('SELECT * FROM user_tokens WHERE token=$1;', [token])
        if (verificardorUser.rows.length === 0) {
            return res.status(401).send('token não encontrado')
        }

        const user_id = verificardorUser.rows[0].user_id


        const urlShort = await db.query('INSERT INTO url (user_id, shortUrl, url) VALUES ($1, $2, $3);', [user_id, shortUrl, url])

        res.status(201).send(shortUrl)

    } catch (err){
        res.status(500).send(err.message)

    }
}

export async function getUrlId(req, res) {

    const {id} = req.params

    try {

        const getUrl = await db.query('SELECT * FROM url')

        

    } catch (err) {
        res.status(500).send(err.message)

    }
}