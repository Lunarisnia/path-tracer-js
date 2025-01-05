uniform vec2 u_resolution;
uniform float u_time;
// uniform sampler2D u_texture;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.8);
    // gl_FragColor = texture2D(u_texture, st);
}
