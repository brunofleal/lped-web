import { PlayerType } from './Player/PlayerType';

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
    dotaId: number;
    stratzApi: StratzApi;
    seasons?: number[];
    teamId?: string;
    selfDescription?: string;
    positionPrefs?: number[];
    playerClass?: PlayerType;
    contactPhone?: string;
    tier?: number;
}
