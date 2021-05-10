const jsonfile = require("jsonfile");
const file_path = "./DB/users.json";

module.exports = app => {
    // app is the variable which in the express package is initialized.
    // .get is the HTTP method that will accept this route. (others are post, put, delete).
    //  "/user", is the name of the endpoint on which to query.
    // (req, res) are two variables, one which is a massive request object, the latter references the request sender

    // Post routes are by default to be used for submitting/writing to a server
    app.post("/users/new", (req, res) => {
        // équivaut à :
        // let email = req.body.email;
        // let username = req.body.username;
        let { email, username } = req.body;
        jsonfile.readFile(file_path, function(err, content) {
            content.push({ email, username });
            console.log("added " + email + "to DB");
            jsonfile.writeFile(file_path, content, function(err) {
                console.log(err);
            });
            res.sendStatus(200);
        });
    });

    // Delete routes are to be used for deleting a/multiple record(s) from a datastorage
    app.delete("/users/destroy", (req, res) => {
        let email = req.body.email;
        jsonfile.readFile(file_path, function(err, content) {
            for (var i = content.length - 1; i >= 0; i--) {
                if (content[i].email === email) {
                    console.log("removing " + content[i].email + "from DB");
                    content.pop(i);
                }
            }
            jsonfile.writeFile(file_path, content, function(err) {
                console.log(err);
            });
            res.sendStatus(200);
        });
    });

    // Put routes are to be used for updating a or multiple record/s from datastorage
    app.put("/user", (req, res) => {
        let user;
        let username = req.body.username;
        let email = req.query.email;
        jsonfile.readFile(file_path, function(err, content) {
            for (var i = content.length - 1; i >= 0; i--) {
                if (content[i].email === req.query.email) {
                    console.log("updated user " + req.query.email + " has now username : " + username);
                    user = content[i];
                    user.username = username;
                }
            }
            jsonfile.writeFile(file_path, content, function(err) {
                console.log(err);
            });
        });
        // res.send is what the route returns to the request sender. Making use of the res reference variable.
        res.send(user);
    });

    // GET is a route that returns a specific user based on their email
    app.get("/user", (req, res) => {
        let user;
        let username = req.query.username;
        jsonfile.readFile(file_path, function(err, content) {
            for (var i = content.length - 1; i >= 0; i--) {
                if (content[i].username === username) {
                    console.log("user found");
                    console.log(content[i]);
                    user = content[i];
                }
            }
            res.send(user);
        });
    });

    app.get("/users", (req, res) => {
        console.log("fetching all users");
        jsonfile.readFile(file_path, function(err, content) {
            res.send(content);
        });
    });

};