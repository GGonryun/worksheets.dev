import {
  TaskLogEntity,
  newTaskLoggingDatabase,
} from '@worksheets/data-access/tasks';
import {} from '@worksheets/util/time';

const logsDb = newTaskLoggingDatabase();

type LoadWorksheetLogsRequest = {
  worksheetId: string;
  startTime: number;
  endTime: number;
};

export const loadWorksheetLogs = async ({
  worksheetId,
  endTime,
  startTime,
}: LoadWorksheetLogsRequest) => {
  const logs = await logsDb.query(
    {
      f: 'worksheetId',
      o: '==',
      v: worksheetId,
    },
    { f: 'createdAt', o: '>=', v: endTime },
    { f: 'createdAt', o: '<', v: startTime }
  );
  return SAMPLE_LOGS;
};

const SAMPLE_JSON = {
  glossary: {
    title: 'example glossary',
    GlossDiv: {
      title: 'S',
      GlossList: {
        GlossEntry: {
          ID: 'SGML',
          SortAs: 'SGML',
          GlossTerm: 'Standard Generalized Markup Language',
          Acronym: 'SGML',
          Abbrev: 'ISO 8879:1986',
          GlossDef: {
            para: 'A meta-markup language, used to create markup languages such as DocBook.',
            GlossSeeAlso: ['GML', 'XML'],
          },
          GlossSee: 'markup',
        },
      },
    },
  },
};

const SAMPLE_LOGS: TaskLogEntity[] = [
  {
    id: '1',
    level: 'trace',
    worksheetId: '',
    taskId: '',
    createdAt: 1687645733072,
    message: 'This is a test message from the worksheets system',
    data: JSON.stringify(SAMPLE_JSON, null, 2),
  },
  {
    id: '2',
    level: 'debug',
    worksheetId: '',
    taskId: '',
    createdAt: 1687645733072,
    message: 'This is a test message from the worksheets system',
    data: JSON.stringify(
      {
        test: 'test',
        test2: 'test2',
        test3: 'test3',
      },
      null,
      2
    ),
  },
  {
    id: '3',
    level: 'warn',
    worksheetId: '',
    taskId: '',
    createdAt: 1687645733072,
    message: 'This is a test message from the worksheets system',
    data: JSON.stringify({
      test: 'test',
      test2: 'test2',
      test3: 'test3',
    }),
  },
];
