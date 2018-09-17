/* eslint-env jest */
import { WorkflowLayout } from '../../src/index';

const screen = { top: 0, left: 0, width: 1024, height: 768 };
const Layout = new WorkflowLayout();

it('should make single app fit to screen', () => {
  const tree = workspace()
    .child(app().build())
    .build();

  const actual = Layout.layout(tree, { screen });

  expect(actual).toEqual(
    workspace()
      .position(0, 0, 1024, 768)
      .child(
        app()
          .position(0, 0, 1024, 768)
          .build()
      )
      .build()
  );
});

it('should make single app in fill layout fit to screen', () => {
  const tree = workspace()
    .child(
      fill()
        .children(app().build())
        .build()
    )
    .build();

  const actual = Layout.layout(tree, { screen });

  expect(actual).toEqual(
    workspace()
      .position(0, 0, 1024, 768)
      .child(
        fill()
          .position(0, 0, 1024, 768)
          .children(
            app()
              .position(0, 0, 1024, 768)
              .build()
          )
          .build()
      )
      .build()
  );
});

it('splitv should split screen vertically', () => {
  const tree = workspace()
    .child(
      splitv()
        .percent(1.0)
        .children(
          app()
            .percent(0.5)
            .build(),
          app()
            .percent(0.5)
            .build()
        )
        .build()
    )
    .build();

  const actual = Layout.layout(tree, { screen });

  expect(actual).toEqual(
    workspace()
      .position(0, 0, 1024, 768)
      .child(
        splitv()
          .percent(1.0)
          .position(0, 0, 1024, 768)
          .children(
            app()
              .percent(0.5)
              .position(0, 0, 1024, 384)
              .build(),
            app()
              .percent(0.5)
              .position(0, 384, 1024, 384)
              .build()
          )
          .build()
      )
      .build()
  );
});

it('splith should split screen horizontally', () => {
  const tree = workspace()
    .child(
      splith()
        .percent(1.0)
        .children(
          app()
            .percent(0.5)
            .build(),
          app()
            .percent(0.5)
            .build()
        )
        .build()
    )
    .build();

  const actual = Layout.layout(tree, { screen });

  expect(actual).toEqual(
    workspace()
      .position(0, 0, 1024, 768)
      .child(
        splith()
          .percent(1.0)
          .position(0, 0, 1024, 768)
          .children(
            app()
              .percent(0.5)
              .position(0, 0, 512, 768)
              .build(),
            app()
              .percent(0.5)
              .position(512, 0, 512, 768)
              .build()
          )
          .build()
      )
      .build()
  );
});

it('relative should set position exactly on app', () => {
  const tree = workspace()
    .child(
      relative()
        .position(100, 100, 200, 200)
        .children(app().build())
        .build()
    )
    .build();

  const actual = Layout.layout(tree, { screen });

  expect(actual).toEqual(
    workspace()
      .position(0, 0, 1024, 768)
      .child(
        float()
          .position(100, 100, 200, 200)
          .children(
            app()
              .position(100, 100, 200, 200)
              .build()
          )
          .build()
      )
      .build()
  );
});

it('relative should be relative to parent', () => {
  const tree = workspace()
    .child(
      splitv()
        .children(
          fill()
            .percent(0.5)
            .children(
              relative()
                .position(100, 100, 200, 200)
                .children(app().build())
                .build()
            )
            .build(),
          fill()
            .percent(0.5)
            .children(
              relative()
                .position(100, 100, 200, 200)
                .children(app().build())
                .build()
            )
            .build()
        )
        .build()
    )
    .build();

  const actual = Layout.layout(tree, { screen });

  expect(actual).toEqual(
    workspace()
      .position(0, 0, 1024, 768)
      .child(
        splitv()
          .position(0, 0, 1024, 768)
          .children(
            fill()
              .percent(0.5)
              .position(0, 0, 1024, 384)
              .children(
                float()
                  .position(100, 100, 200, 200)
                  .children(
                    app()
                      .position(100, 100, 200, 200)
                      .build()
                  )
                  .build()
              )
              .build(),
            fill()
              .percent(0.5)
              .position(0, 384, 1024, 384)
              .children(
                float()
                  .position(100, 484, 200, 200)
                  .children(
                    app()
                      .position(100, 484, 200, 200)
                      .build()
                  )
                  .build()
              )
              .build()
          )
          .build()
      )
      .build()
  );
});

it('absolute should set position of app', () => {
  const tree = workspace()
    .child(
      absolute()
        .position(100, 100, 200, 200)
        .children(app().build())
        .build()
    )
    .build();

  const actual = Layout.layout(tree, { screen });

  expect(actual).toEqual(
    workspace()
      .position(0, 0, 1024, 768)
      .child(
        float()
          .position(100, 100, 200, 200)
          .children(
            app()
              .position(100, 100, 200, 200)
              .build()
          )
          .build()
      )
      .build()
  );
});

it('absolute should be relative to screen', () => {
  const tree = workspace()
    .child(
      splitv()
        .children(
          fill()
            .percent(0.5)
            .children(
              absolute()
                .position(100, 100, 200, 200)
                .children(app().build())
                .build()
            )
            .build(),
          fill()
            .percent(0.5)
            .children(
              absolute()
                .position(100, 100, 200, 200)
                .children(app().build())
                .build()
            )
            .build()
        )
        .build()
    )
    .build();

  const actual = Layout.layout(tree, { screen });

  expect(actual).toEqual(
    workspace()
      .position(0, 0, 1024, 768)
      .child(
        splitv()
          .position(0, 0, 1024, 768)
          .children(
            fill()
              .percent(0.5)
              .position(0, 0, 1024, 384)
              .children(
                float()
                  .position(100, 100, 200, 200)
                  .children(
                    app()
                      .position(100, 100, 200, 200)
                      .build()
                  )
                  .build()
              )
              .build(),
            fill()
              .percent(0.5)
              .position(0, 384, 1024, 384)
              .children(
                float()
                  .position(100, 100, 200, 200)
                  .children(
                    app()
                      .position(100, 100, 200, 200)
                      .build()
                  )
                  .build()
              )
              .build()
          )
          .build()
      )
      .build()
  );
});

it('custom should be evaluated', () => {
  const custom = () =>
    layout((node, { position, screen }) => {
      const { children } = node;

      let sum = children.map(({ size }) => size).reduce((a, b) => a + b);

      let startLeft = (screen.width - sum) / 2;

      return {
        type: 'layout',
        layout: 'relative',
        position,
        children: children.map(child => {
          const position = {
            left: startLeft,
            top: (screen.height - child.size) / 2,
            width: child.size,
            height: child.size,
          };
          startLeft += child.size;
          return absolute()
            .position(position.left, position.top, child.size, child.size)
            .children({ ...child, position })
            .build();
        }),
      };
    });

  const tree = workspace()
    .child(
      custom()
        .children(
          app()
            .size(200)
            .build(),
          app()
            .size(200)
            .build(),
          app()
            .size(200)
            .build(),
          app()
            .size(200)
            .build()
        )
        .build()
    )
    .build();

  const actual = Layout.layout(tree, { screen });

  expect(actual).toEqual(
    workspace()
      .position(0, 0, 1024, 768)
      .children(
        float()
          .position(0, 0, 1024, 768)
          .children(
            float()
              .position(112, 284, 200, 200)
              .children(
                app()
                  .size(200)
                  .position(112, 284, 200, 200)
                  .build()
              )
              .build(),
            float()
              .position(312, 284, 200, 200)
              .children(
                app()
                  .size(200)
                  .position(312, 284, 200, 200)
                  .build()
              )
              .build(),
            float()
              .position(512, 284, 200, 200)
              .children(
                app()
                  .size(200)
                  .position(512, 284, 200, 200)
                  .build()
              )
              .build(),
            float()
              .position(712, 284, 200, 200)
              .children(
                app()
                  .size(200)
                  .position(712, 284, 200, 200)
                  .build()
              )
              .build()
          )
          .build()
      )
      .build()
  );
});

function workspace() {
  return {
    workspace: { type: 'workspace' },
    position(left, top, width, height) {
      this.workspace.position = { top, left, width, height };
      return this;
    },
    child(child) {
      this.workspace.children = [child];
      return this;
    },
    children(...children) {
      this.workspace.children = children;
      return this;
    },
    build() {
      return this.workspace;
    },
  };
}

function layout(layout) {
  return {
    layout: { type: 'layout', layout },
    percent(p) {
      this.layout.percent = p;
      return this;
    },
    position(left, top, width, height) {
      this.layout.position = { top, left, width, height };
      return this;
    },
    children(...children) {
      this.layout.children = children;
      return this;
    },
    build() {
      return this.layout;
    },
  };
}

const fill = () => layout('fill');
const splith = () => layout('splith');
const splitv = () => layout('splitv');
const relative = () => layout('relative');
const absolute = () => layout('absolute');
const float = () => layout('float');

function app() {
  return {
    app: { type: 'app' },
    percent(p) {
      this.app.percent = p;
      return this;
    },
    size(size) {
      this.app.size = size;
      return this;
    },
    position(left, top, width, height) {
      this.app.position = { top, left, width, height };
      return this;
    },
    build() {
      return this.app;
    },
  };
}
