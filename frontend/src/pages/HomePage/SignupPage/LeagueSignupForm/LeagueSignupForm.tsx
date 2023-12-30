import {
    Box,
    Button,
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
import { Badge } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

import Medal from '../../../../components/Medal/Medal';
import RoleSelect from '../../../../components/RoleSelect/RoleSelect';
import endpoints from '../../../../constants/endpoints';
import { registerAvatar } from '../../../../hooks/avatar';
import { retrieveToken } from '../../../../hooks/token';
import { PlayerType } from '../../../../models/Player/PlayerType';
import { getTierFromPlayerModel } from '../../../../models/Player/Tier';
import { PlayerModel, StratzApi } from '../../../../models/PlayerModel';
import axiosApi from '../../../../shared/axiosApi';

interface Props {
    stratzData?: StratzApi;
}
const LeagueSignupForm = ({ stratzData }: Props) => {
    const toast = useToast();
    const rulesLink = 'https://pastebin.com/ky1ZpqiZ';
    const [playerModel, setPlayerModel] = useState<PlayerModel>();
    const [primaryRole, setPrimaryRole] = useState(0);
    const [secondaryRole, setSecondaryRole] = useState(0);

    const [loadedPlayerSavedData, setLoadedPlayerSavedData] = useState<boolean>(false);
    const [checked, setChecked] = useState(false);

    const steamId3 = retrieveToken();

    const handleLoadPlayerData = () => {
        const getConfig: AxiosRequestConfig = {
            url: `${endpoints.player.list.path}?dotaId=${steamId3 ?? ''}`,
            method: endpoints.player.list.method,
        };
        axiosApi.request(getConfig).then((response) => {
            if (response.status === 200 && response.data.results) {
                setPlayerModel(response.data.results[0]);
            }
        }).catch(() => {
            toast({ status: 'error', title: 'Erro no carregamento de dados da steam', position: 'top' });
        }).finally(() => {
            setLoadedPlayerSavedData(true);
        });
    };
    useEffect(() => {
        if (steamId3) {
            handleLoadPlayerData();
        }
    }, [steamId3]);

    const loadDataFromStratz = () => {
        if (stratzData && steamId3) {
            const dataFromStratz: PlayerModel = {
                name: stratzData?.identity.name ?? '',
                dotaId: Number(steamId3),
                stratzApi: stratzData,
                playerClass: PlayerType.Jogador,
                positionPrefs: [0, 0],
            };
            dataFromStratz.tier = getTierFromPlayerModel(dataFromStratz);
            const player: PlayerModel = { ...playerModel, ...dataFromStratz };
            setPlayerModel(player);
            registerAvatar(stratzData?.steamAccount?.avatar ?? '');
        }
    };

    useEffect(() => {
        if (loadedPlayerSavedData) {
            loadDataFromStratz();
        }
    }, [stratzData, loadedPlayerSavedData]);

    useEffect(() => {
        if (playerModel) {
            const updatedPlayer = { ...playerModel };
            updatedPlayer.positionPrefs = [primaryRole, secondaryRole];
            setPlayerModel(updatedPlayer as PlayerModel);
        }
    }, [primaryRole, secondaryRole]);

    const getConfirmFlags = () => {
        const nameSet = !!playerModel?.name;
        const playerType = !!playerModel?.playerClass;
        const rolesSet = primaryRole > 0 && secondaryRole > 0;
        const rolesDifferent = primaryRole !== secondaryRole;
        return {
            nameSet, playerType, checked, rolesSet, rolesDifferent,
        };
    };

    const getHelperText = () => {
        const {
            nameSet, playerType, checked, rolesSet, rolesDifferent,
        } = getConfirmFlags();
        if (!nameSet) {
            return 'Preencha o campo Nickname';
        }
        if (!playerType) {
            return 'Selecione o seu tipo de participação';
        }
        if (!rolesSet) {
            return 'Escolha as funções primária e secundária';
        }
        if (!rolesDifferent) {
            return 'Escolha funções primária e secundária diferentes';
        }
        if (!checked) {
            return 'Leia as regras e confirme marcando a caixa';
        }
    };

    const isConfirmEnabled = () => {
        const { checked, rolesSet, rolesDifferent, playerType } = getConfirmFlags();
        return checked && rolesSet && rolesDifferent && playerType;
    };


    return <Box width='lg' borderWidth='1px' borderRadius='lg' p={2}>
        <FormControl>
            <Grid templateColumns='repeat(4, 2fr)' gap={3}>
                <GridItem colSpan={1}>
                    <FormLabel>Avatar</FormLabel>
                    <Image h='100px' src={stratzData?.steamAccount?.avatar} />
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
                        <Tooltip label='TODO'><span><Icon as={BsInfoCircle} /></span></Tooltip>
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
                    <Badge borderRadius='lg' colorScheme='blue' variant='outline' fontSize='xl'>
                        {playerModel?.tier}
                    </Badge>
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
                <Text>Li as <Link color='blue' href={rulesLink} isExternal>
                    regras
                </Link> da liga e concordo</Text>
            </HStack>
            <FormHelperText color={'red'}>{getHelperText()}</FormHelperText>
        </FormControl>

        <Button colorScheme='blue' mt={3} isDisabled={!isConfirmEnabled()}>
            Registrar
        </Button>
    </Box>;
};


export default LeagueSignupForm;
