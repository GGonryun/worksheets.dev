import { listFilesAndFoldersAtPath, readFilesInFolder } from './hardware';
const dirPath = './libs/util/hardware/_test/';

describe('readFilesInFolder', () => {
  it('should return an empty object for an empty folder', () => {
    const files = readFilesInFolder(`${dirPath}/folder-a`);
    expect(files).toEqual({});
  });

  it('should read files in a folder and return an object indexed by file names', () => {
    const files = readFilesInFolder(dirPath);

    expect(Object.keys(files)).toHaveLength(3);
    // Assuming the contents of the files are known
    expect(files['file-a.yaml']).toBe('yaml: structure\ntest: a\n');
    expect(files['file-b.yaml']).toBe('yaml: structure\ntest: b\n');
    expect(files['file-c.yaml']).toBe('yaml: structure\ntest: c\n');
  });

  it('should throw an error if the folder path is invalid', () => {
    const folderPath = './non-existent-folder';

    // Wrapping the function call in a function to catch the error
    const readInvalidFolder = () => {
      readFilesInFolder(folderPath);
    };

    expect(readInvalidFolder).toThrow();
  });
});

describe('listFilesAndFoldersAtPath', () => {
  it('should list all files and folders at the specified path', () => {
    const items = listFilesAndFoldersAtPath(dirPath);
    // Assuming the folder contains files: file1.txt, file2.txt
    // and folders: folder1, folder2
    expect(items).toHaveLength(4);
    expect(items).toContain('file-a.yaml');
    expect(items).toContain('file-b.yaml');
    expect(items).toContain('folder-a');
  });

  it('should throw an error if the path does not exist', () => {
    const dirPath = './non-existent-folder';

    // Wrapping the function call in a function to catch the error
    const listInvalidPath = () => {
      listFilesAndFoldersAtPath(dirPath);
    };

    expect(listInvalidPath).toThrow();
  });
});
