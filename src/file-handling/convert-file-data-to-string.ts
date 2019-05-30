import { FileData } from './models/file-data';

export function convertFileDataToString(fileData: FileData) {
    const lines: string[][] = [[]];
    const allRepos = Object.keys(fileData).filter(key =>
        fileData.hasOwnProperty(key),
    );

    lines[0].push('date');
    allRepos.forEach(repo => {
        lines[0].push(`${repo} stars`);
        lines[0].push(`${repo} cumulative`);
    });
    const firstKey = allRepos[0];
    const dates = Object.keys(fileData[firstKey].stars);

    for (const date of dates) {
        const line: string[] = [];
        line.push(date);
        allRepos.forEach(repo => {
            line.push(fileData[repo].stars[date].toString());
            line.push(fileData[repo].cumulative[date].toString());
        });
        lines.push(line);
    }

    return lines.map(line => line.join(',')).join('\n');
}
