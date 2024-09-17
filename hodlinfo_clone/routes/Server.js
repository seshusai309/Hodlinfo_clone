const axios = require('axios');
const express = require('express')
const {sendFile, response, request } = require('express');
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const app = express()
app.use(express.json())
const dbPath = path.join(__dirname, 'Hodlinfo.db')
const htmlPath = path.join(__dirname, '../views/index.html')
let db = null
const initializeDbAndServer = async () => {
  try {
    9
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(8080, () => {
      console.log('Server running on http://localhost:3000/')
    })
  } catch (e) {
    console.log(`error in DB : ${e.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

//STORING TOP 10 IN THE DATABASE
setInterval(()=>{
    console.log("Hello")
    axios.get('https://api.wazirx.com/api/v2/tickers').then(async response => {

        const sql = `DROP TABLE IF EXISTS CRYPTO;`
        await db.run(sql)
        const sql1 = `CREATE TABLE CRYPTO (
            name TEXT NOT NULL,
            last INTEGER,
            buy INTEGER,
            sell INTEGER,
            volume INTEGER,
            base_unit TEXT
        ); `
    await db.run(sql1)
    oj = response.data
    let val = 0
    for( i in oj ) {
      val=val +1
      if (val===11){
        break
      }
      const sqlQuery = `INSERT INTO CRYPTO (name, last, buy, sell, volume, base_unit) VALUES (
      '${oj[i].name}',
      '${oj[i].last}',
      '${oj[i].buy}',
      '${oj[i].sell}',
      '${oj[i].volume}',
      '${oj[i].base_unit}'
      );`
      await db.run(sqlQuery)
    }
    })
}, 10000);     
 

// FETCHING THE TOP 10 
app.get("/getTop10", async (res,req)=> {
  const sql = 'SELECT * FROM CRYPTO;'
  const dbresponse = await db.all(sql);
  module.exports = dbresponse
  console.log("arey waaa")
  res.sendFile(htmlPath)
})
re.sendFile(htmlPath)







