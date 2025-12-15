import *as http from "http"
import { promises as fs } from "fs"

const PORT = 4001
const all_root = [
    "albums",
    "comments",
    "photos",
    "posts",
    "todos",
    "users",
]

function middleware(oldReq, oldResp, next) {
    let input = ""
    let body = false
    oldReq.on("data", data => {
        body = true
        input = input + data
    })

    oldReq.on("end", () => {
        if (body) {
            try {
                let parse_input = JSON.parse(input)
                oldReq.body = parse_input
                next(oldReq, oldResp)
            } catch (error) {
                console.error(error);
                oldResp.end()
            }
        } else {
            next(oldReq, oldResp)
        }
    })
}

const server = http.createServer((oldReq, oldResp) => {
    middleware(oldReq, oldResp, async (req, resp) => {

        let root_name = req.url.split("/")[1].toLowerCase()
        let root_name_id = req.url.split("/")[2]

        if (req.url === "/") {
            resp.writeHead(200, { "Content-Type": "application/json" })
            resp.end(JSON.stringify({ massage: `Server ishlamoqda` }))
        }

        else if (all_root.includes(root_name) && root_name_id === undefined) {

            if (req.method === "GET") {
                let file = await fs.readFile(`./${root_name}.json`, "utf-8")
                resp.writeHead(200, { "content-type": "application/json" })
                resp.end(file)
                return
            }

            else if (req.method === "POST") {
                let { id, name, username, email } = req.body
                const search_id = await fs.readFile(`./${root_name}.json`, "utf-8")
                const parse_id = JSON.parse(search_id)
                const find_id = parse_id.find(item => item.id === Number(id))

                if (find_id) {
                    resp.writeHead(400, { "Content-Type": "application/json" })
                    resp.end(JSON.stringify({ error: `${id} already exists` }))
                    return
                }
                const new_user = {
                    id: Number(id),
                    name,
                    username,
                    email
                }
                parse_id.push(new_user)
                await fs.writeFile(`./${root_name}.json`, JSON.stringify(parse_id))
                resp.writeHead(201, { "Content-Type": "application/json" })
                resp.end(JSON.stringify({ name: `${new_user.name} qo'shildi` }))
                return
            }

            else if (req.method === "PATCH") {
                let { id, newName } = req.body
                const search_id = await fs.readFile(`./${root_name}.json`, "utf-8")
                const parse_id = JSON.parse(search_id)
                const find_id = parse_id.find(item => item.id === Number(id))

                if (!find_id) {
                    resp.writeHead(400, { "Content-Type": "application/json" })
                    resp.end(JSON.stringify({ error: `${id} is not exists` }))
                    return
                }

                find_id.name = newName
                await fs.writeFile(`./${root_name}.json`, JSON.stringify(parse_id))
                resp.writeHead(200, { "Content-Type": "application/json" })
                resp.end(JSON.stringify({ name: `${find_id.name}ga o'zgardi` }))
                return
            }

            else if (req.method === "DELETE") {
                let { id } = req.body
                const search_id = await fs.readFile(`./${root_name}.json`, "utf-8")
                const parse_id = JSON.parse(search_id)
                const find_id = parse_id.find(item => item.id === Number(id))

                if (!find_id) {
                    resp.writeHead(400, { "Content-Type": "application/json" })
                    resp.end(JSON.stringify({ error: `${id} is not exists` }))
                    return
                }

                let new_data = parse_id.filter(item => item.id !== Number(id))
                await fs.writeFile(`./${root_name}.json`, JSON.stringify(new_data))
                resp.writeHead(200, { "Content-Type": "application/json" })
                resp.end(JSON.stringify({ id: `${id} o'chirildi` }))
                return
            }

            else {
                resp.writeHead(405)
                resp.end("Method Not Allowed")
            }
        }

        else if (all_root.includes(root_name) && root_name_id) {
            if (req.method === "GET") {
                let file = await fs.readFile(`./${root_name}.json`, "utf-8")
                let parse_file = JSON.parse(file)
                let result = parse_file.find(item => item.id === Number(root_name_id))
                if (result === undefined) {
                    resp.writeHead(404, { "Content-Type": "application/json" })
                    resp.end(JSON.stringify({ error: "Not Found, Not id Number" }))
                    return
                }
                resp.writeHead(200, { "content-type": "application/json" })
                resp.end(JSON.stringify(result))
                return
            }
        }

        else {
            resp.writeHead(404)
            resp.end("Not Found")
        }

    })
})

server.listen(PORT, "127.0.0.1", () => {
    console.log(`server ${PORT} portda ishlamoqda`);
})



asdadadsasd