import React, { ChangeEvent, useEffect, useReducer } from 'react';
import { isValid } from 'date-fns';
import Headline from './Headline';
import Calendar from './Calendar';
import Input from './Input';
import Outcomes from './Outcomes';
import Button from './Button';
import CycleLength from './CycleLength';
import { formReducer, initialFormState, initialOutcomesState, outcomesReducer } from '../reducers';
import { calculateOutcomes, toFormatted, toNumber } from '../utils';

export default function Calculator() {
  const [form, dispatchForm] = useReducer(formReducer, initialFormState);
  const [outcomes, dispatchOutcomes] = useReducer(outcomesReducer, initialOutcomesState);

  const { lastPeriod, cycleLength } = form;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'cycle_length' ? toNumber(value):value;
    dispatchForm({
      type: 'SET_' + name.toUpperCase(), 
      payload: updatedValue,  
  }) 
  }; 


  const onCalendar = (date : string | Date) => {
    if (isValid(new Date(date)))
    {
      dispatchForm({
        type: 'SET_LAST_PERIOD', 
        payload: new Date(date),  
      }) 
    } 
  }; 

  const onQuickSelection = (cycleLength : number) => {
    dispatchForm({
      type: 'SET_CYCLE_LENGTH', 
      payload: cycleLength,  
    }) 
  }; 

  const onReset = () => {
    dispatchForm({
      type: 'RESET', 
    }) 
  }; 

useEffect(() => {
  if (!lastPeriod || !cycleLength) return; 

  dispatchOutcomes({type: 'SET_OUTCOMES', payload: calculateOutcomes(lastPeriod, cycleLength),});
}, [lastPeriod, cycleLength]);


  return (
    <div className="my-10 md:col-span-2">
      <div className="space-y-6 bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">

          <div className="col-span-3 sm:col-span-2">
            <div className="shadow rounded-lg p-3 md:p-6 sm:p-4">
              <Headline primary="Last Period" secondary="Choose the start date of your most recent menstruation cycle" />
              <div className="mt-6">
                <Calendar selected={lastPeriod && toFormatted(lastPeriod)} onChange={onCalendar} />
              </div>
            </div>
          </div>

          <div className="col-span-3 sm:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <div className="shadow rounded-lg p-3 md:p-6 sm:p-4">
                <Headline
                  primary="Cycle Length"
                  secondary="Enter your typical cycle length" />
                <div className="mt-6">
                  <Input name="cycle_length" type="number" placeholder="i.e. 28" value={cycleLength} onChange={onChange} />
                  <CycleLength onQuickSelection={onQuickSelection} />
                </div>
              </div>

              <div className="shadow rounded-lg p-3 md:p-6 sm:p-4">
                <Headline
                  primary="Start Over"
                  secondary="Reset the form" />
                <div className="mt-4">
                  <Button onClick={onReset} disabled={!lastPeriod && !cycleLength}>
                    Reset
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6">
          {outcomes && lastPeriod && cycleLength && <Outcomes {...outcomes} />}
        </div>
      </div>
    </div>
  );
}
