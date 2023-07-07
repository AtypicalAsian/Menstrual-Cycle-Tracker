import React from 'react';
import { OutcomesState } from '../types';
import Headline from './Headline';
import Card from './Card';
import { toFormatted } from '../utils';
import { PUBLIC_DATE_FORMAT } from '../constants';

export default function Outcomes({ fertileWindow, ovulationDate, nextPeriod, pregnancyTestDay, expectedDueDate }: OutcomesState) {
  return (
    <>
     <Headline
        primary="Outcomes"
        secondary="Track your Ovulation Schedule" />
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card date={`${toFormatted(fertileWindow?.[0], PUBLIC_DATE_FORMAT)} - ${toFormatted(fertileWindow?.[1], PUBLIC_DATE_FORMAT)}`} title="Fertile Window" description="The fertile window is when a woman is most likely to conceive" />
        
        <Card date={toFormatted(ovulationDate, PUBLIC_DATE_FORMAT)} title="Ovulation Date" description="Ovulation date is the day in a women's menstrual cycle
        when an egg is released from the ovary and can potentially be fertilized" />

        <Card date={toFormatted(nextPeriod, PUBLIC_DATE_FORMAT)} title="Next Period Date" description="When a woman's menstrual cycle 
        is expected to begin again after the last cycle" />

        <Card date={toFormatted(pregnancyTestDay, PUBLIC_DATE_FORMAT)} title="Pregnancy Test Day" description="When a woman can take a
        pregnancy test" />

        <Card date={toFormatted(expectedDueDate, PUBLIC_DATE_FORMAT)} title="Expected Due Date" description="When a pregnant woman's baby is expected to be born. The actual due date may vary by days or weeks.
" />
      </div>

      
    </>
  );
}
