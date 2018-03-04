import React, { Component } from 'react';
import { connect } from 'dva';
import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Radio,
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
    Select,
    Button,
} from 'antd';
import numeral from 'numeral';
import {
    ChartCard,
    yuan,
    MiniArea,
    MiniBar,
    MiniProgress,
    Field,
    Bar,
    Pie,
    TimelineChart,
} from '../../components/Charts';
import { routerRedux } from 'dva/router';
import Trend from '../../components/Trend';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './ChannelAnalysis.less';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Description } = DescriptionList;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
        title: `工专路 ${i} 号店`,
        total: 323234,
    });
}
function handleChange(value) {
    console.log(`selected ${value}`);
}
function handleMenuClick(e) {
    console.log('click', e);
  }

@connect(({ chart, loading }) => ({
    chart,
    loading: loading.effects['chart/fetch'],
}))
export default class ChannelAnalysis extends Component {
    state = {
        salesType: 'all',
        currentTabKey: '',
        rangePickerValue: getTimeDistance('year'),
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'chart/fetch',
        });
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'chart/clear',
        });
    }

    handleChangeSalesType = (e) => {
        this.setState({
            salesType: e.target.value,
        });
    };

    handleTabChange = (key) => {
        this.setState({
            currentTabKey: key,
        });
    };

    handleRangePickerChange = (rangePickerValue) => {
        this.setState({
            rangePickerValue,
        });

        this.props.dispatch({
            type: 'chart/fetchSalesData',
        });
    };

    selectDate = (type) => {
        this.setState({
            rangePickerValue: getTimeDistance(type),
        });

        this.props.dispatch({
            type: 'chart/fetchSalesData',
        });
    };

    isActive(type) {
        const { rangePickerValue } = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return;
        }
        if (
            rangePickerValue[0].isSame(value[0], 'day') &&
            rangePickerValue[1].isSame(value[1], 'day')
        ) {
            return styles.currentDate;
        }
    }

    render() {
        const { rangePickerValue, salesType, currentTabKey } = this.state;
        const { dispatch, chart, loading } = this.props; 
        const {
            visitData,
            visitData2,
            salesData,
            searchData,
            offlineData,
            offlineChartData,
            salesTypeData,
            salesTypeDataOnline,
            salesTypeDataOffline,
        } = chart;

        const salesPieData =
            salesType === 'all'
                ? salesTypeData
                : salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;

        const menu = (
            <Menu>
                <Menu.Item>操作一</Menu.Item>
                <Menu.Item>操作二</Menu.Item>
            </Menu>
        );

        const iconGroup = (
            <span className={styles.iconGroup}>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Icon type="ellipsis" />
                </Dropdown>
            </span>
        );

        const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);


        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: { marginBottom: 24 },
        };

        const onValidateForm = () => {
            dispatch(routerRedux.push('/channel/channel-subsidiary'));
        };

        
        return (

            <div>
                <PageHeaderLayout
                    title="渠道分析"
                    logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                >
                    <Row style={{ marginTop: 40 }}>
                        <DescriptionList className={styles.headerList} size="small" >
                            <Description term="渠道销售统计">
                                <Select defaultValue="最近7天" style={{ width: 120 }} onChange={handleChange}>
                                    <Option value="7">最近7天</Option>
                                    <Option value="30">最近1个月</Option>
                                    <Option value="90">最近3个月</Option>
                                </Select>
                            </Description>
                        </DescriptionList>

                    </Row>
                </PageHeaderLayout>
                <Row gutter={24} style={{ marginTop: 40 }}>
                    {/* <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="预计总额度"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={yuan(166790)}
                            // footer={<Field label="日均销售额" value={`￥${numeral(12423).format('0,0')}`} />}
                            contentHeight={86}
                        >
                            <Trend flag="up" style={{ marginRight: 16 }}>
                                周同比<span className={styles.trendText}>12%</span>
                            </Trend>
                            <Trend flag="down">
                                日环比<span className={styles.trendText}>11%</span>
                            </Trend>
                        </ChartCard>
                    </Col> */}
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="销售量(万元)"
                            action={
                                <Tooltip title="查看明细">
                                    {/* <Icon type="info-circle-o" /> */}
                                    <Button type="primary" onClick={onValidateForm}>查看</Button>
                                </Tooltip>
                            }
                            
                            total={numeral(38846).format('0,0')}
                            
                            // footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                            contentHeight={86}
                        >
                         
                            {/* <Trend flag="up" style={{ marginRight: 16 }}>
                                周同比<span className={styles.trendText}>12%</span>
                            </Trend> */}
                            <MiniArea color="#975FE4" data={visitData} />
                        </ChartCard>
                    </Col>
                </Row>
            </div>
        );
    }
}
