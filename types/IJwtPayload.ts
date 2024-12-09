/**
 * @interface IJWTPayload
 * @description Interface for the JWT Payload
 */
export interface IJWTPayload {
  username: string;
  [key: string]: string;
}
