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