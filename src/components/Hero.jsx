import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(syncSize);
      ro.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

void main() {
  vec2 uv = v_texCoord;
  float time = u_time * 0.2;
  float noise = sin(uv.x * 3.0 + time) * cos(uv.y * 2.0 - time);
  noise += sin(uv.y * 4.0 + time * 1.5) * cos(uv.x * 5.0 - time * 0.5);
  vec3 color1 = vec3(0.05, 0.1, 0.3);
  vec3 color2 = vec3(0.2, 0.05, 0.4);
  vec3 color3 = vec3(0.05, 0.05, 0.06);
  vec3 finalColor = mix(color1, color2, noise * 0.5 + 0.5);
  finalColor = mix(finalColor, color3, 1.0 - uv.y * 0.7);
  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
  finalColor += grain * 0.02;
  gl_FragColor = vec4(finalColor, 1.0);
}`;

    function createShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        mouse.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
        mouse.y = (1 - (e.clientY - rect.top) / rect.height) * canvas.height;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    let rafId;
    function render(t) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    }
    render(0);

    const handleContextLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(rafId);
    };
    const handleContextRestored = () => {
      // Restore logic or safe restart
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      if (ro) ro.disconnect();
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero — AetherData AI Platform"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      {/* WebGL Shader Background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          background: 'radial-gradient(circle at 50% 50%, #0d0b1a 0%, #0a0a0d 100%)'
        }}
      />

      {/* Bottom fade overlay */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, transparent, #0a0a0d)', pointerEvents: 'none' }} />

      {/* Grid overlay */}
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: 800, margin: '0 auto' }}>
        <div className="chip chip-blue" style={{ marginBottom: 24, display: 'inline-flex' }}>
          <span style={{ width: 6, height: 6, background: '#2563eb', borderRadius: '50%', display: 'inline-block' }} />
          AI Data Automation · v3.2 Now Live
        </div>

        <h1 style={{ fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 1.05, letterSpacing: '-0.04em', color: '#e5e1e4', marginBottom: 24 }}>
          Intelligence That
          <br />
          <span style={{ background: 'linear-gradient(135deg, #b4c5ff 0%, #d0bcff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Moves Your Data
          </span>
        </h1>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 18px)', color: '#c3c6d7', lineHeight: 1.6, marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>
          Integrate with your entire tech stack. AetherData AI provides autonomous scaling and real-time monitoring of your most critical data flows.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#pricing" className="btn-primary" style={{ fontSize: 15, padding: '12px 28px' }}>
            Start for Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z" clipRule="evenodd"/></svg>
          </a>
          <a href="#workflows" className="btn-ghost" style={{ fontSize: 15, padding: '12px 28px' }}>View Demo</a>
        </div>

        {/* Social proof mini stat */}
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap' }}>
          {[
            { val: '500+', label: 'Enterprise Clients' },
            { val: '99.99%', label: 'Uptime SLA' },
            { val: '40ms', label: 'Avg. Latency' },
          ].map(({ val, label }) => (
            <div key={label} className="hero-stat" style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 28, color: '#b4c5ff', letterSpacing: '-0.02em' }}>{val}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#8d90a0', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
        {/* Scroll-down bridge */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 3 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#434655', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(180,197,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animation: 'scroll-bounce 1.8s ease-in-out infinite' }}>
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
