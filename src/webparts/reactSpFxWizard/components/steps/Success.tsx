import * as React from 'react';
import styles from './ReactSpFxWizard.module.scss';
import { autobind, TextField, PrimaryButton } from 'office-ui-fabric-react';
import { IStepState } from './IStepState';
import { IStepProps } from './IStepProps';


export default class Success extends React.Component<IStepProps, IStepState> {
    constructor(props: IStepProps) {
        super(props);
    }

    public render(): React.ReactElement<IStepProps> {
        return (
            <div style={{padding: "2rem 3rem"}}>
                <h1 className="ui centered">Sparat till SharePoint, Yo!</h1>
            </div>
        )
    }
}
