export const configTablePlayers = {
    columns: [
        { title: 'Nome', dataIndex: 'name' }
    ],
    pagination: false
}

export const configTableMatches = {
    columns: [
        { title: 'Data', dataIndex: 'date' },
        { title: 'Partidas', dataIndex: 'amountOfMatches' },
        { title: 'Pontuação', dataIndex: 'scores' },
        { title: 'Campeão', dataIndex: 'champion' },
    ],
    pagination: false
}