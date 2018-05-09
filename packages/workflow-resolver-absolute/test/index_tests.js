/* eslint-env node, jest */
import {join} from "path";
import WorkflowResolverAbsolute from "../src/index";

describe("WorkflowResolverRelative", () => {
  const resolver = new WorkflowResolverAbsolute();

  describe("absolute", () => {

    it("should suggest file when path is a file", async () => {
      const path = __filename;
      const file = await resolver.alternatives(path);

      expect(file).toEqual(([path]));
    });

    it("should suggest files when path is directory", async () => {
      const path = __dirname;
      const file = await resolver.alternatives(path);

      expect(file).toEqual(([
        join(__dirname, "__snapshots__"),
        __filename
      ]));
    });

    it("should filter out non-matching files when path is non-complete", async () => {
      const path = __dirname;
      const file = await resolver.alternatives(join(path, "not_found"));

      expect(file).toEqual(([]));
    });

    it("should include matching files when path is non-complete", async () => {
      const path = __dirname;
      const file = await resolver.alternatives(join(path, "ind"));

      expect(file).toEqual(([__filename]));
    });
  });

  describe("resolve", () => {
    it("should resolve to absulute path when found", async () => {
      const absolutePath = await resolver.resolve(__filename);

      expect(absolutePath).toEqual(__filename);
    });

    it("should throw error when path does not exist", async () => {
      await expect(resolver.resolve(join(__dirname, "not_found")))
        .rejects.toMatchSnapshot();
    });

    it("should throw error when path is directory", async () => {
      await expect(resolver.resolve(__dirname))
        .rejects.toMatchSnapshot();
    });
  });

});