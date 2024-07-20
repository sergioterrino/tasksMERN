import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";

function ParticlesBg() {

  async function customInit(engine) {
    await loadFull(engine); // this adds the bundle to tsParticles
  }

  const options = {

  }


  return (
    <div>
      <Particles options={options} init={customInit} />
    </div>
  )
}

export default ParticlesBg