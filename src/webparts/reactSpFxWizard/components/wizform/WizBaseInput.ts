import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IWizFormContext, IWizFormValidationResult } from './WizForm';
import { IWizBaseInputProps } from './IWizBaseInputProps';
export { IWizBaseInputProps };

import { BaseComponent, ICancelable } from 'office-ui-fabric-react/lib/Utilities';

export const DEFAULT_DEBOUNCE = 250;

export interface IWizBaseInputState<T> {
  isValid: boolean;
  currentValue?: T;
  currentError?: string;
}

export type GenericWizInput = WizBaseInput<any, IWizBaseInputProps<any>, IWizBaseInputState<any>>;

export abstract class WizBaseInput<T, P extends IWizBaseInputProps<T>, S extends IWizBaseInputState<T>> extends BaseComponent<P, S> {
  public static contextTypes: React.ValidationMap<IWizFormContext> = {
    isFormValid: PropTypes.func.isRequired,
    mountInput: PropTypes.func.isRequired,
    unmountInput: PropTypes.func.isRequired,
    submitValue: PropTypes.func.isRequired
  };

  protected readonly debouncedSubmitValue: ICancelable<void> & ((input: GenericWizInput) => void);

  private wizContext: IWizFormContext;

  constructor(props: P, context: IWizFormContext, leadingDebounce?: boolean) {
    super(props, context);
    this.wizContext = context;
    this.debouncedSubmitValue = this._async.debounce(
      this.wizContext.submitValue,
      this.props.debounceInterval !== null && this.props.debounceInterval !== undefined ? this.props.debounceInterval : DEFAULT_DEBOUNCE,
      {
        leading: leadingDebounce === null || leadingDebounce === undefined ? true : leadingDebounce
      }
    );
    this._validateProps(props);
  }

  public componentWillReceiveProps(nextProps: P): void {
    this._validateProps(nextProps);
    if (nextProps.value !== this.props.value) {
      this.setState((prevState: S) => {
        prevState.currentValue = nextProps.value;
        return prevState;
      });
    }
  }

  public componentWillMount(): void {
    this.wizContext.mountInput(this);
  }

  public componentWillUnmount(): void {
    this.debouncedSubmitValue.flush();
    this.wizContext.unmountInput(this);
  }

  public doValidate(isMount = false): IWizFormValidationResult {
    const { validators = [] } = this.props;

    const validationResult: IWizFormValidationResult = {
      isValid: false,
      component: this
    };

    // I we are mounting then we don't want to show any errors by a full validation
    // We just create so we have something in the state
    if (isMount) {
      return validationResult;
    } else {
      for (const validator of validators as any) {
        const error: string = validator(this.state.currentValue);
        if (error) {
          validationResult.isValid = false;
          validationResult.errorMessage = error;
          return validationResult;
        } else {
          validationResult.isValid = true;
          return validationResult;
        }
      }

      return validationResult;
    }
  }

  public setError(errorMessage?: string): void {
    this.setState((prevState: S) => {
      prevState.isValid = false;
      prevState.currentError = errorMessage;
      return prevState;
    });
  }

  public clearError(): void {
    this.setState((prevState: S) => {
      prevState.isValid = true;
      prevState.currentError = undefined;
      return prevState;
    });
  }

  protected setValue(value: T): void {
    this.setState(
      (prevState: S): S => {
        prevState.currentValue = value;
        return prevState;
      },
      () => {
        this.debouncedSubmitValue(this);
      }
    );
  }

  private _validateProps(props: P): void {
    if (!props.inputKey) {
      throw new Error('FormBaseInput: name must defined on all form inputs');
    }
  }
}
