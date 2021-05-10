# node_first_app

## Find an example- and commented version of the built app inside of this repository.

We'll build a very simple user management app. With no UI other than the API endpoints we'll design in a RESTfull manner and the data stored locally as a .json file with read/write functionalities.
At multiple steps we'll be making use of postman, our favorite API development environment.
The example folder is the app in it's finished state with commented code.

## Postman

If you haven't done so, install Postman on your machine.
https://www.getpostman.com/

## Create the neccessary App folders and files :

Your app folder should be structured like this

```
node_first_app
│   index.js
│   readme.md
|   .gitignore
|
└───routes
│   │   userRoutes.js
│
└───DB
    │   users.json

```

### Folder and File creation Terminal commands

1. Open your terminal and browse to the desired destination using `cd`.
2. Create a folder from the terminal, name it node_first_app, the command is `mkdir node_first_app`.
3. Browse into your newly created folder using `cd`.
4. Create a index.js file, we can do this from the terminal, the command (while in the node_first_app folder) is `touch index.js`.
5. Also create the `readme.md`, and `.gitignore` using `touch`.
6. Create a `DB` folder and a `routes` folder. The command is `mkdir folderName`.
7. Browse into each folder using `cd` and create the `userRoutes.js` and `users.json` in their appropriate folder.

## Initialize NPM and install node_modules

For this app our Node dependancies will be managed with use of NPM. To initiate NPM onto our project there is a simple command which is, from the root of your project, `npm init`.
You will notice that the terminal will ask for information about the kind of app, ignore that, press return for all of them (about 10 times).
Once the steps are completed, you will receive a free `package.json` file, hurray!

### What a package.json file looks like

```JSON
{
  "name": "node_first_app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

* name of the app
* version of the app
* optional description
* main app file                                                        !important
* npm scripts (for example to start multiple servers with one command) !important
* optional author
* default app ISC license is a permissive free software license
* in the next step we generate an extra field named `dependencies`     !important

### Practical use of npm's package.json dependancies

From within the root of your project, run the command `npm install --save express`.
Take a minute and reflect on this, because you just installed express and as a dependancy for your app. Do you see how Node is only a net/vessel that connects different dependancies? That's all there is to node, the real power lies within the express framework, which we just installed.

Results is an updated package.json, with listed dependancies.

```JSON
"dependencies": {
  "express": "^4.17.1",
}
```

And a new folder `node_modules`, which contains all of the installed dependancies (open the folder and be amazed).
We have installed a single dependancy, Express, and we get MANY additional node_modules, that's because Express on itself relies on other modules.
NPM is a web of interdependant modules.

Don't pay attention to package-lock.json as it's a temporary file.

What you don't want is to commit your code and include all of the node_modules to the repository. That would make NPM redundant, as its use is to avoid pushing the massive amount of node_modules and work with the list of dependancies as a sort of index of what to download locally.

To solve this open the `.gitignore` file and add `node_modules`, that's all.

This way of working is the same as PHP's `compose` and Ruby on Rails `gems`, Node has `NPM modules`. Pieces of code you can easily import into your project. That's the real power of coding community, there's some real gems out there.

Now commit- and push to github.

## Express server

Uncommented code

index.js

```JS
const express = require("express");

const app = express();

require("./routes/userRoutes")(app);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running`);
});
```

These are the comments that belong to the code, shuffled, think for yourself which is for what.

* use the app variable and listen on the port
* choose what port on which to run the server
* import route module and pass your app
* parse body of incoming json requests
* initialise express() inside and write to the app variable
* import the NPM dependancy package

Next up, initiate the Node runtime environment. Go to your terminal and from the root of your project type `node index.js`

In your terminal this action should print `Server running`.
And you have now an Express server running on port 5000.
Shoulder tap yourself, good job Sir/Ma'am.

## Express Route

Routes in express open `gates` aka `endpoints` to read/write data, through your server, onto your database.
You don't want to open everything, that would make your app susceptible to vulnarabilities.
So think of what endpoints you want your app to make available.

Here's an example of a simple route, let's disect.

```JS
app.get("/cars", (req, res) => {

  let cars;

  // request data from server and save in cars variable;

  res.send(cars)
})
```

This endpoint's design is RESTfull. Naming of endpoints is important here, for this example you can imagine it's supposed to return a list of all cars.

### Different route parts

* `app` is the variable which in the express package is initialized.
* `.get` is the HTTP method that will accept this route. (others are post, put, delete).
* `"/cars",` is the name of the endpoint on which to query.
* `(req, res)` are two variables, one which is a massive `request object`, the latter references the `request sender`
* `res.send` is what the route returns to the request sender. Making use of the `res` reference variable.

### A basic route for our first app

Populate the JSON file with a few users so we have some data to request.

users.json
```[{"email":"example@example.com","username":"Foo"}, {"email":"example2@domain.com","username":"Bar"}]```

* The state of our app is a running server (express), with data (users.json), but no available routes yet.

Open userRoutes.js and let's add a .get route for all users.

```JS
app.get("/users", (req, res) => {
  let users;

  res.send(users);
});
```

### Reading data from a local directory JSON file

Ofcourse, there is a pre-built NPM package for this feature, get used to it.
[jsonfile](https://www.npmjs.com/package/jsonfile).
Take a minute to read through the doc of the package, get used to that too.

Next up, install it, import it.
userRoutes.js

```JS
const jsonfile = require("jsonfile");
```

`jsonfile` is now accessible through the whole module (userRoutes.js), because `const` ;)

For the `.get` route, the `jsonfile` functionality we need is `reading`.

docs

```JS
const jsonfile = require('jsonfile')
const file = '/tmp/data.json'
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})
```

Implement this into your route.

Resulting to:

```JS
app.get("/users", (req, res) => {
  console.log("fetching all users");

  // jsonfile reading
  jsonfile.readFile("./DB/users.json", function(err, content) {
    // send file contents back to sender
    res.send(content);
  });
});
```

Now, making a GET request to localhost:5000/users should in theory return all users contained in the json file.

#### Test route with Postman

* Launch Postman
* Close the template wizard
* Choose GET as the request method
* Put in localhost:5000/users as the URL
* Press send, making an API request to your app.

response body

```JSON
[
  {
    "email": "example@example.com",
    "username": "Foo"
  },
  {
    "email": "example2@domain.com",
    "username": "Bar"
  }
]
```

You've just created a functional rest API endpoint, congratulate yourself!

### A Post route

Post routes are by default to be used for submitting/writing to a server.
For this reason we will create a `app.post` route for `creating a new user`.

* app.post("/users/new", ...) (this is restfull route naming)
* make use of the req (request) object to obtain input parameters
* add a console.log() on the route
* think of how you would access writing in the json file
* send appropriate HTTP codes back to the request sender

To receive JSON params through a request body, add the body-parser npm package

install body-parser `npm install --save body-parser`

index.js

```JS
  const express     = require("express");
  const bodyParser  = require("body-parser");

  ...

  app.use(bodyParser.json());
```

jsonfile docs for writing a json file

```JS
const jsonfile = require('jsonfile')

const file = '/tmp/data.json'
const obj = {name: 'JP'}

jsonfile.writeFile(file, obj, function (err) {
  console.error(err)
})
```

The problem here is that the doc assume you write completely new file.
For our use-case, we want to keep the existing contents but add/push a single item.
Solvable by first reading the json, then adding the item, and at last writing it back to the file.

The code looks something like this

```JS
app.post("/users/new", (req, res) => {

  let email    = req.body.email
  let username = req.body.username

  jsonfile.readFile("./DB/users.json", function(err, content) {

    content.push({ email: email, username: username });

    console.log("added " + email + "to DB");

    jsonfile.writeFile("./DB/users.json", content, function(err) {
      console.log(err);
    });

    res.sendStatus(200);
  });
});
```

#### Test route with postman

* Launch Postman
* Close the template wizard
* Choose POST as the request method
* Put in localhost:5000/users as the URL
* Send a body (email + username) with the request, in raw JSON format

![postman](https://i.gyazo.com/ff516e178a088b9959a52f924b046c60.png)

* Press send, making an API request to your app.

You should now see an OK or 200 status code in the response,
and the users.json updated with the input.

#### Refactor the "users/new" route

* apply ES6 destructuring
* save file_path name as a const variable accessible to all routes

resulting refactor userRoutes.js

```JS
const file_path = "./DB/users.json";

app.post("/users/new", (req, res) => {

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
```

### A DELETE route

Delete routes are to be used for deleting a/multiple record(s) from a datastorage.
We'll create a `app.delete` route for `deleting a user`.
Delete user by email.

* app.delete("/user/destroy", ...)
* make use of the req (request) object to obtain input parameters
* add a console.log() on the route
* what params should you send with the request
* think of how you would approach removing an object from the json file
* send appropriate HTTP codes back to the request sender

Reading the JSON file, removing what's needed, and then rewriting.

```JS
  app.delete("/users/destroy", (req, res) => {

    let email = req.body.email;

    jsonfile.readFile(file_path, function(err, content) {

      for (let i = content.length - 1; i >= 0; i--) {

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
```

The contens object returned from reading the file is an array of user objects.
So a simple loop ontop of that makes it possible to evaluate each object of the array individually.
Evaluation of the object to remove is based on the email sent with the request.
When a user object is found with the same email, javascript's `pop()` function come's in handy.

#### Test route with postman

* Launch Postman
* Close the template wizard
* Choose the DELETE method
* Put in localhost:5000/users as the URL
* Send a body (email which to delete from json) with the request, in raw JSON format

### A PUT route

Put routes are to be used for updating a or multiple record/s from datastorage.
Create an `app.put` route for `updating an user`.

We want to update a user's username, based on their email, so we should send both through the request.

* app.put("/user", ...)
* make use of the req (request) object to obtain input parameters
* add a console.log() on the route
* think of how you would approach updating an object from the json file
* send the user object back to the request sender

Read the JSON file, find the user, update the field(s), and write is back.

```JS
app.put("/user", (req, res) => {
  let user;
  let username = req.body.username;
  let email    = req.query.email;

  jsonfile.readFile(file_path, function(err, content) {
    for (let i = content.length - 1; i >= 0; i--) {
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
  res.send(user);
});
```

The username to update the user with is sent through the request body, though, we send the email of the user we want to update as a query parameter.
Looping over the contents of the json file we can find the user based on the given email, and update the username accordingly. To then write the newly updates content inside of the local json file.

#### Test route with postman

* Launch Postman
* Close the template wizard
* Choose the PUT method
* Put in localhost:5000/users as the URL
* Send a body (email of the user which to update) with the request, in raw JSON format
* Send a param (new username of the user) with the request (open params options button right next to the url input)

![postman](https://i.gyazo.com/096706be424c232178047ebd8863f679.png)

### Another GET route

Last but not least, for this app, a route that returns a specific user based on their email.
Taking into account previous steps it's fairly simple.

* app.get("/user", ...)
* make use of the req (request) object to obtain the query parameter
* add a console.log() on the route
* reading the json only is sufficient for this route
* send appropriate HTTP codes back to the request sender

```JS
app.get("/user", (req, res) => {
  let user;
  let email = req.query.email;

  jsonfile.readFile(file_path, function(err, content) {
    for (let i = content.length - 1; i >= 0; i--) {
      if (content[i].email === email) {
        console.log("found user" + content[i]);
        console.log(content[i]);
        user = content[i];
      }
    }

    res.send(user);
  });
});
```

### You have learned:

  * How to initialise the node package manager
  * What is a package.json
  * How to initialise an express server available for local host
  * Test API endpoints with Postman
  * CRUD API routes
  * Read/Write data to a local json file

  [Mongo](../3.Mongo)
