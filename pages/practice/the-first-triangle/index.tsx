import type { NextPage } from "next";
import Container from "../../../components/common/Container";
import WebGLCanvas from "../../../components/common/WebGLCanvas";
import { createProgram, createShader, resizeCanvasToDisplaySize } from "../../../utils/webgl";

const TheFirstTriangle: NextPage = () => {
	return (
		<Container padded>
			<WebGLCanvas onInit={drawTriangle}></WebGLCanvas>
		</Container>
	);
};

// Shaders
const Vertex = `
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

const drawTriangle: WebGLCanvasInit = (gl) => {
	resizeCanvasToDisplaySize(gl.canvas, window.devicePixelRatio);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	// prettier-ignore
	const vertexData = [
		0, 1, 0,
		1, -1, 0,
		-1, -1, 0,
	];

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

	const vertexShader = createShader(gl, "VERTEX_SHADER", Vertex);
	const fragmentShader = createShader(gl, "FRAGMENT_SHADER", Fragement);

	const program = createProgram(gl, vertexShader, fragmentShader);

	const positionLocation = gl.getAttribLocation(program, "position");
	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

	gl.useProgram(program);

	gl.drawArrays(gl.TRIANGLES, 0, 3);
};

export default TheFirstTriangle;
