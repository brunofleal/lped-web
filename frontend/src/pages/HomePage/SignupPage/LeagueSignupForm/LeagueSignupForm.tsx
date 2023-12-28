import { Box, Button, FormControl, FormLabel, Grid, GridItem, Image, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { PlayerModel, StratzApi } from '../../../../models/PlayerModel';
import { retrieveToken } from '../../../../shared/token';

interface Props {
    stratzData?: StratzApi;
}
const LeagueSignupForm = ({ stratzData }: Props) => {
    const [playerModel, setPlayerModel] = useState<PlayerModel>();
    console.log({ player: playerModel?.name });

    const steamId3 = retrieveToken();

    const handleLoadPlayerData = () => { };
    useEffect(() => {
        if (steamId3) {
            handleLoadPlayerData();
        }
    }, [steamId3]);
    console.log(stratzData);

    useEffect(() => {
        if (playerModel) {

        } else if (stratzData && steamId3) {
            const player: PlayerModel = {
                name: stratzData.identity.name ?? '',
                dotaId: Number(steamId3),
                stratzApi: stratzData,
            };
            setPlayerModel(player);
        }
    }, [stratzData, playerModel]);


    return <Box width='lg' borderWidth='1px' borderRadius='lg' p={2}>
        <FormControl>
            <Grid templateColumns='repeat(4, 2fr)' gap={3}>
                <GridItem colSpan={2}>
                    <FormLabel>Avatar</FormLabel>
                    <Image src={stratzData?.steamAccount?.avatar} />
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
                                updatedPlayer.name = event.target.value;
                                setPlayerModel(updatedPlayer as PlayerModel);
                            }
                        }}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Id do Dota</FormLabel>
                    <Input variant='filled' type='number' value={steamId3 ?? 0} disabled />
                </GridItem>
            </Grid>
        </FormControl>
        <Button mt={3}>Registrar</Button>
    </Box>;
};

export default LeagueSignupForm;
