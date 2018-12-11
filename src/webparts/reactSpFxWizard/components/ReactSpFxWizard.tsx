import * as React from 'react';
import styles from './ReactSpFxWizard.module.scss';
import { IReactSpFxWizardProps } from './IReactSpFxWizardProps';
import { autobind, Icon, IconButton, PrimaryButton } from 'office-ui-fabric-react';

// Components
import UserDetails from './steps/UserDetails';
import { FormAutosaveExample } from './steps/Form.Autosave.Example';
import PersonalDetails from './steps/PersonalDetails';
import Confirmation from './steps/Confirmation';
import Success from './steps/Success';

import { IStep } from './steps/IStep'

export interface IReactSpFxWizardState {
  currentStep: number;
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  city: string;
  country: string;
  canContinue: boolean;
  isMoveBack: boolean;
 }

export default class ReactSpFxWizard extends React.Component<IReactSpFxWizardProps, IReactSpFxWizardState> {
  
  constructor(props: IReactSpFxWizardProps) {
    super(props);
      this.state = {
      currentStep: 0,
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      city: '',
      country: '',
      canContinue: false, //Fix later
      isMoveBack: false,
    };


  }

  @autobind
  public nextStep(): void {
    this.setState({
      currentStep: this.state.currentStep + 1,
      isMoveBack: false,
    });
  }

  @autobind
  public prevStep(): void {
    this.setState({
      currentStep: this.state.currentStep - 1,
      isMoveBack: true,
    });
  }

  @autobind
  public handleChange(name: any, value: any) {
    const partialState = {};
    partialState[name] = value;
    this.setState(partialState);
  }

  @autobind
  public handleChange2(name: any, value: any) {
    debugger;
    const partialState = {};
    partialState[name] = value;
    this.setState(partialState);
  }

  @autobind
  public checkCanContinue(value: boolean) {
    debugger;
    this.setState({
      canContinue: value
    });

  }

  @autobind
  public isStepActive(index, step) {
    if (index === step) {
      return "activated";
    } else if (index < step) {
      return styles.done;
    } else {
      return styles.deactivated;
    }
  }

  public render(): React.ReactElement<IReactSpFxWizardProps> {
    const { currentStep } = this.state;
    const { firstName, lastName, email, age, city, country } = this.state;
    const values = { firstName, lastName, email, age, city, country };
    const steps: IStep[] = [
      {
        icon: 'AccountManagement',
        name: 'OneOne',
        title: 'Title 12',
        subtitle: 'Subtitle 12',
        component: <FormAutosaveExample
          checkCanContinue={this.checkCanContinue}
          handleChange={this.handleChange2}
          values={values}
          isMoveBack={this.state.isMoveBack}
        />
      },{
      icon: 'AccountManagement',
      name: 'One',
      title: 'Title 1',
      subtitle: 'Subtitle 1',
      component: <UserDetails
        handleChange={this.handleChange}
        values={values}
        context={this.props.context}
        checkCanContinue={this.checkCanContinue}
      />
    },
    {
      icon: 'CreateMailRule',
      name: 'Two',
      title: 'Title 2',
      subtitle: 'Subtitle 2',
      component: <PersonalDetails
        handleChange={this.handleChange}
        values={values}
        checkCanContinue={this.checkCanContinue}
      />
    },
    {
      icon: 'Accounts',
      name: 'Three',
      title: 'Title 3',
      subtitle: 'Subtitle 3',
      component: <Confirmation
        values={values}
        checkCanContinue={this.checkCanContinue}
      />
    },
    {
      component: <Success />,
      isLastOne: true,
    }
    ]


    return (
      <div className={styles.reactSpFxWizard}>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
              {/* <Stepper completeColor={"green"} steps={[{ title: 'Generell Information' }, { title: 'Innehåll' }, { title: 'Granska' }]} activeStep={step - 1} /> */}
              <div className={styles.wizardWrapper}>
                <div className={styles.top}>
                  <div className={styles.dividerLine} style={{ width: `${(100 / (steps.length) * (steps.length - 1)) - 10}%` }}></div>
                  <div className={styles.stepsWrapper}>
                    {currentStep > 0 &&
                      <div className={`${styles.stepperButtonTop} ${styles.previous}`} onClick={this.prevStep}>
                        <Icon iconName="ChevronLeft" className="ms-IconExample" />
                        {/* <IconButton iconProps={{ iconName: 'Add' }} title="Add" ariaLabel="Add" /> */}
                        {/* <Icon className="material-icons">keyboard_arrow_left</Icon>Arrow Left */}
                      </div>
                    }
                    {steps.map((step, idx) => {
                      {
                        return !step.isLastOne &&

                          <div className={`${styles.step} ${this.isStepActive(idx, currentStep)}`} style={{ width: `${100 / steps.length}%` }}>
                            <div className={styles.circle}>
                              <Icon iconName={currentStep > idx ? 'Accept' : step.icon} className="ms-IconExample" />

                              {/* <Icon className="material-icons md-18">
                            {currentStep > idx ? 'done' : step.icon}
                          </Icon>
                          {currentStep > idx ? "Done" : "Vanliga"} */}
                            </div>
                            <div className={styles.stepTitle}>
                              <h4>{step.title}</h4>
                              <h5 className={styles.stepSubtitle}>{step.subtitle}</h5>
                            </div>
                          </div>

                      }
                    }
                    )}
                    {!steps[currentStep].isLastOne &&
                      <div className={`${styles.stepperButtonTop} ${styles.next} ${!this.state.canContinue ? styles.deactivated : ''}`} onClick={this.nextStep}>
                        {/* <Icon className="material-icons">keyboard_arrow_right</Icon>Keyboard Right */}
                        <Icon iconName="ChevronRight" className="ms-IconExample" />
                      </div>
                    }
                  </div>
                </div >


                <div className={styles.content}>
                  {steps[currentStep].component}
                </div>

                <div>
                  <div className={`${styles.bottom} ${currentStep > 0 ? '' : styles.onlyNext}`}>
                    {currentStep > 0 && !steps[currentStep].isLastOne &&
                      // <div className="stepper-button previous" onClick={this.prevStep}>
                      <PrimaryButton onClick={this.prevStep}>Tillbaka</PrimaryButton>
                    }

                    {!steps[currentStep].isLastOne &&
                      <PrimaryButton disabled={!this.state.canContinue} onClick={this.nextStep}>{currentStep === steps.length - 2 ? "Fishish" : "Next"}</PrimaryButton>
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )


  }
}
