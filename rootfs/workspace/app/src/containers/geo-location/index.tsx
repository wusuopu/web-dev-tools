import React from 'react';
import { Button, Alert, message, } from "antd";
import moment from "moment";
import Layout from '../layout'
import { Box, Row, Col } from '../../components/base/view'

interface IPosition {
  coords?: {
    latitude: number|null;
    longitude: number|null;
    accuracy: number|null;
    altitude: number|null;
    altitudeAccuracy: number|null;
    heading: number|null;
    speed: number|null;
  };
  timestamp: number;
}

const PositionInfo: React.FC<{data: IPosition|null}> = ({ data }) => {
  if (!data) { return null }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${data?.coords?.longitude},${data?.coords?.latitude}`)
      message.success('坐标已复制')
    } catch (error) {
      message.error('坐标复制失败')
    }
  }

  return (
    <Col>
      <Box>
        <p>
          当前定位： 经度 { data?.coords?.longitude }; 纬度 { data?.coords?.latitude }; 定位精确度: { data?.coords?.accuracy };
        </p>
        <p>
          海拔 { data?.coords?.altitude }; 顺时针 { data?.coords?.heading } 度; 当前速度 { data?.coords?.speed } m/s
        </p>
        <p>
          更新时间： {moment(data?.timestamp).format('YYYY/MM/DD HH:mm:SS')}
        </p>
      </Box>
      <Row>
        <Box><Button onClick={handleCopy}>复制位置</Button></Box>
        <Box><a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">拾取坐标</a></Box>
      </Row>
    </Col>
  )
}
const Content: React.FC = () => {
  const [error, setError] = React.useState('')
  const [position, setPosition] = React.useState<IPosition|null>(null)
  const [watchId, setWatchId] = React.useState(0)

  const parseError = (err) => {
    switch(err.code) {
      case err.PERMISSION_DENIED:
        setError('没有权限获取定位')
      break;
      case err.POSITION_UNAVAILABLE:
        setError('定位信息无效')
      break;
      case err.TIMEOUT:
        setError('获取定位超时')
      break;
      case err.UNKNOWN_ERROR:
        setError('未知错误')
      break;
    }
    if (!err.code) { setError('') }
  }
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(setPosition, parseError, { timeout: 5000 })
  }
  const handleWatch = () => {
    if (watchId) { return }
    let id = navigator.geolocation.watchPosition(setPosition, parseError, { timeout: 5000 })
    setWatchId(id)
  }
  const handleClearWatch = () => {
    if (!watchId) { return }
    navigator.geolocation.clearWatch(watchId)
    setWatchId(0)
  }

  let button
  if (watchId) {
    button = (<Box mx="5px"><Button type="danger" onClick={handleClearWatch}>取消监听</Button></Box>)
  } else {
    button = (<Box mx="5px"><Button type="primary" onClick={handleWatch}>监听定位</Button></Box>)
  }

  return (
    <Col>
      { error && (<Alert type="error" message={error} />) }
      <Row>
        <Box mx="5px"><Button onClick={handleClick}>获取定位</Button></Box>
        {button}
      </Row>
      <PositionInfo data={position} />
    </Col>
  )
}

const GeoLocationPage: React.FC = () => {
  const invalid = !navigator.geolocation

  let content
  if (invalid) {
    content = (<Alert message="当前浏览器不支持定位功能" />)
  } else {
    content = (<Content />)
  }
  return (
    <Layout>
      {content}
    </Layout>
  )
}
export default GeoLocationPage;
