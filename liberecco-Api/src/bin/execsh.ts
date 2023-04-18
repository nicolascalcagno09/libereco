import { spawn } from 'child_process';
import { exec, pwd, chmod } from 'shelljs';

const PATH_SH_FILES = `${pwd()}/../_dev`;

export async function ExecKill(pid: number) {
  chmod('+x', `${PATH_SH_FILES}/kill.sh`)
  exec(`${PATH_SH_FILES}/kill.sh ${pid}`);
}

export async function ExecKillAll(pids: string[]) {
  const kill = spawn('kill', pids);

  kill.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  kill.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  kill.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
