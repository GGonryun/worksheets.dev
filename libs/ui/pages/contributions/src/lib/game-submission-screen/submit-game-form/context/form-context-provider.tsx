import { FC, ReactNode } from 'react';
import { FormContextType } from './type';
import { FormContext } from './context';

export const FormContextProvider: FC<{
  children: ReactNode;
  value: FormContextType;
}> = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: FormContextType;
}) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
