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
  Select,

} from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './ApplyProfile.less';
import u620 from '../../assets/u620.png';
import u622 from '../../assets/u622.png';
import { profileState } from './ApplyProfile.js';
import { profileState2 } from './ApplyProfile2.js';
import { profileState3 } from './ApplyProfile3.js';
import { profileState4 } from './ApplyProfile4.js';
import { profileState5 } from './ApplyProfile5.js';

export let profileState6 = false;
const { Step } = Steps;
const TextArea = Input.TextArea;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <div>
    <ButtonGroup>
      <Button>操作</Button>
      <Button>操作</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button><Icon type="ellipsis" /></Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </div>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>待审批</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>订单金额</div>
      <div className={styles.heading}>¥ 568.08</div>
    </Col>
  </Row>
);



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
}, {
  key: 'suggestion',
  tab: '审核意见',
}];

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <div>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <div>
      周毛毛
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div><a href="">催一下</a></div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>耗时：2小时25分钟</div>
  </div>
);

const customDot = (dot, { status }) => (status === 'process' ? (
  <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
    {dot}
  </Popover>
) : dot);

const operationTabList = [{
  key: 'tab1',
  tab: '客户信息核实',
}];

const columns = [{
  title: '信息项目',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '审核结果',
  dataIndex: 'checked',
  key: 'checked',
  render: text => {
    return <Checkbox />
  },
},];

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

  handleClickSubmit = () => {
    profileState6 = true;
    const { dispatch, match } = this.props;
    dispatch(routerRedux.push(`/result/success`));
  }

  render() {
    const { stepDirection } = this.state;
    const { applyDetail, loading } = this.props;
    const { advancedOperation1 } = applyDetail;
    const img = (<img alt="" src={u620} />);
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
        title="审核意见"
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
        tabList={tabList}
        tabActiveKey='suggestion'
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
            <Card title="调查意见"
              bordered={false}>

              <p>

                我行贷前调查人员已按信贷管理的有关规定，
                履行了贷前尽职调查的责任与义务，
                并对所提供贷款资料的真实性、完整性、准确性负责，无其他应报未报事项。
                申请人提交与填写申请资料属实，资信正常，
                具备按时足额还款能力，抵(质)押物与保证担保足值合法有效。
                我行同意申请人
          <Input style={{ width: 50 }} />
                办理
          <InputNumber style={{ width: 50 }} />
                元汽车专项分期付款，
          <InputNumber style={{ width: 50 }} />
                元附加消费分期。申请期限
          <InputNumber style={{ width: 50 }} />月，
                手续费率
          <InputNumber style={{ width: 50 }} />
                %。
                同意其分期付款卡临时调升至人民币
          <InputNumber style={{ width: 50 }} />
                元整。
          </p>
              <p>
                <TextArea rows={4} placeHolder="其他意见" style={{ marginBottom: 15 }} />
              </p>
              <p style={{ textAlign: 'right' }}>
                <Button type="primary" onClick={this.handleClickSubmit}>提交</Button>
              </p>

            </Card>
          </Col>
        </Row>

        <Modal
          title="调查意见"
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
