import { Effects } from '@react-three/drei';
import { useSelector } from 'react-redux';
import {
  selectAnimaList,
  selectFocusedEntity,
  selectStarList,
} from '../../store/reducer/gameSlice';
import Star from '../scene/Star';

const StarPortrait = () => {
  const focusedEntity = useSelector(selectFocusedEntity);
  const starList = useSelector(selectStarList);
  const animaList = useSelector(selectAnimaList);

  return (
    <>
      <Effects disableGamma renderIndex={5}>
        {/* threshhold has to be 1, so nothing at all gets bloom by default */}
        <unrealBloomPass threshold={0.1} strength={1} radius={0.2} />
      </Effects>
      <Star
        id={focusedEntity.id}
        position={[0, 0, 8]}
        size={focusedEntity.size * 0.1}
        attributes={focusedEntity.attributes}
      />
    </>
  );
};

export default StarPortrait;
