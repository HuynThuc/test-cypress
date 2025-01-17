import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Icons } from '@/shared/components/Icon/icons';

export const Search = () => {
  const [search, setSearch] = useState('');

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleSearch = () => {
    if (search.trim() !== '') {
      router.push(`/search?text=${search}`);
      setSearch('');
    }
  };

  return (
    <div className="lg:h-11 h-9 xl:w-[500px] lg:w-[320px] w-full px-4 my-auto relative flex lg:gap-4 gap-3 lg:flex-row flex-row-reverse bg-surface items-center rounded-full shadow-inset focus-within:ring-2 focus-within:ring-primary/60">
      <Icons.search
        onClick={() => handleSearch()}
        className="cursor-pointer text-icon lg:w-6 w-4 lg:h-6 h-4 shrink-0"
      />
      <input
        type="text"
        className="py-2.5 ring-/0 w-full focus:outline-none text-stylized-small bg-transparent"
        placeholder="Search something..."
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        value={search}
      />
    </div>
  );
};
