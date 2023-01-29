export enum CompanyToReviewTypes {
    INVALID_PHONE = 1,
    DASHBOARD_MANAGER_NOT_FOUND = 2
}

export const companyToReviewTypes = [
    {
        id: CompanyToReviewTypes.INVALID_PHONE,
        name: 'Teléfono invalido',
    },
    {
        id: CompanyToReviewTypes.DASHBOARD_MANAGER_NOT_FOUND,
        name: 'Director del tablero no encontrado',
    },
];

export const companyToReviewTypesValid = [
    CompanyToReviewTypes.INVALID_PHONE,
    CompanyToReviewTypes.DASHBOARD_MANAGER_NOT_FOUND
];