export function getRouterURL(
  routerPath: string,
  params?: Record<string, string>,
): string {
  if (!params) return routerPath;

  return Object.entries(params).reduce((output, [key, value]) => {
    return output.replace(`{${key}}`, value);
  }, routerPath as string);
}

export const handleFilterParams = <T extends object>(queryParams: T) => {
  return Object.fromEntries(
    Object.entries(queryParams).filter(
      ([, value]) => value !== null && value !== '',
    ),
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toQueryString = (params: Record<string, any>) => {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `?${queryString}` : '';
};
