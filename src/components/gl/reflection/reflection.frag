precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;

varying vec2 v_coordinates;

#pragma glslify: snoise = require(glsl-noise/simplex/2d)
#pragma glslify: ease = require(glsl-easings/cubic-in-out)

#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)

void main(void) {
  vec2 animate = vec2(cos(uTime * .2) * .5 - uMouse.x, sin(uTime * .15) * .5 - uMouse.y);
  vec3 color = vec3(1.);
  color.b = snoise(v_coordinates.xy * .4 + animate.x * .8);
  color.g = snoise(v_coordinates.xy * .4 + animate.y * .8) + snoise(v_coordinates.xy * .8 + animate.x * .8);
  color.g *= .6;
  color.r *= 1.2;

  color.b += cos(animate.x) * .4;
  // color.g += sin(animate.y) * .4;
  color.rb += cos(animate.y) * .4;
  color.b = linearstep(0., 1., color.b);
  color.g = linearstep(0., 1., color.g);
  color.r = linearstep(0., 1., color.r);

  float opacity = clamp(((.5 - abs(uScroll - .5)) * 3.), 0., 1.);
  vec3 bgColor = vec3(245. / 255.);
  color = bgColor + (color - bgColor) * ease(opacity);

  gl_FragColor = vec4(color, 1.);
}
