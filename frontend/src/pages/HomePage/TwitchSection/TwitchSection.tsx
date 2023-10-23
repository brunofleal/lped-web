import { Grid, GridItem, HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { TwitchEmbed } from 'react-twitch-embed';


const partnerChannels = ['art__np', 'barzaky', 'ramoncardias', 'ursope', 'yaphets4k'];

const TwitchSection = () => {
    return <>
        <HStack mb={1}>
            {partnerChannels.map((channel) => {
                return <GridItem id={'twitchLinkId' + channel} key={channel}>
                    <Link
                        href={`https://www.twitch.tv/${channel}`}
                        fontSize={'xl'}
                        colorScheme='purple'
                        isExternal={true}>
                        {channel}
                    </Link>

                </GridItem>;
            })}
        </HStack>
        <Grid templateColumns='repeat(3, 1fr)' gap={1}>
            {partnerChannels.map((channel, index) => {
                return <GridItem id={'twitchId' + channel} key={channel}>
                    <TwitchEmbed
                        id={`${index + 1}`}
                        channel={channel}
                        parent={window.location.hostname}
                        darkMode={false}
                        withChat={false}
                        width={'400px'}
                        height={'300px'}
                    />
                </GridItem>;
            })}
        </Grid>
    </>;
};

export default TwitchSection;
