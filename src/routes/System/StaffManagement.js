import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
    Row, Col, Card, Form, Input,
    Select, Icon, Button, Dropdown, Menu,
    InputNumber, DatePicker, Modal, message,
    Badge, Divider, Tag, Table
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './StaffManagement.less';
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
/*
  员工管理界面
*/
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
// const branch = [branchSon, branchSon, '已上线', '异常'];
// const branchSon = ['支行1', '支行2'];

const columns1 = [{
    title: '工号',
    dataIndex: 'number',
    // render: text => <a href="#">{text}</a>,
}, {
    title: '用户名',
    // className: 'column-money',
    dataIndex: 'username',
}, {
    title: '姓名',
    dataIndex: 'name',
}, {
    title: '联系方式',
    dataIndex: 'contact',
}, {
    title: '所属组织',
    dataIndex: 'organisation',
}, {
    title: '岗位',
    dataIndex: 'jobs',
}, {
    title: '操作',
    render: () => (
        <Fragment>
            <a href="/#/system/user-details">详情</a>
        </Fragment>
    ),
}];

const data1 = [{
    key: '1',
    number: '001',
    username: 'yqcp1',
    name: '张三',
    contact: '15219583309',
    organisation: '硚口支行',
    jobs: '岗位一',
}, {
    key: '2',
    number: '002',
    username: 'yqcp2',
    name: '张三',
    contact: '15219583309',
    organisation: '黄石支行',
    jobs: '岗位二',
}, {
    key: '3',
    number: '001',
    username: '￥300,000.00',
    name: 'New York No. 1 Lake Park',
    contact: '001',
    organisation: '硚口支行',
    jobs: '岗位三',
}, {
    key: '4',
    number: '001',
    username: '￥300,000.00',
    name: 'New York No. 1 Lake Park',
    contact: '001',
    organisation: '￥300,000.00',
    jobs: 'New York No. 1 Lake Park',
}, {
    key: '5',
    number: '001',
    username: '￥300,000.00',
    name: 'New York No. 1 Lake Park',
    contact: '001',
    organisation: '￥300,000.00',
    jobs: 'New York No. 1 Lake Park',
}, {
    key: '6',
    number: '001',
    username: '￥300,000.00',
    name: 'New York No. 1 Lake Park',
    contact: '001',
    organisation: '￥300,000.00',
    jobs: 'New York No. 1 Lake Park',
}];

const children = [];
for (let i = 10; i < 18; i++) {
    children.push(<Option key={i.toString(18) + i}>{i.toString(18) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
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
            title="新增员工"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="员工号"
            >
                {form.getFieldDecorator('number', {
                    rules: [{ required: true, message: 'Please input some description...' }],
                })(
                    <Input placeholder="请输入" />
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="姓名"
            >
                {form.getFieldDecorator('name', {
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
                {form.getFieldDecorator('contact', {
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
                {form.getFieldDecorator('organisation')(
                    <Select
                        defaultValue="请选择"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                    >
                        <OptGroup label="分行一">
                            <Option value="硚口支行">硚口支行</Option>
                            <Option value="黄山支行">黄山支行</Option>
                        </OptGroup>
                        <OptGroup label="分行二">
                            <Option value="咸宁支行">咸宁支行</Option>
                        </OptGroup>
                    </Select>
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="岗位"
            >
                {form.getFieldDecorator('jobs')(
                    <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择"
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
export default class StaffManagement extends PureComponent {
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
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="工号">
                            {getFieldDecorator('number')(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>

                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderForm() {
        return this.state.expandForm ? this.renderSimpleForm() : this.renderSimpleForm();
    }

    render() {
        const { rule: { data }, loading } = this.props;
        const { selectedRows, modalVisible } = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };

        return (
            <PageHeaderLayout title="员工管理">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
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
