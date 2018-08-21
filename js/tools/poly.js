// polygone tool

pg.tools.registerTool({
  id: 'poly',
  name: 'poly'
});

pg.tools.poly = function() {
  var tool;

  var options = {
    edges: 5,
  };

  var components = {
    edges: {
      type: 'int',
      label: 'Edges number',
      min: 1
    },
  };

  var activateTool = function() {

    // get options from local storage if present
    options = pg.tools.getLocalOptions(options);

    tool = new Tool();
    var mouseDown;
    var path;
    var rect;

    tool.onMouseDown = function(event) {
      mouseDown = event.downPoint;
    };

    tool.onMouseDrag = function(event) {
      if(event.event.button > 0) return;  // only first mouse button

      path = new Path.RegularPolygon(event.downPoint, options.edges, event.downPoint.getDistance(event.point))

      if(event.modifiers.alt) {
        path.position = mouseDown;
      }

      path = pg.stylebar.applyActiveToolbarStyle(path);

      // Remove this path on the next drag event:
      path.removeOnDrag();
    };

    tool.onMouseUp = function(event) {
      if(event.event.button > 0) return;  // only first mouse button

      pg.undo.snapshot('poly');
    };

    // setup floating tool options panel in the editor
    pg.toolOptionPanel.setup(options, components, function(){});

    tool.activate();
  };


  return {
    options: options,
    activateTool : activateTool
  };
};