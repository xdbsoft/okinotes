import { environment } from 'src/environments/environment'

export class ApiConfig {
    url: string
    collectionName: string
    aliasName: string
}
export const apiConfig: ApiConfig = environment.apiConfig;
