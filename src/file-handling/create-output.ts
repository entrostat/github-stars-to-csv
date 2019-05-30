import { AllRepoStatistics } from '../generator/models/all-repo-statistics';
import { promisify } from 'util';
import * as fs from 'fs';
import { createFileDate } from './create-file-data';
import { convertFileDataToString } from './convert-file-data-to-string';

const writeFile = promisify(fs.writeFile);

export async function createOutput(
    filename: string,
    allRepoStatistics: AllRepoStatistics,
) {
    const fileData = createFileDate(allRepoStatistics);
    const csv = convertFileDataToString(fileData);
    await writeFile(filename, csv);
}
