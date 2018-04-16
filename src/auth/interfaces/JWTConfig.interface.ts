export interface IJWTConfigOptions {
  alorithms?: string[];
  expiresIn?: string;
  audience?: string | RegExp | string[] | RegExp[];
  issuer?: string | string[];
  ignoreExpiration?: boolean;
  ignoreNotBefore?: boolean;
  subject?: string;
  clockTolerance?: number;
  maxAge?: string;
  clockTimestamp?: Date;
}

export interface IJWTConfig {
  secret: string;
  options?: IJWTConfigOptions
}
