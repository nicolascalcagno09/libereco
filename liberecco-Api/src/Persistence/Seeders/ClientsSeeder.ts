import SeederJsonSource from '../../API/Common/SeederJsonSource';
import Client from '../../API/Application/Domain/Entities/Client';
import { storeClientSchema } from '../../API/Controllers/Schemas/ClientSchema';
import Validator from '../../API/Common/Validator';
import configuration from '../../API/Config/configuration';
import asyncForEach from '../../API/Common/AsyncForeach';

const clientsJson =  SeederJsonSource('clients.json');

export default class ClientsSeeder {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async seed() {
    clientsJson.clients.map((permission) => {
      const error = this.validator.validate(permission, storeClientSchema);

      if (error) {
        return this.validator.validationResult(error.details);
      }
    });


    await asyncForEach(clientsJson.clients, async (client) => {
      const clientForSave = new Client(client.name, client.secret);

      clientForSave.description = client.description;
      clientForSave.enabled = client.enabled;

      await clientForSave.save();
    });



    if (configuration.oauth.clients.sga.name && configuration.oauth.clients.sga.secret) {
      const sgaClient = new Client(
        configuration.oauth.clients.sga.name,
        configuration.oauth.clients.sga.secret,
      );

      sgaClient.description = configuration.oauth.clients.sga.description;
      sgaClient.enabled = configuration.oauth.clients.sga.enabled;

      await sgaClient.save();
    }

    if (configuration.oauth.clients.app.name && configuration.oauth.clients.app.secret) {
      const appClient = new Client(
        configuration.oauth.clients.app.name,
        configuration.oauth.clients.app.secret,
      );

      appClient.description = configuration.oauth.clients.app.description;
      appClient.enabled = configuration.oauth.clients.app.enabled;

      await appClient.save();
    }
  }
}
