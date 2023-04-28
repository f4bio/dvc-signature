// const {promises: {readFile}} = require("fs");

import fs from 'node:fs/promises';
import mjml2html from "mjml";
import { format, createLogger, transports } from "winston";
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    label(),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" })
  ]
});

// fs.readFile("./input.mjml", { encoding: "utf-8" }).then((content) => {
//   const htmlOutput = mjml2html(content);
//   logger.info(htmlOutput);

// }).catch((err) => {
//   logger.info(err);
// });

async function makeSignature() {
  const content = await fs.readFile("./input.mjml", { encoding: "utf-8" });
  const htmlOutput = mjml2html(content);
  await fs.writeFile("input.html", htmlOutput.html, { encoding: "utf-8" });
}

makeSignature();
