const argv = require('yargs').argv;
import seederConfiguration from '../Config/seederConfiguration';

export default function seederJsonSource(jsonName: string) {
  return argv.test ? require(`${seederConfiguration.routeTest}${jsonName}`) :
      require(`${seederConfiguration.route}${jsonName}`);
}
