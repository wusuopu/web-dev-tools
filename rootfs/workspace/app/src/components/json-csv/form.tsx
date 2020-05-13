import React from 'react'
import { Input, Button, Select } from 'antd'
import { Box, Row, Col } from '../base/view'
import FileInput from '../base/file-input'

const TextArea = Input.TextArea

type Props = {
  onSubmit?: (source: string, separator: string) => string;
  error?: string;
}

export default class BaseForm extends React.PureComponent<Props> {
  state = {
    source: '',
    result: '',
    separator: ',',
  }

  render() {
    return (
      <React.Fragment>
        <Row flexWrap="wrap">
          <Col width={[1, 1, 1/2, 1/2]} p={1} borderWidth={1}>
            <Box>源数据：</Box>
            <FileInput
              rows={16}
              value={this.state.source}
              onChange={this.handleSourceChange}
            />
          </Col>
          <Col width={[1, 1, 1/2, 1/2]} p={1} borderWidth={1}>
            <Box>结果：</Box>
            <TextArea rows={16} value={this.state.result} />
          </Col>
        </Row>
        <Row>
          <Button type="primary" onClick={this.handleClick}>转换</Button>
          <Row alignItems="center" ml={2}>
            分隔符：
            <Select value={this.state.separator} onChange={this.handleSeparatorChange}>
              <Select.Option value=",">逗号</Select.Option>
              <Select.Option value=";">分号</Select.Option>
              <Select.Option value={"\t"}>Tab</Select.Option>
            </Select>
          </Row>
          <Box color="#ff0000">{this.props.error}</Box>
        </Row>
      </React.Fragment>
    )
  }

  handleSourceChange = (source: string) => {
    this.setState({source})
  }
  handleSeparatorChange = (separator: string) => {
    this.setState({separator})
  }
  handleClick = () => {
    if (this.props.onSubmit) {
      let result = this.props.onSubmit(this.state.source, this.state.separator)
      this.setState({result})
    }
  }
}
