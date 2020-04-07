import React from 'react';
import { storiesOf } from '@storybook/react';
import { Json2Csv, Csv2Json } from '.'

storiesOf('JSON-CSV', module)
  .add('json2csv', () => (
    <Json2Csv />
  ))
  .add('csv2json', () => (
    <Csv2Json />
  ))
