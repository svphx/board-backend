import dotenv from "dotenv";
import server from "server";

dotenv.config();

const { PORT } = process.env;

if (PORT) {
  server.listen(PORT, () => console.log("Running at port", PORT));
} else {
  console.log("Environment variable PORT is undefined");
}
