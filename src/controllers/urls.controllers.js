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

        const getUrl = await db.query('SELECT id, "shorturl", url FROM url WHERE id = $1;', [id]);
        if (getUrl.rows.length === 0) {
            return res.status(404).send("URL não existe");
        }

          res.status(200).send(getUrl.rows)


    } catch (err) {
        res.status(500).send(err.message)

    }
}

export async function openUrl(req, res){

    const {shortUrl} = req.params

    try {
        
        const verificarUrl = await db.query('SELECT * FROM url WHERE shortUrl = $1;', [shortUrl])

        if (verificarUrl.rowCount === 0) {
            return res.status(404).send("URL não existe")
        }

        const originalURL = verificarUrl.rows[0].url

        await db.query('UPDATE url SET visitcount = visitcount + 1 WHERE shortUrl = $1;', [shortUrl]);

        res.redirect(originalURL)



    } catch(err) {
        res.status(500).send(err.message)

    }
}

export async function deleteUrl(req, res) {

    const {id} = req.params

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {return res.sendStatus(401)}

    try {


        const checkToken = await db.query('SELECT * FROM user_tokens WHERE token = $1;', [token]);
        console.log("oi1", checkToken.rows[0])

        if (checkToken.rows.length === 0) {
            return res.status(401).send("Token inválido");
        }
        console.log("checkToken.rows[0]", checkToken.rows[0]);


        console.log("oi2", checkToken.rows[0])


        const userId = checkToken.rows[0].user_id
        console.log("checkToken.rows[0]", checkToken.rows[0]);




        const urlEntry = await db.query('SELECT * FROM url WHERE id = $1 AND user_id = $2;', [id, userId]);
        console.log("oi4,5", urlEntry.rows[0])

     
        if (urlEntry.rowCount === 0) {
            return res.sendStatus(404)
        }
        console.log("oi4", urlEntry.rows[0])


        await db.query('DELETE FROM url WHERE id= $1;', [id]);



        return res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
}