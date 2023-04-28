var express = require("express");
var router = express.Router();
const CyclicDB = require("@cyclic.sh/dynamodb");
const db = CyclicDB(process.env.CYCLIC_DB);
let users = db.collection("users");


router.get("/", async (req, res, next) => {
  let list = await users.list();
  res.send(list);
});

router.get("/:key", async (req, res, next) => {
  let item = await users.get(req.params.key);
  res.send(item);
});

router.post("/", async (req, res, next) => {
  const { email, firstName, lastName, age } = req.body;
  await users.set(email, {
    firstName: firstName,
    lastName: lastName,
    age: age,
  });
  res.send({
    status: "Success",
    message: "New user created.",
  });
});

router.put("/", async (req, res, next) => {
  const { email, firstName, lastName, age } = req.body;
  await users.set(email, {
    firstName: firstName,
    lastName: lastName,
    age: age,
  });
  res.send({
    status: "Success",
    message: "User updated.",
  });
});

router.delete("/:key", async (req, res, next) => {
  await users.delete(req.params.key);
  res.send({
    status: "Success",
    message: "User deleted.",
  });
});

module.exports = router;
