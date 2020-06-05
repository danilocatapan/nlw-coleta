const express = require("express")
const server = express()

const db = require("./database/db")

server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um título"})
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.post("/create-point", (req, res) => {
    const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `
  const values = [ 
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ] 

  function afterInsertData(error) {
    if(error) {
      return console.log("ERROR UPDATE: ", error)
    }

    return res.send("ok")
  }
  
  db.run(query, values, afterInsertData)
})
 
server.get("/search", (req, res) => {

  db.all(`SELECT * FROM places`, function(error, rows) {
    if(error) {
      return console.log("ERROR SELECT * : ", error)
    }

    const total = rows.length

    return res.render("search-results.html", { places: rows, total })
  })
})

server.listen(3000)