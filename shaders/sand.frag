#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D sandTex;
uniform sampler2D sandMap;

void main() {

	vec4 colorsandTex = texture2D(sandTex, vTextureCoord);
	vec4 colorsandMap = texture2D(sandMap, vTextureCoord);

	gl_FragColor = mix(colorsandMap, colorsandTex * 1.35, 0.4);
}