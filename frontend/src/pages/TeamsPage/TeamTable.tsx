import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';

import endpoints from '../../constants/endpoints';
import { isAuthTokenValid } from '../../hooks/auth';
import { getValidPlayerName } from '../../hooks/playerUtils';
import { PlayerModel } from '../../models/PlayerModel';
import { TeamModel } from '../../models/TeamModel';
import axiosApi from '../../shared/axiosApi';
import PlayersTable from '../PlayersPage/PlayersTable';

interface TeamTableProps {
    team: TeamModel;
    styleIndex?: number;
    children?: JSX.Element;
}
const TEAM_COLORS = ['red', 'green', 'yellow', 'blue', 'purple', 'pink', 'teal', 'orange', 'whatsapp'];

const TeamTable = ({ team, styleIndex, children }: TeamTableProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const tableColor = TEAM_COLORS[(styleIndex ?? 0) % TEAM_COLORS.length];
    const tableColorNext = TEAM_COLORS[((styleIndex ?? 0) + 1) % TEAM_COLORS.length];


    const isAdmin = isAuthTokenValid();
    return <Box boxShadow='md' p={2} rounded='md' bg='white'>
        <Text
            bgGradient={`linear(to-r, ${tableColor}, ${tableColorNext})`}
            bgClip='text'
            fontSize='2xl'
            fontWeight='extrabold'>{team.name}</Text>
        {children ? children : <></>}
        <PlayersTable
            captainDotaId={team.captainDotaId}
            playerIds={[team.captainDotaId, ...team.playerIds]}
            tableColor={tableColor} />
        {isAdmin ?
            < AddPlayerModal team={team} isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> :
            <></>
        }
    </Box>;
};


interface AddPlayerModalProps {
    team: TeamModel;
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void;
}
const AddPlayerModal = ({ team, onOpen, isOpen, onClose }: AddPlayerModalProps) => {
    const toast = useToast();
    const [playerId, setPlayerId] = useState<Number>(0);
    const [playersAvailable, setPlayersAvailable] = useState<PlayerModel[]>([]);

    const handleAddPlayer = () => {
        const updatedTeam = team;
        updatedTeam.playerIds = [...updatedTeam.playerIds, playerId];
        const addPlayerConfig: AxiosRequestConfig = {
            url: endpoints.team.update.path.replace(endpoints.team.update.pathParam.teamid, team.id),
            data: updatedTeam,
            method: endpoints.team.update.method,
        };
        axiosApi.request(addPlayerConfig).then((response) => {
            if (response.status === 200) {
                toast({ status: 'success', title: 'Jogador adicionado ao time com sucesso' });
                onClose();
            } else {
                console.log('error');
                onClose();
            }
        });
    };

    useEffect(() => {
        const listPlayersConfig: AxiosRequestConfig = {
            url: endpoints.player.list.path,
            method: endpoints.player.list.method,
        };
        axiosApi.request(listPlayersConfig).then((response) => {
            if (response.status === 200) {
                setPlayersAvailable(response.data.results);
            } else {
                toast({ status: 'error', title: 'Erro na listagem de jogadores', position: 'top' });
            }
        }).catch(() => {
            toast({ status: 'error', title: 'Erro na listagem de jogadores', position: 'top' });
        });
    }, []);

    return <>
        <Button mt={3} onClick={onOpen}>Adicionar jogador</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Jogador ao time {`"${team.name}"`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Select
                        placeholder='Selecione um jogador'
                        value={String(playerId)}
                        onChange={(event) => setPlayerId(Number(event.target.value))}>
                        {
                            playersAvailable.map((player) => {
                                return <option
                                    key={player.name}
                                    value={String(player.dotaId)}>{getValidPlayerName(player)}
                                </option>;
                            })
                        }
                    </Select>
                </ModalBody>

                <ModalFooter>
                    <Button variant={'ghost'} colorScheme='blue' mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme='blue' mr={3} isDisabled={playerId === 0} onClick={handleAddPlayer}>
                        Adicionar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal></>;
};

export default TeamTable;
