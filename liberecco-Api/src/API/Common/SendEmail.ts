
import CommandBus from '../Application/Commands/CommandBus';
import SendMailCommand from '../Application/Commands/Mail/SendMailCommand';
import moment from 'moment';

export async function sendMail(titulo, body,mailTo):Promise<any> {
  try {
    let today = moment().locale('es').format('LL');

    let content = '<h3>Avisos PropRed : ' + today + '</h3>';

    content += '<h4>' + titulo + '</h4>'
    content += '<ul>';
    content += '<li>' + body + '</li>';
    content += '</ul>';


    let serviceEmailActive = process.env.SERVICE_EMAIL_ACTIVE || true;
    if (String(serviceEmailActive) != 'true') {
      return Promise.resolve(null);
    }
    let resMail = await CommandBus.handle(new SendMailCommand(mailTo));
    console.log('response mail >>> ', resMail);

  }
  catch (err) {
    console.error(err);
  }
}