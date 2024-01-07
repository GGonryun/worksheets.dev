import { FC, ReactNode } from 'react';
import { BasicInformationFormContextType } from './type';
import { BasicInformationFormContext } from './context';

export const BasicInformationFormContextProvider: FC<{
  children: ReactNode;
  value: BasicInformationFormContextType;
}> = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: BasicInformationFormContextType;
}) => {
  return (
    <BasicInformationFormContext.Provider value={value}>
      {children}
    </BasicInformationFormContext.Provider>
  );
};
