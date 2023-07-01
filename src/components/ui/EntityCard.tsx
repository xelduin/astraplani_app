import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFocusedEntity } from '../../store/reducer/gameSlice';
import StarPortrait from './StarPortrait';

const EntityCard = () => {
  const focusedEntity = useSelector(selectFocusedEntity);

  useEffect(() => {
    console.info('focused', focusedEntity);
  }, [focusedEntity]);

  return (
    <>
      {focusedEntity && (
        <div className="bottom-2 z-10 absolute bg-black border border-gray-500">
          <div className="text-center text-xl py-2">
            {focusedEntity.name === ''
              ? `Anima ${focusedEntity.id}`
              : focusedEntity.name.charAt(0).toUpperCase() +
                focusedEntity.name.slice(1)}
          </div>
          <Canvas className="h-32 w-32">
            <color attach="background" args={['#111']} />

            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />

            <StarPortrait />
          </Canvas>

          <div className="grid grid-cols-2 gap-2 p-2 justify-between">
            <table className="table-fixed border border-gray-700 p-4">
              <thead className="font-semibold">Elements</thead>
              <tbody>
                {focusedEntity.attributes.slice(8, 12).map((e, i) => (
                  <tr key={i}>
                    <td>{e.name}</td>
                    <td>
                      {e.level}/{e.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="table-fixed border border-gray-700 p-4">
              <thead className="font-semibold">Mana</thead>
              <tbody>
                {focusedEntity.mana.map((e, i) => (
                  <tr key={i}>
                    <td>{e.name}</td>
                    <td>{e.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="table-fixed border border-gray-700 p-4">
              <thead className="font-semibold">Attributes</thead>
              <tbody>
                {focusedEntity.attributes.slice(0, 8).map((e, i) => (
                  <tr key={i}>
                    <td>{e.name}</td>
                    <td>
                      {e.level}/{e.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="grid grid-rows-4 gap-2 justify-start">
              <button className="rounded-lg bg-slate-800 px-4">
                Charge Mana
              </button>
              <button className="rounded-lg bg-slate-800 px-4">
                Transmute Mana
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EntityCard;
