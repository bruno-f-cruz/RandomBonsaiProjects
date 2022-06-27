#version 400
uniform sampler2D tex;
uniform vec2 center = vec2(0,0);
uniform float fractal_scale = 2;
uniform int iter = 40;
uniform int flip_color = 0;

in vec2 texCoord;
out vec4 fragColor;

			
void main() {
    vec2 z, c;

    c.x = 1.3333 * (texCoord.x - 0.5) * fractal_scale - center.x;
    c.y = (texCoord.y - 0.5) * fractal_scale - center.y;

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
    
    if(flip_color == 0){
      fragColor = texture(tex, texCoordAim);
    }
    else{
      fragColor = texture(tex, texCoordAim);
      fragColor.r = 1 - fragColor.r;
      fragColor.g = 1 - fragColor.g;
      fragColor.b = 1 - fragColor.b;


    }

}
			
