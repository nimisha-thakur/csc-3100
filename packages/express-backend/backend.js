// backend.js
import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Nimisha",
      job: "Software Engineer",
    },
    {
      id: "abc123",
      name: "Nicole",
      job: "Electrical Engineer",
    },
    {
      id: "ppp222",
      name: "Maiya",
      job: "Influencer",
    },
    {
      id: "yat999",
      name: "Nimisha",
      job: "Software Engineer",
    },
    {
      id: "zap555",
      name: "Jared",
      job: "Industrial Engineer",
    },
  ],
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
    const index = users["users_list"].findIndex(
        (user) => user["id"] === id
    );

    if (index !== -1) {
        users["users_list"].splice(index, 1);
    }
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);

  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);

  } else {
    res.send(users);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  deleteUserById(id);
  res.send();

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});