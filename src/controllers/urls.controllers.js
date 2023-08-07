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
        console.log("oi 3", user_id )



        const urlShort = await db.query('INSERT INTO url (user_id, shortUrl, url, visitCount) VALUES ($1, $2, $3, $4);', [user_id, shortUrl, url, 0])



        console.log("oi ", urlShort)
        const response = {
        id: user_id,
        shortUrl: shortUrl,
    };
        console.log("oi2", response)


        res.status(201).send(response)

    } catch (err){
        res.status(500).send(err.message)

    }
}

export async function getUrlId(req, res) {

    const {id} = req.params
    try {

        const getUrl = await db.query('SELECT id, "shorturl" as "shortUrl", url FROM url WHERE id = $1;', [id]);
        if (getUrl.rowCount === 0) {
            return res.status(404).send("URL não existe");
        }

          res.status(200).send(getUrl.rows[0])


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

        await db.query('UPDATE url SET visitcount = visitcount + 1 WHERE shortUrl= $1;', [shortUrl]);

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

        if (checkToken.rows.length === 0) {
            return res.status(401).send("Token inválido");
        }


        const userId = checkToken.rows[0].user_id


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


export async function usersMe(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {return res.sendStatus(401)}

    try {

        const verificadorToken = await db.query('SELECT * FROM user_tokens WHERE token = $1;', [token])

        if (verificadorToken.rows.length === 0) {
            return res.status(401).send("Token inválido")
        }

        const verificarUsuario = await db.query('SELECT * FROM users WHERE id= $1;', [verificadorToken.rows[0].user_id])
        if(!verificarUsuario) res.status(401).send("usuario inválido")

        const verificadorUrl = await db.query('SELECT * FROM url WHERE user_id = $1;', [verificarUsuario.rows[0].id])
        console.log("a", verificadorUrl.rows)

        const visitas = await db.query(`SELECT SUM(url.visitcount) FROM url WHERE user_id = $1;`, [verificarUsuario.rows[0].id])
        console.log("b", visitas.rows)



        const body = verificadorUrl.rows.map((url) => {
            return {
              
            id: url.id,
                shortUrl: url.shorturl,
                url: url.url,
                visitCount: url.visitcount
            }
          })


        const obj = {
            id: verificarUsuario.rows[0].id,
            name: verificarUsuario.rows[0].name,
            visitCount: totalVisitCount,
            shortenedUrls: body

        } 


        console.log("oi", visitas.rows)


        return res.status(200).send(obj)


    } catch (err){
        res.status(500).send(err.message)

    }
}

export async function ranking(req, res) {

    try {


        const ranking = await db.query(`SELECT users.id, users.name,
  COUNT(url.id) as "linksCount", COALESCE(SUM(url.visitcount), 0) as "visitCount"
  FROM users LEFT JOIN url ON url.user_id = users.id
  GROUP BY users.id
  ORDER BY "visitCount" DESC
  LIMIT 10`)

  const obj = ranking.rows.map((a) => ({
    id: a.id,
    name: a.name,
    linksCount: a.visitCount,
    visitCount: a.visitCount
}));

        return res.status(200).send(obj)


    } catch(err) {
        res.status(500).send(err.message)

    }
}