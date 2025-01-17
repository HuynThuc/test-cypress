import { ReactElement } from 'react';

import { ExtendableComponentProps } from '../../types';

type PageWrapperProp = ExtendableComponentProps<
  'div',
  { children: ReactElement | ReactElement<ReactElement>[]; pageTitle: string }
>;

export function PageWrapper({
  children,
  pageTitle,
  ...props
}: PageWrapperProp) {
  let pageAction, pageContent;

  if (Array.isArray(children)) {
    [pageAction, pageContent] = children;
  } else {
    pageContent = children;
  }

  return (
    <div className="flex min-h-[61vh] bg-white w-full pt-2 bottom-0" {...props}>
      <div className="flex flex-col w-full p-5 gap-5">
        <div className="flex justify-between items-center h-10">
          <b>{pageTitle}</b>
          {pageAction}
        </div>

        {pageContent}
      </div>
    </div>
  );
}
