// User and Authentication Types

export interface User {
  person_id: number;
  email: string;
  username: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_USER_ADMIN';
  provider?: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface GoogleLoginRequest {
  credential: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegistrationRequest {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface UserInfo {
  person_id: number;
  email: string;
  username: string;
  role: string;
  provider: string;
  firstname?: string;
  lastname?: string;
  enabled?: boolean;
}
