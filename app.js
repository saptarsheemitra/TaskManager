require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const connectDB = require("./db/connect")

const taskRoutes = require("./routes/tasks");
const notFound = require("./middleware/notFound");

//middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/v1/tasks", taskRoutes);
app.use("*",notFound);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const startServer = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
          });
    } catch (error) {
        console.error(error);
    }
}

startServer();

