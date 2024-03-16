import { Profile } from "../entities/Profile";

export interface GetProfileRepository {
  execute: (userId: string) => Promise<Profile>;
}
