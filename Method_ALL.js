import *as http from "http"
import { promises as fs } from "fs"
import { type } from "os"

const PORT = 4001
const all_root = [
    "albums",
    "comments",
    "photos",
    "posts",
    "todos",
    "users",
    "health"
]

const server = http.createServer(async (new_req, new_resp) => {

    let name_root = new_req.url.split("/")[1].toLowerCase()
    let user_id = new_req.url.split("/")[2]

    if (new_req.url === "/") {
        new_resp.writeHead(200, { "content-type": "text/plain" })
        new_resp.end(`server ishlamoqda
url root:
http://localhost:4000/albums
http://localhost:4000/comments
http://localhost:4000/posts
http://localhost:4000/todos
http://localhost:4000/users
http://localhost:4000/photos`)
        return
    }

    else if (user_id && all_root.includes(name_root)) {

        let search_root = JSON.parse(await fs.readFile(`./${name_root}.json`, "utf8"))
        let search_root_id = search_root.map(item => {
            return item.id
        })

        if (search_root_id.includes(Number(user_id))) {
            let file_id = search_root.filter(item => item.id === Number(user_id))
            new_resp.writeHead(200, { "content-type": "application/json" })
            new_resp.end(JSON.stringify(file_id))
            return
        }

        else {
            new_resp.writeHead(404)
            new_resp.end("Not Found")
        }
        return
    }

    else if (name_root && user_id === undefined) {
        if (all_root.includes(name_root)) {
            if (new_req.method === "GET") {
                const file = await fs.readFile(`./${name_root}.json`, "utf-8")
                new_resp.writeHead(200, { "content-type": "application/json" })
                new_resp.end(file)
                return
            }

            else if (new_req.method === "POST") { }

            else if (new_req.method === "PATCH") { }

            else if (new_req.method === "DELETE") { }

        } else {
            new_resp.writeHead(404)
            new_resp.end("Not Found")
        }
        return
    }

    else {
        new_resp.writeHead(404)
        new_resp.end("Not Found")
    }

})
server.listen(PORT, "127.0.0.1", () => {
    console.log(`server ${PORT} portda ishlamoqda`);
})



asdadadsasd