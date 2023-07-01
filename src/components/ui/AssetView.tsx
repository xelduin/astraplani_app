import { Effects } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useAccount } from '@starknet-react/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAnimaList,
  selectStarList,
  setFocusedEntity,
} from '../../store/reducer/gameSlice';
import Star from '../scene/Star';

const AssetBox = ({ asset, onFocus }) => {
  const dispatch = useDispatch();

  const onActionClick = () => {
    if (asset.manifested) dispatch(setFocusedEntity(asset.id));
  };

  return (
    <>
      <div
        className="flex bg-black bg-opacity-90 border border-slate-700 hover:border-4"
        onClick={onFocus}
      >
        <div className="h-32 w-16">
          <Canvas className="">
            <color attach="background" args={['#111']} />

            <Effects disableGamma renderIndex={5}>
              {/* threshhold has to be 1, so nothing at all gets bloom by default */}
              <unrealBloomPass threshold={0.1} strength={1} radius={0.2} />
            </Effects>
            <Star
              id={asset.id}
              position={[0, 0, 0]}
              size={0.8}
              attributes={asset.attributes}
            />
          </Canvas>
        </div>
        <table className="table-fixed">
          <thead>Anima {asset.id}</thead>
          <tbody>
            {asset.mana &&
              asset.mana.map((e, i) => (
                <tr key={i}>
                  <td>{e.name}</td>
                  <td>{e.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const AssetList = ({ assets, assetTitle }) => {
  const [assetSelection, setAssetSelection] = useState(undefined);

  const onAssetClick = (id) => {
    setAssetSelection(id === assetSelection ? undefined : id);
    //dispatch(setTargetStar(id));
  };

  return (
    <div className="border border-slate-900">
      <div>{assetTitle}</div>
      <div className="grid grid-flow-row gap-4 overflow-y-auto px-4 h-[25vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {assets.map((e, i) => {
          console.info(e);
          const isFocused = assetSelection == e.id;
          return (
            <AssetBox key={i} asset={e} onFocus={() => onAssetClick(e.id)} />
          );
        })}
      </div>
    </div>
  );
};

const AssetView = () => {
  const { account, address, status } = useAccount();

  const animaList = useSelector(selectAnimaList);
  const starList = useSelector(selectStarList);

  const ownedStars = animaList
    .filter((e) => e.owner == address)
    .map((e) => {
      return starList.find((star) => star.id == e.id);
    });

  return (
    <>
      {status === 'connected' && (
        <div className="right-2 px-4 py-2 flex-rows absolute z-10">
          <div className="bg-black border border-white px-4 py-2 mb-4 w-full">
            <div className="text-lg">Dominion</div>
            <AssetList assets={ownedStars} assetTitle={'Stars'} />
          </div>
        </div>
      )}
    </>
  );
};

export default AssetView;
