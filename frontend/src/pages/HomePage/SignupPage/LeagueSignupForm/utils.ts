import { PlayerModel } from '../../../../models/PlayerModel';

export interface ConfirmProps {
    playerModel?: PlayerModel, primaryRole: number, secondaryRole: number, checked: boolean;
}
export const getConfirmFlags = ({ playerModel, primaryRole, secondaryRole, checked }: ConfirmProps) => {
    const nameSet = !!playerModel?.name;
    const playerType = !!playerModel?.playerClass;
    const rolesSet = primaryRole > 0 && secondaryRole > 0;
    const rolesDifferent = primaryRole !== secondaryRole;
    return {
        nameSet, playerType, checked, rolesSet, rolesDifferent,
    };
};

export const getHelperText = (props: ConfirmProps) => {
    const {
        checked, nameSet, playerType, rolesSet, rolesDifferent,
    } = getConfirmFlags(props);
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

export const isConfirmEnabled = (props: ConfirmProps) => {
    const { checked, rolesSet, rolesDifferent, playerType } = getConfirmFlags(props);
    return checked && rolesSet && rolesDifferent && playerType;
};

