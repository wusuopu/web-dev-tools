import React from 'react';
import Layout from '../layout'
import JsonApiSerializer from '../../components/json-api-serializer'

const JsonApiSerializerPage: React.FC = () => {
  return (
    <Layout>
      <JsonApiSerializer />
    </Layout>
  )
}
export default JsonApiSerializerPage;
