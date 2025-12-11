import *as http from "node:http"
import { promises as fs } from "fs"

const PORT = 4_000
const server = http.createServer(async (request, response) => {
    if (request.url === "/users") {
        if (request.method === "GET") {
            let res = await fs.readFile("./data.json", "utf8")
            response.writeHead(200, {
                "Content-Type": "application/json"
            })
            response.end(res)
        } else {
            response.writeHead(405)
            response.end()
        }
        return
    } else if (request.url === "/todos") {
        if (request.method === "POST") {
            response.writeHead(200)
            response.end()
        } else {
            response.writeHead(405)
            response.end()
        }
        return
    }
    response.writeHead(404)
    response.end()
})

server.listen(PORT, "127.0.0.1", () => {
    console.info(`server ready at: ${PORT}`);
})

