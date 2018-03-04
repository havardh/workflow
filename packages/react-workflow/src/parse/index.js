const parse = (inputComponent) => {
  function parseComponent(inputComponent) {
    inputComponent.render();

    return inputComponent;
  }

  function tree() {
    return parseComponent(inputComponent).tree();
  }

  return { tree };
};

export default parse;
