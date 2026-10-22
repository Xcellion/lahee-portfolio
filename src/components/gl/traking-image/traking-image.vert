precision highp float;

uniform vec2 uXY;
uniform vec2 uViewport;
uniform vec2 uRectSize;
uniform vec2 uCanvasSize;
uniform float uVelocity;

varying vec2 vUv;

#include <common>

void main() {
  vUv = uv;

  vec3 pos = position.xyz;
  pos.x *= uRectSize.x / uCanvasSize.x;
  pos.y *= uRectSize.y / uCanvasSize.y;

  pos.x += ((uRectSize.x / uCanvasSize.x - 1.) / 2. + uXY.x / uCanvasSize.x) * uViewport.x;
  pos.y -= ((uRectSize.y / uCanvasSize.y - 1.) / 2. + uXY.y / uCanvasSize.y) * uViewport.y;

  pos.z += sin((6. * (pos.x / uViewport.x)) * PI) * .2 * uVelocity;
  pos.z += sin((6. * (pos.y / uViewport.y)) * PI) * .2 * uVelocity;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}