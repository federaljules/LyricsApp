

var databaseHandler = {
    db: null,
    createDatabase: function () {
        this.db = window.openDatabase(          //Here is the database details name etc., Julius Kerminen 1800705
            "users.db",
            "1.0",
            "User database",
            1000000);
        this.db.transaction(
            function (tx) {
                //Run SQL Here
                tx.executeSql(
                    "create table if not exists users(_id int primary key, user text, password integer)", [],   //SQL to create database, Julius Kerminen 1800705
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("Error while creating the table: " +
                            error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error:" + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully:");
            },
        );
    }
}