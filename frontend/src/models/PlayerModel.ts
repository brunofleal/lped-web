export interface StratzApi {
    identity: { name?: string; };
    steamAccount: { name?: string; };
    names?: { name: string; }[];
}

export interface PlayerModel {
    name: String;
    dotaId: Number;
    stratzApi: StratzApi;
}
