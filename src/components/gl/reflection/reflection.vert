precision highp float;

uniform vec2 uViewport;

varying vec2 v_coordinates;

void main (void) {
  v_coordinates = position.xy * .5 + .5;
  vec3 pos = position.xyz;

  pos.xy = pos.xy * uViewport.xy;
  pos.z -= 1.;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}