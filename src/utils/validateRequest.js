/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");

const validateRequest = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.json({ err: "Não autorizado. Token não informado" }).status(401);

  jwt.verify(token.split(" ")[1], process.env.SECRET, (err, decoded) => {
    if (err) return res.json({ err: "Token inválido" }).status(401);

    req.userId = decoded.id;

    console.log("User", decoded.id);
    next();
  });
};

module.exports = validateRequest;
