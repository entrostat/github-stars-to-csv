import { AllRepoStatistics } from './all-repo-statistics';
import { promisify } from 'util';
import * as fs from 'fs';

const writeFile = promisify(fs.writeFile);

export async function createOutput(
    filename: string,
    allRepoStatistics: AllRepoStatistics,
) {
    const lines: string[][] = [[]];
    const allRepos = Object.keys(allRepoStatistics).filter(key =>
        allRepoStatistics.hasOwnProperty(key),
    );

    allRepos.forEach(repo => {
        lines[0].push(`${repo} stars`);
        lines[0].push(`${repo} cumulative`);
    });
    const firstKey = allRepos[0];
    const dates = Object.keys(allRepoStatistics[firstKey].stars);

    for (const date of dates) {
        const line: string[] = [];
        allRepos.forEach(repo => {
            line.push(allRepoStatistics[repo].stars[date].toString());
            line.push(allRepoStatistics[repo].cumulative[date].toString());
        });
        lines.push(line);
    }

    const csv = lines.map(line => line.join(',')).join('\n');
    await writeFile(filename, csv);
}
