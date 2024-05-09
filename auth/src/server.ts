import app from "./app";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import getConfig from "./utils/createConfig";
import { Channel } from "amqplib";

const config = getConfig();

export let authChannel: Channel;

// READ FILE JWT PUBLIC KEY FIRST
export const privateKey = fs.readFileSync(
  path.join(__dirname, "../private_key.pem"),
  "utf-8"
);

//conect to the moongo
mongoose
  .connect(config.mongoUrl as string)
  .then(() => {
    //listen for requests
    app.listen(config.port, () => {
      console.log("Connect to mongose DB & Listen on port 3001");
    });
  })
  .catch((error: any | unknown) => {
    console.log(error);
  });
