/* eslint-env node, jest */
import {dirname, join} from "path";
import WorkflowResolverRelative from "../../src/index";

const path = dirname(__dirname);

describe("WorkflowResolverRelative", () => {

  describe("without filter", () => {
    const resolver = new WorkflowResolverRelative({path});

    describe("alternatives", () => {

      it("should suggest all files in the root folder", async () => {
        const files = await resolver.alternatives("");

        expect(files).toEqual([
          "Readme.md",
          "index.js",
          "package.json",
          "src",
          "test",
        ]);
      });

      it("should suggest all files in the root with with a given a prefix", async () => {
        const files = await resolver.alternatives("index");

        expect(files).toEqual(["index.js"]);
      });

      it("should suggest all files in a relative folder from the root with the relative prefix", async () => {
        const files = await resolver.alternatives("unit");

        expect(files).toEqual([
          "unit/__snapshots__",
          "unit/index_tests.js"
        ]);
      });

      it.only("should suggest files in a relative folder with a given prefix", async () => {
        const files = await resolver.alternatives("unit/index");

        expect(files).toEqual([
          "unit/index_tests.js"
        ]);
      });

      it("should sugggest empty list when prefix does not match files", async () => {
        const files = await resolver.alternatives("nope");

        expect(files).toEqual([]);
      });
    });

    describe("resolve", () => {
      it("should resolve file in root to absolute path", async () => {
        const absolutePath = await resolver.resolve("index.js");

        expect(absolutePath).toEqual(join(path, "index.js"));
      });

      it("should throw an error when the file is not found", async () => {
        await expect(resolver.resolve("not_found.js"))
          .rejects.toMatchSnapshot();
      });

      it("should resolve file in folder relative to root to absolute path", async () => {
        const absolutePath = await resolver.resolve("unit/index_tests.js");

        expect(absolutePath).toEqual(join(path, "unit", "index_tests.js"));
      });

      it("should throw error when resolving a directory", async () => {
        await expect(resolver.resolve("src"))
          .rejects.toMatchSnapshot();
      })
    });
  });

  describe("with filter", () => {
    const filter = /.*js$/;
    const resolver = new WorkflowResolverRelative({path, filter});

    describe("alternatives", () => {
      it("should suggest filtered files in root", async () => {
        const files = await resolver.alternatives("");

        expect(files).toEqual(["index.js"])
      });

      it("should suggest filtered files in the root with prefix", async () => {
        const files = await resolver.alternatives("Re");

        expect(files).toEqual([]);
      });

      it("should suggest filtered files in relative directory", async () => {
        const files = await resolver.alternatives("src");

        expect(files).toEqual(["src/index.js"]);
      });

      it("should suggest filtered files in relative directory", async () => {
        const filter = /.*.jsx$/;
        const resolver = new WorkflowResolverRelative({path, filter})

        const files = await resolver.alternatives("src");

        expect(files).toEqual([]);
      });
    });

    describe("resolve", () => {
      it("should resolve file in root to absolute path", async () => {
        const absolutePath = await resolver.resolve("index.js");

        expect(absolutePath).toEqual(join(path, "index.js"));
      });

      it("should throw an error when file does not match pattern", async () => {
        await expect(resolver.resolve("package.json"))
          .rejects.toMatchSnapshot();
      })
    });
  });
});
