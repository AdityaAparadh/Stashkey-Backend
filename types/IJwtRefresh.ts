/**
 * @interface IJWTPayload
 * @description Interface for the JWT Payload
 */
export interface IJWTRefresh {
  username: string;
  type: string;
  [key: string]: string;
}
