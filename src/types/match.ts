import { Team } from "@/types/team"

export interface Match {
  id: number
  firstTeam: Team
  secondTeam: Team
  matchDate: string
  location: string
  firstTeamScore: number
  secondTeamScore: number
  leagueId: string
  stageId: number
  status: string
}

export interface CreateMatch {
  firstTeamId: string
  secondTeamId: string
  matchDate: string
  location: string
  firstTeamScore: number
  secondTeamScore: number
  leagueId: string
  stageId: number
}