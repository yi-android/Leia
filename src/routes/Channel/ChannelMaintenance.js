import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
    Row, Col, Card, Form, Input,
    Select, Icon, Button, Dropdown, Menu,
    InputNumber, DatePicker, Modal, message,
    Badge, Divider, Tag, Table
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ChannelMaintenance.less';

const FormItem = Form.Item;
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
/*
  渠道管理的渠道维护界面
*/
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const branch = [branchSon, branchSon, '已上线', '异常'];
const branchSon = ['支行1', '支行2'];


const columns1 = [{
    title: '机构编号',
    dataIndex: 'agencyNumber',
    // render: text => <a href="#">{text}</a>,
}, {
    title: '机构登录名',
    // className: 'column-money',
    dataIndex: 'loginName',
}, {
    title: '机构名称',
    dataIndex: 'agencyName',
}, {
    title: '注册地址',
    dataIndex: 'address',
}, {
    title: '负责人',
    dataIndex: 'head',
}, {
    title: '联系方式',
    dataIndex: 'contact',
}, {
    title: '创建时间',
    dataIndex: 'createTime',
}, {
    title: '渠道状态',
    dataIndex: 'channelType',
}, {
    title: '操作',
    render: () => (
        <Fragment>
            <a href="/#/channel/channel-details">详情</a>
            <Divider type="vertical" />
            <a href="">启动</a>
            <Divider type="vertical" />
            <a href="">暂停</a>
            <Divider type="vertical" />
            <a href="/#/channel/channel-activation">激活</a>
        </Fragment>
    ),
}];

const data1 = [{
    key: '1',
    agencyNumber: 'ICBC-1039',
    loginName: '111222',
    agencyName: '上海云钱',
    address: '上海浦东',
    head: '李四',
    contact: '15219583309',
    createTime: '正常',
    channelType: '未激活',
}, {
    key: '2',
    agencyNumber: 'ICBC-1039',
    loginName: '111222',
    agencyName: '上海云钱',
    address: '上海浦东',
    head: '李四',
    contact: '15219583309',
    createTime: '正常',
    channelType: '未激活',
}, {
    key: '3',
    agencyNumber: 'ICBC-1039',
    loginName: '111222',
    agencyName: '上海云钱',
    address: '上海浦东',
    head: '李四',
    contact: '15219583309',
    createTime: '正常',
    channelType: '未激活',
}, {
    key: '4',
    agencyNumber: 'ICBC-1039',
    loginName: '111222',
    agencyName: '上海云钱',
    address: '上海浦东',
    head: '李四',
    contact: '15219583309',
    createTime: '正常',
    channelType: '未激活',
}, {
    key: '5',
    agencyNumber: 'ICBC-1039',
    loginName: '111222',
    agencyName: '上海云钱',
    address: '上海浦东',
    head: '李四',
    contact: '15219583309',
    createTime: '正常',
    channelType: '未激活',
}];

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }

  function disabledRangeTime(_, type) {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  }

const CreateForm = Form.create()((props) => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            title="新增渠道"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="公司名称"
            >
                {form.getFieldDecorator('desc', {
                    rules: [{ required: true, message: 'Please input some description...' }],
                })(
                    <Input placeholder="请输入" />
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="负责人"
            >
                {form.getFieldDecorator('desc', {
                    rules: [{ required: true, message: 'Please input some description...' }],
                })(
                    <Input placeholder="请输入" />
                )}
                <Fragment>
                    <a href="">查找生僻字</a>
                </Fragment>
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="联系方式"
            >
                {form.getFieldDecorator('desc', {
                    rules: [{ required: true, message: 'Please input some description...' }],
                })(
                    <Input placeholder="请输入" />
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="所属组织"
            >
                {form.getFieldDecorator('branch')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                        <Option value="0">支行1</Option>
                        <Option value="1">支行2</Option>
                        <Option value="2">支行3</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="岗位"
            >
                {form.getFieldDecorator('branch')(
                    <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select"
                        defaultValue={['岗位一', '岗位三']} onChange={handleChange}>
                        {children}
                    </Select>
                )}
            </FormItem>
        </Modal>
    );
});

@connect(({ rule, loading }) => ({
    rule,
    loading: loading.models.rule,
}))
@Form.create()
export default class ChannelMaintenance extends PureComponent {
    state = {
        modalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
    };

    

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'rule/fetch',
        });
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'rule/fetch',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'rule/fetch',
            payload: {},
        });
    }

    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    }

    handleMenuClick = (e) => {
        const { dispatch } = this.props;
        // const { selectedRows } = this.state;

        if (!selectedRows) return;

        switch (e.key) {
            case 'remove':
                dispatch({
                    type: 'rule/remove',
                    payload: {
                        no: selectedRows.map(row => row.no).join(','),
                    },
                    callback: () => {
                        this.setState({
                            selectedRows: [],
                        });
                    },
                });
                break;
            default:
                break;
        }
    }

    handleSelectRows = (rows) => {
        this.setState({
            selectedRows: rows,
        });
    }

    handleSearch = (e) => {
        e.preventDefault();

        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'rule/fetch',
                payload: values,
            });
        });
    }

    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    }

    handleAdd = (fields) => {
        this.props.dispatch({
            type: 'rule/add',
            payload: {
                description: fields.desc,
            },
        });

        message.success('添加成功');
        this.setState({
            modalVisible: false,
        });
    }

    renderSimpleForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="姓名">
                            {getFieldDecorator('no')(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="所属支行">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">硚口支行</Option>
                                    <Option value="1">黄山支行</Option>
                                    <Option value="1">咸宁支行</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={11} sm={24}>
                        <FormItem label="创建时间">
                            {getFieldDecorator('createTime')(
                                <div>
                                    <RangePicker
                                        disabledDate={disabledDate}
                                        disabledTime={disabledRangeTime}
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                        }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                </div>,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <p style={{ textAlign: 'right'}}>                            
                    <Button type="primary" htmlType="submit">搜索</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                </p>
            </Form>
        );
    }

    renderForm() {
        return this.state.expandForm ? this.renderSimpleForm() : this.renderSimpleForm();
    }

    render() {
        // const { rule: { data }, loading } = this.props;
        const { form, dispatch, data } = this.props;
        const { selectedRows, modalVisible } = this.state;
        // const {  validateFields } = form;
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };

        const onValidateForm = () => {
                dispatch(routerRedux.push('/channel/create-channel'));
          };

        return (
            <PageHeaderLayout title="渠道维护">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        <div className={styles.tableListOperator}>
                        <Button icon="plus" type="primary" onClick={onValidateForm}>
                            新增
                        </Button>
                        </div>
                        <Table
                            columns={columns1}
                            dataSource={data1}
                            bordered
                        // title={() => 'Header'}
                        // footer={() => 'Footer'}
                        />
                        {/* <StandardTable
                            selectedRows={selectedRows}
                            //   loading={loading}
                            // data={data}
                            // columns={columns}
                            onSelectRow={this.handleSelectRows}
                            // onChange={this.handleStandardTableChange}
                        /> */}
                    </div>
                </Card>
                <CreateForm
                    {...parentMethods}
                    modalVisible={modalVisible}
                />
            </PageHeaderLayout>
        );
    }
}
