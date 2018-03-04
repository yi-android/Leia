import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Badge,
    Divider,
    Tag,
    Table
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ChannelSubsidiary.less';

function onChangeTime(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

const FormItem = Form.Item;
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
/*
  渠道管理-渠道分析-渠道明细界面
*/
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const branch = [branchSon, branchSon, '已上线', '异常'];
const branchSon = ['支行1', '支行2'];

const menu = (
    <Menu onClick={onMenuButtonClick}>
        <Menu.Item key="poor">不良统计</Menu.Item>
        <Menu.Item key="2">渠道舆情</Menu.Item>
        <Menu.Item key="3">业务统计</Menu.Item>
    </Menu>
);

const columns1 = [{
    title: '序号',
    dataIndex: 'number',
    // render: text => <a href="#">{text}</a>,
}, {
    title: '渠道编号',
    // className: 'column-money',
    dataIndex: 'channelNumber',
}, {
    title: '渠道名称',
    dataIndex: 'channelName',
}, {
    title: '业务笔数',
    dataIndex: 'businessNumber',
}, {
    title: '业务量',
    dataIndex: 'businessSize',
}, {
    title: '开通时间',
    dataIndex: 'createTime',
}, {
    title: '操作',
    render: () => (
        <Dropdown overlay={menu}>
            <Button type="primary">
                菜单按钮 <Icon type="down" />
            </Button>
        </Dropdown>
        // <Fragment>
        //     <a href="/#/channel/channel-details">详情</a>
        //     <Divider type="vertical" />
        //     <a href="">启动</a>
        //     <Divider type="vertical" />
        //     <a href="">暂停</a>
        //     <Divider type="vertical" />
        //     <a href="/#/channel/channel-activation">激活</a>
        // </Fragment>
    ),
}];

const data1 = [{
    key: '1',
    number: '1',
    channelNumber: '111222',
    channelName: '上海云钱网络科技有限公司',
    businessNumber: '67',
    businessSize: '4128',
    createTime: '2017-03-24 10:28:47',
}, {
    key: '2',
    number: '2',
    channelNumber: '111223',
    channelName: '上海云钱网络科技有限公司',
    businessNumber: '67',
    businessSize: '4128',
    createTime: '2017-03-24 10:28:47',
}, {
    key: '3',
    number: '3',
    channelNumber: '111224',
    channelName: '上海云钱网络科技有限公司',
    businessNumber: '67',
    businessSize: '4128',
    createTime: '2017-03-24 10:28:47',
}, {
    key: '4',
    number: '4',
    channelNumber: '111225',
    channelName: '湖北银汇安汽车销售有限公司',
    businessNumber: '67',
    businessSize: '4128',
    createTime: '2017-03-24 10:28:47',
}, {
    key: '5',
    number: '5',
    channelNumber: '111226',
    channelName: '上海云钱网络科技有限公司',
    businessNumber: '67',
    businessSize: '4128',
    createTime: '2017-03-24 10:28:47',
}];

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function onMenuButtonClick(e) {
    message.info('Click on menu item.'+e);//得到的是object，需要转换得到key
    console.log('click', e);
    if (e === 'poor') {
        this.props.dispatch(routerRedux.push('/channel/poor-statistics'));
        return;
    }
    if (e === '2') {
        this.props.dispatch(routerRedux.push('/user/updata-password'));
        return;
    }
    if (e === '3') {
        this.props.dispatch({ type: 'login/logout', });
    }

}

function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
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
export default class ChannelSubsidiary extends PureComponent {
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
                        <FormItem label="公司名称">
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
                                    <Option value="2">咸宁支行</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={11} sm={24}>
                        <FormItem label="周期时间">
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
                <p style={{ textAlign: 'right' }}>
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

        // const onValidateForm = () => {
        //         dispatch(routerRedux.push('/channel/channel-subsidiary'));
        //   };

        return (
            <PageHeaderLayout title="渠道明细">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        <div className={styles.tableListOperator}>
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
