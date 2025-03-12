import { User } from "./User";

export interface UserResponse {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}
