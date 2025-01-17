'use client';

import { Copy, Heart, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Card } from '@/shared/components/shacdn-ui/Card';
import { Button } from '@/shared/components/shacdn-ui';

import { fetchVocabulary } from '@/modules/learners/services/search/fetchVocabulary.service';

import { IWordResponse } from '../../../types/Search.types';
import { playAudio } from '../../../utils/playAudio.utils';

interface VocabularyTabProps {
  vocabulary?: string;
}

const VocabularyTab: React.FC<VocabularyTabProps> = ({ vocabulary }) => {
  const [word, setWord] = useState<IWordResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!vocabulary) return;

      setLoading(true);

      try {
        const response = await fetchVocabulary(vocabulary);
        if (response) {
          setWord(response);
        } else {
          toast.error('No vocabulary data found');
        }
      } catch (err) {
        toast.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vocabulary]);
  //check loading
  if (loading) {
    return (
      <Card className="w-full h-[414px] p-6 mt-6 rounded flex items-center justify-center">
        <span>Loading...</span>
      </Card>
    );
  }

  if (!word) {
    return (
      <Card className="w-full h-[414px] p-6 mt-6 rounded">
        No vocabulary data available
      </Card>
    );
  }

  return (
    <Card className="w-full p-6 mt-6 rounded">
      <div className="mx-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold capitalize">{vocabulary}</h2>
        <div className="flex gap-2">
          <Button size="icon" className="h-8 w-8 bg-inherit hover:bg-inherit">
            <Copy className="h-6 w-6" />
          </Button>
          <Button size="icon" className="h-8 w-8 bg-inherit hover:bg-inherit">
            <Heart className="h-6 w-6 " />
          </Button>
        </div>
      </div>

      <div className=" mx-6 flex items-center space-x-1 py-6">
        <span className="text-lg py-1 rounded">
          UK /{word.definitions[0]?.pronunciationUK}/
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary"
          onClick={(e) => {
            e.stopPropagation();
            playAudio(word.definitions[0]?.pronunciationUKMp3);
          }}
        >
          <Volume2 className="h-6 w-6" />
        </Button>
        <span className="text-lg py-1 rounded ">
          US /{word.definitions[0]?.pronunciationIPA}/
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary"
          onClick={(e) => {
            e.stopPropagation();
            playAudio(word?.definitions[0].pronunciationUSMp3);
          }}
        >
          <Volume2 className="h-6 w-6" />
        </Button>
      </div>
      <div className="mx-6  mb-4 border-t border-border" />

      <div className=" mx-6 space-y-4">
        <span className="text-lg font-bold capitalize ">
          {word.definitions[0]?.posFullName}
        </span>
        {word.definitions && word.definitions[0] && (
          <div className="space-y-1">
            <p className="capitalize">
              {word.definitions[0]?.vietnameseDefinition}
            </p>
            <p>{word.definitions[0]?.englishExample}</p>
            <p>{word.definitions[0]?.englishDefinition}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VocabularyTab;
