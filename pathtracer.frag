uniform vec2 u_resolution;
uniform vec3 u_camera;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    vec3 viewport = vec3(uv * 2.0 - 1.0, u_camera.z);

    gl_FragColor = vec4(viewport, 1.0);
}
