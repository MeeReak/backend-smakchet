import app from "./app";
import fs from "fs";
import path from "path";

// READ FILE JWT PUBLIC KEY FIRST
export const publickey = fs.readFileSync(
  path.join(__dirname, "../public_key.pem"),
  "utf8"
);

//listen for requests
app.listen(3000, () => {
  console.log("Listen on port 3000");
});
