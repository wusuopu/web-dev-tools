import React from 'react';
import { Input } from 'antd'
const TextArea = Input.TextArea

type Props = {
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export default class FileInput extends React.PureComponent<Props> {
  static defaultProps = {
    rows: 16,
  }

  render() {
    return (
      <TextArea
        rows={this.props.rows}
        value={this.props.value}
        onChange={this.handleChange}
        onDrop={this.handleFileDrop}
        onDragOver={this.handleDragOver}
        placeholder="将文件拖拽至此处"
      />
    )
  }

  handleChange = (ev) => {
    this.props.onChange && this.props.onChange(ev.target.value)
  }
  handleFileDrop = async (ev) => {
    ev.preventDefault()
    if (!ev.dataTransfer) {
      return
    }
    let dataTransfer: DataTransfer = ev.dataTransfer
    let entry = dataTransfer.items[0].webkitGetAsEntry()
    if (!entry?.isFile) {
      return
    }

    let file: File = await new Promise((resolve) => entry.file(resolve))
    let fileReader = new FileReader()
    fileReader.onloadend = () => {
      this.props.onChange && this.props.onChange(fileReader.result as string)
    }
    fileReader.readAsText(file, 'UTF-8')
  }
  handleDragOver = (ev) => {
    ev.preventDefault()
  }
}
