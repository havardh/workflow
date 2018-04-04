const screenshot = require("desktop-screenshot");
const Path = require("path");

const filename = process.argv[2];

if (!filename) {
    console.error("Missing file name parameter");
    process.exit(1);
}

const path = Path.resolve(process.cwd(), filename);

screenshot(path, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Screenshot saved as: ", path);     
    }
});
  