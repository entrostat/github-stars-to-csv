import * as Yargs from 'yargs';
import { generate } from './generate';

function bootstrap(yargs: Yargs.Argv) {
    yargs = generate(yargs);
    yargs
        .help()
        .demandCommand()
        .showHelpOnFail(true)
        .argv;
}


const cli = Yargs.scriptName('github-stars-to-csv')
    .usage('$0 <cmd> [args]');

bootstrap(cli);
