#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs");

const options = yargs.usage("Usage: -f <json file>").option("f", {
  alias: "filename",
  describe: "path and name of the json input file",
  type: "string",
  demandOption: true,
}).argv;

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

  for (let hashId in jsonMainObject.areas) {
    let resultCoordString =
      jsonMainObject["areas"][hashId]["name"] +
      ';{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[';

    let coords = JSON.parse(jsonMainObject["areas"][hashId]["polygon"]);

    coords.forEach((element) => {
      resultCoordString += "[" + element["lng"] + "," + element["lat"] + "],";
    });
    resultCoordString = resultCoordString.substring(
      0,
      resultCoordString.length - 1
    );
    resultCoordString += "]]]}}";

    console.log(resultCoordString);
  }
});
