import { ParticlesComponent } from '../particles'

function AnimatedBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0
      }}
    >
      <ParticlesComponent />
    </div>
  )
}

export default AnimatedBackground
