"use client"

import { useRef, useEffect } from "react"

const NoiseGradient = () => {
    const canvasRef = useRef(null)
    const animationRef = useRef(0)
    const mousePosition = useRef({ x: 0, y: 0 })
    const shaderProgramRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext("webgl", {
            antialias: true,
            alpha: true,
            premultipliedAlpha: false
        })

        if (!gl) {
            console.error("WebGL not supported")
            return
        }

        const setCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            gl.viewport(0, 0, canvas.width, canvas.height)
        }
        setCanvasSize()
        window.addEventListener("resize", setCanvasSize)

        const handleMouseMove = e => {
            mousePosition.current = {
                x: e.clientX / canvas.width,
                y: 1.0 - e.clientY / canvas.height
            }
        }
        window.addEventListener("mousemove", handleMouseMove)

        const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      varying highp vec2 vTextureCoord;
      void main(void) {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `

        const fsSource = `
      precision highp float;
      varying highp vec2 vTextureCoord;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform bool uIsMouseDown;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main(void) {
        vec2 uv = vTextureCoord;
        vec2 mouseInfluence = uMouse;

        float speed = 0.09;
        float noiseScale = 2.0;
        float noiseIntensity = 0.7;

        float noise1 = snoise(uv * noiseScale + uTime * speed) * noiseIntensity;
        float noise2 = snoise(uv * noiseScale * 2.0 - uTime * speed * 0.5) * noiseIntensity * 0.5;
        float noise = noise1 + noise2;

        // vec3 color1 = vec3(1.000, 1.000, 1.000);   // white
        // vec3 color2 = vec3(0.957, 0.949, 0.988);   // purple-50 (#f5f3ff)
        // vec3 color3 = vec3(1.000, 0.949, 0.961);   // pink-50 (#fff1f2)
        
        vec3 color1 = vec3(1.000, 1.000, 1.000);   // white 
        vec3 color2 = vec3(0.702, 0.949, 0.992);   // vibrant purple 
        vec3 color3 = vec3(1.000, 0.949, 0.718);   // vibrant pink 

        float distToMouse = distance(uv, mouseInfluence);
        float mouseEffect = smoothstep(0.5, 0.0, distToMouse) * 0.3;

        float posGradient = uv.y + uv.x * 0.2 + noise * 0.3 + mouseEffect;

        vec3 finalColor;
        if (posGradient < 0.4) {
          finalColor = mix(color1, color2, smoothstep(0.0, 0.4, posGradient));
        } else {
          finalColor = mix(color2, color3, smoothstep(0.4, 1.0, posGradient));
        }

        vec3 greenApple = vec3(0.133, 0.773, 0.369);
        finalColor += greenApple * mouseEffect * 0.5;

        finalColor += noise * 0.05;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

        const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
        if (!shaderProgram) return

        shaderProgramRef.current = shaderProgram

        const programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
                textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord")
            },
            uniformLocations: {
                time: gl.getUniformLocation(shaderProgram, "uTime"),
                resolution: gl.getUniformLocation(shaderProgram, "uResolution"),
                mouse: gl.getUniformLocation(shaderProgram, "uMouse"),
                isMouseDown: gl.getUniformLocation(shaderProgram, "uIsMouseDown")
            }
        }

        const buffers = initBuffers(gl)

        const startTime = Date.now()
        const render = () => {
            const currentTime = (Date.now() - startTime) / 1000
            drawScene(gl, programInfo, buffers, currentTime)
            animationRef.current = requestAnimationFrame(render)
        }

        if (shaderProgramRef.current) {
            gl.useProgram(shaderProgramRef.current)
        }

        render()

        function initShaderProgram(gl, vsSource, fsSource) {
            const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
            const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

            if (!vertexShader || !fragmentShader) return null

            const shaderProgram = gl.createProgram()
            if (!shaderProgram) return null

            gl.attachShader(shaderProgram, vertexShader)
            gl.attachShader(shaderProgram, fragmentShader)
            gl.linkProgram(shaderProgram)

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                console.error(
                    "Unable to initialize the shader program: " +
                    gl.getProgramInfoLog(shaderProgram)
                )
                return null
            }

            return shaderProgram
        }

        function loadShader(gl, type, source) {
            const shader = gl.createShader(type)
            if (!shader) return null

            gl.shaderSource(shader, source)
            gl.compileShader(shader)

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(
                    "An error occurred compiling the shaders: " +
                    gl.getShaderInfoLog(shader)
                )
                gl.deleteShader(shader)
                return null
            }

            return shader
        }

        function initBuffers(gl) {
            const positionBuffer = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

            const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]

            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(positions),
                gl.STATIC_DRAW
            )

            const textureCoordBuffer = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer)

            const textureCoordinates = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]

            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(textureCoordinates),
                gl.STATIC_DRAW
            )

            return {
                position: positionBuffer,
                textureCoord: textureCoordBuffer
            }
        }

        function drawScene(gl, programInfo, buffers, time) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0)
            gl.clear(gl.COLOR_BUFFER_BIT)

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                2,
                gl.FLOAT,
                false,
                0,
                0
            )
            gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord)
            gl.vertexAttribPointer(
                programInfo.attribLocations.textureCoord,
                2,
                gl.FLOAT,
                false,
                0,
                0
            )
            gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord)

            gl.uniform1f(programInfo.uniformLocations.time, time)
            gl.uniform2f(
                programInfo.uniformLocations.resolution,
                canvas.width,
                canvas.height
            )
            gl.uniform2f(
                programInfo.uniformLocations.mouse,
                mousePosition.current.x,
                mousePosition.current.y
            )

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        }

        return () => {
            window.removeEventListener("resize", setCanvasSize)
            window.removeEventListener("mousemove", handleMouseMove)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none"
            }}
        />
    )
}

export default NoiseGradient
