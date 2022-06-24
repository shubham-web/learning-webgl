import type { NextPage } from "next";
import Container from "../../../components/common/Container";
import WebGLCanvas from "../../../components/common/WebGLCanvas";
import { Fragement, Vertext } from "./shaders";

const TheFirstTriangle: NextPage = () => {
	return (
		<Container padded>
			<WebGLCanvas onInit={drawTriangle} width={500} height={500}></WebGLCanvas>
		</Container>
	);
};

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

	const vertextShader = gl.createShader(gl.VERTEX_SHADER);
	vertextShader && gl.shaderSource(vertextShader, Vertext);

	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	fragmentShader && gl.shaderSource(fragmentShader, Fragement);

	if (!(fragmentShader && vertextShader)) {
		throw new Error("Couldn't create shader.");
	}

	gl.compileShader(vertextShader);
	gl.compileShader(fragmentShader);

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
