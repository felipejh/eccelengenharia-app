export interface AuthResponse {
  user: UserDetails;
  access_token: string;
  error: Array<Error>;
}

interface UserDetails {
  data: UserData;
  redirectUrl: string;
  role: Array<string>;
  entity: Entity;
}

interface UserData {
  displayName: string;
}

interface Error {
  type: string;
  message: string;
}

interface Entity {
  id: number;
}
