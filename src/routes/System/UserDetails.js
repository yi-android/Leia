import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row, Col, Card, Form, Input, Select, Icon,
  Button, Dropdown, Menu, InputNumber,
  DatePicker, Modal, message, Badge,
  Divider, Tag,
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

import styles from './UserDetails.less';

/*
 员工信息详情界面
*/
const { Description } = DescriptionList;
const FormItem = Form.Item;
const branch = [branchSon, branchSon, '已上线', '异常'];
const branchSon = ['支行1', '支行2'];

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class UserDetails extends PureComponent {
  state = {

  };



  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <Icon style={{ marginLeft: 20 }} type="edit" />
            {/* <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">修改</Button>              
            </span>             */}
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('username')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="员工号">
              {getFieldDecorator('number')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">修改</Button>
            </span>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="联系方式">
              {getFieldDecorator('contact')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">修改</Button>
            </span>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginTop: 40 }}>
          <Col md={8} sm={24}>
            <FormItem label="所属组织">
              {getFieldDecorator('organisation')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">修改</Button>
            </span>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="岗位"
            >
              {getFieldDecorator('branch')(
                <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select"
                  defaultValue={['岗位一', '岗位三']} onChange={handleChange}>
                  {children}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">修改</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderLayout title="员工信息">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Row>
                <DescriptionList className={styles.headerList} size="small" col="2">
                  <Description term="姓名">
                    张某某
                      <Icon style={{ marginLeft: 20 }} type="edit" />
                  </Description>
                  <Description term="用户名">
                    YQCP001
                  </Description>
                </DescriptionList>
              </Row>
              <Row style={{ marginTop: 40 }}>
                <DescriptionList className={styles.headerList} size="small" col="2">
                  <Description term="员工号">
                    211
                       <Icon style={{ marginLeft: 20 }} type="edit" />
                  </Description>
                  <Description term="联系方式">
                    15092857462
                       <Icon style={{ marginLeft: 20 }} type="edit" />
                  </Description>
                </DescriptionList>
              </Row>
              <Row style={{ marginTop: 60 }}>
                <DescriptionList className={styles.headerList} size="small" col="1">
                  <Description term="所属组织">
                    上海徐汇区
                     <Icon style={{ marginLeft: 20 }} type="edit" />
                  </Description>
                </DescriptionList>
              </Row>
              <Row style={{ marginTop: 40 }}>
                <DescriptionList className={styles.headerList} size="small" col="1">
                  <Description term="岗位">3092572095728521101010</Description>
                </DescriptionList>
              </Row>
              <p style={{ textAlign: 'right', marginTop: 40, marginRight: 50 }}>
                <Button type="primary" onClick={this.handleClickSubmit}>提交</Button>
              </p>
            </div>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
