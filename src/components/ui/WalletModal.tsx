import { useAccount, useConnectors } from '@starknet-react/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../store/reducer/gameSlice';

function WalletModal() {
  const { connect, connectors } = useConnectors();
  const { connector, status } = useAccount();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'connected') {
      dispatch(hideModal());
    }
  }, [status]);

  const onLoginClick = (connector) => {
    connect(connector);
    localStorage.setItem('ASTRAPLANI_WALLET', connector.options.id);
  };

  return (
    <>
      <ul>
        {connectors.map((connector) => (
          <li key={connector.id()} className="btn btn-teal m-2">
            <button onClick={() => onLoginClick(connector)}>
              Connect {connector.id()}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default WalletModal;
