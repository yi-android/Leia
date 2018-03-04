import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';

import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
    Button, Menu, Dropdown, Icon, Row, Col,
    Input, InputNumber,
    Steps, Card, Popover, Badge, Table, Tooltip, Divider,
    Checkbox, Modal, Radio,
    Select, message, DatePicker, Popconfirm,
    Form, Upload
} from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './UpdataPassword.less';
//添加产品
const { MonthPicker, RangePicker } = DatePicker;

const FormItem = Form.Item;
const { Step } = Steps;
const TextArea = Input.TextArea;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

function onChange(date, dateString) {
    console.log(date, dateString);
}

const data = [];
for (let i = 1; i < 7; i++) {
    data.push({
        key: i.toString(),
        nper: `${6 * i}`,
        price: `${6325 * i}`,
    });
}
const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);
export let profileState = false;

@connect(({ applyDetail, loading }) => ({
    applyDetail,
    loading: loading.effects['applyDetail/fetchAdvanced'],
}))
@Form.create()
export default class UpdataPassword extends Component {
    state = {
        operationkey: 'tab1',
        stepDirection: 'horizontal',
        modalVisible: false,
        submitting: false,
    }

    constructor(props) {
        super(props);
        this.columns = [{
            title: '期数',
            dataIndex: 'nper',
            width: '33%',
            render: (text, record) => this.renderColumns(text, record, 'nper'),
        }, {
            title: '价格',
            dataIndex: 'price',
            width: '33%',
            render: (text, record) => this.renderColumns(text, record, 'price'),
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                const { editable } = record;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                    <a onClick={() => this.save(record.key)}>保存</a>
                                    <Popconfirm title="确定要取消吗?" onConfirm={() => this.cancel(record.key)}>
                                        <a style={{ marginLeft: 10 }}>取消</a>
                                    </Popconfirm>
                                </span>
                                : <span><a onClick={() => this.edit(record.key)}>修改</a>
                                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.remove(record.key)}>
                                        <a style={{ marginLeft: 10 }}>删除</a>
                                    </Popconfirm>
                                </span>
                        }
                    </div>
                );
            },
        }];
        this.state = { data };
        this.cacheData = data.map(item => ({ ...item }));
    }
    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }
    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }
    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }
    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
        }
    }
    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }
    remove(key) {
        
    }

    componentDidMount() {

        const { dispatch } = this.props;
        dispatch({
            type: 'applyDetail/fetchAdvanced',
        });


        this.setStepDirection();
        window.addEventListener('resize', this.setStepDirection);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setStepDirection);
        this.setStepDirection.cancel();
    }

    onOperationTabChange = (key) => {
        this.setState({ operationkey: key });
    }

    handleClickShowAttachments = () => {
        this.setState({
            modalVisible: true,
        });
    }

    handleModalOk = () => {

        //submitting



        this.setState({
            submitting: true,
        });

        setTimeout(() => {

            this.setState({
                submitting: false,
                modalVisible: false,
            });

        }, 3000);

        // this.setState({
        //   modalVisible:false,
        // });
    }
    handleModalCancel = () => {
        this.setState({
            modalVisible: false,
        });
    }

    handleClickSubmit = () => {
        //alert("请先填写完毕");
        profileState = true;
        message.warning('请先填写完毕');

    }
    newMember = () => {
        const newData = this.state.data.map(item => ({ ...item }));
        newData.push({
            key: `NEW_TEMP_ID_${this.index}`,
            workId: '',
            name: '',
            department: '',
            editable: true,
            isNew: true,
        });
        this.index += 1;
        this.setState({ data: newData });
    }

    @Bind()
    @Debounce(200)
    setStepDirection() {
        const { stepDirection } = this.state;
        const w = getWindowWidth();
        if (stepDirection !== 'vertical' && w <= 576) {
            this.setState({
                stepDirection: 'vertical',
            });
        } else if (stepDirection !== 'horizontal' && w > 576) {
            this.setState({
                stepDirection: 'horizontal',
            });
        }
    }

    renderAdvancedForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="产品名称">
                            {getFieldDecorator('no')(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="产品种类">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="产品规模(额度)">
                            {getFieldDecorator('number')(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>

                    <Col md={8} sm={24}>
                        <FormItem label="生效时间">
                            {getFieldDecorator('date')(
                                <div>
                                    <RangePicker onChange={onChange} />
                                    <Radio>永久</Radio>
                                </div>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="产品描述">
                            {getFieldDecorator('status3')(
                                <TextArea rows={4} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderLayout
                title="添加产品"
            >
                {/* <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderAdvancedForm()}
                        </div>
                    </div>
                </Card> */}
                <Row>

                    {/* <Col span={21}>   */}
                    <Card
                        title="产品信息"
                        bordered={false}
                        style={{ marginBottom: 24 }}
                    //   action={<Button onClick={this.handleClickShowAttachments}>查看附件</Button>}
                    >

                        <Row >
                            <Col span={12}>
                                产品名称：
                                <Input placeholder="请输入" style={{ width: '60%' }} />
                                <p style={{ textAlign: 'right', marginRight: 130 }}><a>查找生僻字</a></p>
                            </Col>
                            <Col span={12}>
                                产品种类：

                                <Select placeholder="请选择" style={{ width: '60%' }}>
                                    <Option value="0">分期</Option>
                                    <Option value="1">贷款</Option>
                                </Select>

                            </Col>

                        </Row>
                        <Row style={{ marginTop: 30 }}>
                            <Col span={12}>
                                产品规模(额度)：
                                <Input placeholder="请输入" style={{ width: '53%' }} />

                            </Col>
                            <Col span={12}>
                                生效时间：
                                <RangePicker onChange={onChange} style={{ width: '50%' }} />
                                <Radio style={{ marginLeft: 10 }}>永久</Radio>

                            </Col>

                        </Row>
                        <Row style={{ marginTop: 50 }}>
                            <Col span={12}>
                                <p style={{ textAlign: 'top' }}>产品描述：
                                <TextArea rows={4} style={{ width: '60%' }} />
                                </p>
                            </Col>
                        </Row>
                    </Card>

                    <Card
                        title="产品价格"
                        bordered={false}
                        style={{ marginBottom: 24 }}
                    ><Row >
                            <Col span={12}>
                                产品价格：
                                <Input placeholder="请输入" style={{ width: '60%' }} />
                            </Col>
                            <Col span={12}>
                                零售价格：
                                <Select placeholder="请选择" style={{ width: '60%' }}>
                                    <Option value="0">分期</Option>
                                    <Option value="1">贷款</Option>
                                </Select>
                            </Col>
                        </Row>

                    </Card>
                    <Card
                        title="零售价格"
                        bordered={false}
                        style={{ marginBottom: 24 }}
                    >
                        <Button
                            style={{ width: '10%', marginTop: 16, marginBottom: 16 }}
                            type="primary"
                            onClick={this.newMember}
                            icon="plus">
                            新增
                            </Button>
                        <Table bordered dataSource={this.state.data} columns={this.columns} />
                    </Card>
                    <Card
                        title="渠道价格"
                        bordered={false}
                        style={{ marginBottom: 24 }}
                    >
                        <Button
                            style={{ width: '10%', marginTop: 16, marginBottom: 16 }}
                            type="primary"
                            onClick={this.newMember}
                            icon="plus">
                            新增
                            </Button>
                        <Table bordered dataSource={this.state.data} columns={this.columns} />

                        <p style={{ marginTop: 50 }}>
                            <Button type="primary" >提交</Button>
                        </p>
                    </Card>

                </Row>
            </PageHeaderLayout>
        );
    }
}
{/* <Card
                        title="修改密码"
                        bordered={false}
                        style={{ marginBottom: 24 }}
                    >
                        <Row >
                            <Col span={12}>
                                原密码：
                                <Input placeholder="请输入" style={{ width: '60%' }} />
                            </Col>
                        </Row>
                        <Row >
                            <Col span={12}>
                                新密码：
                                <Input placeholder="请输入" style={{ width: '60%' }} />
                            </Col>
                        </Row>
                        <Row >
                            <Col span={12}>
                                确认密码：
                                <Input placeholder="请输入" style={{ width: '60%' }} />
                            </Col>
                        </Row>
                        <Row >
                            <Col span={12}>
                                <p style={{ textAlign: 'left' }}>
                                    <Button type="primary">提交</Button>
                                    {/* <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button> */}
                    //             </p>
                    //         </Col>
                    //     </Row>
                    // </Card> */}