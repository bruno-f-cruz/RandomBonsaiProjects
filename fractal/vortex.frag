#version 400

#Adapted from https://www.shadertoy.com/view/fdjfDc

uniform vec2 m = vec2(0,0); //Mouse position
uniform int isMouseDown = 0; //is mlb down
uniform float iTime; // shader playback time (in seconds)
uniform float SCALE = 2.0;
uniform float zoom = 500.0;
uniform vec2 offset = vec2(0.5, 0.5);

float PI = radians(180.0);
float TAU = PI*2;

in vec2 texCoord;
out vec4 fragColor;


float CL(float x, float a, float b){
  return smoothstep(0.0,1.0,(2.0/3.0)*(x-a)/(b-a)+(1.0/6.0))*(b-a)+a;
}


void main() {
  float st = radians(-31.0); // start time
  float t = (isMouseDown > 0.0) ? atan(m.x, -m.y) : st + (iTime * TAU) / 3600.0;
  float n = (cos(t) > 0.0) ? sin(t) : 1.0 / sin(t);
  float z = pow(zoom, n); // autozoom
  z = clamp(z, CL(z, 1e-16, 1e-15), CL(z, 1e+17, 1e+18)); // clamp to prevent black screen
  vec2 uv = (texCoord - offset) * SCALE * z;
  float ls = (iTime * TAU) / 5.0; // light animation speed
  float a = atan(uv.x, -uv.y); // screen arc
  float i = a / TAU; // spiral increment 0.5 per 180°
  float r = pow(length(uv), 0.5 / n) - i; // archimedean at 0.5
  float cr = ceil(r); // round up radius
  float wr = cr + i; // winding ratio
  float vd = (cr * TAU + a) / (n * 2.0); // visual denominator
  float vd2 = vd * 2.0;
  vec3 col = vec3(sin(wr * vd + ls)); // blend it

  col *= pow(sin(fract(r) * PI), floor(abs(n * 2.0)) + 5.0); // smooth edges
  col *= sin(vd2 * wr + PI / 2.0 + ls * 2.0); // this looks nice
  col *= 0.2 + abs(cos(vd2)); // dark spirals
  vec3 g = mix(vec3(0), vec3(1), pow(length(uv) / z, -1.0 / n)); // dark gradient
  col = min(col, g); // blend gradient with spiral
  vec3 rgb = vec3(cos(vd2) + 1.0, abs(sin(t)), cos(PI + vd2) + 1.0);
  col += (col * 2.0) - (rgb * 0.5); // add color
  fragColor = vec4(col, 1.0);
}
