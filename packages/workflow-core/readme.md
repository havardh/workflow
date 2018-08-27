# workflow-core

Workflow is an experiment in declarative virtual workspace management. Workflow aims to simplify navigating
complex window configurations. It does so by letting the user define layouts and
a way to easily navigate between them. Workflow is meant to be an abstraction
layer on top of window managers like i3, awesome, and the proprietary ones found in
OSX and Windows.

For more documentation checkout the [Repository on github](https://www.github.com/havardh/workflow).

## Documentation

The `workflow-core` module contains a single function. This function accepts
a configuration object to builds a facade which can be used to execute
workflow. The `workflow-cmd` module read the workflow-home `config.js` file
and builds the facade and contains a `run` function which uses the facade
to provide the functionality of the command `workflow`.

```
const workflow = require('workflow-core').workflow(config);
```

### The configuration object

```
const config = {

  resolvers: [
    {
      function resolve(path) {
        // Returns the absolute path of a flow found with the `path` argument.
        // Throws an error if the flow is not found or is a directory.
      },
      function alternatives(path) {
        // Returns a list of possible flows filtered by the path argument.
        // Throws an error if the path or dirname(path) is not a directory.
        // Returns an empty list if no files are found.
      }
    }
  ],
  
  loaders: [
    {
      loader: { 
        function load(path) {
          // Load the flow found on the path.
          // Throws an error if the flow could not be loaded by the loader
        } 
      },
      
      function filter(path) {
        // Optional function to determine if the loader should be used for the path.
        // If the function returns false, the loader is skipped.
        // If the function is not defined, the loader is always used
      } 
    }
  ], 
  
  argumentParser: {
    function parse(flow, argv) {
      // parses the arguments given in argv as defined by the flow
    }
  },
  
  transformers: [
    { 
      function transform(flow, args) {
        // Performs a transform to and from a valid `AFT`.
      }
    }
  ],
  
  layout: { 
    function layout(args, { screen }) {
      // Performs a transformation from an `AFT` to a `CFT` which 
      // supported by the windows manager adapter
    }
  }
  
  wm: {
    function screen() {
      // Returns the dimensions of the screen 
    },
    
    function apply(flow) {
      // Applies the flow by opening applications and position them
      // on the screen.
    }
  }

};

```

### The facade

```
const workflow = {
  
  // Call all available resolvers and return the absolute path 
  //returned by the first resolver which provides a valid result
  resolve(path: string): string,
  
  // Ask all resolvers for the valid paths the can resolve 
  // and return the combined results
  alternatives(path: string): Array<string>,
  
  // Ask all loaders to load the flow at given at the absolute path.
  // The result of the first loader that loads the file without any 
  // errors is returned. 
  load(path: string): Flow,
  
  // Parse the command line arguments require by the Flow
  parseArguments(flow: Flow, args: Array<string>): Args,
  
  // Preform any transformation on the Flow
  transform(flow: Flow, args: Args): Flow,
  
  // Convert the Flow given as a `AFT` into the corresponding flow 
  // as a `CFT`. Refer to the `workflow-layout` package for addition details.
  layout(flow: Flow, config: {screen: Screen}): Flow,
  
  // Returns the screen dimensions
  screen(): Screen,
  
  // Applies the Flow by opening applications and positioning then
  // on the screen.
  apply(flow: Flow): void
}
```
