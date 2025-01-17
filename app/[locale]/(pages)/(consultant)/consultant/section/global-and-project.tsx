'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/shacdn-ui/Button';

import WorldMap from '../components/WorldMap';
import { ProjectShowcase } from './project-showcase';

const MAP_WIDTH = 1060;
const MAP_HEIGHT = 539;
const DISPLAY_RATIO = 1;

const locations = [
  { id: 'US', name: 'United States', x: 0.19, y: 0.38 },
  { id: 'JP', name: 'Japan', x: 0.85, y: 0.42 },
  { id: 'VN', name: 'Vietnam', x: 0.77, y: 0.55 },
];

interface MarkerProps {
  x: number;
  y: number;
  isSelected: boolean;
  onClick: () => void;
}

const Marker: React.FC<MarkerProps> = ({ x, y, isSelected, onClick }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute',
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }}
    onClick={onClick}
  >
    <g filter="url(#filter0_d_1_172)">
      <circle cx="28.119" cy="17.6969" r="17.6608" fill="white" />
    </g>
    <circle
      cx="28.1192"
      cy="17.6972"
      r="13.2872"
      fill="white"
      stroke="#F53838"
      strokeWidth="2.49515"
    />
    <circle
      cx="28.1187"
      cy="17.6976"
      r="6.37101"
      fill={isSelected ? '#F53838' : 'white'}
    />
    <defs>
      <filter
        id="filter0_d_1_172"
        x="0.477663"
        y="0.0361328"
        width="55.2827"
        height="55.2828"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="9.98059" />
        <feGaussianBlur stdDeviation="4.99029" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.529167 0 0 0 0 0.529167 0 0 0 0 0.529167 0 0 0 0.14 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1_172"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1_172"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export function GlobalPresenceAndProjects() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>('JP');
  const t = useTranslations('Consultant.global');

  return (
    <section id="global" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <h2 className="text-3xl font-bold mb-12 text-center">{t('title')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">{t('subtitle')}</h3>
            <h4 className="text-xl font-medium text-primary">
              {t('description')}
            </h4>
            <p className="text-muted-foreground">{t('content')}</p>
            <Button variant="outline" onClick={() => setSelectedCountry(null)}>
              {t('viewAll')}
            </Button>
          </div>
          <div
            className="relative"
            style={{
              width: '100%',
              maxWidth: `${MAP_WIDTH * DISPLAY_RATIO}px`,
              margin: '0 auto',
            }}
          >
            <div style={{ paddingTop: `${(MAP_HEIGHT / MAP_WIDTH) * 100}%` }} />
            <div className="absolute inset-0">
              <WorldMap
                width={MAP_WIDTH * DISPLAY_RATIO}
                height={MAP_HEIGHT * DISPLAY_RATIO}
                className="w-full h-full"
              />
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  x={location.x}
                  y={location.y}
                  isSelected={selectedCountry === location.id}
                  onClick={() => setSelectedCountry(location.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-[600px]">
          <ProjectShowcase selectedCountry={selectedCountry} />
        </div>
      </div>
    </section>
  );
}
