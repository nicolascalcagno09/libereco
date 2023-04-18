/**
* @author Martin Wehren
*
* Template for the delete command. It wraps the data needed for the Handler
**/
// import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export default class DeleteLogBeforeDayCommand extends Command {

  private days: number;

  constructor(days: number = 0) {
    super();
    this.days = days;
  }

  public getDays() {
    return this.days
  }

}
