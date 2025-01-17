import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';

import { Icons } from '@/shared/components/Icon/icons';
import { useDebounce } from '@/shared/hook/UseDebounce';
import { DEBOUNCED_TIME_700 } from '@/shared/constants';
import { useCustomRouter } from '@/shared/utils/routerCustom';
import { useGetCurrentLocale } from '@/shared/hook';

import { fetchSearch } from '@/modules/learners/services/search/fetchSearch.service';
import { ISearchResponse } from '@/modules/learners/types/Search.types';
import { getYouTubeID } from '@/modules/learners/utils';
import { setVideoId } from '@/modules/learners/store/slice';
const MAX_HISTORY_ITEMS = 5;

export const Search = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<ISearchResponse | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedSearch = useDebounce<string>(search, DEBOUNCED_TIME_700);

  const router = useRouter();
  const { pushWithLocale } = useCustomRouter(useGetCurrentLocale);
  const dispatch = useDispatch();
  const t = useTranslations('Search');

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    if (debouncedSearch.trim() !== '') {
      fetchSearchResults(debouncedSearch);
      setShowDropdown(true);
    } else {
      setResults(null);
      setShowDropdown(false);
    }
  }, [debouncedSearch]);

  const fetchSearchResults = async (search: string) => {
    try {
      const response = await fetchSearch(search, 1, 10);
      if (response) {
        setResults(response);
      } else {
        toast.error('No data found');
      }
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = (searchTerm: string = search) => {
    if (searchTerm.trim() !== '') {
      router.push(`/search?text=${searchTerm}`);

      const newHistory = [
        searchTerm,
        ...searchHistory.filter((item) => item !== searchTerm),
      ].slice(0, MAX_HISTORY_ITEMS);

      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));

      setSearch('');
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-full mx-auto lg:mx-0 sm:w-[60%]">
      <div className="lg:h-11 h-9 xl:w-[500px] lg:w-[320px] w-full px-4 my-auto relative flex lg:gap-4 gap-3 lg:flex-row flex-row-reverse bg-surface items-center rounded-full shadow-inset focus-within:ring-2 focus-within:ring-primary/60">
        <Icons.search
          onClick={() => handleSearch()}
          className="cursor-pointer text-icon lg:w-6 w-4 lg:h-6 h-4 shrink-0"
        />
        <input
          type="text"
          className="py-2.5 ring-0 w-full focus:outline-none text-stylized-small bg-transparent"
          placeholder={t('search')}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          value={search}
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {showDropdown && (
        <div
          ref={searchRef}
          className="absolute w-full mt-2 bg-white rounded-lg shadow-lg xl:w-[500px] lg:w-[320px] focus:outline-none bg-transparent z-50"
        >
          {searchHistory.length > 0 && (
            <div className="p-2">
              <div className="px-2 py-1.5 font-bold text-text-dark">
                {t('recentsearches')}
              </div>
              <div className="max-h-[200px] overflow-y-auto">
                {searchHistory.map((term, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSearch(term)}
                  >
                    <Icons.search className="w-4 h-4 text-muted-foreground text-text-dark" />
                    <span className="text-stylized-small text-text-dark">
                      {term}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {Array.isArray(results?.videos) && results.videos.length > 0 && (
            <div className="p-2">
              <div className="px-2 py-1.5 font-bold text-text-dark">
                {' '}
                {t('videos')}
              </div>
              <div className="overflow-y-auto">
                {results.videos.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      dispatch(setVideoId(getYouTubeID(item.youtubeUrl)));
                      pushWithLocale({
                        url: '/learn',
                        params: `v=${getYouTubeID(item.youtubeUrl)}`,
                        shallow: false,
                      });
                      setShowDropdown(false);
                      setSearch('');
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <Icons.videos className="w-4 h-4 text-muted-foreground text-text-dark" />
                      <span className="text-stylized-small font-medium text-text-dark">
                        {item.title.en}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
