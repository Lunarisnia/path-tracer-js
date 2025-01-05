uniform vec2 u_resolution;
uniform vec3 u_camera;
uniform float u_fov;
uniform float u_pi;

float deg2rad(float deg) {
    return deg * u_pi / 180.0;
}

struct Ray {
    vec3 Origin;
    vec3 Direction;
};

vec3 getRayColor(Ray r) {
    return vec3(1.0);
}

// TODO: RayCast object intersection code
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    float fov = u_fov;
    float cameraDistance = 1.0 / tan(deg2rad(fov * 0.5));

    vec3 viewport = vec3((uv * 2.0 - 1.0), cameraDistance);

    vec3 origin = vec3(0.0);

    vec3 rayDirection = normalize(viewport - origin);

    vec3 color = getRayColor(Ray(origin, rayDirection));

    gl_FragColor = vec4(color, 1.0);
}
