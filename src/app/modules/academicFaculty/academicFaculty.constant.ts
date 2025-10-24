import { IAcademicSemesterCodes, IAcademicSemesterMonths, IAcademicSemesterTitles } from "./academicFaculty.interface";


export const academicSemesterTitles: IAcademicSemesterTitles[] = [
    'Autumn',
    'Summer',
    'Fall',
]

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
    '01', // Autumn
    '02', // Summer
    '03', // Fall
]

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]


export const academicSemesterTitleCodeMapper: { [key: string]: string } = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
}

export const academicSemesterSearchableFields=['title', 'code', 'year']

export const academicSemesterFilterableFields=['searchTerm', 'title', 'code', 'year']
