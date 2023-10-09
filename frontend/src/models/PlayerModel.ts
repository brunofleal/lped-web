export interface StratzApi {
    identity: { name: string; };
}

export interface PlayerModel {
    name: String;
    dotaId: Number;
    stratzApi: StratzApi;
}
