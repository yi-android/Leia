import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';

import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
    Icon,
    Row,
    Col,
    Steps,
    Card,
    Avatar,
    Input,
    Form,
} from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './HomePage.less';
import numeral from 'numeral';
//添加产品

const TextArea = Input.TextArea;
const { Description } = DescriptionList;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

export let profileState = false;

@connect(({ applyDetail, loading }) => ({
    applyDetail,
    loading: loading.effects['applyDetail/fetchAdvanced'],
}))
@Form.create()
export default class HomePage extends Component {
    state = {
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
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderLayout
                title="首页"
            >
                <Row>
                    <Card
                        title="工行信用卡分期"
                        bordered={false}
                        style={{ marginBottom: 24 }}
                    >
                        <Row>
                            <DescriptionList className={styles.headerList} size="small" col="3">
                                <Description >
                                    <DescriptionList className={styles.headerList} size="small" col="2">
                                        <Description >
                                            <Avatar size="large" icon="user" />
                                        </Description>
                                        <Description >待办</Description>
                                        <Description style={{ fontSize: 24, color: 'black' }}>{numeral(237).format('0,0')}</Description>
                                    </DescriptionList>
                                </Description>
                                <Description >
                                    <DescriptionList className={styles.headerList} size="small" col="1">

                                        <Description >已办</Description>
                                        <Description style={{ fontSize: 24, color: 'black' }}>{numeral(157).format('0,0')}</Description>
                                    </DescriptionList>
                                </Description>
                                <Description >
                                    <DescriptionList className={styles.headerList} size="small" col="1">
                                        <Description >所有任务</Description>
                                        <Description style={{ fontSize: 24, color: 'black' }}>{numeral(4726).format('0,0')}</Description>
                                    </DescriptionList>
                                </Description>
                            </DescriptionList>

                        </Row>
                    </Card>

                    <Card
                        title="工行直租"
                        bordered={false}
                        style={{ marginBottom: 24 }}
                    >
                        <Row>
                            <DescriptionList className={styles.headerList} size="small" col="3">
                                <Description >
                                    <DescriptionList className={styles.headerList} size="small" col="2">
                                        <Description >
                                            <Avatar size="large" icon="user" />
                                        </Description>
                                        <Description >待办</Description>
                                        <Description style={{ fontSize: 24, color: 'black' }}>{numeral(136).format('0,0')}</Description>
                                    </DescriptionList>
                                </Description>
                                <Description >
                                    <DescriptionList className={styles.headerList} size="small" col="1">

                                        <Description >已办</Description>
                                        <Description style={{ fontSize: 24, color: 'black' }}>{numeral(95).format('0,0')}</Description>
                                    </DescriptionList>
                                </Description>
                                <Description >
                                    <DescriptionList className={styles.headerList} size="small" col="1">
                                        <Description >所有任务</Description>
                                        <Description style={{ fontSize: 24, color: 'black' }}>{numeral(1863).format('0,0')}</Description>
                                    </DescriptionList>
                                </Description>
                            </DescriptionList>
                        </Row>
                    </Card>
                </Row>
            </PageHeaderLayout>
        );
    }
}