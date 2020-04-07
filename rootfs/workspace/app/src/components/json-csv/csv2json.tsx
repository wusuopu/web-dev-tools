import React from 'react'
import _ from 'lodash'
import csv2json from 'csvjson-csv2json'
import BaseForm from './form'


export default class Csv2Json extends React.PureComponent {
  state = {
    error: '',
  }

  render() {
    return (
      <BaseForm error={this.state.error} onSubmit={this.handleClick} />
    )
  }

  handleClick = (source:string, separator:string):string => {
    try {
      let result = JSON.stringify(csv2json(source, {separator}), undefined, 2)
      this.setState({error: ''})
      return result
    } catch (err) {
      console.error(err, source)
      this.setState({error: err.message})
      return ''
    }
  }
}
