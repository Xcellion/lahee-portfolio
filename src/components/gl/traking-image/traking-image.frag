varying vec2 vUv;

uniform sampler2D uTexture;

uniform vec2 uResolution;
uniform vec2 uRectSize;
uniform float uOpacity;

#pragma glslify: ease = require(glsl-easings/cubic-in-out)

// object-fit: cover
vec2 getCoverUv(vec2 inputUv) {
  vec2 uv = inputUv - .5;
  if (floor(uRectSize.x - uRectSize.y) > 0.) {
    uv.y *= (uRectSize.y / uRectSize.x) * (uResolution.x / uResolution.y);
    return uv + .5;
  }
  uv.x *= (uRectSize.x / uRectSize.y) * (uResolution.y / uResolution.x);
  return uv + .5;
}

void main() {
  vec2 uv = getCoverUv(vUv);

  vec3 color = texture2D(uTexture, uv).rgb;

  color = 1. + (color - 1.) * ease(uOpacity);
  gl_FragColor = vec4(color, ease(uOpacity));
}
