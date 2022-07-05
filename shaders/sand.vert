attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D sandMap;


void main() {

	vec3 offset = vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord;

	offset = aVertexNormal * texture2D(sandMap, vTextureCoord + vec2(1.0, 1.0)).b * 0.07;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

