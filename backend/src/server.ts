import express, { Express } from "express";
import cors from "cors";

import user from "./routes/api/user";
// import task from "./routes/api/task";
// import surveillance from "./routes/api/surveillance";
// import screenshot from "./routes/api/screenshot";
// import dailyreport from "./routes/api/bidreport";
// import projecthistory from "./routes/api/projecthistory";
// import project from "./routes/api/project";
import order from "./routes/api/order";
// import worktime from "./routes/api/worktime";
import connectDB from "./lib/dbConnect";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
const port: Number = process.env.PORT ? Number(process.env.PORT) : 5000;

const path = require("path");

connectDB();
app.set("trust proxy", true);

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static(__dirname + "/public"));

app.use("/api/user", user);
// app.use("/api/task", task);
// app.use("/api/worktime", worktime);
// app.use("/api/surveillance", surveillance);
// app.use("/api/screenshot", screenshot);
// app.use("/api/dailyreport", dailyreport);
// app.use("/api/project_history", projecthistory);
// app.use("/api/project", project);
app.use("/api/order", order)
app.get("/api/get-suv-version", (req, res) => {
  res.send(
    JSON.stringify({
      version: "1.0.0",
      file: "suv-1.0.0.zip",
      update_at: "2023-06-14",
    })
  );
});

if (process.env.ENVIRONMENT === "PRODUCTION") {
  console.log("Production requested");
  app.use(express.static(path.join(__dirname, "build", "index.html")));

  app.get("/*", async (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
