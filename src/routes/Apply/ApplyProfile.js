import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';

import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col,
  Input, InputNumber,
   Steps, Card, Popover, Badge, Table, Tooltip, Divider,
   Checkbox, Modal, Radio,
   Select,message,
  Form, Upload
  } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './ApplyProfile.less';
import { create } from 'domain';
import u620 from '../../assets/u620.png';
import u622 from '../../assets/u622.png';
import {profileState2} from './ApplyProfile2.js';
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

export let profileState=false;

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

  handleClickShowAttachments = ()=>{
    this.setState({
      modalVisible:true,
    });
  }

  handleModalOk = ()=>{

    //submitting



    this.setState({
      submitting:true,
    });

    setTimeout(()=>{

      this.setState({
        submitting:false,
        modalVisible:false,
      });

    },3000);

    // this.setState({
    //   modalVisible:false,
    // });
  }
  handleModalCancel = ()=>{
    this.setState({
      modalVisible:false,
    });
  }

  handleClickSubmit = ()=>{
    //alert("请先填写完毕");
    profileState=true;
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

    const props4 = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [],
    };

    const img =(<img alt="" src={u620} />);
  
    // const description = (
    //   <DescriptionList className={styles.headerList} size="small" col="2">
    //     <Description term="客户名称">刘华</Description>
    //     <Description term="证件号">310109101010101010</Description>
    //     <Description term="身份证照">
    //          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" style={{ height: 100, width: 100 }}  />
    //     </Description>
    //     <Description term="审批意见">
    //        <RadioGroup name="radiogroup" defaultValue={0}>
    //           <Radio value={1}>一致</Radio>
    //           <Radio value={2}>不同</Radio>
    //        </RadioGroup>
    //     </Description>
    //   </DescriptionList>
    // );

    return (
      <PageHeaderLayout
        title="客户信息核实"
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
        tabList={tabList}
        tabActiveKey='customer'
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
      <Col span={21} style={{border: 1}}>
      <Card
          title="身份证验证"
          bordered={false}
          style={{ marginBottom: 24 }} 
        >

        <Row>
          <DescriptionList className={styles.headerList} size="small" col="2">
              <Description term="客户名称">刘华</Description>
              <Description term="证件号">310109101010101010</Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small">
             <Description term="身份证照">
             <Upload {...props}>
                 {uploadButton}
             </Upload>
            </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="审批意见">
              <RadioGroup name="radiogroup" defaultValue={0}>
                <Radio value={1}>一致</Radio>
                <Radio value={2}>不同</Radio>
              </RadioGroup>
             </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="系统意见">
                    <img  src={ u620 }  />
                    <img  src={ u622 }  className={styles.judge}/>
             </Description>
          </DescriptionList>
        </Row>
        </Card>
    
        <Card
          title="家庭住址验证"
          bordered={false}
          style={{ marginBottom: 24 }} 
        >
        <Row>
          <DescriptionList className={styles.headerList} size="small" col="2">
              <Description term="家庭住址">上海市虹桥路1028号</Description>
              <Description term="住宅类型">自有</Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small">
             <Description term="家访照片">
             <Upload {...props2}>
                 {uploadButton}
             </Upload>
            </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="审批意见">
              <RadioGroup name="radiogroup" defaultValue={0}>
                <Radio value={1}>一致</Radio>
                <Radio value={2}>不同</Radio>
              </RadioGroup>
             </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="系统意见">
                <img  src={ u620 }  />
                <img  src={ u622 }  className={styles.judge}/>
             </Description>
          </DescriptionList>
        </Row>
        </Card>

        <Card
          title="申请表审核"
          bordered={false}
          style={{ marginBottom: 24 }} 
        >
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small">
             <Description term="业务申请表">
             <Upload {...props}>
                 {uploadButton}
             </Upload>
            </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small" >
            <Description term="审批意见">
              <RadioGroup name="radiogroup" defaultValue={0}>
                <Radio value={1}>一致</Radio>
                <Radio value={2}>不同</Radio>
              </RadioGroup>
             </Description>
          </DescriptionList>
        </Row>
        </Card>

        <Card
          title="偿债意愿核实"
          bordered={false}
          style={{ marginBottom: 24 }} 
        >
        <Row>
        {getFieldDecorator('required', {
                  initialValue: '0',
         })(
              <RadioGroup name="radiogroup">
                <Radio value="1">客户经理已做家访</Radio>
                <Radio value="2">需要电话回访</Radio>
              </RadioGroup>
         )}
        </Row>
        <Row>
          <Col span={20}>
          {getFieldDecorator('edit')(
              <TextArea
              style={{
                marginBottom: 15,
                display: getFieldValue('required') === '1' ? 'block' : 'none',
              }}
                rows={4}
              />
            )}
          </Col>
          <Col span={20}>
          {getFieldDecorator('saveBut')(
             <Button 
             style={{
              display: getFieldValue('required') === '1' ? 'block' : 'none',
            }}
             type="primary">
             保存
             </Button>
          )}
          </Col>
        </Row>
        <Row>
        {getFieldDecorator('call')(
              <a 
                 style={{
                  display: getFieldValue('required') === '2' ? 'block' : 'none',
                }}
               >电话回访</a>
         )}
        </Row>
        </Card>

        <Card
          title="签字核实"
          bordered={false}
          style={{ marginBottom: 24 }} 
        >
        <Row style={{ marginTop: 40 }}>
          <DescriptionList className={styles.headerList} size="small">
             <Description term="签字照片">
             <Upload {...props}>
                 {uploadButton}
             </Upload>
            </Description>
          </DescriptionList>
        </Row>
        <Row style={{ marginTop: 40 }}>
        <DescriptionList className={styles.headerList} size="small" >
          <Description term="审批意见">
            <RadioGroup name="radiogroup" defaultValue={0}>
              <Radio value={1}>一致</Radio>
              <Radio value={2}>不同</Radio>
            </RadioGroup>
           </Description>
        </DescriptionList>
      </Row>

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
