var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 5,
    host: '222.104.202.90',
    user: 'Shopping_Admin',
    database: 'Shopping',
    password: '1234'
});

/* GET home page. */
router.post('/', function(req, res) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        console.log('connected as id ' + connection.threadId);

        var values = [req.body.id, req.body.pw];

        var sql = "SELECT * from member where ";
        sql += "id='" + req.body.id + "' and pw='" + req.body.pw + "' + ' and levle=0' ";
        console.log(sql);

        connection.query(sql, function (err, result) {
            if (err) console.error("err : " + err);
            console.log("result : " + JSON.stringify(result[0]));
            //JSON.stringify(result)
            //res.json(result);
            connection.release();
            if(result[0].id == req.body.id)
            {
                req.session.user_id = req.body.id;
                res.send('<script>alert("로그인 되었습니다!"); location.href="/"</script>');
            }


            // Don't use the connection here, it has been returned to the pool.
        });
    });
});

module.exports = router;