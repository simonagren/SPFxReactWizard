import { IWizBaseInputProps } from '../../wizform/WizBaseInput';
import { ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';

export { ITextFieldProps };

export interface IWizTextInputProps extends IWizBaseInputProps<string> {
  textFieldProps?: ITextFieldProps;
}
