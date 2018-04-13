// @flow
/* eslint-env jest */
import convert from '../../src/tree_convert';

describe('tree_convert(tree)', () => {
  it('should unwrap single item layouts', () => {
    const input = { layout: 'horizontal', children: [{ id: "app1"}] };
    const expected = { id: "app1" };

    const actual = convert(input);

    expect(actual).toEqual(expected);
  });

  it('should link items in multi item layouts', () => {
    const input = { layout: 'horizontal', children: [
      { id: "app1" },
      { id: "app2" },
      { id: "app3" }
    ] };
    const expected = { id: "app1", horizontal: { id: "app2", horizontal: { id: "app3" } } };

    const actual = convert(input);

    expect(actual).toEqual(expected);
  });

  it("should link multi level layouts", () => {
    const input = { layout: 'horizontal', children: [
      {
        layout: 'vertical',
        children: [
          { id: "app1" },
          { id: "app2" },
        ]
      },
      { id: "app3" }
    ] };
    const expected = { first: "horizontal", id: "app1", vertical: { id: "app2"}, horizontal: { id: "app3" } };

    const actual = convert(input);

    expect(actual).toEqual(expected);
  });

  it("should convert complex", () => {
    const input = { layout: "horizontal", children: [
        { layout: "vertical", children: [
            { id: 1 },
            { layout: "horizontal", children: [
                { id: 3 },
                { id: 5 },
                { id: 6 }
              ]
            },
            { id: 4 }
          ]
        },
        { id: 2 }
      ]
    };

    const expected = {
      id: 1,
      first: 'horizontal',
      vertical: {
        id: 3,
        first: 'vertical',
        vertical: { id: 4 },
        horizontal: {
          id: 5,
          horizontal: {
            id: 6
          }
        }
      },
      horizontal: {
        id: 2
      }
    };

    const actual = convert(input);

    expect(actual).toEqual(expected);    
  });
});
