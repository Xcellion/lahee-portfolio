precision highp float;

attribute vec2 position;

varying vec2 v_coordinates;

// The original three.js mesh was a quad scaled past the screen edges, so the
// visible area spans v_coordinates 0.2–0.8. Reproduce that on a screen quad.
void main (void) {
  v_coordinates = position * .3 + .5;
  gl_Position = vec4(position, 0., 1.);
}
