#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs");

const options = yargs.usage("Usage: -f <json file>").option("f", {
  alias: "filename",
  describe: "path and name of the json input file",
  type: "string",
  demandOption: true,
}).argv;

console.log("Input file: ", options.filename);

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
jsonReader(options.filename, (err, jsonMainObject) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(jsonMainObject.areas);
});
