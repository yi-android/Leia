import React, { Component } from 'react';

import { routerRedux, Route, Switch } from 'dva/router';


import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Button, Row, Col,
    Input, Card, Modal, Radio,Select,Checkbox,
    } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './ApplyProfile.less';
import u620 from '../../assets/u620.png';
import u622 from '../../assets/u622.png';
import {profileState} from './ApplyProfile.js';
import {profileState2} from './ApplyProfile2.js';
import {profileState3} from './ApplyProfile3.js';
import {profileState4} from './ApplyProfile4.js';
import {profileState6} from './ApplyProfile6.js';

export let profileState5=false;
const TextArea = Input.TextArea;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;

const RadioGroup = Radio.Group;
const Option = Select.Option;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

const imgg =<img alt="" src={u620}  style={{display:profileState5?'block':'none'}} />;

const tabList = [{
  key: 'customer',
  tab: '客户信息核实',//+imgg,
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

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const options = [
  { label: '抵押', value: '抵押' },
  { label: '质押', value: '质押' },
  { label: '保证', value: '保证' },
];

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

  handleClickShowAttachments(){
    this.setState({
      modalVisible:true,
    });
  }

  handleModalOk(){
    this.setState({
      modalVisible:false,
    });
  }
  handleModalCancel(){
    this.setState({
      modalVisible:false,
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

  handleClickSubmit = ()=>{
    // const { dispatch, match } = this.props;
    // dispatch(routerRedux.push(`/result/success`));
      profileState5=true;
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
        title="担保情况调查"
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
        tabList={tabList}
        tabActiveKey='guarantee'
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
          title="担保情况调查"
          bordered={false}
          style={{ marginBottom: 24 }} 
          action={<Button onClick={this.handleClickShowAttachments}>查看附件</Button>}
        >

        <Row>
          <Col span={12}>
          担保方式

          <Select defaultValue="4000" style={{ width: 120 }} >
              <Option value="4000">单一</Option>
              <Option value="3000">组合</Option>
              <Option value="2000">无</Option>
            </Select>
       
          </Col>
            <Col span={12}>
                <RadioGroup>
                  <Radio value={1}>抵押</Radio>
                  <Radio value={2}>质押</Radio>
                  <Radio value={3}>保证</Radio>
                </RadioGroup>
            </Col>
            <Col span={12}>
              <CheckboxGroup options={options} defaultValue={['']} onChange={onChange} />
            </Col>
          </Row>

        </Card>

        <Card
          title="担保机构情况"
          bordered={false}
          style={{ marginBottom: 24 }} 
        >

        <Row>
          <Col span={12}>
          准入机构

          <Select defaultValue="4000" style={{ width: 120 }} >
              <Option value="4000">省行</Option>
              <Option value="4000">总行</Option>
            </Select>
       
          </Col>
            <Col span={12}>
            业务资格
            <Select defaultValue="4000" style={{ width: 120 }} >
            <Option value="4000">省外跨境</Option>
            <Option value="4000">省外跨境资格</Option>
          </Select>
            </Col>
          </Row>



          <Row>
          <Col span={12}>
          是否出具担保函
       
          </Col>
            <Col span={12}>
                <RadioGroup>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </RadioGroup>
            </Col>
          </Row>

          <Row>
          <Col span={12}>
          保证金比例是否符合管理规定和合约协议
       
          </Col>
            <Col span={12}>
                <RadioGroup>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </RadioGroup>
            </Col>
          </Row>

        </Card>




        <Card
          title="抵/质押情况"
          bordered={false}
          style={{ marginBottom: 24 }} 
        >

        <Row>
          <Col span={8}>
          抵/质押物为

          <Select defaultValue="4000" style={{ width: 120 }} >
              <Option value="4000">所购车辆</Option>
              <Option value="4000">房屋</Option>
              <Option value="4000">存款</Option>
              <Option value="000">其他</Option>
            </Select>
       
          </Col>

          <Col span={8}>
          <Input placeholder="其他" style={{ width: 100 }} />
       
          </Col>

            <Col span={8}>
            所有人
            <Select defaultValue="4000" style={{ width: 120 }} >
            <Option value="4000">本人</Option>
            <Option value="4000">他人</Option>
          </Select>
            </Col>
          </Row>

          <Row>
          <Col span={8}>
          已办理抵/质押手续
          </Col>
          <Col span={8}>
          <Select defaultValue="4000" style={{ width: 180 }} >
            <Option value="4000">签订抵/质押合同</Option>
            <Option value="4000">公司出具股东会决议</Option>
            <Option value="4000">其他</Option>
          </Select>
          </Col>
          <Col span={8}>
          <Input placeholder="其他" style={{ width: 100 }} />
          </Col>
          </Row>

          <Row>
          <Col span={12}>
          抵/质押物是否真实、产品是否清晰，价值是否合理、足值，抵押是否合法、有效
       
          </Col>
            <Col span={12}>
                <RadioGroup>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </RadioGroup>
            </Col>
          </Row>
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
