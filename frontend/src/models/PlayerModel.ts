export interface StratzApi {
    identity: { name?: string; };
    steamAccount: {
        name?: string;
        profileUri?: string;
        avatar?: string;
        seasonRank?: string;
    };
    names?: { name: string; }[];
}

export interface PlayerModel {
    name: string;
    dotaId: Number;
    stratzApi: StratzApi;
    teamId?: string;
    avatarUrl?: string;
    positionPrefs?: number[];
    playerClass?: 'player' | 'captain' | 'standing';
    tier?: number;
}
