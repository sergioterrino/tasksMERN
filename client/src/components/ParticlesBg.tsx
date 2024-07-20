"use client"

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; 
import React from "react";

const ParticlesBg = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    init &&
    <div className="w-[0px]">
      <Particles
        id="tsparticles"
        options={{
          fpsLimit: 120, 
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false, 
              speed: 2,
              straight: false, 
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.6,
            },
            shape: {
              type: "image",
              options: {
                image: [
                  {
                    src: "https://github.com/user-attachments/assets/40e20207-5606-40a5-be79-8033ee568c90",
                    width: 32,
                    height: 32
                  },
                  {
                    src: "https://github.com/user-attachments/assets/77f876c0-43bc-4c3e-926b-4150942a6f29",
                    width: 32,
                    height: 32
                  },
                  {
                    src: "https://github.com/user-attachments/assets/87a14a7b-3ab4-4ba1-8b64-6890842bd771",
                    width: 32,
                    height: 32
                  },
                  {
                    src: "https://github.com/user-attachments/assets/a0016bf8-75f5-4dbd-9420-c6c936814d74",
                    width: 32,
                    height: 32
                  },
                  {
                    src: "https://github.com/user-attachments/assets/73f66189-0697-4083-bf40-7c41fb07284c",
                    width: 32,
                    height: 32
                  },
                  {
                    src: "https://github.com/user-attachments/assets/2d2204d7-3316-48e9-80eb-336f51c6675b",
                    width: 32,
                    height: 32
                  },
                  {
                    src: "https://github.com/user-attachments/assets/d3775901-b2a7-4f38-be74-26969b6ce875",
                    width: 32,
                    height: 32
                  },
                  {
                    src: "https://github.com/user-attachments/assets/cad999ce-fab3-42d5-9a1a-01f0ef0296a5",
                    width: 32,
                    height: 32
                  },
                  {
                    src: "https://github.com/user-attachments/assets/0349d71d-90a6-4cf9-b59f-4b16a1f644d7",
                    width: 32,
                    height: 32
                  },
                  {
                    src: "https://github.com/user-attachments/assets/acb52942-7e0e-4061-8390-7ce61ca66b32",
                    width: 32,
                    height: 32
                  },
                  
                ]
              },
            },
            size: {
              value: { min: 10, max: 30 },
            },
          },
          detectRetina: true, 
        }}
      />
    </div>
  );
}


export default ParticlesBg;