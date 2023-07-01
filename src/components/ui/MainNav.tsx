import { useAccount } from '@starknet-react/core';
import { useState } from 'react';
import AccountNav from './AccountNav';

const MainNav = () => {
  const [assetsVisible, setAssetsVisible] = useState(false);
  const { status } = useAccount();

  const onLogoClick = () => {
    if (status === 'connected') setAssetsVisible(true);
  };

  return (
    <>
      <div className="bg-obsidian-800 bg-opacity-80 flex justify-between px-16">
        <button className="btn text-white font-bold" onClick={onLogoClick}>
          {String.fromCodePoint(0x2126)}
        </button>

        <AccountNav />
      </div>
    </>
  );
};

export default MainNav;
