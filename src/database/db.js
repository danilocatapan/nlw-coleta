const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
  
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)

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
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=874&q=80",
    "Colectoria",
    "Guilherme Gemballa, Jardim América",
    "Nº 260",
    "Santa Catarina",
    "Rio do Sul",
    "Resíduos Eletrônicos, Lâmpadas"
  ] 

  function afterInsertData(error) {
    if(error) {
      return console.log("ERROR UPDATE: ", error)
    }

    console.log("Cadastrado com sucesso!")
    console.log(this)
  }

  //db.run(query, values, afterInsertData)

  db.all(`SELECT * FROM places`, function(error, rows) {
    if(error) {
      return console.log("ERROR SELECT * : ", error)
    }

    console.log("Registros: ")
    console.log(rows)
  })

  db.run(`DELETE FROM places WHERE id = ?`, [1], function(error, rows) {
    if(error) {
      return console.log("ERROR DELETE : ", error)
    }

    console.log("Registro deletado com sucesso!")
  })

})