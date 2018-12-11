import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactSpFxWizardWebPartStrings';
import ReactSpFxWizard from './components/ReactSpFxWizard';
import { IReactSpFxWizardProps } from './components/IReactSpFxWizardProps';
import { initializeIcons } from '@uifabric/icons';


export interface IReactSpFxWizardWebPartProps {
  description: string;
}

export default class ReactSpFxWizardWebPart extends BaseClientSideWebPart<IReactSpFxWizardWebPartProps> {
  
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      initializeIcons();
    });
    
  }

  public render(): void {
    const element: React.ReactElement<IReactSpFxWizardProps > = React.createElement(
      ReactSpFxWizard,
      { 
        context: this.context,
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
