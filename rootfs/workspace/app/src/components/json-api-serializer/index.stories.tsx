import React from 'react';
import { storiesOf } from '@storybook/react';
import JsonApiSerializer from '.'

storiesOf('JSON-API', module)
  .add('JsonApiSerializer', () => (
    <JsonApiSerializer />
  ))
