import *as http from "http"
import { promises as fs } from "fs"

const PORT = 4000
const server = http.createServer(async (req, resp) => {
    let root = req.url.split("/")
    let last_name = root[1]
    let last_id = root[2]

    if (req.url === "/") {
        resp.writeHead(200, { "content-type": "text/plain" })
        resp.end(`server ishlamoqda
url root:
http://localhost:4000/albums
http://localhost:4000/comments
http://localhost:4000/posts
http://localhost:4000/todos
http://localhost:4000/users
http://localhost:4000/photos`)
        return
    }

    let menu_json = [
        "/albums",
        "/comments",
        "/photos",
        "/posts",
        "/todos",
        "/users"
    ]

    if (menu_json.includes(req.url)) {
        const file = await fs.readFile(`.${req.url}.json`, "utf8")
        resp.writeHead(200, { "content-type": "application/json" })
        resp.end(file)
        return
    }
    else if (Number.isInteger(Number(last_id)) && Number(last_id) > 0) {
        const file = await fs.readFile(`./${last_name}.json`, "utf8")
        const parse_file = JSON.parse(file)
        const info_id = parse_file[last_id - 1]

        if (info_id === undefined) {
            resp.writeHead(404)
            resp.end("Not Found")
            return
        }
        
        resp.writeHead(200, { "content-type": "application/json" })
        resp.end(JSON.stringify(info_id))
        return
    }
    else {
        resp.writeHead(404)
        resp.end("Not Found")
    }
})
server.listen(PORT, () => {
    console.log(`server ${PORT} portda ishlamoqda`);
})