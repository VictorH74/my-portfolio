import { FirebaseSupabaseApi } from '@/lib/adapters/FirebaseSupabaseApi';
import { ProfileService } from '@/services/ProfileService';
import { ProjectService } from '@/services/ProjectService';
import { TechnologieService } from '@/services/TechnologieService';

const apiInstance = new FirebaseSupabaseApi();

const projectService = new ProjectService(apiInstance);
const profileService = new ProfileService(apiInstance);
const technologieService = new TechnologieService(apiInstance);

export { projectService, profileService, technologieService };
