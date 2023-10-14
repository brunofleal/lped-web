import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { TwitchEmbed } from 'react-twitch-embed';


const partnerChannels = ['art__np', 'barzaky', 'ramoncardias', 'ursope', 'yaphets4k'];

const TwitchSection = () => {
    return <Grid templateColumns='repeat(3, 1fr)' gap={2}>
        {partnerChannels.map((channel, index) => {
            return <GridItem id={'twitchid' + channel} key={channel} h={'400px'}>
                <TwitchEmbed
                    id={`${index + 1}`}
                    channel={channel}
                    parent={window.location.hostname}
                    darkMode={false}
                    withChat={false}
                    width={'500px'}
                    height={'300px'}
                />
            </GridItem>;
        })}
    </Grid>;
};

export default TwitchSection;
