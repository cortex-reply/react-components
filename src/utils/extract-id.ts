export const extractId = (field: any): number => {
  if (!field) return -1
  if (typeof field === 'number') return field
  if (typeof field === 'object' && field && 'id' in field) return field.id
  return -1
}
