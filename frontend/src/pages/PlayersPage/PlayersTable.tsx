import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

import { PlayerModel } from '../../models/PlayerModel';

interface PlayerTableProps {
    players: PlayerModel[];
}
const PlayersTable = ({ players }: PlayerTableProps) => {
    return <TableContainer w={'inherit'} h={'inherit'} overflowY="scroll">
        <Table variant='striped' colorScheme='blue'>
            <Thead position={'sticky'}>
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

export default PlayersTable;
