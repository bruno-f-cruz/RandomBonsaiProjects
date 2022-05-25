#version 400
uniform sampler2D tex;
uniform vec2 center = vec2(0,0);
uniform float scale = 1;
uniform int iter = 40;

in vec2 texCoord;
out vec4 fragColor;

			
void main() {
    vec2 z, c;

    c.x = 1.3333 * (texCoord.x - 0.5) * scale - center.x;
    c.y = (texCoord.y - 0.5) * scale - center.y;

    int i;
    z = c;
    for(i=0; i<iter; i++) {
        float x = (z.x * z.x - z.y * z.y) + c.x;
        float y = (z.y * z.x + z.x * z.y) + c.y;

        if((x * x + y * y) > 4.0) break;
        z.x = x;
        z.y = y;
    }
	  vec2 texCoordAim = vec2((i == iter ? 0.0 : float(i)) / 100.0, 0.5);
    fragColor = texture(tex, texCoordAim);
}
			
