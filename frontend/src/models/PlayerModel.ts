export interface StratzApi {
    identity: { name?: string; };
    steamAccount: { name?: string; };
    names?: { name: string; }[];
}

export interface PlayerModel {
    name: string;
    teamId?: string;
    dotaId: Number;
    stratzApi: StratzApi;
}
