import DeleteLogBeforeDayCommand from '../../Commands/Logs/DeleteLogBeforeDayCommand';
import LogServices from '../../Services/Logs/LogServices';
import RequestServices from '../../Services/Requests/RequestServices';
import ResponseServices from '../../Services/Responses/ResponseServices';
import asyncForEach from '../../../Common/AsyncForeach';

import configuration from '../../../Config/configuration';

import NotFoundEntityException from '../../Exceptions/NotFoundEntityException'



export default class DeleteLogBeforeDayHandler {
  private logServices: LogServices;
  private requestServices: RequestServices;
  private responseServices: ResponseServices;

  constructor() {
    this.logServices = new LogServices();
    this.requestServices = new RequestServices();
    this.responseServices = new ResponseServices();
  }

  public async  handle(command : DeleteLogBeforeDayCommand) {
    let days = Number(configuration.deleteLogDays);

    try {
      if (command.getDays() != 0) {
        days = command.getDays();
      }

      // get the list logs
      let listLogs: any = await this.logServices.getBeforeDay(days);
      // first remove al logs before days
      const e = await this.logServices.destoyBeforeDay(days);
      // after remove requests and responses in the list logs
      await asyncForEach(listLogs, async log => {
        console.log('Log listLogs', log);
        try {
          let request = await this.requestServices.getById(log.Log_requestId);
          if (request) {
            await this.requestServices.destroy(log.Log_requestId);
          }
          
          let response = await this.responseServices.getById(log.Log_responseId);
          if (response) {
            await this.responseServices.destroy(log.Log_responseId);
          }
          
        } catch (error) {
          throw new NotFoundEntityException(`Request with id: ${log.Log_requestId} or Response with id: ${log.Log_responseId} not found to delete`);
        }
        
      })

      return `Total logs ${e.affected} deleted `;
    } catch (error) {
      console.log('Error removing logs ', error);
    }
  }
}
