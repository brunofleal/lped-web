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
    useDisclosure,
} from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';

import endpoints from '../../../constants/endpoints';
import { TeamModel } from '../../../models/TeamModel';
import axiosApi from '../../../shared/axiosApi';

const AddMatchModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [winningTeamId, setWinningTeamId] = useState<string>('');
    const [losingTeamId, setLosingTeamId] = useState<string>('');
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
        console.log('TODO:');
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
                            <FormLabel>Time Vencedor</FormLabel>
                            <Select placeholder='Time vencedor' value={winningTeamId}
                                onChange={(event) => setWinningTeamId(event.target.value)} >
                                {teamOptions.map((opt) => {
                                    return <option key={opt.id} value={opt.id}>{opt.name}</option>;
                                })
                                }
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Time Perdedor</FormLabel>
                            <Select placeholder='Time perdedor' value={losingTeamId}
                                onChange={(event) => setLosingTeamId(event.target.value)} >
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
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancelar</Button>
                        <Button colorScheme='blue' onClick={handleCreateMatch} >
                            Salvar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddMatchModal;
