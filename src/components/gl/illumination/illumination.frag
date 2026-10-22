precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform vec3 uColorAccent;

varying vec2 v_coordinates;

#include <common>

#pragma glslify: snoise = require(glsl-noise/simplex/2d)

float random(vec2 co) {
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main (void) {
  vec2 animate = vec2(cos(uTime * .1) + uMouse.x, sin(uTime * .08) + uMouse.y);
  vec3 color = vec3(1.);
  
  float noise = snoise(v_coordinates.yx * .1 + animate.x * 1.4) * snoise(v_coordinates.yx * .4 + animate.y * 1.4);
  color -= clamp(sin(v_coordinates.x * 0.75 + noise) * sin(v_coordinates.y + noise), 0., 1.) * (1. - uColorPrimary);
  color -= clamp(cos(v_coordinates.x + 0.75 + noise) * sin(v_coordinates.y + noise), 0., 1.) * (1. - uColorSecondary);
  color -= clamp(sin(v_coordinates.x * 0.75 + noise) * cos(v_coordinates.y + noise), 0., 1.) * (1. - uColorAccent);

  // float intensity = .15;
  // color += (cos((v_coordinates.x - animate.x) * PI) + sin((v_coordinates.y + (animate.y - .5)) * PI)) * intensity + intensity;

  // texture(ザラザラ)
  color += random(v_coordinates * 2.) * .2;

  gl_FragColor = vec4(color, 1.);
}
