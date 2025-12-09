export const managementDepartmentSearchableFields = ['title']

export const managementDepartmentFilterableFields = ['searchTerm', 'title']

export type IManagementDepartmentFilter = {
  searchTerm?: string
  title?: string
}
