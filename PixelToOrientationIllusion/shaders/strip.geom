#version 400
uniform sampler2D tex;
uniform float amplitude = 0.1;

float PI = radians(180);
layout(points) in;
layout(line_strip, max_vertices = 2) out;
out vec2 texCoord;
void main()
{
    //Normalize from 0 to 1
    vec2 corrected_tex_coord = (gl_in[0].gl_Position.xy + vec2(1.0, 1.0))/2.0;
    vec4 texel = texture(tex, corrected_tex_coord);
    float angle = texel.x * PI/2.0;

    float _amplitude = abs(amplitude);
    // cartToPol
    float deltaX = cos(angle) * _amplitude;
    float deltay = sin(angle) * _amplitude;
    
    vec4 offset =  vec4(cos(angle) * _amplitude, sin(angle) * _amplitude, 0.0, 0.0);
    gl_Position = gl_in[0].gl_Position + offset;
    EmitVertex();

    gl_Position = gl_in[0].gl_Position - offset;
    EmitVertex();

    EndPrimitive();

}