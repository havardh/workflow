// @flow
/* eslint-env jest */
import { convert } from '../../src/tree_convert';

describe('tree_convert(tree)', () => {
  it('should unwrap single item layouts', () => {
    const input = { layout: 'splith', children: [{ id: 'app1' }] };
    const expected = { id: 'app1' };

    const actual = convert(input);

    expect(actual).toEqual(expected);
  });

  it('should link items in multi item layouts', () => {
    const input = {
      layout: 'splith',
      children: [{ id: 'app1' }, { id: 'app2' }, { id: 'app3' }],
    };
    const expected = { id: 'app1', splith: { id: 'app2', splith: { id: 'app3' } } };

    const actual = convert(input);

    expect(actual).toEqual(expected);
  });

  it('should link multi level layouts', () => {
    const input = {
      layout: 'splith',
      children: [
        {
          layout: 'splitv',
          children: [{ id: 'app1' }, { id: 'app2' }],
        },
        { id: 'app3' },
      ],
    };
    const expected = {
      first: 'splith',
      id: 'app1',
      splitv: { id: 'app2' },
      splith: { id: 'app3' },
    };

    const actual = convert(input);

    expect(actual).toEqual(expected);
  });

  it('should convert complex', () => {
    const input = {
      layout: 'splith',
      children: [
        {
          layout: 'splitv',
          children: [
            { id: 1 },
            {
              layout: 'splith',
              children: [{ id: 3 }, { id: 5 }, { id: 6 }],
            },
            { id: 4 },
          ],
        },
        { id: 2 },
      ],
    };

    const expected = {
      id: 1,
      first: 'splith',
      splitv: {
        id: 3,
        first: 'splitv',
        splitv: { id: 4 },
        splith: {
          id: 5,
          splith: {
            id: 6,
          },
        },
      },
      splith: {
        id: 2,
      },
    };

    const actual = convert(input);

    expect(actual).toEqual(expected);
  });
});
