import * as React from 'react';
import styles from './ReactSpFxWizard.module.scss';
import { autobind, TextField, PrimaryButton, Dropdown } from 'office-ui-fabric-react';
import { IStepState } from './IStepState';
import { IStepProps } from './IStepProps';
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";

export default class UserDetails extends React.Component<IStepProps, IStepState> {
    constructor(props: IStepProps) {
        super(props);
    }

    // public isComponentValid(value: string): boolean {
    //     if (value.trim().length === 0) {

    //     }
    // }

    private validateTextField(value: string) {
        debugger;
        if (value.trim().length === 0) {
            debugger;
            return 'Fyll i något värde';
        } else {
            return "";
        }
    }

    // public validate(value: string) {
    //     this.props.checkCanContinue(this.isComponentValid(value));
    // }

    public render(): React.ReactElement<IStepProps> {
        const { values } = this.props;
        return (
            <div style={{padding: "2rem 3rem"}}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <TextField
                            label={"Rubrik"}
                            required={true}
                            value={values.firstName}
                            onGetErrorMessage={this.validateTextField}
                            validateOnFocusOut={true}
                            validateOnLoad={false}
                            onChanged={(value) => { this.props.handleChange('firstName', value) }} 
                        />
                          <Dropdown
                            label={"Typ av innehåll"}
                            options={[
                                { key: "Riktlinje", text: "Riktlinje" },
                                { key: "Rutin", text: "Rutin" },
                            ]}
                            selectedKey={values.lastName}
                            onChanged={(value) => { this.props.handleChange('lastName', value.key) }}
                        />
                        <TaxonomyPicker
                            allowMultipleSelections={true}
                            termsetNameOrID="Countries"
                            panelTitle="Välj Tillhörighet"
                            label="Tillhörighet"
                            context={this.props.context}
                            onChange={ (value) => {this.props.handleChange('email', value)}}
                            isTermSetSelectable={false}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
