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

import styles from './PendingTask.less';

const FormItem = Form.Item;
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
/*
  产品管理的产品目录界面
*/
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const branch = [branchSon, branchSon, '已上线', '异常'];
const branchSon = ['支行1', '支行2'];


const columns1 = [{
    title: '业务编号',
    dataIndex: 'productNumber',
    // render: text => <a href="#">{text}</a>,
}, {
    title: '客户名称',
    dataIndex: 'productName',
}, {
    title: '担保机构名称',
    dataIndex: 'productSize',
}, {
    title: '贷款金额',
    dataIndex: 'productType',
}, {
    title: '上报时间',
    dataIndex: 'createTime',
}, {
    title: '目前任务',
    dataIndex: 'nowTask',
}, {
    title: '状态',
    dataIndex: 'productState',
}, {
    title: '操作',
    render: () => (
        <Fragment>
            <a href="/#/apply/apply-profile">审批</a>
        </Fragment>
    ),
}];

const data1 = [{
    key: '1',
    productNumber: 'ICBC-1039',
    productName: '车贷分期',
    productSize: '2342555',
    productType: '分期',
    createTime: '2017-09-20 11：30',
    nowTask: '复审中',
    productState: '正常',
}, {
    key: '2',
    productNumber: 'ICBC-1862',
    productName: '车贷分期',
    productSize: '2000000',
    productType: '贷款',
    createTime: '2017-02-17 09：30',
    nowTask: '初审中',
    productState: '关闭',
}, {
    key: '3',
    productNumber: 'ICBC-1163',
    productName: '家装贷',
    productSize: '6000083',
    productType: '分期',
    createTime: '2018-09-20 11：30',
    nowTask: '复审中',
    productState: '正常',
}, {
    key: '4',
    productNumber: 'ICBC-1244',
    productName: '家装贷',
    productSize: '129333300',
    productType: '全款',
    createTime: '2017-09-20 11：30',
    nowTask: '初审中',
    productState: '正常',
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
        </Modal>
    );
});

@connect(({ rule, loading }) => ({
    rule,
    loading: loading.models.rule,
}))
@Form.create()
export default class PendingTask extends PureComponent {
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
            dispatch(routerRedux.push('/product/product-add'));
        };

        return (
            <PageHeaderLayout title="待办任务">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        <div className={styles.tableListOperator}>
                            {/* <Button icon="plus" type="primary" onClick={onValidateForm}>
                                添加产品
                        </Button> */}
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
