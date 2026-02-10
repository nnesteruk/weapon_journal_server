import { CaseState, LegalForm } from "./case.enum";

export type LegalFormType = (typeof LegalForm)[keyof typeof LegalForm];

export type CaseStateType = (typeof CaseState)[keyof typeof CaseState];
