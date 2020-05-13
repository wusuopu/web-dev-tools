import React from 'react'
import JSONAPI from 'jsonapi-serializer'
import { Input, Button } from 'antd'
import { Box, Row, Col } from '../base/view'

const TextArea = Input.TextArea


type Props = {
  onSubmit?: (source: string) => Promise<string>;
  error?: string;
}

class BaseForm extends React.PureComponent<Props> {
  state = {
    source: '',
    result: '',
  }

  render() {
    return (
      <React.Fragment>
        <Row flexWrap="wrap">
          <Col width={[1, 1, 1/2, 1/2]} p={1} borderWidth={1}>
            <Box>源数据：</Box>
            <TextArea rows={16} value={this.state.source} onChange={this.handleSourceChange} />
          </Col>
          <Col width={[1, 1, 1/2, 1/2]} p={1} borderWidth={1}>
            <Box>结果：</Box>
            <TextArea rows={16} value={this.state.result} />
          </Col>
        </Row>
        <Row>
          <Button type="primary" onClick={this.handleClick}>转换</Button>
          <Box color="#ff0000">{this.props.error}</Box>
        </Row>
      </React.Fragment>
    )
  }

  handleSourceChange = (ev) => {
    this.setState({source: ev.target.value})
  }
  handleClick = async () => {
    if (this.props.onSubmit) {
      let result = await this.props.onSubmit(this.state.source)
      this.setState({result})
    }
  }
}

export default class JsonApiSerializer extends React.PureComponent {
  state = {
    error: '',
  }

  render() {
    return (
      <BaseForm error={this.state.error} onSubmit={this.handleClick} />
    )
  }

  handleClick = async (source:string):Promise<string> => {
    let data
    try {
      data = Function('"use strict";return (' + source + ')')()   // eslint-disable-line
      let ret = await new JSONAPI.Deserializer({keyForAttribute: 'underscore_case'}).deserialize(data)
      console.log('deserializer:', data, ret)
      return JSON.stringify(ret, undefined, 2)
    } catch (err) {
      console.error(err, source)
      this.setState({error: '输入的不是JSON数据'})
      return ''
    }
  }
}
