import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Group, Vector3 } from 'three';
import { selectFocusedEntity } from '../../store/reducer/gameSlice';

// Will possibly use Zustand state in fetch hook
function SelectionRing() {
  const focusedEntity = useSelector(selectFocusedEntity);

  const [position, setPosition] = useState(new Vector3(0, 0, 0));

  const ref = useRef<Group>();

  useEffect(() => {
    if (focusedEntity && focusedEntity.position !== undefined) {
      ref.current.position.lerp(focusedEntity.position, 1);
    }
  }, [focusedEntity]);

  return (
    <>
      <group position={position} ref={ref} visible={focusedEntity != undefined}>
        <mesh>
          <ringGeometry args={[0.9, 0.92, 32]} />
          <meshBasicMaterial color={'white'} toneMapped={false} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.9, 2.92, 32]} />
          <meshBasicMaterial color={'white'} toneMapped={false} />
        </mesh>
        <mesh>
          <ringGeometry args={[5.9, 5.92, 32]} />
          <meshBasicMaterial color={'white'} toneMapped={false} />
        </mesh>
      </group>
    </>
  );
}

export default SelectionRing;
