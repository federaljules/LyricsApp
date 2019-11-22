$(document).on("ready", function () {
    databaseHandler.createDatabase();       //Create database when page is ready, Julius Kerminen 1800705
});

function addUser() {
    var user = $("#user").val();
    var password = $("#pw").val();
    userHandler.addUser(user, password);        //Add new user using sign up button, Julius Kerminen 1800705
    $("#user").val("");
    $("#pw").val("");
}
//Login function for the login button, Julius Kerminen 1800705
function login() {
    var info = userInfo.askUser();
    window.location.assign('index.html')

}
//Logout function for the logout button in the root.hmtl page upper right corner, Julius Kerminen 1800705
function logout() {
    window.location.assign('index.html')

}
//Function for the welcome page button, Julius Kerminen 1800705
function toApp() {
    window.location.assign('root.html')

}
