import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row, Col, Card, Form, Input, Select, Icon,
  Button, Dropdown, Menu, InputNumber,
  DatePicker, Modal, message, Badge, Table,
  Divider, Tag, Tree,Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './StructureMaintenance.less';

const TreeNode = Tree.TreeNode;
/*
 组织架构维护界面
*/

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ loan }) => ({
  loan,
}))
@Form.create()
export default class StructureMaintenance extends PureComponent {

  state = {
  };
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  renderSimpleForm() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Tree
          showLine
          defaultExpandedKeys={['0-0-0']}
          onSelect={this.onSelect}
        >
          <TreeNode title="湖北省行" key="0-0">
            <TreeNode title="武汉分行" key="0-0-0">
              <TreeNode title="硚口支行" key="0-0-0-0" />
              <TreeNode title="黄石支行" key="0-0-0-1" />
              <TreeNode title="咸宁支行" key="0-0-0-2" />
            </TreeNode>
            <TreeNode title="汉口分行" key="0-0-1">
              <TreeNode title="汉阳支行" key="0-0-1-0" />
              <TreeNode title="江汉支行" key="0-0-1-0" />
            </TreeNode>
            <TreeNode title="襄阳分行" key="0-0-2">
              <TreeNode title="樊城支行" key="0-0-2-0" />
              <TreeNode title="保康支行" key="0-0-2-1" />
              <TreeNode title="谷城支行" key="0-0-2-1" 
                //  action={
                //   <Tooltip title="指标说明">
                //     <Icon type="info-circle-o" />
                //   </Tooltip>
                // }
              />
              {/* <Icon type="edit" />
              <Icon type="minus-circle-o" />
              <Icon type="plus-circle-o" /> */}
            </TreeNode>

          </TreeNode>
          <Icon type="edit" />
          <Icon type="minus-circle-o" />
          <Icon type="plus-circle-o" />
          <a href="/#/system/post-maintenance">详情</a>
        </Tree>
      </Form>
    );
  }

  render() {
    // const list = this.props.loan.data.list;
  
    return (
      <PageHeaderLayout title="组织架构维护">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSimpleForm()}
            </div>

          </div>
        </Card>

      </PageHeaderLayout>
    );
  }
}
