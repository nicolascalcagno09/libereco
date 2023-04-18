if (!process.env.DEBUG || (process.env.DEBUG && process.env.DEBUG.toLowerCase() === 'false')){
  console.debug         = () => { };
  // process.stdout.write  = () => true;
}
