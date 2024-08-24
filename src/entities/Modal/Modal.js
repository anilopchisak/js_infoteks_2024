import React from 'react';
import './ui/Modal.scss';

const Modal = ({active, setActive, children}) => {
    return (
        //закрытие по нажатию на затемненную часть
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            {/* не будет закрываться при нажатии на контентную часть */}
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;