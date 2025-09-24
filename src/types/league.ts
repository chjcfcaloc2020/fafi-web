export interface League {
  id?: string
  name: string
  description: string
  team_number: number
  team_size: number
  format: string
  start_date: string
  end_date: string
  status?: string
}

export interface LeagueInvitation {
  league_id: string
  league_name: string
  organizer_username: string
  manager_username: string
  status: string
  created_date: string
}

export interface Invitation {
  manager_username: string
  league_id: string
}