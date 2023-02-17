import express from "express";

const app = express();
app.use(express());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  return res.send("pong");
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
