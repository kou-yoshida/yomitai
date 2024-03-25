import { ProfilePutDto } from "../dto/ProfilePutDto";
import { Profile } from "../entities/Profile";

export interface PutProfileRepository {
  execute(userId: string, params: ProfilePutDto): Promise<Profile>;
}
