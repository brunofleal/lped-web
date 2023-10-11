import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

import { PlayerModel } from '../../models/PlayerModel';

interface PlayerTableProps {
    players: PlayerModel[];
}
const TeamTable = ({ players }: PlayerTableProps) => {
    return <Box w={'400px'} h={'600px'}>
        <Text></Text>
        <TableContainer w={'inherit'} h={'inherit'} overflowY="scroll">
            <Table variant='striped' colorScheme='blue'>
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>Dota Id</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {players?.map((player, index) => {
                        return <PlayerRow key={'k' + index} {...player} />;
                    })}
                </Tbody>
            </Table>
        </TableContainer>;
    </Box>;
};


const PlayerRow = (player: PlayerModel) => {
    const getValidName = () => {
        if (player?.stratzApi?.identity?.name) {
            return player?.stratzApi?.identity?.name;
        }
        if (player?.stratzApi?.names && player?.stratzApi?.names[0]?.name) {
            return player?.stratzApi?.names[0]?.name;
        } if (player?.stratzApi?.steamAccount?.name) {
            return player?.stratzApi?.steamAccount?.name;
        }
    };
    return <Tr>
        <Td>{getValidName()}</Td>
        <Td>{String(player?.dotaId)}</Td>
    </Tr>;
};

export default TeamTable;
