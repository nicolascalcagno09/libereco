import { UsuarioModel } from './Usuario';

export interface ResponseLogin {
  data: {
    access_token: string
    access_token_expires_at: string
    refresh_token: string
    refresh_token_expires_at: string
    accessPermitionsDictionary:any,
    user: UsuarioModel.Usuario
  }
}

export interface RequestLogin {
  grant_type: string
  username: string
  password: string
}

export interface ResponseLogout {
  data: {
    msg: string
  }
}

export interface ErrorResponseLogout {
  data: {
    error: {
      statusCode: number
      status: number
      code: number
      message: string
      name: string
    }
    msg: string
  }
}

export interface ErrorResponseLogin {
  data: {
    error: {
      statusCode: number
      status: number
      code: number
      message: string
      name: string
    }
    msg: string
  }
}
