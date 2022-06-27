import { NextPage } from "next";
import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import Container from "../../../components/common/Container";
import Flex from "../../../components/common/Flex";
import P from "../../../components/common/P";
import WebGLCanvas from "../../../components/common/WebGLCanvas";
import { loadImage } from "../../../utils";
import { createProgram, createShader, resizeCanvasToDisplaySize } from "../../../utils/webgl";
import NextImage from "next/image";
import styled, { css } from "styled-components";
import ZeroLineHeight from "../../../components/common/ZeroLineHeight";

const DEFAULT_AVERAGE_PIXEL = 0;
const images = ["taj.jpg", "oranges.jpg", "lal-gate-dewas.jpg", "i-and-rohit.jpg", "school.jpg"];
const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 600;

const AverageImagePixels: NextPage = () => {
	const [averagePixels, setAveragePixel] = useState(DEFAULT_AVERAGE_PIXEL);
	const [selectedImage, setSelectedImage] = useState(images[0]);
	const initData = useRef<WebGLProgramInitData | null>(null);

	const init: WebGLCanvasInit = useCallback(
		(gl) => {
			loadImage(`/images/${selectedImage}`).then((image) => {
				initData.current = initWebGLProgram(gl, image);
				initData.current.customInputs = { averagePixels: DEFAULT_AVERAGE_PIXEL };
				render(initData.current);
			});
		},
		[selectedImage]
	);

	const handlePixelChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		let newValue = parseInt(e.target.value);
		setAveragePixel(newValue);
		if (initData.current) {
			initData.current.customInputs = initData.current.customInputs || {};
			initData.current.customInputs.averagePixels = newValue;
			render(initData.current);
		}
	};

	return (
		<Container padded>
			<Flex center gap="1rem" stacked>
				<WebGLCanvas onInit={init} fixedDimension={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}></WebGLCanvas>
				<P center>
					<input type="range" value={averagePixels} min={0} max={100} onChange={handlePixelChange} />
					<br />
					<span>
						It averages the color of the {averagePixels} left &amp; {averagePixels} right pixels to draw
						each pixel in the image.
					</span>
				</P>
				<Flex gap="0.85rem">
					{images.map((name) => {
						return (
							<ImageOption
								key={name}
								active={selectedImage === name}
								onClick={() => {
									setSelectedImage(name);
									setAveragePixel(DEFAULT_AVERAGE_PIXEL);
								}}
							>
								<ZeroLineHeight>
									<NextImage src={`/images/${name}`} width={70} height={70} />
								</ZeroLineHeight>
							</ImageOption>
						);
					})}
				</Flex>
			</Flex>
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
    uniform vec2 u_textureSize;
    uniform float u_averagePixel;

    varying vec2 v_textureCoord;

    void main(){
        vec2 onePixel = (vec2(1.0, 1.0) / u_textureSize) * u_averagePixel;

        gl_FragColor = (
            texture2D(u_image, v_textureCoord) +
            texture2D(u_image, v_textureCoord + vec2(onePixel.x, 0.0)) +
            texture2D(u_image, v_textureCoord + vec2(-onePixel.x, 0.0))
            ) / 3.0;
    }
`;

const initWebGLProgram = (gl: WebGLRenderingContext, image: HTMLImageElement): WebGLProgramInitData => {
	// Init
	const vertexShader = createShader(gl, "VERTEX_SHADER", Vertex);
	const fragmentShader = createShader(gl, "FRAGMENT_SHADER", Fragment);

	const program = createProgram(gl, vertexShader, fragmentShader);

	const positionLocation = gl.getAttribLocation(program, "a_position");
	const textureCoordLocation = gl.getAttribLocation(program, "a_textureCoord");
	const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
	const textureSizeUniformLocation = gl.getUniformLocation(program, "u_textureSize");
	const avgPixelUniformLocation = gl.getUniformLocation(program, "u_averagePixel");

	// create buffers and upload vertex data
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	setRectInBuffer(gl, { x: 0, y: 0, width: IMAGE_WIDTH, height: IMAGE_HEIGHT });

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

	return {
		gl: gl,
		program: program,
		attr: {
			a_position: positionLocation,
			a_textureCoord: textureCoordLocation,
		},
		uniform: {
			u_resolution: resolutionUniformLocation,
			u_textureSize: textureSizeUniformLocation,
			u_averagePixel: avgPixelUniformLocation,
		},
		buffer: { position: positionBuffer, texture: textureCoordBuffer },
		texture: {
			orange: image,
		},
	};
};

const render = (initData: WebGLProgramInitData) => {
	let { gl, program, attr, uniform, buffer, texture } = initData;
	// Render
	resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.useProgram(program);

	gl.enableVertexAttribArray(attr.a_position);
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position);
	gl.vertexAttribPointer(attr.a_position, 2, gl.FLOAT, false, 0, 0);

	gl.enableVertexAttribArray(attr.a_textureCoord);
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer.texture);
	gl.vertexAttribPointer(attr.a_textureCoord, 2, gl.FLOAT, false, 0, 0);

	gl.uniform2f(uniform.u_resolution, gl.canvas.width, gl.canvas.height);

	if (texture && texture.orange) {
		gl.uniform2f(uniform.u_textureSize, texture.orange.width, texture.orange.height);
	}

	if (initData?.customInputs && initData.customInputs.averagePixels) {
		gl.uniform1f(uniform.u_averagePixel, initData.customInputs.averagePixels);
	} else {
		gl.uniform1f(uniform.u_averagePixel, 0);
	}
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

const ImageOption = styled.div<{ active: boolean }>`
	cursor: pointer;
	box-shadow: none;
	border-radius: 0.25rem;
	overflow: hidden;
	${(props) =>
		props.active &&
		css`
			box-shadow: rgba(255, 255, 255, 0.16) 0px 1px 4px, rgb(255, 255, 255) 0px 0px 0px 3px;
		`}
`;

export default AverageImagePixels;
