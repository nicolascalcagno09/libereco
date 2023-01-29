// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiBase: 'https://apilibereco.ultimasoluciones.com/api',
  sga:{
    client_id:"application",
    client_secret:"secret"
  },
};

/**this is a dirty method need be change for replace or environments in build time */
export let app: { name: "vin" } = {
  name: 'vin'
};
