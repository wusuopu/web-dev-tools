import React from 'react'
import { Link } from 'react-router-dom'
import { Affix } from 'antd'
import { Col, Row } from '../components/base/view'

const LinkItem = (props: {to: string, title: string}) => (
  <Row alignItems="center" mx={1}>
    <Link to={props.to}>{props.title}</Link>
  </Row>
)

const Head = () => (
  <Row bg="white">
    <LinkItem to="/" title="Home" />
    <LinkItem to="/json-transform" title="JSON数据转化" />
    <LinkItem to="/json2csv" title="JSON转CSV" />
    <LinkItem to="/csv2json" title="CSV转JSON" />
    <LinkItem to="/jsonapi-serializer" title="JSONApi序列化" />
  </Row>
)

const Layout: React.FC = (props) => {
  return (
    <Col maxWidth={1200} mx="auto">
      <Affix offsetTop={10}>
        <Head />
      </Affix>
      <Col mt={30} px={1}>
        {props.children}
      </Col>
    </Col>
  )
}

export default Layout;
