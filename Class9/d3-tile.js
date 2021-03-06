// https://d3js.org/d3-tile/ Version 0.0.3. Copyright 2016 Mike Bostock.
//File copied from Mike Bostock and reused for educational purposes
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-array'], factory) :
  (factory((global.d3 = global.d3 || {}),global.d3));
}(this, function (exports,d3Array) { 'use strict';

  function tile() {
    var x0 = 0,
        y0 = 0,
        x1 = 960,
        y1 = 500,
        tx = (x0 + x1) / 2,
        ty = (y0 + y1) / 2,
        scale = 256,
        zoomDelta = 0,
        wrap = true;

    function tile() {
      var z = Math.max(Math.log(scale) / Math.LN2 - 8, 0),
          z0 = Math.round(z + zoomDelta),
          j = 1 << z0,
          k = Math.pow(2, z - z0 + 8),
          x = tx - scale / 2,
          y = ty - scale / 2,
          tiles = [],
          cols = d3Array.range(
            Math.max(wrap ? -Infinity : 0, Math.floor((x0 - x) / k)),
            Math.min(Math.ceil((x1 - x) / k), wrap ? Infinity : j)
          ),
          rows = d3Array.range(
            Math.max(0, Math.floor((y0 - y) / k)),
            Math.min(Math.ceil((y1 - y) / k), j)
          );

      rows.forEach(function(y) {
        cols.forEach(function(x) {
          var d = [(x % j + j) % j, y, z0];
          d.x = x * 256;
          d.y = y * 256;
          tiles.push(d);
        });
      });

      tiles.translate = [x / k, y / k];
      tiles.scale = k;
      return tiles;
    }

    tile.size = function(_) {
      return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], tile) : [x1, y1];
    };

    tile.extent = function(_) {
      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], tile) : [[x0, y0], [x1, y1]];
    };

    tile.scale = function(_) {
      return arguments.length ? (scale = +_, tile) : scale;
    };

    tile.translate = function(_) {
      return arguments.length ? (tx = +_[0], ty = +_[1], tile) : [tx, ty];
    };

    tile.zoomDelta = function(_) {
      return arguments.length ? (zoomDelta = +_, tile) : zoomDelta;
    };

    tile.wrap = function(_) {
      return arguments.length ? (wrap = _, tile) : wrap;
    };

    return tile;
  }

  exports.tile = tile;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
