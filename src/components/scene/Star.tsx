import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFocusedEntity } from '../../store/reducer/gameSlice';
import { getColor } from '../../utils';

function Star({ id, position, size, attributes, isStatic = true }) {
  const [showInfo, setShowInfo] = useState(false);

  const dispatch = useDispatch();

  const color = getColor({ id, attributes });

  const onClick = () => {
    dispatch(setFocusedEntity(id));
    setShowInfo(true);
  };

  return (
    <group>
      <mesh position={position} onClick={onClick}>
        <meshBasicMaterial
          transparent={true}
          opacity={0.01}
          color={color}
          toneMapped={false}
        />
        <circleGeometry args={[size * 20]} />
      </mesh>
      <mesh position={position} rotation={[0, 0, Math.PI / 2]}>
        <meshBasicMaterial color={color} toneMapped={false} />
        <pointLight position={position} color={'red'} />
        <sphereGeometry args={[size, 64]} />
      </mesh>
    </group>
  );
}

export default Star;
