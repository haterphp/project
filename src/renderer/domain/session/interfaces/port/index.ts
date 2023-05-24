import { ICreateSessionEntityPayload } from "../entity";

type ICreateSessionPayload = Omit<ICreateSessionEntityPayload, 'id'>

export type { ICreateSessionPayload }