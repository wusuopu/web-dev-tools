import React from 'react';
import _ from 'lodash';
import { Upload, Button, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import Excel from "exceljs";
import Layout from '../layout'
import file from "../../lib/file";
import { Box, Row, Col } from '../../components/base/view'

const ExcelPage: React.FC = () => {
  const [ fileList, setFileList ] = React.useState<Array<any>>([])

  const handleBeforeUpload = (file, fileList) => {
    if (!_.endsWith(file.name, '.xlsx')) {
      message.error('当前只支持 .xlsx 格式的 Excel 文件')
      return false
    }
    setFileList([file])
    return false
  }
  const handleFileRemove = (file) => {
    setFileList([])
  }

  const handleClick = async () => {
    if (_.isEmpty(fileList)) {
      message.error('当前还未选择文件')
      return
    }
    const data = await file.read(fileList[0], 'buffer')
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(data as ArrayBuffer)
    debugger
    console.log('start debug')
  }

  return (
    <Layout>
      <Col>
        <Upload.Dragger
          multiple={false}
          beforeUpload={handleBeforeUpload}
          onRemove={handleFileRemove}
          fileList={fileList}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或者将文件拖拽到这里上传。</p>
          <p className="ant-upload-text">只能上传xlsx文件，且不超过100M</p>
        </Upload.Dragger>

        <Row mt={20}>
          <Box>
            <Button type="primary" onClick={handleClick}>解析调试</Button>
          </Box>
          <Box>打开浏览器调试器，再点击按钮</Box>
        </Row>
      </Col>
    </Layout>
  )
}
export default ExcelPage;
