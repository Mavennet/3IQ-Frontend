import React, {Suspense, useLayoutEffect, useRef} from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import ThreeIQ from './3iq'
import styles from './styles.module.scss'

function MyCamera(props) {
  const cameraRef = useRef()
  const set = useThree((state) => state.set)
  const size = useThree(({size}) => size)

  useLayoutEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.aspect = size.width / size.height
      cameraRef.current.updateProjectionMatrix()
    }
  }, [size, props])

  useLayoutEffect(() => {
    set({camera: cameraRef.current})
  }, [])

  return <perspectiveCamera ref={cameraRef} {...props} />
}

function Rotating3DLogo() {
  return (
    <Canvas style={{height: '600px', position: 'absolute', top: '-56px', right: '-30px'}}>
      <MyCamera fov={75} near={0.1} far={1000} position={[0, 0, 5]} zoom={1}>
        <ambientLight intensity={0.2} />
        <pointLight intensity={1} position={[-0.2, -1.6, -1.85]} />
      </MyCamera>
      <OrbitControls
        autoRotate
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        setAzimuthalAngle={() => Math.PI / 2}
        enableZoom={false}
      />
      <Suspense fallback={null}>
        <ThreeIQ onClick={() => console.log('I was clicked')} />
      </Suspense>
    </Canvas>
  )
}

export default Rotating3DLogo
