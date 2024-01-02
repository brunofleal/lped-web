/* eslint-disable max-len */
import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Icon,
    Image,
    Input,
    Link,
    Radio,
    RadioGroup,
    Stack,
    Text,
    Tooltip,
    useToast,
} from '@chakra-ui/react';
import { AxiosRequestConfig, Method } from 'axios';
import React, { useEffect, useState } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import Medal from '../../../../components/Medal/Medal';
import RoleSelect from '../../../../components/RoleSelect/RoleSelect';
import TierBadge from '../../../../components/TierBadge/TierBadge';
import endpoints from '../../../../constants/endpoints';
import { registerAvatar } from '../../../../hooks/avatar';
import useFetch from '../../../../hooks/Fetch';
import { retrieveToken } from '../../../../hooks/token';
import { PlayerType } from '../../../../models/Player/PlayerType';
import { getTierFromPlayerModel } from '../../../../models/Player/Tier';
import { PlayerModel, StratzApi } from '../../../../models/PlayerModel';
import { RULES_LINK } from '../../../../shared/links';
import RegisterStatus from './RegisterStatus';
import { ConfirmProps, getHelperText, isConfirmEnabled } from './utils';

const participationTooltip = `(1-) A função de Jogador é indicada para os participantes com disposnibilidade para jogos semanais/quinzenais.
(2-) A Função de capitão está sujeita a aprovação da organização e requer demandas extra jogo(organização de partidas, comunicação, etc).
(3-) A função de Standing é indicada para os participantes com menor disponibilidade de tempo, podendo completar partidas ocasionalmente.`;

interface Props {
    stratzData?: StratzApi;
}
const LeagueSignupForm = ({ stratzData }: Props) => {
    const navigate = useNavigate();
    const toast = useToast();
    const [playerModel, setPlayerModel] = useState<PlayerModel>();
    const [primaryRole, setPrimaryRole] = useState(0);
    const [secondaryRole, setSecondaryRole] = useState(0);

    const [checked, setChecked] = useState(false);

    const steamId3 = retrieveToken();

    const { data: savedPlayerModel, fetch: fetchPlayer } = useFetch<PlayerModel>({
        axiosConfig: {
            url: steamId3 ? endpoints.player.getOne.path.replace(endpoints.player.getOne.pathParam.dotaId, steamId3) : '',
            method: endpoints.player.getOne.method as Method,
        },
        controlFetch: true,
        onError: () => toast({ status: 'error', title: 'Erro no carregamento de dados da steam', position: 'top' }),
    });

    const { fetch: fetchRegisterPlayer } = useFetch({
        axiosConfig: {
            url: endpoints.player.add.path,
        },
        controlFetch: true,
        onError: () => toast({ status: 'error', title: 'Erro no Registro de Jogador', position: 'top' }),
        onSuccess: () => {
            toast({ status: 'success', title: 'Jogador Registrado!', position: 'top' });
            navigate(0);
        },
    });

    const { fetch: fetchUpdatePlayer } = useFetch({
        axiosConfig: {
            url: steamId3 ? endpoints.player.edit.path.replace(endpoints.player.edit.pathParam.dotaId, steamId3) : '',

        },
        controlFetch: true,
        onError: () => toast({ status: 'error', title: 'Erro na atualização de Jogador', position: 'top' }),
        onSuccess: () => {
            toast({ status: 'success', title: 'Jogador Atualizado!', position: 'top' });
            navigate(0);
        },

    });

    const { data: seasonData } =
        useFetch<{ currentSeason: number; }>({ axiosConfig: { url: endpoints.season.get.path, method: 'GET' } });
    const currentSeason = seasonData ? seasonData.currentSeason : 0;

    const confirmProps: ConfirmProps = { checked, playerModel, primaryRole, secondaryRole };


    useEffect(() => {
        if (steamId3) {
            fetchPlayer();
        }
    }, [steamId3]);

    useEffect(() => {
        if (savedPlayerModel && savedPlayerModel.positionPrefs) {
            setPrimaryRole(savedPlayerModel.positionPrefs[0]);
            setSecondaryRole(savedPlayerModel.positionPrefs[1]);
        }
    }, [savedPlayerModel]);


    const loadPlayerData = () => {
        if (stratzData && steamId3) {
            const dataFromStratz: PlayerModel = {
                name: stratzData?.identity && stratzData?.identity.name ? stratzData?.identity.name : '',
                dotaId: Number(steamId3),
                stratzApi: stratzData,
            };
            const player: PlayerModel = savedPlayerModel ?
                { ...savedPlayerModel, ...dataFromStratz, name: savedPlayerModel?.name, tier: getTierFromPlayerModel(dataFromStratz) } :
                { ...dataFromStratz, tier: getTierFromPlayerModel(dataFromStratz) };
            setPlayerModel(player);
            registerAvatar(stratzData?.steamAccount?.avatar ?? '');
        }
    };

    useEffect(() => {
        if (stratzData) {
            loadPlayerData();
        }
    }, [stratzData, savedPlayerModel]);

    useEffect(() => {
        if (playerModel) {
            const updatedPlayer = { ...playerModel };
            updatedPlayer.positionPrefs = [primaryRole, secondaryRole];
            setPlayerModel(updatedPlayer as PlayerModel);
        }
    }, [primaryRole, secondaryRole]);


    const handleRegisterPlayer = () => {
        const updatedSeasons = playerModel?.seasons ?? [];
        updatedSeasons.push(currentSeason);
        if (playerModel) {
            const updatedPlayerModel: PlayerModel = { ...playerModel, seasons: updatedSeasons };
            const customConfig: AxiosRequestConfig = {
                url: steamId3 ? endpoints.player.add.path : '',
                method: endpoints.player.add.method as Method,
                data: { ...updatedPlayerModel },
            };
            fetchRegisterPlayer({ customConfig });
        }
    };

    const handleUnregisterPlayer = () => {
        let updatedSeasons = playerModel?.seasons ?? [];
        updatedSeasons = updatedSeasons.filter((season) => season !== currentSeason);
        if (playerModel) {
            const updatedPlayerModel: PlayerModel = { ...playerModel, seasons: updatedSeasons };
            const customConfig: AxiosRequestConfig = {
                url: steamId3 ? endpoints.player.edit.path.replace(endpoints.player.edit.pathParam.dotaId, steamId3) : '',
                method: endpoints.player.edit.method as Method,
                data: { ...updatedPlayerModel },
            };
            fetchUpdatePlayer({ customConfig });
        }
    };

    const handleUpdatePlayerModel = () => {
        const updatedSeasons = playerModel?.seasons ?? [];
        if (!updatedSeasons.includes(currentSeason)) updatedSeasons.push(currentSeason);
        if (playerModel) {
            const updatedPlayerModel: PlayerModel = { ...playerModel, seasons: updatedSeasons };
            const customConfig: AxiosRequestConfig = {
                url: steamId3 ? endpoints.player.edit.path.replace(endpoints.player.edit.pathParam.dotaId, steamId3) : '',
                method: endpoints.player.edit.method as Method,
                data: { ...updatedPlayerModel },
            };
            fetchUpdatePlayer({ customConfig });
        }
    };

    const playerExistsInDb = !!savedPlayerModel;
    const playerRegisteredInSeason = playerExistsInDb && savedPlayerModel.seasons?.includes(currentSeason);

    return <Box width='lg' borderWidth='1px' borderRadius='lg' p={2}>
        <FormControl>
            <RegisterStatus isRegisteredInSeason={!!playerRegisteredInSeason} />
            <Grid templateColumns='repeat(4, 2fr)' gap={3}>
                <GridItem colSpan={1}>
                    <FormLabel>Avatar</FormLabel>
                    <Image h='100px' borderRadius='lg' src={stratzData?.steamAccount?.avatar} />
                </GridItem>
                <GridItem colSpan={2}>
                    <FormLabel>Nickname</FormLabel>
                    <Input
                        variant='outline'
                        type='text'
                        value={String(playerModel?.name)}
                        onChange={(event) => {
                            const updatedPlayer = { ...playerModel };
                            if (updatedPlayer) {
                                updatedPlayer.name = event.target.value.trim().slice(0, 25);
                                setPlayerModel(updatedPlayer as PlayerModel);
                            }
                        }}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Id do Dota</FormLabel>
                    <Input variant='filled' type='number' value={steamId3 ?? 0} disabled />
                </GridItem>
                <GridItem colSpan={4}>
                    <FormLabel>Participação no Campeonato
                        <Tooltip label={participationTooltip} placement='right' hasArrow={true}>
                            <span><Icon ml={1} as={BsInfoCircleFill} /></span>
                        </Tooltip>
                    </FormLabel>
                    <RadioGroup onChange={(value) => {
                        const updatedPlayer = { ...playerModel };
                        if (updatedPlayer) {
                            updatedPlayer.playerClass = value as PlayerType;
                            setPlayerModel(updatedPlayer as PlayerModel);
                        }
                    }} value={playerModel?.playerClass}>
                        <Stack direction='row'>
                            {(Object.entries(PlayerType).map(([label, value]) => ({ label, value })))
                                .map(({ label, value }) => {
                                    return <Radio key={label} value={value}>{label}</Radio>;
                                })}
                        </Stack>
                    </RadioGroup>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormLabel>Medalha</FormLabel>
                    <Medal fullRank={Number(playerModel?.stratzApi?.steamAccount.seasonRank)} />
                </GridItem>
                <GridItem colSpan={2}>
                    <FormLabel>Tier</FormLabel>
                    <TierBadge tier={playerModel?.tier ? playerModel?.tier : 0} />
                </GridItem>
                <GridItem colSpan={2}>
                    <FormLabel>Função Primária</FormLabel>
                    <RoleSelect roleId={primaryRole} onRoleChange={setPrimaryRole} />
                </GridItem>
                <GridItem colSpan={2}>
                    <FormLabel>Função Secundária</FormLabel>
                    <RoleSelect roleId={secondaryRole} onRoleChange={setSecondaryRole} />
                </GridItem>
            </Grid>
            <HStack mt={2}>
                <Checkbox
                    size='lg'
                    colorScheme='blue'
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                />
                <Text fontSize={'xl'}>Li e concordo com as <Link color='blue' href={RULES_LINK} isExternal>
                    regras
                </Link> e desejo participar da {currentSeason + 1}ª temporada da liga Mipe Alegre</Text>
            </HStack>
            <FormHelperText color={'red'}>{getHelperText(confirmProps)}</FormHelperText>
        </FormControl>

        {!playerExistsInDb || (playerExistsInDb && !playerRegisteredInSeason) ?
            <Button
                colorScheme='blue' mt={3}
                isDisabled={!isConfirmEnabled(confirmProps)}
                onClick={!playerExistsInDb ? handleRegisterPlayer : handleUpdatePlayerModel}>
                Registrar
            </Button> : <></>
        }
        {
            playerExistsInDb && playerRegisteredInSeason ?
                <ButtonGroup>
                    <Button colorScheme='red' mt={3} isDisabled={!isConfirmEnabled(confirmProps)} onClick={handleUnregisterPlayer}>
                        Remover seu Registro
                    </Button>
                    <Button colorScheme='blue' mt={3} isDisabled={!isConfirmEnabled(confirmProps)} onClick={handleUpdatePlayerModel}>
                        Atualizar seu Registro
                    </Button>
                </ButtonGroup> : <></>
        }
    </Box>;
};


export default LeagueSignupForm;
