import * as Yargs from 'yargs';

export function generate(yargs: Yargs.Argv) {
    return yargs
        .command('generate [repo]', 'Generate a new CSV file with GitHub stars for one or more repositories', (y) => {
        return y.option('r', {
            alias: 'repo',
            demandOption: true,
            describe: 'A repository you\'d like to retrieve the star statistics for.',
            type: 'string'
        });
    }, () => console.log('generate'));
}
