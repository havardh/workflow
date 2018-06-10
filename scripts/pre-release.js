const semver = require("semver");
const { readdirSync, writeFileSync } = require("fs");
const { execSync } = require("child_process");
const { resolve, join } = require("path");

const [node, script, f1, f2, f3, f4] = process.argv;
const args = [f1,f2,f3,f4];
const flags = parseFlags(args);

const isPackage = name => name.startsWith("workflow-");

const files = readdirSync(resolve("packages"));
const packages = files.filter(isPackage).map(readPackage);

function tagName(name, version) {
  return name + "-v" + version;
}

const rollup = {
  build: () => execSync("rollup -c " + join(__dirname, "..", "rollup.config.js")).toString()
}

const git = {
  branch: () => {
    return execSync("git rev-parse --abbrev-ref HEAD").toString();
  },
  tag: (name, version) => {
    return execSync("git tag -a " + tagName(name, version) + " -m \"release: " + name + " " + version +"\""),toString();
  },
  findTag: (name) => {
    try {
      return execSync("git rev-list -n 1 " + name + " --", {stdio: "ignore"}).toString();
    } catch (error) {
      return "";
    }
  },
  log: ({path, oneline, range}) => {
    return execSync("git log --oneline " + path + " " + range).toString().split("\n");
  },
  add: (filename) => {
    return execSync("git add " + filename).toString();
  },
  commit(msg) {
    return execSync("git commit -m \"" + msg + "\"").toString();
  }
}

function parseFlags(args) {
  const flags = {};

  for (let arg of args) {
    if (arg === "--pre") {
      flags.pre = true;
    } else if (arg === "--beta") {
      flags.beta = true;
    } else if (arg === "--dry-run") {
      flags.dryRun = true;
    } else if (arg !== undefined) {
      console.log("Command line argument ignored: " + arg);
    }
  }

  return flags;
}

function getLevel(name, version, pre) {

  const hash = git.findTag(tagName(name, version));

  const commits = git.log({
    path: "packages/" + name,
    oneline: true,
    range: hash ? hash + "...HEAD" : ""
  });

  let level = "patch";
  for (let commit of commits) {
    if (commit && commit.split(' ')[1].startsWith("feat")) {
      level = "minor";
    }
  }

  return pre ? "pre" + level : level;

}

function resolvePackage(name) {
  return join(__dirname, "..", "packages", name);
}

function resolvePackageJson(name) {
  return join(resolvePackage(name), "package.json");
}

function readPackage(name) {
  return {name, json: require(resolvePackageJson(name))};
}

// Update versions
const versions = {};
console.log("Update next version for each package")
for (let {name, json} of packages) {
  const {version} = json;
  const level = getLevel(name, version, flags.pre);
  const newVersion = semver.inc(json.version, level, flags.beta && "beta");

  json.version = newVersion;
  versions[name] = newVersion;
}

// Update dependencies
console.log("Update version of updated dependencies");
for (let {name, json} of packages) {
  const {dependencies, devDependencies} = json;

  for (let dependencyName in dependencies) {
    if (versions[dependencyName]) {
      dependencies[dependencyName] = versions[dependencyName];
    }
    if (!versions[name]) {
      console.error("ERR: Dependency", dependencyName, "of", name, "was updated, but", name, "iself is not updated.");
      console.log("No changes has been written");
      process.exit(1);
    }
  }

  for (let dependencyName in devDependencies) {
    if (versions[dependencyName]) {
      devDependencies[dependencyName] = versions[dependencyName];
      if (!versions[name]) {
        console.error("ERR: Dependency", dependencyName, "of", name, "was updated, but", name, "iself is not updated.");
        console.log("No changes has been written");
        process.exit(1);
      }
    }
  }
}


if (flags.dryRun) {
  console.log("Dry run.")
  for (let {name, json} of packages) {
    const oldVersion = readPackage(name).json.version;
    const newVersion = json.version;

    console.log(name + ":", oldVersion, "->", newVersion);
  }

  console.log("Exit without writing changes");
  process.exit(0);
}

// Write package.json files
console.log("Writing updated package.json");
for (let {name, json} of packages) {
  const filename = resolvePackageJson(name);
  const content = JSON.stringify(json, null, 2) + "\n";

  writeFileSync(filename, content);
}

// Create release commit
console.log("Creating git commit");
for (let {name} of packages) {
  git.add(resolvePackageJson(name));
}
git.commit("chore: release new versions\n\n" + packages.map(({name, json}) => name + ": " + json.version).join("\n"))

// Create git tags
console.log("Creating git tag per package")
for (let {name, json} of packages) {
  git.tag(name, json.version);
}

// Build packages
console.log("Creating bundles")
rollup.build();

console.log("Pre release script finished successfully");
console.log("Ready to release packages and push release commit and tags.")

/* Helpers */
