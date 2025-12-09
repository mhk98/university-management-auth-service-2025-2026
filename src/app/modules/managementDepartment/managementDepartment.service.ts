import { IManagementDepartment } from './managementDepartment.interface'
import { ManagementDepartment } from './managementDepartment.model'

const createManagementDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload)
  return result
}

// const getAllManagementDepartment = async(filters:IManagementDepartmentFilter, paginationOptions:IPaginationOptions) => {

//     const {searchTerm, ...filterData} = filters;

//     const {} = paginationHelpers.calculatePagination(paginationOptions)
// }

export const ManagementDepartmentSerivce = {
  createManagementDepartment,
}
