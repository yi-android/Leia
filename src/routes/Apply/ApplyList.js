import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row, Col, Card, Form, Input, Select, Icon,
  Button, Dropdown, Menu, InputNumber,
  DatePicker, Modal, message, Badge,Table,
  Divider, Tag,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ApplyList.less';

const FormItem = Form.Item;
const { Option } = Select;

const columns = [
  {
    title: '客户编号',
    dataIndex: 'id',
  },
  {
    title: '客户名称',
    dataIndex: 'customerName'
  },
  {
    title: '车型',
    dataIndex: 'salesdesc'
  },
  {
    title: '车辆价格',
    dataIndex: 'carPrice'
  },
  {
    title: '贷款金额',
    dataIndex: 'price'
  },
   {
     title: '分期',
     dataIndex: 'periods'
   },
  // {
  //   title: '业务状态',
  //   dataIndex: 'customerName'
  // },
  // {
  //   title: '责任人',
  //   dataIndex: 'customerName'
  // },
  // {
  //   title: '机构/区域',
  //   dataIndex: 'customerName'
  // },
  {
    title: '合作银行',
    dataIndex: 'bankName'
  },
  {
    title: '操作',
    dataIndex: 'customerName',
    render: () => (
      <Fragment>
        <a href="/#/apply/apply-profile">查看</a>
        <Divider type="vertical" />
        <a href="/#/apply/apply-profile">补录</a>
      </Fragment>
    ),
  },
];

@connect(({ loan }) => ({
  loan,
}))
@Form.create()
export default class ApplyList extends PureComponent {

  state = {
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'loan/fetch',
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={10} sm={24}>
            <FormItem label="客户名称">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
            <FormItem label="证件号码">
              {getFieldDecorator('status')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>

          <Col md={4} sm={24}>
          </Col>
          
        </Row>

        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>

        <Col md={10} sm={24}>
            <FormItem label="电话">
              {getFieldDecorator('status')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>

          <Col md={10} sm={24}>
          <FormItem label="业务状态">
          {getFieldDecorator('status')(
            <Select placeholder="请选择" style={{ width: '100%' }}>
              <Option value="0">全部</Option>
              <Option value="1">运行中</Option>
            </Select>
          )}
        </FormItem>
          </Col>
          <Col md={4} sm={24}>
          <Button type="primary" htmlType="submit">查询</Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const list = this.props.loan.data.list;
    return (
      <PageHeaderLayout title="项目列表">

      <Card  bordered={false}>

      <div className={styles.tableListForm}>
              {this.renderSimpleForm()}
      </div>
       <Table
          rowKey="id"
          dataSource={list}
          columns={columns}
        />
      </Card>
      </PageHeaderLayout>
    );
  }
}
