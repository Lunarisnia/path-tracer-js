uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_default;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec4 textureColor = texture2D(u_default, st);

    gl_FragColor = textureColor;
}
