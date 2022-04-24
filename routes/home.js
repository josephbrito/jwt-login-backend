const express = require("express");
const router = express.Router();
const auth = require("./userLogged");

router.get("/", auth, (req, res) => {
  res.send(
    "<span>Agora você está logado :) </span><a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>Clique aqui para ver seu conteúdo</>"
  );
});

module.exports = router;
