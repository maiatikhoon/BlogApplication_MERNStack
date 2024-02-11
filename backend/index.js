const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000 || process.env.port;

app.use(cors());
app.use(express.json());

main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/user");
  console.log("db connected");
}

const userRoutes = require("./routes/userRoutes"); 
const blogRoutes = require("./routes/blogRoutes") ; 

app.use("/api/user", userRoutes); 

app.use("/api/blog" , blogRoutes) ; 

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
