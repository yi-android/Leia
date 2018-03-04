import React, { Component } from 'react';

import { routerRedux, Route, Switch } from 'dva/router';


import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col,
  Input, InputNumber,
   Steps, Card, Popover, Badge, Table, Tooltip, Divider,
   Checkbox, Modal, Radio,
   Select,

  } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './ApplyProfile.less';
import u620 from '../../assets/u620.png';
import u622 from '../../assets/u622.png';
import {profileState} from './ApplyProfile.js';
import {profileState2} from './ApplyProfile2.js';
import {profileState4} from './ApplyProfile4.js';
import {profileState5} from './ApplyProfile5.js';
import {profileState6} from './ApplyProfile6.js';

export let profileState3=false;
const { Step } = Steps;
const TextArea = Input.TextArea;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

const tabList = [{
  key: 'customer',
  tab: '客户信息核实',
}, {
  key: 'business',
  tab: '业务情况核实',
}, {
  key: 'credits',
  tab: '资信情况调查',
}, {
  key: 'pay',
  tab: '还款能力调查',
}, {
  key: 'guarantee',
  tab: '担保情况调查',
},{
  key: 'suggestion',
  tab: '审核意见',
}];


@connect(({ applyDetail, loading }) => ({
  applyDetail,
  loading: loading.effects['applyDetail/fetchAdvanced'],
}))
export default class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
    modalVisible: false,
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

  handleClickShowAttachments() {
    this.setState({
      modalVisible: true,
    });
  }

  handleModalOk() {
    this.setState({
      modalVisible: false,
    });
  }
  handleModalCancel() {
    this.setState({
      modalVisible: false,
    });
  }

  handleClickSubmit = ()=>{  
    profileState3=true;
    // message.warning('请先填写完毕');
  }

  handleTabChange = (key) => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'customer':
        dispatch(routerRedux.push(`/apply/apply-profile`));
        break;
      case 'business':
        dispatch(routerRedux.push(`/apply/apply-profile2`));
        break;
      case 'credits':
        dispatch(routerRedux.push(`/apply/apply-profile3`));
        break;
      case 'pay':
        dispatch(routerRedux.push(`/apply/apply-profile4`));
        break;
      case 'guarantee':
        dispatch(routerRedux.push(`/apply/apply-profile5`));
        break;
      case 'suggestion':
        dispatch(routerRedux.push(`/apply/apply-profile6`));
        break;
      default:
        break;
    }
  }

  render() {
    const { stepDirection } = this.state;
    const { applyDetail, loading } = this.props;
    const { advancedOperation1 } = applyDetail;

    const img =(<img alt="" src={u620} />);
    const description = (
      <DescriptionList className={styles.headerList} size="small" col="3">
        <Description term="客户名称">曲丽丽</Description>
        <Description term="证件号">310234198709192871</Description>
        <Description term="担保公司">北京天合</Description>
        <Description term="经销商">上海中商</Description>
        <Description term="所购车型">凯迪拉克</Description>
        <Description term="车价">470000</Description>
        <Description term="首付款">150000</Description>
        <Description term="分期金额">320000</Description>
        <Description term="分期数">36</Description>
        <Description term="手续费率">8%</Description>
        <Description term="手续费">8000</Description>
      </DescriptionList>
    );
    return (
      <PageHeaderLayout
        title="个人信用卡报告审查"
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
        tabList={tabList}
        tabActiveKey='credits'
        onTabChange={this.handleTabChange}
      >

<Row>
<Col span={3}>
      客户信息核实 { profileState? img : ""}<br/><br/>
      业务情况核实 { profileState2? img : ""}<br/><br/>
      业务情况核实 { profileState3? img : ""}<br/><br/>
      还款能力调查 { profileState4? img : ""}<br/><br/>
      还款能力调查 { profileState5? img : ""}<br/><br/>
      审核意见 { profileState6? img : ""}<br/>
      </Col>
      <Col span={21}> 
        <Card
          title="申请人"
          bordered={false}
          style={{ marginBottom: 24 }}
        >
          <Row>
            <Col span={6}>
              报告编号： 
            <Input style={{ width: 150 }} />
            </Col>
            <Col span={6}>
              12个月逾期数： 
            <InputNumber style={{ width: 50 }} />
            </Col>
            <Col span={6}>
              <RadioGroup>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>关注</Radio>
                <Radio value={3}>禁入</Radio>
              </RadioGroup>
            </Col>
          </Row>
        </Card>


        <Card
          title="申请人配偶"
          bordered={false}
          style={{ marginBottom: 24 }}
        >
          <Row>
            <Col span={6}>
              报告编号： 
            <Input style={{ width: 150 }} />
            </Col>
            <Col span={6}>
              12个月逾期数： 
            <InputNumber style={{ width: 50 }} />
            </Col>
            <Col span={6}>
              <RadioGroup>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>关注</Radio>
                <Radio value={3}>禁入</Radio>
              </RadioGroup>
            </Col>
          </Row>
        </Card>

        <Card
          title="共同还款人"
          bordered={false}
          style={{ marginBottom: 24 }}
        >
          <Row>
            <Col span={6}>
              报告编号： 
            <Input style={{ width: 150 }} />
            </Col>
            <Col span={6}>
              12个月逾期数： 
            <InputNumber style={{ width: 50 }} />
            </Col>
            <Col span={6}>
              <RadioGroup>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>关注</Radio>
                <Radio value={3}>禁入</Radio>
              </RadioGroup>
            </Col>
          </Row>
        </Card>

        <Card
          title="申请共同还款人配偶"
          bordered={false}
          style={{ marginBottom: 24 }}
        >
          <Row>
            <Col span={6}>
              报告编号： 
            <Input style={{ width: 150 }} />
            </Col>
            <Col span={6}>
              12个月逾期数： 
            <InputNumber style={{ width: 50 }} />
            </Col>
            <Col span={6}>
              <RadioGroup>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>关注</Radio>
                <Radio value={3}>禁入</Radio>
              </RadioGroup>
            </Col>
          </Row>
        </Card>

        <Card
          title="情况说明"
          bordered={false}
          style={{ marginBottom: 24 }}
        >
          <Row>
            <Col span={20}>
               <TextArea rows={4} placeHolder="情况说明" style={{ marginBottom: 15 }} />
             </Col>
          </Row>
        </Card>


        <Card
          title="法院被执行人查询"
          bordered={false}
          style={{ marginBottom: 24 }}>

          <Checkbox>申请人</Checkbox>
          <Checkbox>申请人配偶</Checkbox>
          <Checkbox>共同还款人</Checkbox>
          其他
          <Input style={{ width: 150 }} />

        </Card>


        <Card
          title="FICO系统查询情况"
          bordered={false}
          style={{ marginBottom: 24 }}>

          <Row>
            <Col span={4}>
              评分结果
            </Col>
            <Col span={20}>
            <InputNumber style={{ width: 50 }} />
            </Col>
          </Row>

          <Row>
            <Col span={4}>
            扣分原因码
            </Col>
            <Col span={20}>
            <Input defaultValue="12345" style={{ width: 100 }} />
            <Input defaultValue="12345" style={{ width: 100 }} />
            <Input style={{ width: 100 }} />
            <Input style={{ width: 100 }} />
            </Col>
          </Row>

          <Row>
            <Col span={4}>
            云钱系统查询情况
            </Col>
            <Col span={20}>
              <Button type="primary">查看</Button>
            </Col>
          </Row>


          <Row>
            <Col span={4}>
            其他系统查询情况
            </Col>
            <Col span={20}>
            
            <TextArea rows={4} placeHolder="情况说明" style={{ marginBottom: 15 }} />
            </Col>
          </Row>

          <p style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.handleClickSubmit}>提交</Button>
          </p>
        </Card>
        </Col>
        </Row> 

        {/* {JSON.stringify(applyDetail.data)} */}
        {/* <Card title="流程进度" style={{ marginBottom: 24 }} bordered={false}>


          <Steps direction={stepDirection} progressDot={customDot} current={1}>
            <Step title="创建项目" description={desc1} />
            <Step title="部门初审" description={desc2} />
            <Step title="财务复核" />
            <Step title="完成" />
          </Steps>
        </Card> */}
        {/* <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="用户姓名">付小小</Description>
            <Description term="会员卡号">32943898021309809423</Description>
            <Description term="身份证">3321944288191034921</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="联系地址">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 24 }} title="信息组">
            <Description term="某某数据">725</Description>
            <Description term="该数据更新时间">2017-08-08</Description>
            <Description>&nbsp;</Description>
            <Description term={
              <span>
                某某数据
                <Tooltip title="数据说明">
                  <Icon style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }} type="info-circle-o" />
                </Tooltip>
              </span>
              }
            >
              725
            </Description>
            <Description term="该数据更新时间">2017-08-08</Description>
          </DescriptionList>
          <h4 style={{ marginBottom: 16 }}>信息组</h4>
          <Card type="inner" title="多层级信息组">
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="组名称">
              <Description term="负责人">林东东</Description>
              <Description term="角色码">1234567</Description>
              <Description term="所属部门">XX公司 - YY部</Description>
              <Description term="过期时间">2017-08-08</Description>
              <Description term="描述">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="组名称" col="1">
              <Description term="学名">
                Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" title="组名称">
              <Description term="负责人">付小小</Description>
              <Description term="角色码">1234568</Description>
            </DescriptionList>
          </Card>
        </Card> */}
        {/* <Card title="用户近半年来电记录" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />暂无数据
          </div>
        </Card> */}



        <Modal
          title="影像菜单"
          visible={this.state.modalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
