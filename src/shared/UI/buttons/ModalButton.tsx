import React, { useState } from 'react';
import { ModalDataType } from '../../types/ModalDataTypes';
import { LISTS } from '../../constants/constants';

interface Props {
  modalData: ModalDataType;
  formType: string;
  addToPlanList: (id: number) => void;
  addToRatedList: (id: number) => void;
}

const ModalButton: React.FC<Props> = ({ modalData, formType, addToPlanList, addToRatedList }) => {
  const [open, setOpen] = useState(false);

  const toggleButton = () => {
    setOpen(!open);
  };

  const handleButtonClick = () => {
    if (formType === LISTS.RATED) {
      if (modalData.id !== null) {
        addToPlanList(modalData.id);
      }
    } else if (formType === LISTS.PLAN) {
      if (modalData.id !== null) {
        addToRatedList(modalData.id);
      }
    }
    setOpen(false);
  };

  return (
    <div className='flex flex-col'>
      <button
        type='button'
        onClick={toggleButton}
        className={`text-sm text-black w-[158px] h-[32px] mt-2 ml-2 ${
          formType === LISTS.RATED ? 'bg-[#75A7B7]' : formType === LISTS.PLAN ? 'bg-[#599A7B]' : ''
        }`}
      >
        {formType === LISTS.RATED ? `Просмотрено - ${modalData.clickedRating}` : 'Запланировано'}
      </button>
      {open && (
        <button
          type='button'
          onClick={handleButtonClick}
          className={`text-sm text-black w-[158px] h-[32px] ml-2 ${
            formType === LISTS.RATED ? 'bg-[#599A7B]' : formType === LISTS.PLAN ? 'bg-[#75A7B7]' : ''
          }`}
        >
          {formType === LISTS.RATED ? `Запланировано` : `Просмотрено - ${modalData.clickedRating}`}
        </button>
      )}
    </div>
  );
};

export default ModalButton;
