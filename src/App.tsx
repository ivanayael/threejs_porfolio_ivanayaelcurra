import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, OrbitControls, Text, PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";


// --- COMPONENTE SEO PARA GOOGLE ---
const SEO = () => (
  <>
    <title>Ivana Yael Currá | Ingeniera en Sistemas & Technical Leader</title>
    <meta name="description" content="Portfolio de Ivana Yael Currá: Ingeniera en Sistemas, Project Manager Senior y Docente Universitaria. Especialista en metodologías ágiles, liderazgo de equipos de +1000 personas y tecnología bancaria." />
    <meta name="keywords" content="Ivana Yael Curra, Ingeniera en Sistemas, Project Manager, Technical Leader, Scrum Master, .NET, Lomas de Zamora, Argentina, UADE, Gestión IT" />
    <meta property="og:title" content="Ivana Yael Currá | Portfolio Profesional" />
    <meta property="og:description" content="Technical Leader con +12 años de experiencia en productos IT de alto impacto." />
    <meta property="og:type" content="website" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://ivanayaelcurra.com.ar" />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ivana Yael Currá",
        "jobTitle": "Ingeniera en Sistemas e informática",
        "description": "Technical Leader y Senior Project Manager con más de 12 años de experiencia en IT.",
        "url": "https://ivanayaelcurra.com.ar",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Lomas de Zamora",
          "addressRegion": "Buenos Aires",
          "addressCountry": "AR"
        },
        "alumniOf": [
          { "@type": "CollegeOrUniversity", "name": "Universidad de Palermo" },
          { "@type": "CollegeOrUniversity", "name": "UAI" }
        ],
        "knowsAbout": ["Scrum", "Agile", "PMI", ".NET", "Cybersecurity", "Fintech"]
      })}
    </script>
  </>
);

// --- 1. COMPONENTE: TECH CLOUD ---
const TechCloud = () => {
  const skills = useMemo(() => [
    { name: "Scrum/Agile", pos: [0, 0, 0], col: "#ffee00" },
    { name: ".NET Fullstack", pos: [-1.5, 0.4, 0], col: "#810a85" },
    { name: "Jira/Confluece", pos: [1.5, 0.4, 0], col: "#0004ff" },
    { name: "PowerBI", pos: [-1.2, -0.6, 0.5], col: "#ffee00" },
    { name: "AI Tools", pos: [1.2, -0.6, 0.5], col: "#ffffff" },
    { name: "Kanban", pos: [0, -1.4, 0], col: "#0099ff" },
    { name: "Redmine", pos: [0, 1.2, 0], col: "#ff0055" },
    { name: "Six Sigma", pos: [2, 1.2, 0], col: "#185e15" },
    { name: "Automation", pos: [0, 1.5, 0], col: "#15325e" },
    { name: "Grafana", pos: [-1.9, -1, 0.5], col: "#ff6600" },
    { name: "PHP Fullstack", pos: [1.95, -1, 0], col: "#625b63" },
  ], []);

  return (
    <group scale={1}>
      {skills.map((s, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text position={s.pos as any} fontSize={0.35} color={s.col} anchorX="center" anchorY="middle">
            {s.name}
          </Text>
        </Float>
      ))}
    </group>
  );
};

// --- 2. COMPONENTE: TIERRA INTERACTIVA (Mejorado) ---
const EarthModel = () => {
  const earthRef = useRef<THREE.Group>(null!);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const points = [
    { name: "Argentina", pos: [0, 0, 1.1], info: "Liderazgo GDE y Proyectos Bancarios (BBVA/Patagonia)" },
    { name: "Corea del Sur", pos: [0.8, 0.4, 0.6], info: "Colaboración directa con equipos de Corea (Hyosung)" }
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (earthRef.current && !selectedPoint) {
      earthRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={earthRef} scale={2.2}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#050a1f" emissive="#020205" roughness={0.8} />
      </mesh>
      <mesh scale={1.03}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial color="#00f3ff" transparent opacity={0.15} wireframe />
      </mesh>

      {points.map((p, i) => (
        <group key={i} position={p.pos as any}>
          <mesh onClick={(e) => { e.stopPropagation(); setSelectedPoint(selectedPoint === p.name ? null : p.name); }}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#00f3ff" />
          </mesh>
          {selectedPoint === p.name && (
            <Html distanceFactor={10}>
              <div className="bg-black/90 border border-cyan-500 p-3 rounded-lg text-[10px] w-40 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                <p className="text-cyan-400 font-bold mb-1 uppercase">{p.name}</p>
                <p className="text-white opacity-80 leading-tight">{p.info}</p>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
};

// --- 3. COMPONENTE: LINEA DE TIEMPO EDUCATIVA ---
const EducationTimeline = () => {
  const education = [
    { title: "Maestría en TI", place: "Univ. de Palermo", note: "Cum Laude", year: "2018" },
    { title: "Ingeniería en Sistemas", place: "Univ. Abierta Interamericana", note: "Graduada", year: "2013" },
    { title: "Diseño y Animación Digital", place: "Univ. Siglo 21", note: "Técnica", year: "2021" }
  ];

  return (
    <div className="relative border-l-2 border-cyan-500/30 ml-4 py-6 space-y-10">
      {education.map((edu, i) => (
        <div key={i} className="relative pl-8 group cursor-default">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 group-hover:bg-cyan-500 group-hover:shadow-[0_0_15px_#00f3ff] transition-all duration-300" />
          <span className="text-[10px] font-mono text-cyan-500/60 uppercase">{edu.year}</span>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase">{edu.title}</h3>
          <p className="text-sm text-gray-400 font-mono italic">{edu.place} {edu.note && `// ${edu.note}`}</p>
        </div>
      ))}
    </div>
  );
};

// --- 4. LAYOUT Y SECCIONES ---
const Background3D = () => (
  <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#020205]">
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00f3ff" />
      <EarthModel />
      <OrbitControls enableZoom={false} autoRotate={false} />
    </Canvas>
  </div>
);

const Section = ({ title, children, id }: { title: string, children: React.ReactNode, id: string }) => (
  <section id={id} className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 border-b border-white/5 bg-black/10 backdrop-blur-[2px]">
    <h2 className="text-cyan-500 font-mono text-xs mb-6 uppercase tracking-[0.6em] font-bold">
      {`// ${title}`}
    </h2>
    {children}
  </section>
);

export default function App() {
  return (
    <div className="relative text-white font-sans selection:bg-cyan-500/40">
      <SEO />
      <Background3D />

      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
        {/* Usar una etiqueta 'a' para el nombre ayuda al SEO de marca personal */}
        <a href="/" className="font-black tracking-tighter text-xl italic uppercase text-cyan-400">IVANA YAEL CURRÁ</a>
        <div className="hidden md:flex space-x-10 font-mono text-[10px] uppercase tracking-widest opacity-80">
          <a href="#about" className="hover:text-cyan-400 transition-colors">Perfil</a>
          <a href="#education" className="hover:text-cyan-400 transition-colors">Formación</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Experiencia</a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* El H1 es fundamental: Debe contener tus palabras clave principales */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 uppercase leading-none">
            IVANA<span className="text-cyan-500">_</span>YAEL<span className="text-cyan-500">_</span>CURRÁ
          </h1>
          <p className="max-w-3xl text-gray-400 text-sm md:text-lg uppercase tracking-[0.3em] font-light italic">
            Ingeniera en Sistemas | Sr Project Manager | Docente
          </p>
        </section>

        <Section id="about" title="Resumen Profesional">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl font-light leading-tight">
                Más de <span className="text-white font-bold">12 años de experiencia</span> en tecnología y gestión de productos IT.
              </p>
              <div className="h-[400px] w-full rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative backdrop-blur-md">
                 <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <color attach="background" args={['#050505']} />
                    <ambientLight intensity={3} /> 
                    <pointLight position={[5, 5, 5]} intensity={2} />
                    <TechCloud />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
                 </Canvas>
              </div>
            </div>
            
            <div className="space-y-6 font-mono text-lg md:text-xl text-gray-300 max-w-xl">
              {[
                { text: "▹ Especialista en metodologías Scrum, Kanban y Lean Six Sigma.", color: "text-cyan-400" },
                { text: "▹ Liderazgo de equipos multidisciplinares de hasta 1000 personas de forma directa.", color: "text-white font-bold" },
                { text: "▹ Experiencia docente de 5 años en Diseño Multimedia y Diseño de Videojuegos.", color: "text-white" },
                { text: "▹ Actualmente trabajando como Docente y Project & Product Manager.", color: "text-cyan-500 italic" }
              ].map((item, index) => (
                <div key={index} className="typing-wrapper">
                  <p className={`${item.color} leading-snug tracking-tight reveal-text`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="education" title="Formación Académica">
            <div className="max-w-2xl">
                <EducationTimeline />
            </div>
        </Section>

        <Section id="projects" title="Experiencia Destacada">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 hover:bg-cyan-500/[0.05] transition-all group">
              <span className="text-cyan-500 font-mono text-xs uppercase tracking-widest">AMERICA VIRTUAL // 2025</span>
              <h3 className="text-2xl font-black mt-4 uppercase">Project Manager GDE</h3>
              <p className="text-gray-400 mt-4 leading-relaxed">Liderazgo de equipos de +50 personas y proyectos de IA Chatbots.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 hover:bg-cyan-500/[0.05] transition-all group">
              <span className="text-cyan-500 font-mono text-xs uppercase tracking-widest">UADE // 2019 - 2025</span>
              <h3 className="text-2xl font-black mt-4 uppercase">Profesora Titular</h3>
              <p className="text-gray-400 mt-4 leading-relaxed">Mejor desempeño docente 2020 en Diseño Multimedia y Videojuegos.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 hover:bg-cyan-500/[0.05] transition-all group">
              <span className="text-cyan-500 font-mono text-xs uppercase tracking-widest">BANCO PATAGONIA</span>
              <h3 className="text-2xl font-black mt-4 uppercase">WebApp & Seguridad</h3>
              <p className="text-gray-400 mt-4 leading-relaxed">Implementación de seguridad fingerprint y cumplimiento BCRA.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 hover:bg-cyan-500/[0.05] transition-all group">
              <span className="text-cyan-500 font-mono text-xs uppercase tracking-widest">BBVA // BELLTECH</span>
              <h3 className="text-2xl font-black mt-4 uppercase">Cajeros Híbridos</h3>
              <p className="text-gray-400 mt-4 leading-relaxed">Programación del primer cajero híbrido con asistencia remota en Argentina.</p>
            </div>
          </div>
        </Section>

        <footer className="py-20 px-10 flex flex-col items-center border-t border-white/5 bg-black">
          <div className="relative overflow-hidden group mb-12">
            {/* Enlace a WhatsApp con tu número */}
            <a 
              href="https://wa.me/541157014632" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <button className="px-12 py-4 border border-cyan-500/50 text-cyan-400 font-mono text-sm tracking-widest uppercase relative z-10 transition-colors duration-500 hover:text-white">
                Enviar Mensaje
              </button>
              
              {/* El Láser de Escaneo (Efecto Visual) */}
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent skew-x-12 transition-all duration-700 group-hover:left-full pointer-events-none" />
              
              {/* Línea de brillo superior */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500 shadow-[0_0_15px_#00f3ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </a>
          </div>

          <div className="flex space-x-10 mb-10">
            <a href="https://www.linkedin.com/in/ivanayael" className="text-gray-500 hover:text-cyan-400 font-mono text-[10px] tracking-widest transition-colors uppercase">LinkedIn_</a>
            <a href="https://github.com/ivanayael" className="text-gray-500 hover:text-cyan-400 font-mono text-[10px] tracking-widest transition-colors uppercase">Github_</a>
            <a href="mailto:ivanayaelcurra@gmail.com" className="text-gray-500 hover:text-cyan-400 font-mono text-[10px] tracking-widest transition-colors uppercase">Email_</a>
          </div>

          <div className="text-center font-mono text-[10px] text-gray-600 uppercase tracking-[0.3em]">
            <p>© Ivana Yael Currá // Lomas de Zamora, Argentina // {new Date().getFullYear()}</p>
          </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .typing-wrapper { min-height: 1.5em; }
        .reveal-text {
          opacity: 0;
          display: block;
          animation: reveal-in 0.8s ease-out forwards;
        }
        .typing-wrapper:nth-child(1) .reveal-text { animation-delay: 0.5s; }
        .typing-wrapper:nth-child(2) .reveal-text { animation-delay: 1.5s; }
        .typing-wrapper:nth-child(3) .reveal-text { animation-delay: 2.5s; }
        .typing-wrapper:nth-child(4) .reveal-text { animation-delay: 3.5s; }

        @keyframes reveal-in {
          from { opacity: 0; transform: translateX(-10px); filter: blur(5px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        .typing-wrapper:last-of-type::after {
          content: '_';
          color: #06b6d4;
          animation: blink 0.8s step-end infinite;
          font-weight: bold;
        }
        @keyframes blink { from, to { opacity: 0 } 50% { opacity: 1 } }
      `}} />
    </div>
  );
}