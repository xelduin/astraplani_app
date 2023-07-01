import { useDispatch, useSelector } from 'react-redux';
import { hideModal, selectModal } from '../../store/reducer/gameSlice';
import WalletModal from './WalletModal';

const Modal = () => {
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();

  const onClickHideModal = () => {
    dispatch(hideModal());
  };

  if (modal) {
    let shownModal;
    switch (modal) {
      case 'wallet':
        shownModal = <WalletModal />;
        break;
      default:
        shownModal = <></>;
        break;
    }
    return (
      <>
        <div
          className="absolute z-40 opacity-80 min-w-full min-h-full bg-black"
          onClick={onClickHideModal}
        ></div>
        <div className="absolute z-50 text-white text-lg top-1/2 right-1/2 text-center">
          {shownModal}
          <button className="btn btn-purple" onClick={onClickHideModal}>
            Close
          </button>
        </div>
      </>
    );
  } else {
    <></>;
  }
};

export default Modal;
