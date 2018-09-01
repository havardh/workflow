/* eslint-env node, jest */
import { join } from 'path';
import WorkflowResolverRelative from '../../src/index';

const path = join(__dirname, '__fixtures__');

describe('WorkflowResolverRelative', () => {
  describe('without filter', () => {
    const resolver = new WorkflowResolverRelative({ path });

    describe('alternatives', () => {
      it('should suggest all files in the root folder', async () => {
        const files = await resolver.alternatives('');

        expect(files).toEqual(['index.js', 'other.js', 'package.json', 'readme.md', 'subdir']);
      });

      it('should suggest all files in the root with with a given a prefix', async () => {
        const files = await resolver.alternatives('index');

        expect(files).toEqual(['index.js']);
      });

      it('should suggest all files in a relative folder from the root with the relative prefix', async () => {
        const files = await resolver.alternatives('subdir');

        expect(files).toEqual([join('subdir', 'another_file.js')]);
      });

      it('should suggest files in a relative folder with a given prefix', async () => {
        const files = await resolver.alternatives(join('subdir', 'another'));

        expect(files).toEqual([join('subdir', 'another_file.js')]);
      });

      it('should sugggest empty list when prefix does not match files', async () => {
        const files = await resolver.alternatives('nope');

        expect(files).toEqual([]);
      });
    });

    describe('resolve', () => {
      it('should resolve file in root to absolute path', async () => {
        const absolutePath = await resolver.resolve('index.js');

        expect(absolutePath).toEqual(join(path, 'index.js'));
      });

      it('should throw an error when the file is not found', async () => {
        try {
          await resolver.resolve('not_found.js');
          fail('Should throw exception when file is not found'); // eslint-disable-line no-undef
        } catch (e) {
          expect(e.message).toEqual("Could not resolve 'not_found.js' relative to " + path);
        }
      });

      it('should resolve file in folder relative to root to absolute path', async () => {
        const absolutePath = await resolver.resolve(join('subdir', 'another_file.js'));

        expect(absolutePath).toEqual(join(path, 'subdir', 'another_file.js'));
      });

      it('should throw error when resolving a directory', async () => {
        await expect(resolver.resolve('subdir')).rejects.toMatchSnapshot();
      });
    });
  });

  describe('with filter', () => {
    const filter = /.*js$/;
    const resolver = new WorkflowResolverRelative({ path, filter });

    describe('alternatives', () => {
      it('should suggest filtered files in root', async () => {
        const files = await resolver.alternatives('');

        expect(files).toEqual(['index.js', 'other.js']);
      });

      it('should suggest filtered files in the root with prefix', async () => {
        const files = await resolver.alternatives('Re');

        expect(files).toEqual([]);
      });

      it('should suggest filtered files in relative directory', async () => {
        const files = await resolver.alternatives('subdir');

        expect(files).toEqual([join('subdir', 'another_file.js')]);
      });

      it('should suggest filtered files in relative directory', async () => {
        const filter = /.*.jsx$/;
        const resolver = new WorkflowResolverRelative({ path, filter });

        const files = await resolver.alternatives('subdir');

        expect(files).toEqual([]);
      });
    });

    describe('resolve', () => {
      it('should resolve file in root to absolute path', async () => {
        const absolutePath = await resolver.resolve('index.js');

        expect(absolutePath).toEqual(join(path, 'index.js'));
      });

      it('should throw an error when file does not match pattern', async () => {
        await expect(resolver.resolve('package.json')).rejects.toMatchSnapshot();
      });
    });
  });
});
