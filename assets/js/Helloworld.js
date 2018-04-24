function CustomPlugin(options) {}

CustomPlugin.prototype.apply = function(compiler) {

  // Setup callback for accessing a compilation:
  compiler.plugin("compilation", function(compilation) {
    
    // Now setup callbacks for accessing compilation steps:
    compilation.plugin("optimize", function() {
      console.log("Assets build from webpack is in progress.");
    });
  });
  compiler.plugin('done', function() {
    console.log('The Build is sucessfull!'); 
  });
};

module.exports = CustomPlugin;