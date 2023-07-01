import { Effects, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, Node, extend } from '@react-three/fiber';
import { UnrealBloomPass } from 'three-stdlib';

import useRefs from 'react-use-refs';

import Modal from '../ui/Modal';
import AstralMap from './AstralMap';
import SelectionRing from './SelectionRing';

extend({ UnrealBloomPass });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      unrealBloomPass: Node<UnrealBloomPass, typeof UnrealBloomPass>;
    }
  }
}

export default function GameScene() {
  const [ref] = useRefs();

  return (
    <div
      ref={ref}
      className=""
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
    >
      {/** UI ELEMENTS */}
      <Modal />
      {/**  */}

      <Canvas
        className="canvas"
        //camera={{ position: [0, 0, 10] }}
      >
        <Effects disableGamma renderIndex={2}>
          {/* threshhold has to be 1, so nothing at all gets bloom by default */}
          <unrealBloomPass threshold={0.1} strength={1} radius={0.2} />
        </Effects>
        <color attach="background" args={['#111']} />
        <PerspectiveCamera makeDefault position={[0, 0, 80]} fov={35} />

        <OrbitControls
          zoomSpeed={0.5}
          enableZoom={true}
          enablePan={true}
          enableRotate={false}
        />

        <AstralMap />
        <SelectionRing />
      </Canvas>
    </div>
  );
}
