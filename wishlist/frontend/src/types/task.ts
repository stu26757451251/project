type Emergency = 'Emergency' | 'Not Emergency'
type Important = 'Important' | 'Not Important'

export type Task = {
  name: string
  emergency: Emergency
  important: Important
}
