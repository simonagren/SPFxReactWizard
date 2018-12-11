import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IWizFormProps } from './WizFormProps';
import { GenericWizInput } from './WizBaseInput';

import { BaseComponent, getNativeProps, divProperties } from 'office-ui-fabric-react/lib/Utilities';

export type IWizFormValidationResult = {
  isValid: boolean;
  errorMessage?: string;
  component: GenericWizInput;
};

export type IWizFormContext = {
  isFormValid: () => boolean;
  mountInput: (input: GenericWizInput) => void;
  unmountInput: (input: GenericWizInput) => void;
  submitValue: (input: GenericWizInput) => void;
};

export interface IWizFormState {
  validationResults: { [key: string]: IWizFormValidationResult };
}

export class WizForm extends BaseComponent<IWizFormProps, IWizFormState> {
  protected static childContextTypes: React.ValidationMap<IWizFormContext> = {
    isFormValid: PropTypes.func.isRequired,
    mountInput: PropTypes.func.isRequired,
    unmountInput: PropTypes.func.isRequired,
    submitValue: PropTypes.func.isRequired
  };

  private _mountedInputs: GenericWizInput[];

  constructor(props: IWizFormProps) {
    super(props);
    this._mountedInputs = [];
    this.state = {
      validationResults: {}
    };
  }

  public render(): JSX.Element {
    const nativeProps = getNativeProps(this.props, divProperties);
    return (
      <form {...nativeProps}>
        {this.props.children}
      </form>
    );
  }

  public getChildContext(): IWizFormContext {
    return {
      isFormValid: this._isFormValid,
      mountInput: this._mountInput,
      unmountInput: this._unmountInput,
      submitValue: this._submitValue
    };
  }

  // We only validate in mount if it's not a back step
  private _validateComponent(input: GenericWizInput, isMount = false): IWizFormValidationResult {
    const validationResult = input.doValidate(isMount);
    if (!validationResult.isValid) {
      input.setError(validationResult.errorMessage);
    } else {
      input.clearError();
    }

    return validationResult;
  }

  private _mountInput = (input: GenericWizInput): void => {
    if (this._mountedInputs.indexOf(input) === -1) {
      this._mountedInputs.push(input);
      this.setState((prevState: IWizFormState) => {
        
        // If we have made a backstep, dont validate normally
        prevState.validationResults[input.props.inputKey] = this._validateComponent(input, !this.props.isMoveBack);
        return prevState;
      });
    }
  };

  // When we enter a value in any input
  private _submitValue = (input: GenericWizInput): void => {

    // validate this input
    const validationResult: IWizFormValidationResult = this._validateComponent(input);
    // Set state with result
    this.setState((prevState: IWizFormState) => {
      prevState.validationResults[input.props.inputKey] = validationResult;
      return prevState;
    });
    
    // Check if we have any errors, only true if all are valid
    const formIsValid: boolean = this._isFormValid(this.state.validationResults);

    // If we have an onCheckvalid function
    // This sets the parent state if we could move forward (active/inactive button)
    if (this.props.onCheckValid) {
      this.props.onCheckValid(formIsValid)
    }

    // If the input validation was ok and we have an onUpdated function
    // Set the top level state with the value from the input
    if (validationResult.isValid) {
      if (this.props.onUpdated) {
        this.props.onUpdated(input.props.inputKey, input.state.currentValue);
      }
    }

  };


  private _unmountInput = (input: GenericWizInput): void => {
    const currentIndex: number = this._mountedInputs.indexOf(input);
    if (currentIndex > -1) {
      this._mountedInputs.splice(currentIndex, 1);
      this.setState((prevState: IWizFormState) => {
        delete prevState.validationResults[input.props.inputKey];
        return prevState;
      });
    }
  };

  private _isFormValid = (validationResults: { [key: string]: IWizFormValidationResult } = this.state.validationResults): boolean => {
    for (const key in validationResults) {
      if (!validationResults[key].isValid) {
        return false;
      }
    }

    return true;
  };
}
