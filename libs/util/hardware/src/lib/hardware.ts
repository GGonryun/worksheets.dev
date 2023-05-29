import * as fs from 'fs';
import * as path from 'path';

export function readFilesInFolder(folderPath: string): Record<string, string> {
  const files: Record<string, string> = {};

  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    const isFile = fs.statSync(filePath).isFile();
    if (!isFile) return;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    files[file] = fileContent;
  });

  return files;
}

export function listFilesAndFoldersAtPath(dirPath: string): string[] {
  const filesAndFolders: string[] = fs.readdirSync(dirPath);
  return filesAndFolders;
}
