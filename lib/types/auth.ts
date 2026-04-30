export type AuthType = {
  email: string;
  password: string;
}

export type AuthServiceResponse<T> = {
  data?: T | null;
  error: Error | null;
};