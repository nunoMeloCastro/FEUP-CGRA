#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

struct lightProperties {
    vec4 position;                  // Default: (0, 0, 1, 0)
    vec4 ambient;                   // Default: (0, 0, 0, 1)
    vec4 diffuse;                   // Default: (0, 0, 0, 1)
    vec4 specular;                  // Default: (0, 0, 0, 1)
    vec4 half_vector;
    vec3 spot_direction;            // Default: (0, 0, -1)
    float spot_exponent;            // Default: 0 (possible values [0, 128]
    float spot_cutoff;              // Default: 180 (possible values [0, 90] or 180)
    float constant_attenuation;     // Default: 1 (value must be >= 0)
    float linear_attenuation;       // Default: 0 (value must be >= 0)
    float quadratic_attenuation;    // Default: 0 (value must be >= 0)
    bool enabled;                   // Deafult: false
};

struct materialProperties {
    vec4 ambient;                   // Default: (0, 0, 0, 1)
    vec4 diffuse;                   // Default: (0, 0, 0, 1)
    vec4 specular;                  // Default: (0, 0, 0, 1)
    vec4 emission;                  // Default: (0, 0, 0, 1)
    float shininess;                // Default: 0 (possible values [0, 128])
};

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

#define NUMBER_OF_LIGHTS 8

//uniform vec4 uGlobalAmbient;

uniform materialProperties uFrontMaterial;

uniform lightProperties uLight[NUMBER_OF_LIGHTS];

uniform bool reactToLight;
varying vec3 vFinalColor;
varying vec2 vTextureCoord;

vec3 lighting(vec4 vertex, vec3 N) {
    // considering only difuse component

    vec3 lightIntensity = vec3(0.7, 0.7, 0.7);

    for (int i = 0; i < NUMBER_OF_LIGHTS; i++) {
        if (uLight[i].enabled) { 

            vec3 L = normalize(uLight[i].position.xyz - vertex.xyz);

            float lambertTerm = max(dot(N, L), 0.0);

            vec4 Id = uLight[i].diffuse * uFrontMaterial.diffuse * lambertTerm;

            lightIntensity += Id.xyz;
        }
    }

    lightIntensity = clamp(lightIntensity, vec3(0.0), vec3(1.0));
    
    return lightIntensity;
}


void main() {
    vec4 vertex = uMVMatrix * vec4(aVertexPosition, 1.0); 

    if (reactToLight) {
        vec3 N = normalize(vec3(uNMatrix * vec4(aVertexNormal, 1.0)));

        vFinalColor = lighting(vertex, N);
    }

    gl_Position = uPMatrix * vertex;
    vTextureCoord = aTextureCoord;
}