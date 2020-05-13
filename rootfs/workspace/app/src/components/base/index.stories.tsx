import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FileInput from './file-input'

storiesOf('Base', module)
  .add('FileInput', () => (
    <FileInput
      onChange={action('change')}
    />
  ));
