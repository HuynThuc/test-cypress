'use client';
import { ReactNode } from 'react';

// Define the type `CardListWrapperProps`
interface CardListWrapperProps<T> {
  list: T[]; // Accepts any list of objects
  // eslint-disable-next-line no-unused-vars
  renderItem: (item: T, index: number) => ReactNode; // Function to render each item
}

const CardListWrapper = <T,>({ list, renderItem }: CardListWrapperProps<T>) => {
  return (
    <>
      {list?.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
    </>
  );
};

export default CardListWrapper;
