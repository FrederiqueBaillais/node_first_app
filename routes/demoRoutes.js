// Most simple Route for an Express server
//
// Because this file is seperate from the index.js we export it as a module
// You will notice when we use this module that app is given as a variable
// The technical term for this is currying

module.exports = app => {

    // Route is accessible as GET: /demo
    // req is the parameter that refers to the request data
    // res is the parameter that refers to the request's sender
    //

    app.get("/demo", (req, res) => {

        // Some dummy data
        //

        const demo = {
            data1: "Hello",
            data2: "World"
        }

        // res.send(data) or res.sendStatus(statusCode)
        // To send a status message or data back to the requester
        //

        res.send(demo)
    })
};