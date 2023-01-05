const CONFIG_SCHEMA = process.env.CONFIG_SCHEMA || "config_schema.yaml";
const CONFIG_DIR = process.env.CONFIG_DIR || "./configs";
const CONFIG_EXT = process.env.CONFIG_EXT || ".json";

import chai, { expect } from "chai";
import chaiJsonSchema from "chai-json-schema";
import fs from "fs";
import path from "path";
import stripJsonComments from "strip-json-comments";
import yaml from "yaml";

const schema = yaml.parse(fs.readFileSync(CONFIG_SCHEMA).toString());

chai.use(chaiJsonSchema);

const configsInDir = fs
  .readdirSync(CONFIG_DIR)
  .filter((file) => path.extname(file) === CONFIG_EXT);

configsInDir.forEach((file) => {
  const text = fs.readFileSync(CONFIG_DIR + "/" + file).toString();
  const data = JSON.parse(stripJsonComments(text));

  describe(`Validate '${file}'`, function () {
    it("should be properly validated by the json schema", function () {
      expect(data).to.be.jsonSchema(schema);
    });
  });
});
