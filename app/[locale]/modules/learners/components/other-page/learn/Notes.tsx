'use client';
import { useState } from 'react';
import { Save } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/shacdn-ui/Button';
import { Icons } from '@/shared/components/Icon/icons';

const Notes = () => {
  const [noteContent, setNoteContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const t = useTranslations('Home');

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(event.target.value);
  };

  const handleSave = () => {
    setOriginalContent(noteContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNoteContent(originalContent);
    setIsEditing(false);
  };

  const handleTextAreaClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="bg-surface p-4 rounded w-full">
      <div className="w-full bg-surface border border-border/20 rounded-lg shadow-md overflow-hidden">
        <div className="w-full p-4 text-primary">
          <div className="flex items-center gap-2 mb-4 ">
            <Icons.note />
            <h2 className="text-lg flex items-center">{t('note')}</h2>
          </div>
          <div className="p-4">
            <textarea
              className="resize-y shadow-inset bg-surface border border-border/25 text-text-light w-full h-[204px] p-4 rounded focus-visible:outline-none"
              style={{ minHeight: '100px' }}
              placeholder={t('placeholder')}
              value={noteContent}
              onChange={handleNoteChange}
              onClick={handleTextAreaClick}
            />
            {isEditing && (
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  onClick={handleCancel}
                  className="flex items-center bg-surface text-primary ring-2 ring-primary/25 hover:text-surface"
                >
                  <h6 className="text-lg flex items-center">{t('cancel')}</h6>
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex items-center bg-surface text-primary ring-2 ring-primary/25 hover:text-surface"
                >
                  <Save className="mr-2 h-4 w-4" />
                  <h6 className="text-lg flex items-center">{t('save')}</h6>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
