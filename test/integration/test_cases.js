/* eslint-env node, jest */

export default {
  "term:split": async (applyAndCapture) => {
     const path = `${__dirname}/flows/term-split.js`;

     expect(await applyAndCapture(path)).toMatchImageSnapshot();
  }
};
