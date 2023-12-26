import {
    Button,
    FormControl,
    FormLabel,
    Input,
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

import endpoints from '../../../constants/endpoints';
import { MatchModel } from '../../../models/MatchModel';
import { TeamModel } from '../../../models/TeamModel';
import axiosApi from '../../../shared/axiosApi';

const AddMatchModal = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [winnerTeamId, setWinnerTeamId] = useState<string>('');
    const [loserTeamId, setLoserTeamId] = useState<string>('');
    const [vodUrl, setVodUrl] = useState<string>('');
    const [matchId, setMatchId] = useState<string>('');

    const [teamOptions, setTeamOptions] = useState<TeamModel[]>([]);


    useEffect(() => {
        const teamOptionsConfig: AxiosRequestConfig = {
            url: endpoints.team.list.path,
            method: endpoints.team.list.method,
        };
        axiosApi.request(teamOptionsConfig).then((response) => {
            if (response.status === 200) {
                setTeamOptions(response.data.results);
            }
        });
    }, []);

    const handleCreateMatch = () => {
        const match: MatchModel = { winnerTeamId, loserTeamId, matchId, vodUrl };
        const teamOptionsConfig: AxiosRequestConfig = {
            url: endpoints.match.add.path,
            method: endpoints.match.add.method,
            data: match,
        };
        axiosApi.request(teamOptionsConfig).then((response) => {
            if (response.status === 201) {
                setTeamOptions(response.data.results);
                toast({ title: 'Partida registrada', status: 'success', position: 'top' });
                onClose();
            } else {
                toast({ title: 'Falha no registro da partida', status: 'error', position: 'top' });
            }
        }).catch(() => {
            toast({ title: 'Falha no registro da partida', status: 'error', position: 'top' });
        });
    };


    return (
        <>
            <Button variant={'solid'} colorScheme='blue'
                onClick={onOpen}>Adicionar Partida</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel color='green'>Time Vencedor</FormLabel>
                            <Select
                                placeholder='Escolha um time'
                                value={winnerTeamId}
                                onChange={(event) => setWinnerTeamId(event.target.value)}
                            >
                                {teamOptions.map((opt) => {
                                    return <option key={opt.id} value={opt.id}>{opt.name}</option>;
                                })
                                }
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel color='red'>Time Perdedor</FormLabel>
                            <Select
                                placeholder='Escolha um time'
                                value={loserTeamId}
                                onChange={(event) => setLoserTeamId(event.target.value)}
                            >
                                {teamOptions.map((opt) => {
                                    return <option key={opt.id} value={opt.id}>{opt.name}</option>;
                                })
                                }
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Link do VOD*</FormLabel>
                            <Input value={vodUrl} onChange={(event) => setVodUrl(event.target.value)} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Id da partida*</FormLabel>
                            <Input value={matchId} onChange={(event) => setMatchId(event.target.value)} />
                        </FormControl>
                        <Text>*Opcionais</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancelar</Button>
                        <Button colorScheme='blue'
                            isDisabled={
                                !winnerTeamId || !loserTeamId ||
                                winnerTeamId === loserTeamId
                            }
                            onClick={handleCreateMatch} >
                            Salvar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddMatchModal;
