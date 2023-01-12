const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const routes = require("./routes/ToDoRoutes");

const app = express();

app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.set('strictQuery', true);

const port = process.env.PORT || 450;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUniFiedTopology: true
})
.then(() => console.log("🚀 MongoDB Atlas Conectado!!"))
.catch((err) => console.log("🔴 Erro na Conexão!!"));

app.listen(port, () => console.log(`🚀 App listening on port http://localhost:${port}`));