import { User } from '../../user/user.entity';

export interface AuthResponse {
  user: Pick<User, 'login'>;
  token: string;
}
