/* eslint-env node */
/* eslint-disable no-console */

const ncp = require("ncp").ncp;
const os = require("os");
const npm = require("../src/npm");
const source = "template";
const destination = `${os.homedir()}/.workflow`;
const existsSync = require("fs").existsSync;

if (existsSync(destination)) {
  try {
    const packageJson = require(destination + "/package.json");

    if (packageJson.name === "workflow-user-home") {
      console.log("Workflow home directory found at: " + destination);
      console.log("Update feature is not yet implemented");
      console.log();

      console.log(`Copying: ${__dirname}/${source}/flows -> ${destination}/flows`);
      ncp(source + "/flows", destination + "/flows", { clobber: true }, err => {
        if (err) {
          return console.error(err);
        }
        console.log("All files copied");
      });
    } else {
      console.error("Invalid workflow home folder found at: " + destination);
      console.error(
        "Expected to find package.json with name='workflow-user-home'"
      );
      console.error();
      process.exit(1);
    }
  } catch (e) {
    console.error("Invalid workflow home folder found at: " + destination);
    console.error("Expected to find package.json");
    console.error();
    process.exit(2);
  }
} else {
  console.log("Installing workflow");
  console.log(" - cli tool (workflow)");
  console.log(` - home folder (${destination})`);
  console.log();

  console.log(`Copying: ${__dirname}/${source} -> ${destination}`);
  ncp(source, destination, { clobber: false }, err => {
    if (err) {
      return console.error(err);
    }
    console.log("All files copied");

    console.log("Running npm install");
    npm.cwd(destination).install(err => {
      if (err) {
        return console.error(err);
      }

      console.log(
        "Workflow should be ready for use. You can test it out with the following command:"
      );
      console.log();
      console.log("  workflow Example");
      console.log();
      console.log(
        "If you experience any problems, please create an issue here:"
      );
      console.log("  https://github.com/havardh/workflow/issues");
      console.log();
    });
  });
}
