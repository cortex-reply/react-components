export const extractId = (field: any): number => {
  if (!field) return 0
  if (typeof field === 'number') return field
  if (typeof field === 'object' && field && 'id' in field) return field.id
  return 0
}
