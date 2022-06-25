#version 400
uniform vec4 color =  vec4(0.5, 0.5, 0.5,1.0);
in vec2 texCoord;
out vec4 fragColor;

void main()
{
  fragColor = color;
}

