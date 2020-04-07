import React from 'react'
import { Input, Button, Checkbox } from 'antd'
import _ from 'lodash'
import { Box, Row, Col } from '../base/view'

const TextArea = Input.TextArea

export default class JsonTransform extends React.PureComponent {
  state = {
    source: '',
    code: '',
    result: '',
    error: '',
    simpleMode: true,
  }

  render() {
    const simplePromt = [
      '_.map(object, function(item, index) {',
      `})`
    ]
    const advancePromt = [
      'function (data, _) {',
      '}'
    ]
    let prompt = this.state.simpleMode ? simplePromt : advancePromt
    return (
      <Row>
        <Col width={[1, 1, 1/2, 1/2]} p={1} borderWidth={1}>
          <Box>
            请输入数据：
            <Checkbox checked={this.state.simpleMode} onChange={() => { this.setState({simpleMode: !this.state.simpleMode}) }}>简单模式</Checkbox>
          </Box>
          <TextArea rows={23} value={this.state.source} onChange={this.handleSourceChange} />
        </Col>
        <Col width={[1, 1, 1/2, 1/2]} p={1} borderWidth={1}>
          <Col mb={1}>
            <Box>{prompt[0]}</Box>
            <TextArea rows={10} value={this.state.code} onChange={this.handleCodeChange} />
            <Row alignItems="center">
              <Box>{prompt[1]}</Box>
              <Box mx={1}><Button type="primary" onClick={this.handleClick}>执行</Button></Box>
              <Box>结果：</Box>
            </Row>
            <Box color="#ff0000">{this.state.error}</Box>
          </Col>
          <TextArea rows={10} value={this.state.result} />
        </Col>
      </Row>
    )
  }

  handleSourceChange = (ev) => {
    this.setState({source: ev.target.value})
  }
  handleCodeChange = (ev) => {
    this.setState({code: ev.target.value})
  }

  handleClick = () => {
    let data
    try {
      data = Function('"use strict";return (' + this.state.source + ')')()
      // data = eval(this.state.source)
    } catch (err) {
      console.error(err, this.state.source)
      this.setState({error: '输入的不是JSON数据', result: ''})
      return
    }

    try {
      let r
      if (this.state.simpleMode) {
        r = _.map(data, (item, index) => {
          return eval(this.state.code)
        })
      } else {
        r = eval(this.state.code)
      }
        let result = JSON.stringify(r, undefined, 2)
        this.setState({error: '', result})
    } catch (err) {
      this.setState({error: err.message, result: ''})
    }
  }
}
