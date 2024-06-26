import React, { useState } from 'react';
import { ModalDataType } from '../../types/ModalDataTypes';
import { PROFILE_ROUTE } from '../../constants/constants';

interface Props {
  modalData: ModalDataType;
  formType: string;
  addToPlanList: (id: number | null) => void;
  addToRatedList: (id: number | null) => void;
  closeModal: () => void;
}

const ModalButton: React.FC<Props> = ({ modalData, formType, addToPlanList, addToRatedList, closeModal }) => {
  const [open, setOpen] = useState(false);

  const toggleButton = () => {
    setOpen(!open);
  };

  const handleButtonClick = () => {
    if (formType === PROFILE_ROUTE.RATED) {
      if (modalData.id !== null) {
        addToPlanList(modalData.id);
      }
    } else if (formType === PROFILE_ROUTE.PLAN) {
      if (modalData.id !== null) {
        addToRatedList(modalData.id);
      }
    }
    setOpen(false);
    closeModal();
  };

  return (
    <div className='flex flex-col'>
      <button
        type='button'
        onClick={toggleButton}
        className={`text-sm text-black w-[158px] h-[32px] mt-2 ml-2 ${
          formType === PROFILE_ROUTE.RATED ? 'bg-[#75A7B7]' : formType === PROFILE_ROUTE.PLAN ? 'bg-[#599A7B]' : ''
        }`}
      >
        {formType === PROFILE_ROUTE.RATED ? `Просмотрено - ${modalData.clicked_rating}` : 'Запланировано'}
      </button>
      {open && (
        <button
          type='button'
          onClick={handleButtonClick}
          className={`text-sm text-black w-[158px] h-[32px] ml-2 ${
            formType === PROFILE_ROUTE.RATED ? 'bg-[#599A7B]' : formType === PROFILE_ROUTE.PLAN ? 'bg-[#75A7B7]' : ''
          }`}
        >
          {formType === PROFILE_ROUTE.RATED ? `Запланировано` : `Просмотрено - ${modalData.clicked_rating}`}
        </button>
      )}
    </div>
  );
};

export default ModalButton;
