#!/usr/bin/env node
import * as Yargs from 'yargs';
import { retrieveRepoStars } from './generator/retrieve-repo-stars';

async function run() {
    const incomingArguments: any = Yargs.scriptName('github-stars-to-csv')
        .usage('$0 [args]')
        .option('r', {
            alias: 'repo',
            demandOption: true,
            description: "A repo that you'd like to collect stats for",
        })
        .option('t', {
            alias: 'token',
            demandOption: true,
            description: 'Your GitHub developer token',
        })
        .showHelpOnFail(true)
        .help().argv;

    await retrieveRepoStars(incomingArguments.repo, incomingArguments.token);
}

run()
    .then(done => done)
    .catch(error => console.error(error));
