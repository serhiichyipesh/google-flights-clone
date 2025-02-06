import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

export const VIEWS = {
  MAIN: 'main',
  EXPLORE: 'explore',
  DETAILS: 'details',
} as const;

export type TView = (typeof VIEWS)[keyof typeof VIEWS];

const ViewContext = createContext<{
  currentView: TView;
  setCurrentView: React.Dispatch<React.SetStateAction<TView>>;
}>({
  currentView: VIEWS.MAIN,
  setCurrentView: () => {},
});

export const ViewProvider = ({ children }: PropsWithChildren) => {
  const [currentView, setCurrentView] = useState<TView>(VIEWS.MAIN);

  return (
    <ViewContext.Provider
      value={{ currentView, setCurrentView: setCurrentView }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export const useViewProvider = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }

  const isInMainView = context.currentView === VIEWS.MAIN;
  const isInExploreView = context.currentView === VIEWS.EXPLORE;
  const isInDetailsView = context.currentView === VIEWS.DETAILS;

  return { ...context, isInMainView, isInExploreView, isInDetailsView };
};
