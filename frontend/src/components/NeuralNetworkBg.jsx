// import Particles from 'react-tsparticles';
// import { loadSlim } from 'tsparticles-slim';

// const NeuralNetworkBg = () => {
//   return (
//     <Particles
//       id="tsparticles"
//       init={async (engine) => loadSlim(engine)}
//       className="fixed inset-0 -z-10 w-full h-full"
//       options={{
//         background: {
//           color: { value: "#0a0a1a" }  // ✅ Dark navy/black background
//         },
//         fpsLimit: 60,
//         particles: {
//           color: { value: "#6366f1" },
//           links: { color: "#4f46e5", distance: 150, enable: true, opacity: 0.3, width: 1 },
//           move: { enable: true, speed: 1 },
//           number: { value: 120 },
//           size: { value: { min: 1, max: 3 } },
//           opacity: { value: 0.5, animation: { enable: true, speed: 1 } }
//         },
//         interactivity: { events: { onHover: { enable: true, mode: "repulse" } } }
//       }}
//     />
//   );
// };
// export default NeuralNetworkBg;


import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const NeuralNetworkBg = () => {
  return (
    <Particles
      id="tsparticles"
      init={async (engine) => loadSlim(engine)}
      className="fixed inset-0 -z-10 w-full h-full"
      options={{
        background: {
          color: { value: '#080818' },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 90,
            density: { enable: true, area: 900 },
          },
          color: {
            value: ['#6366f1', '#818cf8', '#38bdf8', '#06b6d4', '#a78bfa'],
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: { min: 0.2, max: 0.6 },
            animation: {
              enable: true,
              speed: 0.8,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 1.5,
              sync: false,
            },
          },
          links: {
            enable: true,
            color: '#6366f1',
            distance: 140,
            opacity: 0.18,
            width: 1,
            triangles: {
              enable: true,
              color: '#6366f1',
              opacity: 0.04,
            },
          },
          move: {
            enable: true,
            speed: 0.7,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'bounce' },
            attract: {
              enable: true,
              rotate: { x: 600, y: 1200 },
            },
          },
        },
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: {
              enable: true,
              mode: ['grab', 'bubble'],
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 160,
              links: { opacity: 0.55 },
            },
            bubble: {
              distance: 180,
              size: 5,
              duration: 0.4,
              opacity: 0.85,
            },
            push: {
              quantity: 3,
            },
            repulse: {
              distance: 120,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default NeuralNetworkBg;