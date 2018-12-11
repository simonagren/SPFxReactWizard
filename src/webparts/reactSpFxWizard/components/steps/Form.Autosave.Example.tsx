import * as React from 'react';
import { IStepState } from './IStepState';
import { IStepProps } from './IStepProps';
import { WizTextInput } from '../inputs/textInput/WizTextInput'

import { Validators } from '../validators/Validators';
import { WizForm } from '../wizform';

export interface IFormAutosaveExampleState {
}
export class FormAutosaveExample extends React.Component<IStepProps, IFormAutosaveExampleState> {
    constructor(props: IStepProps) {
        super(props);

        // disable next buttons if it's a move forward
        // If it's a move back we have values since it's a controlled component
        if (!this.props.isMoveBack) {
            this.props.checkCanContinue(false);
        }
    }

    public render(): JSX.Element {
        const { values } = this.props;
        return (
            <div style={{ padding: "2rem 3rem" }}>
                <WizForm
                    isMoveBack={this.props.isMoveBack}
                    onUpdated={this.props.handleChange}
                    onCheckValid={this.props.checkCanContinue}>

                    <WizTextInput
                        textFieldProps={{ label: 'Text Input with max length of 10', required: true, validateOnFocusOut: true }}
                        inputKey="firstName"
                        value={values.firstName}
                        validators={[Validators.maxLength(10, (length: number) => 'Must be less than 10 characters')]}
                    />
                    <WizTextInput
                        textFieldProps={{ label: 'Text input with min length of 10', required: true, validateOnFocusOut: true }}
                        inputKey="lastName"
                        value={values.lastName}
                        validators={[Validators.minLength(10, (length: number) => 'Must be greater than 10 characters')]}
                    />
                    <WizTextInput
                        textFieldProps={{ label: 'Required text input', required: true, validateOnFocusOut: true }}
                        inputKey="email"
                        value={values.email}
                        validators={[Validators.required('Field is required')]}
                    />

                </WizForm>
            </div>
        );
    }
}