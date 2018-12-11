import * as React from 'react';
import styles from './ReactSpFxWizard.module.scss';
import { autobind, TextField, PrimaryButton, Label, Persona } from 'office-ui-fabric-react';
import { IStepState } from './IStepState';
import { IStepProps } from './IStepProps';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class PersonalDetails extends React.Component<IStepProps, IStepState> {
    constructor(props: IStepProps) {
        super(props);
    }

    public render(): React.ReactElement<IStepProps> {
        const { values } = this.props;
        return (
            <div style={{padding: "2rem 3rem"}}>
                <Label required={true}>Sammanfattning</Label>
                        <CKEditor
                            editor={ ClassicEditor }
                            data={values.firstName}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                this.props.handleChange('firstName', data)
                            } }
                            onBlur={ editor => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ editor => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                <TextField
                    label={"Saker"}
                    required={ true } 
                    value={ values.age }
                    onChanged={(value) => { this.props.handleChange('age', value) }}
                />
                <TextField
                    label={"Annat"}
                    required={ true } 
                    value={ values.city }
                    onChanged={(value) => { this.props.handleChange('city', value) }}
                />
                <TextField
                    label={"Hejsan"}
                    required={ true } 
                    value={ values.country }
                    onChanged={(value) => { this.props.handleChange('country', value) }}
                />
            </div>
        )
    }
}
