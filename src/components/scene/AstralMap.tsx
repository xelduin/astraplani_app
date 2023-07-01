import { extend } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InstancedMesh, Object3D } from 'three';
import { UnrealBloomPass } from 'three-stdlib';
import {
  selectAnimaList,
  selectStarList,
  setFocusedEntity,
} from '../../store/reducer/gameSlice';
import { getColor } from '../../utils';

extend({ UnrealBloomPass });

const AstralMap = ({ temp = new Object3D() }) => {
  const dispatch = useDispatch();
  const starList = useSelector(selectStarList);
  const animaList = useSelector(selectAnimaList);

  const starRef = useRef<InstancedMesh>();
  const dustRef = useRef<InstancedMesh>();

  useEffect(() => {
    const currentStarList = starRef.current;
    const currentDustRef = dustRef.current;

    for (let i = 0; i < starList.length; i++) {
      const curStar = starList[i];
      const curAnima = animaList.find((e) => curStar.id == e.id);

      temp.position.set(
        starList[i].position.x,
        starList[i].position.y,
        starList[i].position.z
      );
      const scale = starList[i].size;
      temp.scale.set(scale, scale, scale);
      temp.updateMatrix();

      currentStarList.setMatrixAt(i, temp.matrix);
      currentStarList.setColorAt(i, getColor(curAnima));
      currentStarList.instanceMatrix.needsUpdate = true;
    }

    for (let i = 0; i < starList.length; i++) {
      const curStar = starList[i];
      const curAnima = animaList.find((e) => curStar.id == e.id);

      temp.position.set(
        starList[i].position.x,
        starList[i].position.y,
        starList[i].position.z
      );
      const scale = starList[i].size;
      temp.scale.set(scale, scale, scale);
      temp.updateMatrix();
      currentDustRef.setMatrixAt(i, temp.matrix);
      currentDustRef.setColorAt(i, getColor(curAnima));
      currentDustRef.instanceMatrix.needsUpdate = true;
    }
  }, [starList, temp]);

  const onStarClick = (e) => {
    // Assumes instancing ids stars in order, star id starts from 1
    const id = e.instanceId + 1;
    console.info(id);
    dispatch(setFocusedEntity(id));
  };

  return (
    <>
      <instancedMesh
        ref={starRef}
        args={[null, null, starList.length]}
        onClick={onStarClick}
      >
        <meshBasicMaterial toneMapped={false} />
        <sphereGeometry args={[0.1, 64]} />
      </instancedMesh>
      <instancedMesh
        ref={dustRef}
        args={[null, null, starList.length]}
        onClick={onStarClick}
      >
        <meshBasicMaterial
          transparent={true}
          opacity={0.01}
          toneMapped={false}
        />
        <circleGeometry args={[1, 64]} />
      </instancedMesh>
    </>
  );
};

export default AstralMap;
