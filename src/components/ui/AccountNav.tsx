import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAccount, useConnectors } from '@starknet-react/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/reducer/gameSlice';
import { formatAddress } from '../../utils';

const LoggedInNav = () => {
  const { account, address } = useAccount();
  const { disconnect } = useConnectors();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    disconnect();
    localStorage.removeItem('ASTRAPLANI_WALLET');
  };

  return (
    <div className="flex">
      <div className="text-white py-2 px-4">{formatAddress(address)}</div>
      <button
        className="text-red-800 px-2 m-2 border border-red-800 font-semibold"
        onClick={onLogoutClick}
      >
        <FontAwesomeIcon icon={faSignOut} />
      </button>
    </div>
  );
};

const AccountNav = () => {
  const { account, address, status } = useAccount();
  const dispatch = useDispatch();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(address && status === 'connected');
    console.info('TRYING TO CONNECT...', isLogged);
  }, [account, status]);

  const onLoginClick = () => {
    dispatch(showModal('wallet'));
  };

  return (
    <>
      <div className="">
        {isLogged && <LoggedInNav />}

        {!isLogged && (
          <button className="btn btn-teal" onClick={onLoginClick}>
            Connect to Wallet
          </button>
        )}
      </div>
    </>
  );
};

export default AccountNav;
