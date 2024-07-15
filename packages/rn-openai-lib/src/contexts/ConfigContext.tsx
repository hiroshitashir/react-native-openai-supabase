import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import type { AppConfigType } from '../app/config';

interface ConfigContextInterface {
  config: AppConfigType;
}

const ConfigContext = createContext<ConfigContextInterface>(
  undefined as unknown as ConfigContextInterface
);

export const ConfigProvider = ({
  config,
  children,
}: PropsWithChildren<ConfigContextInterface>) => {
  const contextValue = useMemo(
    () => ({
      config,
    }),
    [config]
  );

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
