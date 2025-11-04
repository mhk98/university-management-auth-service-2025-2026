import { InferRawDocType, Model, Schema, model } from 'mongoose';
import { studentSchema } from './student.model';

export type IStudent = InferRawDocType<typeof studentSchema>;

export type StudentModel = Model<IStudent, Record<string, unknown>>;
