import * as React from 'react';

import { IWizTextInputProps } from './IWizTextInputProps';
import { WizBaseInput, IWizBaseInputState } from '../../wizform/WizBaseInput';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { IWizFormContext } from '../../wizform';

export class WizTextInput extends WizBaseInput<string, IWizTextInputProps, IWizBaseInputState<string>> {
  constructor(props: IWizTextInputProps, context: IWizFormContext) {
    super(props, context, false);
    this.state = {
      isValid: true,
      currentValue: this.props.value || '',
      currentError: undefined
    };

    this._validateTextFieldProps(this.props.textFieldProps);
  }

  public name(): string {
    return 'WizTextBox';
  }

  public render(): JSX.Element {
    return (
      <TextField
        {...this.props.textFieldProps}
        key={this.props.inputKey}
        value={this.state.currentValue}
        onBeforeChange={this._onChange}
        errorMessage={this.state.currentError}
      />
    );
  }

  private _onChange = (value: string): void => {
    this.setValue(value);
  };

  private _validateTextFieldProps(props?: ITextFieldProps): void {
    if (props) {
      if (props.errorMessage) {
        console.warn(`FormTextBox: 'errorMessage' prop was specified and will be ignored`);
      }

      if (props.value) {
        console.warn(`FormTextBox: 'value' prop was specified and will be ignored`);
      }

      if (props.onBeforeChange) {
        console.warn(`FormTextBox: 'onBeforeChange' prop was specified and will be ignored`);
      }
    }
  }
}
