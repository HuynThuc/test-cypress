'use client';

import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { HelperActivityComponent } from '../../../modules/admin/components/helper-history-action';

const HelperActivityPage: NextPage = () => {
  return (
    <div>
      <NextSeo
        title="MDD"
        additionalMetaTags={[
          {
            property: 'keywords',
            content:
              'GiaDinhDev, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native',
          },
        ]}
      />
      <div
        className="flex min-h-[100vh]"
        style={{ backgroundColor: 'rgb(225, 250, 255)' }}
      >
        <div className="flex w-[85%] flex-col pt-5">
          <HelperActivityComponent />
        </div>
      </div>
    </div>
  );
};

export default HelperActivityPage;
