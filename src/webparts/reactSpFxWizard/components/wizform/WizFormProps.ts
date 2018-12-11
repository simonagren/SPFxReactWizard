
import * as React from 'react';

export interface IWizForm {}

export interface IWizFormProps extends React.AllHTMLAttributes<HTMLFormElement> {
  componentRef?: any;
  onUpdated?: (key: string, value: any) => void;
  onCheckValid?: (isValid: boolean) => void;
  isMoveBack?: boolean;
}
