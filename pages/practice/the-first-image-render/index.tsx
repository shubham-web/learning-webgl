import { NextPage } from "next";
import Container from "../../../components/common/Container";
import WebGLCanvas from "../../../components/common/WebGLCanvas";
import { createProgram, createShader, resizeCanvasToDisplaySize } from "../../../utils/webgl";

const TheFirstImage: NextPage = () => {
	return (
		<Container padded>
			<WebGLCanvas onInit={loadImageAndRender} fixedDimension={{ width: 800, height: 800 }}></WebGLCanvas>
		</Container>
	);
};
const Vertex = `
    attribute vec2 a_position;
    attribute vec2 a_textureCoord;

    uniform vec2 u_resolution;

    varying vec2 v_textureCoord;

    void main(){
        
        vec2 zeroToOne = a_position / u_resolution;

        vec2 zeroToTwo = zeroToOne * 2.0;

        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

        // pass the textureCoord to fragement shader
        v_textureCoord = a_textureCoord;
    }
`;

const Fragment = `
    precision mediump float;

    uniform sampler2D u_image;

    varying vec2 v_textureCoord;

    void main(){
        gl_FragColor = texture2D(u_image, v_textureCoord).rgba;
    }
`;

const loadImageAndRender: WebGLCanvasInit = (gl) => {
	let image = new Image();
	image.src = "/images/oranges.jpg";
	image.onload = () => {
		render(gl, image);
	};
};

const render = (gl: WebGLRenderingContext, image: HTMLImageElement) => {
	// Init

	// create all shaders and program and look up locations
	const vertexShader = createShader(gl, "VERTEX_SHADER", Vertex);
	const fragmentShader = createShader(gl, "FRAGMENT_SHADER", Fragment);

	const program = createProgram(gl, vertexShader, fragmentShader);
	const positionLocation = gl.getAttribLocation(program, "a_position");
	const textureCoordLocation = gl.getAttribLocation(program, "a_textureCoord");
	const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

	// create buffers and upload vertex data
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	setRectInBuffer(gl, { x: 0, y: 0, width: image.width, height: image.height });

	const textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	// prettier-ignore
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
    ]), gl.STATIC_DRAW);

	// create textures and upload texture data
	let texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// set the params so we can render any size image.
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	// upload the image into the texture
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

	// Render
	resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.useProgram(program);

	gl.enableVertexAttribArray(positionLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

	gl.enableVertexAttribArray(textureCoordLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	gl.vertexAttribPointer(textureCoordLocation, 2, gl.FLOAT, false, 0, 0);

	gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
};

const setRectInBuffer = (
	gl: WebGLRenderingContext,
	dimension: { x: number; y: number; width: number; height: number }
) => {
	const { x, y, width, height } = dimension;

	// prettier-ignore
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        //first triangle
        x, y, 
        x + width, y,
        x, y + height,
        // second triangle
        x + width, y,
        x + width, y + height,
        x, y + height
    ]), gl.STATIC_DRAW);
};

export default TheFirstImage;
