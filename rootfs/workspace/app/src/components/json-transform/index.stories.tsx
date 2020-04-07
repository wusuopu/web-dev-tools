import React from 'react';
import { storiesOf } from '@storybook/react';
import JsonTransform from '.'

storiesOf('JsonTransform', module)
  .add('default', () => (
    <JsonTransform />
  ));

