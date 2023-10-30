export interface Competiton {
    name: string;
    scoringType: string;
    contenders_all: string;
    owner?: string;
    docRef: string;
}

export interface Match {
    round: number;
    team1: string;
    team2: string;
    winner?: string;
}

export interface Points {
    team_name: string;
    points: number;
    wins: number;
    losses: number;
    ties: number;
}