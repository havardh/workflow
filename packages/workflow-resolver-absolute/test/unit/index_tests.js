/* eslint-env node, jest */
import { resolve, join } from 'path';
import { WorkflowResolverAbsolute } from '../../src/index';

describe('WorkflowResolverAbsolute', () => {
  const resolver = new WorkflowResolverAbsolute();

  describe('alternatives', () => {
    it('should suggest file when path is a file', async () => {
      const path = resolve(__filename);
      const file = await resolver.alternatives(path);

      expect(file).toEqual([path]);
    });

    it('should suggest files when path is directory', async () => {
      const path = resolve(__dirname);
      const file = await resolver.alternatives(path);

      expect(file).toEqual([resolve(__filename)]);
    });

    it('should filter out non-matching files when path is non-complete', async () => {
      const path = __dirname;
      const file = await resolver.alternatives(join(path, 'not_found'));

      expect(file).toEqual([]);
    });

    it('should include matching files when path is non-complete', async () => {
      const path = __dirname;
      const file = await resolver.alternatives(join(path, 'ind'));

      expect(file).toEqual([__filename]);
    });
  });

  describe('resolve', () => {
    it('should resolve to absulute path when found', async () => {
      const absolutePath = await resolver.resolve(resolve(__filename));

      expect(absolutePath).toEqual(resolve(__filename));
    });

    it('should throw error when path does not exist', async () => {
      const path = join(__dirname, 'not_found');
      try {
        await resolver.resolve(path);
        fail('Should throw error when path does not exist'); // eslint-disable-line no-undef
      } catch (e) {
        expect(e.message).toEqual(`Could not find file ${path}`);
      }
    });

    it('should throw error when path is directory', async () => {
      const path = resolve(__dirname);
      try {
        await resolver.resolve(path);
        fail('Should throw error when path is a directory'); // eslint-disable-line no-undef
      } catch (e) {
        expect(e.message).toEqual(`Path '${path}' is a directory`);
      }
    });
  });
});
