import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IValidator } from '../validators/Validators';

export interface IWizBaseInputProps<T> extends IBaseProps {
  inputKey: string;
  value?: T;
  validators?: IValidator[];
  debounceInterval?: number;
}
