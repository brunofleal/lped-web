import { Select } from '@chakra-ui/react';
import React from 'react';

import { Role, Roles } from '../../models/Player/Role';

interface RoleProps {
    roleId: number;
    // eslint-disable-next-line no-unused-vars
    onRoleChange: (roleId: number) => void;
}
const RoleSelect = ({ roleId, onRoleChange }: RoleProps) => {
    const color = roleId > 0 ? Roles.filter((role) => role.id === roleId)[0].color : 'white';
    return <Select
        bgColor={color}
        placeholder='Selecione uma função'
        value={roleId} onChange={(event) => {
            onRoleChange((Number(event.currentTarget.value)));
        }}>
        {
            Roles.map((roleOpt: Role) => {
                return <option
                    key={roleOpt.id + Math.random()}
                    value={roleOpt.id}>
                    {roleOpt.name}
                </option>;
            })
        }
    </Select>;
};

export default RoleSelect;
