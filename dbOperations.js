module.exports = {
  getRecords: function(req, res) {    
        var pg = require('pg');  
        var client = new pg.Client({
            user: "aws",
            password: "neras123",
            database: "aws",
            host: "testingaws.c3nrfcenl0ko.eu-west-1.rds.amazonaws.com"
        });
        client.connect((err) => {
            if (err) {
                res.status(404).send("Oh uh, something went wrong");
                return
            } else {
              console.log('connected')
            }
          })
        var query = client.query(new pg.Query("select * from subscriber"));

        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "") + "\n");
            res.end();  
        });
  },
    

    addRecord : function(req, res){
        var pg = require('pg');  
        var client = new pg.Client({
            user: "aws",
            password: "neras123",
            database: "aws",
            host: "testingaws.c3nrfcenl0ko.eu-west-1.rds.amazonaws.com"
        });
        client.connect((err) => {
            if (err) {
                res.status(404).send("Oh uh, something went wrong");
                return
            } else {
              console.log('connected')
            }
          })
        var query = client.query(new pg.Query("insert into subscriber (name,email) "+ 
                                "values ('"+req.query.name+"','"+req.query.email+"')"));
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    },
    
     delRecord : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.DATABASE_URL ||  "postgres://postgres:Welcome123@localhost:5432/postgres";
        var client = new pg.Client({
            user: "aws",
            password: "neras123",
            database: "aws",
            host: "testingaws.c3nrfcenl0ko.eu-west-1.rds.amazonaws.com"
        });
        client.connect((err) => {
            if (err) {
                res.status(404).send("Oh uh, something went wrong");
                return
            } else {
              console.log('connected')
            }
          })
        console.log(req.query.id)
        var query = client.query(new pg.Query("Delete from subscriber Where id ="+req.query.id));
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    }
};