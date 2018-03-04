import React, { Component } from 'react';

import { routerRedux, Route, Switch } from 'dva/router';

import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col,
  Input, InputNumber,
   Steps, Card, Popover, Badge, Table, Tooltip, Divider,
   Checkbox, Modal, Radio,
   Select,Upload,Form

  } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './ApplyProfile.less';
import u620 from '../../assets/u620.png';
import u622 from '../../assets/u622.png';
import {profileState} from './ApplyProfile.js';
import {profileState3} from './ApplyProfile3.js';
import {profileState4} from './ApplyProfile4.js';
import {profileState5} from './ApplyProfile5.js';
import {profileState6} from './ApplyProfile6.js';


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


export let profileState2=false;

@connect(({ applyDetail, loading }) => ({
  applyDetail,
  loading: loading.effects['applyDetail/fetchAdvanced'],
}))

@Form.create()
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

  handleClickShowAttachments=()=>{
    this.setState({
      modalVisible:true,
    });
  }

  handleModalOk=()=>{
    this.setState({
      modalVisible:false,
    });
  }
  handleModalCancel=()=>{
    this.setState({
      modalVisible:false,
    });
  }

  handleClickSubmit = ()=>{  
    profileState2=true;
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
    const { advancedOperation2 } = applyDetail;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const uploadButton = (
      <Button>
        <Icon type="upload" /> upload
      </Button>
     );

     const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [],
    };
    
    const props2 = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [],
    };

    const props3 = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [],
    };

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
        title="业务情况核实"
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
        tabList={tabList}
        tabActiveKey='business'
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
          title="需求核实"
          bordered={false}
          style={{ marginBottom: 24 }} 
        >
        <Row>
          <DescriptionList className={styles.headerList} size="small" col="2">
              <Description term="车型">宝马X1</Description>
              <Description term="车辆类型">新车/二手车</Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small">
             <Description term="提车照片">
              <Upload {...props}>
                  {uploadButton}
             </Upload>
            </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="购车行为审核">
              <RadioGroup name="radiogroup" defaultValue={0}>
                <Radio value={1}>一致</Radio>
                <Radio value={2}>不同</Radio>
              </RadioGroup>
             </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="品牌型号审核">
              <RadioGroup name="radiogroup" defaultValue={0}>
                <Radio value={1}>一致</Radio>
                <Radio value={2}>不同</Radio>
              </RadioGroup>
             </Description>
          </DescriptionList>
        </Row>
        </Card>

        <Card
          title="资产核实"
          bordered={false}
          style={{ marginBottom: 24 }} 
        >
        <Row>
          <DescriptionList className={styles.headerList} size="small" col="2">
              <Description term="厂商指导价">220000</Description>
              <Description term="经销商报价">220000</Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <DescriptionList className={styles.headerList} size="small" col="2">
              <Description term="首付款">80000</Description>
              <Description term="首付款比例">66%</Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small">
             <Description term="购车发票">
             <Upload {...props}>
                  {uploadButton}
             </Upload>
            </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small">
             <Description term="首付款凭证">
             <Upload {...props}>
                  {uploadButton}
             </Upload>
            </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="首付款审核">
              <RadioGroup name="radiogroup" defaultValue={0}>
                <Radio value={1}>一致</Radio>
                <Radio value={2}>不同</Radio>
              </RadioGroup>
             </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="贷款比例审核">
              <RadioGroup name="radiogroup" defaultValue={0}>
                <Radio value={1}>合规</Radio>
                <Radio value={2}>不合规</Radio>
              </RadioGroup>
             </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="系统审核">
                  <img  src={u620} />
             </Description>
          </DescriptionList>
        </Row>
        <br/>
        <br/>
        <Row style={{ marginTop: 30, display: true ? 'block' : 'none' }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="二手车评估方式">
            {getFieldDecorator('required', {
                  initialValue: '0',
            })(
              <RadioGroup name="radiogroup" defaultValue={0}>
                <Radio value='1'>自评</Radio>
                <Radio value='2'>他评</Radio>
              </RadioGroup>
            )}
             </Description>
          </DescriptionList>
        </Row>
     {getFieldDecorator('edit')(
       <div style={{ display: getFieldValue('required') === '2' ? 'block' : 'none' }}>  
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small">
             <Description term="评估报告">
             <Upload {...props}>
                  {uploadButton}
             </Upload>
            </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="评估机构">
                   <Input style={{ width: 200 }} />
             </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="是否入围">
              <RadioGroup name="radiogroup" defaultValue={0}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
             </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="评估价格合理">
              <RadioGroup name="radiogroup" defaultValue={0}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
             </Description>
          </DescriptionList>
        </Row>
        </div>
       )}
        <p style={{textAlign:'right'}}>
          <Button type="primary" onClick={this.handleClickSubmit}>提交</Button>
          </p>
        </Card>
        </Col>
        </Row> 
      </PageHeaderLayout>
    );
  }
}
