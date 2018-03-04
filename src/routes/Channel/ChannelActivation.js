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
    Select, message,
    Form, Upload
} from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './ChannelActivation.less';
import { create } from 'domain';

const Search = Input.Search;
const { Step } = Steps;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

export let profileState = false;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function handleChange(value) {
    console.log(`selected ${value}`);
}

@connect(({ applyDetail, loading }) => ({
    applyDetail,
    loading: loading.effects['applyDetail/fetchAdvanced'],
}))
@Form.create()
export default class ChannelActivation extends Component {
    state = {
        operationkey: 'tab1',
        stepDirection: 'horizontal',
        modalVisible: false,
        submitting: false,
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

    render() {
        // const description = (
        //     <DescriptionList className={styles.headerList} size="small" col="2">
        //         <Description term="客户名称">刘华</Description>
        //         <Description term="证件号">310109101010101010</Description>
        //     </DescriptionList>
        // );
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderLayout
                title="基本信息"
            // logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
            // // tabList={tabList}
            // tabActiveKey='customer'
            // onTabChange={this.handleTabChange}
            >
                <Row>
                    <Col span={21} style={{ border: 1 }}>

                        <Card
                        //   title="身份证验证"
                        //   bordered={false}
                        //   style={{ marginBottom: 24 }} 
                        >

                            <Row>
                                <DescriptionList className={styles.headerList} size="small" col="2">
                                    <Description term="公司名称">上海某某公司</Description>
                                    <Description term="登录名">2429U529658</Description>
                                </DescriptionList>
                            </Row>
                            <Row style={{ marginTop: 40 }}>
                                <DescriptionList className={styles.headerList} size="small" col="2">
                                    <Description term="负责人">刘天花</Description>
                                    <Description term="电话号码">15092857462</Description>
                                </DescriptionList>
                            </Row>
                            <Row style={{ marginTop: 40 }}>
                                <DescriptionList className={styles.headerList} size="small" col="2">
                                    <Description term="注册地址">上海徐汇区</Description>
                                    <Description term="营业执照号">3092572095728521101010</Description>
                                </DescriptionList>
                            </Row>
                            <Row style={{ marginTop: 40 }}>
                                <DescriptionList className={styles.headerList} size="small" col="2">
                                    <Description term="所属单位">
                                        {getFieldDecorator('branch')(
                                           
                                            <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select"
                                                defaultValue={['岗位一', '岗位三']} onChange={handleChange}>
                                                  {children}
                                                 {/* <Search
                                                    placeholder="input search text"
                                                    onSearch={value => console.log(value)}
                                                    style={{ width: 200 }}
                                                /> */}
                                               
                                            </Select>
                                        )}
                                    </Description>
                                </DescriptionList>
                                
                            </Row>
                            <p style={{ textAlign: 'right', marginTop: 40, marginRight: 50}}>
                                <Button type="primary" onClick={this.handleClickSubmit}>提交</Button>
                            </p>
                        </Card>

                    </Col>
                </Row>
            </PageHeaderLayout>
        );
    }
}
