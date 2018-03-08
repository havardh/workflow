// @flow
/* eslint-env jest */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import { sandbox } from 'sinon';
import sinonChai from 'sinon-chai';


import * as Git from '../../../src/helpers/git';
import * as Shell from '../../../src/util/shell';
import { findRouteForComponent } from '../../../src/helpers/react_router';

chai.use(sinonChai);

const sinon = sandbox.create();

describe('.findRouteForComponent(file)', () => {
  beforeEach(() => {
    sinon.stub(Git, 'projectRoot');
    sinon.stub(Shell, 'exec');

    // $FlowTodo
    Git.projectRoot.returns('~/dev/project');
    // $FlowTodo
    Shell.exec.returns('something_page.js');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should find project root for file', () => {
    findRouteForComponent('component.js');

    expect(Git.projectRoot).to.have.been.called;
  });

  it('should grep for imports of file in project root', () => {
    findRouteForComponent('~/dev/project/src/my_component.js');

    expect(Shell.exec).to.have.been.calledWith(
      "cd ~/dev/project && git grep 'src/my_component' -- */src/*",
    );
  });

  it('should find the page for the component', () => {
    // $FlowTodo
    Shell.exec.onCall(0).returns(
      `some_container_component.js: import a from "b"
some_other_container_component.js: import a from "b"`);
    // $FlowTodo
    Shell.exec.onCall(1).returns('something_page.js: import b from "c"');

    findRouteForComponent('my_component.js');

    expect(Shell.exec).to.have.been.calledWith(
      "cd ~/dev/project && git grep 'some_container_component' -- */src/*",
    );
    expect(Shell.exec).to.have.been.calledWith(
      "cd ~/dev/project && git grep 'my_component' -- */src/*",
    );
  });

  it('should find router for the page', () => {
    // $FlowTodo
    Shell.exec.returns('something_page.js: import b from "c"');

    findRouteForComponent('my_component.js');

    expect(Shell.exec).to.have.been.calledWith(
      "cd ~/dev/project && git grep 'something_page' -- */src/*",
    );
  });

  it('should find the imported name of the page in the router', () => {
    // $FlowTodo
    Shell.exec.onCall(0).returns('something_page.js: import b from "c"');
    // $FlowTodo
    Shell.exec.onCall(1).returns('router.js: import b from "c"');

    findRouteForComponent('my_component.js');

    expect(Shell.exec).to.have.been.calledWith(
      'cat ~/dev/project/router.js | grep something_page',
    );
  });

  it('should print the router file', () => {
  // $FlowTodo
    Shell.exec.onCall(0).returns('something_page.js: import b from "c"');
    // $FlowTodo
    Shell.exec.onCall(1).returns('router.js: import b from "c"');

    findRouteForComponent('my_component.js');

    expect(Shell.exec).to.have.been.calledWith(
      'cat ~/dev/project/router.js',
    );
  });

  describe('the return value', () => {
    beforeEach(() => {
    // $FlowTodo
      Shell.exec.onCall(0).returns('something_page.js: import b from "c"');
      // $FlowTodo
      Shell.exec.onCall(1).returns('router.js: import b from "c"');
      // $FlowTodo
      Shell.exec.onCall(2).returns('import MyPage from "src/something_page";');
    });

    it('should return the path for a single route element', () => {
    // $FlowTodo
      Shell.exec.onCall(3).returns(`
    import MyPage from "src/something_page";

    <Route path="/" component={MyPage} />
    `);
      const route = findRouteForComponent('my_component.js');

      expect(route).to.equal('/');
    });

    it('should return the path for a nested route element', () => {
    // $FlowTodo
      Shell.exec.onCall(3).returns(`
    import MyPage from "src/something_page";

    <Route path="/"
      <Route path="something" component={MyPage} />
    </Route>
    `);
      const route = findRouteForComponent('my_component.js');

      expect(route).to.equal('//something');
    });

    it('should return the path for a deeply nested route element', () => {
    // $FlowTodo
      Shell.exec.onCall(3).returns(`
    import MyPage from "src/something_page";

    <Route path="/"
      <Route path="deep">
        <Route path="something" component={MyPage} />
      </Route>
    </Route>
    `);
      const route = findRouteForComponent('my_component.js');

      expect(route).to.equal('//deep/something');
    });
  });
});
