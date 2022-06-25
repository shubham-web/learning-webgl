import type { NextPage } from "next";
import Container from "../../../components/common/Container";
import WebGLCanvas from "../../../components/common/WebGLCanvas";
import { createShader } from "../../../utils/webgl";

const TheFirstTriangle: NextPage = () => {
	return (
		<Container padded>
			<WebGLCanvas onInit={drawTriangle} width={500} height={500}></WebGLCanvas>
		</Container>
	);
};

// Shaders
const Vertext = `
    attribute vec3 position;
    void main() {
        gl_Position = vec4(position, 1);
    }
`;

const Fragement = `
    void main() {
        gl_FragColor = vec4(1, 0, 0.5, 1);
    }
`;

const drawTriangle = (gl: WebGLRenderingContext) => {
	// prettier-ignore
	const vertextData = [
		0, 1, 0,
		1, -1, 0,
		-1, -1, 0,
	];

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertextData), gl.STATIC_DRAW);

	const vertextShader = createShader(gl, "VERTEX_SHADER", Vertext);
	const fragmentShader = createShader(gl, "FRAGMENT_SHADER", Fragement);

	const program = gl.createProgram();

	if (!program) {
		throw new Error("Couldn't create gl program.");
	}

	gl.attachShader(program, vertextShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	const positionLocation = gl.getAttribLocation(program, "position");
	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

	gl.useProgram(program);

	gl.drawArrays(gl.TRIANGLES, 0, 3);
};

export default TheFirstTriangle;
