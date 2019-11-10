//Here is adding user to database by pressing sign up button , Julius Kerminen 1800705
var userHandler = {
    //Add the record in database, it adds record or row in Web SQL (SQLite)
    addUser: function (user, password) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "insert into users(user, password) values(?, ?)",  //SQL to insert data in to webSQL database we created in the databaseHandler.js file
                    [user, password],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("add user error: " + error.message);
                    }
                );
            },
            function (error) { },
            function () { }
        );
    },
}

//Here I check if the database has that account signed up, Julius Kerminen 1800705
var userInfo = {
    //Add the record in database, it adds record or row in Web SQL (SQLite)
    askUser: function (user) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "select * from users",          //SQL to get the information from database, Julius Kerminen 1800705
                    [],
                    function (tx, results) {

                        var user = document.getElementById('user').value;   //My login field values, Julius Kerminen 1800705
                        var pw = document.getElementById('pw').value;

                        for (var i = 0; i < results.rows.length; i++){
                            console.log(results.rows[i])
                            var usernames = results.rows[i].user;           //Loop to get all the users and passwords to compare, Julius Kerminen 1800705
                            var passwords = results.rows[i].password;
                        }

                        if (user == usernames && pw == passwords) {
                            console.log("Logged in")                    //Checking if user and password match then redirect forward, Julius Kerminen 1800705
                            window.location.assign('welcome.html')
                        } else {
                            alert("Wrong username or password")         //If not send alert, Julius Kerminen 1800705
                            console.log("Wrong username or password")
                        }
                    },
                    function (tx, error) {
                        console.log("add user error: " + error.message);
                    }
                );
            },
            function (error) { },
            function () { }
        );
    },
}