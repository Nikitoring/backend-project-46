import { Command } from 'commander';
const program = new Command();

program.name('gendiff').description('CLI gendiff').version('0.0.1');

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath1>')
  .option('-f, --format <type>', 'output format');

program.parse();
