const parse = (inputComponent) => {
  function parseComponent(inputComp) {
    inputComp.render();

    return inputComp;
  }

  function tree() {
    return parseComponent(inputComponent).tree();
  }

  return { tree };
};

export default parse;
