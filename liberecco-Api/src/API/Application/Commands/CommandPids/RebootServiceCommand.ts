import { Command } from 'simple-command-bus';

export default class RebootServiceCommand extends Command {
  private service: string; 

  constructor(option: string) {
    super();
    this.service = option;
  }

  getService() : string {
    return this.service;
  }
}
