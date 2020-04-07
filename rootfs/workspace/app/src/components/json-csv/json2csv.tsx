import React from 'react'
import json2csv from 'csvjson-json2csv'
import BaseForm from './form'

export default class Json2Csv extends React.PureComponent {
  state = {
    error: '',
  }

  render() {
    return (
      <BaseForm error={this.state.error} onSubmit={this.handleClick} />
    )
  }

  handleClick = (source:string, separator:string):string => {
    let data
    try {
      data = Function('"use strict";return (' + source + ')')()   // eslint-disable-line
    } catch (err) {
      console.error(err, source)
      this.setState({error: '输入的不是JSON数据'})
      return ''
    }

    try {
      let result = json2csv(data, {separator})
      this.setState({error: ''})
      return result
    } catch (err) {
      console.error(err, source)
      this.setState({error: err.message})
      return ''
    }
  }
}
