import * as React from 'react';
import styles from './ReactSpFxWizard.module.scss';
import { autobind, TextField, PrimaryButton } from 'office-ui-fabric-react';
import { IStepState } from './IStepState';
import { IStepProps } from './IStepProps';



export default class Confirmation extends React.Component<IStepProps, IStepState> {
    constructor(props: IStepProps) {
        super(props);
    }

    public render(): React.ReactElement<IStepProps> {
        const { values: { firstName, lastName, email, age, city, country } } = this.props;
        return (
            <div style={{padding: "2rem 3rem"}}>
                <h1 className="ui centered">Granska</h1>
                <p>Klicka på Skicka om detta stämmer</p>
                <ul>
                    <li>
                        First Name: {firstName}
                    </li>
                    <li>
                        Last Name: {lastName}
                    </li>
                    <li>
                        Email: {email}
                    </li>
                    <li>
                        Age: {age} Years
                    </li>
                    <li>
                        Location: {city}, {country}
                    </li>

                </ul>
            </div>
        )
    }
}
