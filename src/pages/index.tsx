import { Node, extend } from '@react-three/fiber';
import { useConnectors } from '@starknet-react/core';
import { useEffect } from 'react';
import { UnrealBloomPass } from 'three-stdlib';
import GameScene from '../components/scene/GameScene';
import AssetView from '../components/ui/AssetView';
import EntityCard from '../components/ui/EntityCard';
import MainNav from '../components/ui/MainNav';

extend({ UnrealBloomPass });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      unrealBloomPass: Node<UnrealBloomPass, typeof UnrealBloomPass>;
    }
  }
}

export default function Home() {
  const { available, connect, refresh } = useConnectors();

  useEffect(() => {
    const walletId = localStorage.getItem('ASTRAPLANI_WALLET');
    if (walletId && available.length > 0) {
      const connector = available.find((e) => {
        return e.id() == walletId;
      });
      try {
        connect(connector);
      } catch (e) {
        console.error(e);
      }
    }
  }, [available, connect]);

  return (
    <>
      <MainNav />
      <GameScene />
      <EntityCard />
      <AssetView />
    </>
  );
}
