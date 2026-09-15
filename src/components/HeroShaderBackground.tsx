import React, { useEffect, useRef } from 'react';

interface HeroShaderBackgroundProps {
  isDark: boolean;
}

export const HeroShaderBackground: React.FC<HeroShaderBackgroundProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const networkCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // WebGL Shader Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_isDark;
      varying vec2 v_texCoord;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
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

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.22;
        float n1 = snoise(vec2(p.x * 0.8 + t * 0.25, p.y * 0.8 - t * 0.15));
        float n2 = snoise(vec2(p.x * 1.4 - t * 0.12, p.y * 1.4 + n1 * 0.4));

        vec3 colDeepBlue = (u_isDark > 0.5) ? vec3(0.08, 0.25, 0.55) : vec3(0.0, 0.341, 0.658);
        vec3 colEmerald = (u_isDark > 0.5) ? vec3(0.12, 0.65, 0.38) : vec3(0.18, 0.8, 0.443);
        vec3 colBase = (u_isDark > 0.5) ? vec3(0.04, 0.07, 0.12) : vec3(0.97, 0.98, 1.0);
        vec3 colSubtle = (u_isDark > 0.5) ? vec3(0.07, 0.11, 0.18) : vec3(0.85, 0.92, 1.0);

        float wave1 = smoothstep(0.025, 0.0, abs(sin(p.y * 3.2 + n1 * 1.1 + t * 0.35) - 0.2));
        float wave2 = smoothstep(0.035, 0.0, abs(cos(p.x * 1.8 + p.y * 2.2 + n2 * 0.9 - t * 0.25)));

        vec2 gridUV = fract(uv * 10.0) - 0.5;
        float dotPattern = smoothstep(0.09, 0.02, length(gridUV)) * 0.12;

        vec3 bg = mix(colBase, colSubtle, uv.y * 0.75 + uv.x * 0.25);
        vec3 waveColor1 = mix(colDeepBlue, colEmerald, uv.x);
        vec3 waveColor2 = mix(colEmerald, colDeepBlue, uv.y);

        bg = mix(bg, waveColor1, wave1 * (u_isDark > 0.5 ? 0.35 : 0.20));
        bg = mix(bg, waveColor2, wave2 * (u_isDark > 0.5 ? 0.28 : 0.16));
        bg += dotPattern * colDeepBlue * (0.5 + 0.5 * sin(t * 1.8 + uv.x * 4.0));

        gl_FragColor = vec4(bg, 0.92);
      }
    `;

    function createShader(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER, 
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), 
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uIsDark = gl.getUniformLocation(prog, 'u_isDark');

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    syncSize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => syncSize());
      resizeObserver.observe(canvas);
    }

    let startTime = performance.now();
    function render(time: number) {
      if (!canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      const elapsed = (time - startTime) * 0.001;
      if (uTime) gl.uniform1f(uTime, elapsed);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uIsDark) gl.uniform1f(uIsDark, isDark ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [isDark]);

  // Network Nodes Canvas
  useEffect(() => {
    const netCanvas = networkCanvasRef.current;
    if (!netCanvas) return;

    const ctx = netCanvas.getContext('2d');
    if (!ctx) return;

    let width = (netCanvas.width = netCanvas.parentElement?.offsetWidth || 1280);
    let height = (netCanvas.height = netCanvas.parentElement?.offsetHeight || 600);

    const handleResize = () => {
      if (!netCanvas || !netCanvas.parentElement) return;
      width = netCanvas.width = netCanvas.parentElement.offsetWidth;
      height = netCanvas.height = netCanvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const points: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const maxPoints = 35;
    for (let i = 0; i < maxPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let netAnimId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Connection lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * (isDark ? 0.35 : 0.22);
            ctx.strokeStyle = isDark ? `rgba(133, 182, 255, ${alpha})` : `rgba(0, 87, 168, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Point circles
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        ctx.fillStyle = isDark ? '#60a5fa' : '#0057A8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      netAnimId = requestAnimationFrame(draw);
    }
    netAnimId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(netAnimId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <>
      <div className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <canvas ref={networkCanvasRef} className="w-full h-full block" />
      </div>
    </>
  );
};
