'use client';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Icons } from '@/shared/components/Icon/icons';

import { RootState } from '@/modules/learners/store';
import { setPrimaryColor } from '@/modules/learners/store/slice/colorSlice';

export const ColorSwitchPrimary = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsModalOpen: (state: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const primaryColor = useSelector(
    (state: RootState) => state.color.primaryColor,
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, setIsModalOpen]);

  const colorMap = {
    green: 'var(--primary-green)',
    coral: 'var(--primary-coral)',
    orange: 'var(--primary-orange)',
    amber: 'var(--primary-amber)',
    yellow: 'var(--primary-yellow)',
    lime: 'var(--primary-lime)',
    teal: 'var(--primary-teal)',
    turquoise: 'var(--primary-turquoise)',
    cyan: 'var(--primary-cyan)',
    skyblue: 'var(--primary-skyblue)',
    lavender: 'var(--primary-lavender)',
    pink: 'var(--primary-pink)',
    rose: 'var(--primary-rose)',
    coralpink: 'var(--primary-coralpink)',
  };

  const handleColorSelection = (newColor: string) => {
    dispatch(setPrimaryColor(newColor));
    document.documentElement.style.setProperty('--primary-color', newColor);
    localStorage.setItem('primaryColor', newColor);
  };
  const renderColorOptions = () => {
    return Object.entries(colorMap).map(([key, value]) => (
      <div
        key={key}
        className="cursor-pointer relative gap-2"
        onClick={() => handleColorSelection(value)}
      >
        <div
          className="w-[50px] h-[50px] relative cursor-pointer"
          style={{
            backgroundColor: `hsl(${value})`,
            border:
              (primaryColor || 'var(--primary-green)') === value
                ? '2px solid #FFD700'
                : 'none',
          }}
        >
          {(primaryColor || 'var(--primary-green)') === value && (
            <span className="absolute text-text-light -top-3 -right-3 px-1 rounded-full">
              <Icons.check />
            </span>
          )}
        </div>
        {(primaryColor || 'var(--primary-green)') === value && (
          <span className="absolute text-text-light inset-0 flex items-center text-[10px] px-[5px] font-bold bg-opacity-75">
            Current
          </span>
        )}
      </div>
    ));
  };
  return (
    <div>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 cursor-pointer p-2 rounded"
      >
        <span className="">Choose Color Primary</span>
      </div>

      {isModalOpen && (
        <div className="fixed right-[calc(250%-81px)] bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="relative bg-surface p-6 rounded shadow-lg w-[570px] h-[365px]:"
          >
            <h2 className="text-2xl text-text-prima mb-4">
              Choose Color Theme
            </h2>
            <div className="grid grid-cols-7 gap-4 mb-4">
              {renderColorOptions()}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2 mt-4 text-white bg-primary rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
