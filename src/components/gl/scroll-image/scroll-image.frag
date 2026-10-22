varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uRectSize;

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

// 角丸のアルファマスク処理
float roundedMask(vec2 uv, vec2 rectSize, float radius) {
  vec2 halfSize = rectSize * 0.5;
  vec2 cornerDist = abs(uv * rectSize - halfSize) - (halfSize - vec2(radius));
  float cornerFactor = length(max(cornerDist, 0.0));
  return 1.0 - smoothstep(radius, radius, cornerFactor);
}

void main() {
  vec2 uv = getCoverUv(vUv);
  vec4 color = texture2D(uTexture, uv);

  float alpha = roundedMask(vUv, uRectSize, 12.0);
  color.a *= alpha;
  if (color.a < 0.01) discard;

  gl_FragColor = color;
}
