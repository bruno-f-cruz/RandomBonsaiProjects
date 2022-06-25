#version 400
uniform sampler2D tex;
uniform float amplitude = 0.1;

float PI = radians(180);
float tri_angles[3] = float[](0.0, 2.0*PI/3.0, 4.0*PI/3.0);

layout(points) in;
layout(triangle_strip, max_vertices = 3) out;
out vec2 texCoord;
void main()
{
    //Normalize from 0 to 1
    vec2 corrected_tex_coord = (gl_in[0].gl_Position.xy + vec2(1.0, 1.0))/2.0;
    vec4 texel = texture(tex, corrected_tex_coord);
    float angle = texel.x * PI;

    float _amplitude = abs(amplitude);
    // cartToPol
    float deltaX = cos(angle) * _amplitude;
    float deltay = sin(angle) * _amplitude;
    
    for (int i = 0; i < tri_angles.length(); i++){
        vec4 offset =  vec4(cos(angle + tri_angles[i]) * _amplitude, sin(angle + tri_angles[i]) * _amplitude, 0.0, 0.0);
        gl_Position = gl_in[0].gl_Position + offset;
        EmitVertex();
      }

    EndPrimitive();


}