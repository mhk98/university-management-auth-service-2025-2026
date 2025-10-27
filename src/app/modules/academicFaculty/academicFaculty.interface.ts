import { Model } from 'mongoose'

export type IAcademicFaculty = {
  title: string
}

export type IAcademicFacultyFilter = {
  searchTerm?: string
}

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>
