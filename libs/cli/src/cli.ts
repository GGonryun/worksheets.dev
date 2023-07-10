#! /usr/bin/env node
import { Command } from 'commander';
import { deploy } from './deploy/command.js';
import { init } from './init/command.js';

const program = new Command();
program
  .name('Worksheets CLI Tool')
  .description('Utilities to help you manage and deploy worksheets');

program.addCommand(init());
program.addCommand(deploy());

program.parse(process.argv);
