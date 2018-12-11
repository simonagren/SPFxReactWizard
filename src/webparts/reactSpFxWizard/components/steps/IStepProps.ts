import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface IStepProps {
    handleChange?: any;
    handleChange2?: any;
    values?: any;
    context?: IWebPartContext;
    checkCanContinue?: any;
    isMoveBack?: boolean;
}