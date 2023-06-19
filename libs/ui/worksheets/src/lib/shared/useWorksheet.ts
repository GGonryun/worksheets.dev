import { GetWorksheetResponse } from '@worksheets/api/worksheets';
import { useUser } from '@worksheets/util/auth/client';

export const useWorksheet = (worksheetId?: string) => {
  const {
    request: { useSecure },
  } = useUser();
  return useSecure<GetWorksheetResponse>(
    `/api/worksheets?worksheetId=${worksheetId}`,
    Boolean(worksheetId)
  );
};
