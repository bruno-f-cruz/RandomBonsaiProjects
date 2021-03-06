#version 400
uniform sampler2D tex;
uniform vec2 c;
uniform int iter;
uniform vec2 gain = vec2(3.0, 3.0);
uniform float radius;


in vec2 texCoord;
out vec4 fragColor;


void main() {
    vec2 z;
    z.x = 3.0 * (texCoord.x - 0.5);
    z.y = 3.0 * (texCoord.y - 0.5);


    int i;
    for(i=0; i<iter; i++) {
      float x = (z.x * z.x - z.y * z.y) + c.x;
      float y = (z.x * z.y + z.x * z.y) + c.y;

        if((x * x + y * y) > 10) break;
        z.x = x;
        z.y = y;
    }
    vec2 texCoordAim = vec2((i == iter ? 0.0 : float(i) / float(iter)), 0.5);
    
    fragColor = texture(tex, texCoordAim);
}
