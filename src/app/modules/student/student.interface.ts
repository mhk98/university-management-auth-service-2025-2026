import { InferRawDocType, Model } from 'mongoose';
import { studentSchema } from './student.model';

export type IStudent = InferRawDocType<typeof studentSchema>;

export type StudentModel = Model<IStudent, Record<string, unknown>>;
