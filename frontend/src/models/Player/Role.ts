export interface Role {
    id: number;
    name: string;
    color: string;
}

export const Roles: Role[] = [
    { id: 1, name: 'Carry', color: 'red' },
    { id: 2, name: 'Mid', color: 'blue' },
    { id: 3, name: 'Offlane', color: 'yellow' },
    { id: 4, name: 'Support', color: 'green' },
    { id: 5, name: 'Hard Support', color: 'purple' },
];
