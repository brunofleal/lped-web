export interface StratzApi {
    identity: { name?: string; };
    steamAccount: {
        name?: string;
        profileUri?: string;
        avatar?: string;
    };
    names?: { name: string; }[];
}

export interface PlayerModel {
    name: string;
    teamId?: string;
    dotaId: Number;
    stratzApi: StratzApi;
}
