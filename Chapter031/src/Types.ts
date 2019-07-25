import { RecordState } from "./RecordState";
import { IPersonState } from './State';

export type PersonRecord = RecordState & IPersonState;
export type StringOrNull = string | null;