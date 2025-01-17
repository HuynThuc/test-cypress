'use client';

export const MainOthersPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:min-h-screen w-full lg:pr-6 min-h-[calc(100vh-100px)]">
      {children}
    </div>
  );
};
