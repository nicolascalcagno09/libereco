import { exec, pwd, chmod } from 'shelljs';

const PATH_SH_FILES = `${pwd()}/../_dev`;
chmod('+x', `${PATH_SH_FILES}/*.sh`)
exec(`${PATH_SH_FILES}/${process.argv[2].toLowerCase()}.sh`);