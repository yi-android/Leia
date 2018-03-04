import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
    Row, Col, Card, Form, Input, Select, Icon,
    Button, Dropdown, Menu, InputNumber,
    DatePicker, Modal, message, Badge, Table,
    Divider, Tag, Tree, Upload,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

import styles from './InquiryDetails.less';

const TreeNode = Tree.TreeNode;
const { TextArea } = Input;
const { Description } = DescriptionList;
/*
 征信详情界面
*/

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ loan }) => ({
    loan,
}))
@Form.create()
export default class InquiryDetails extends PureComponent {

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
  
    handleChange = ({ fileList }) => this.setState({ fileList })

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    // renderSimpleForm() {
    //     // const { getFieldDecorator } = this.props.form;
    //     return (
    //         <Form onSubmit={this.handleSearch} layout="inline">
    //             <Row>
    //                 <DescriptionList size="small" col="2">
    //                     <Description term="身份证正面照">
    //                         <Upload
    //                             name="avatar"
    //                             listType="picture-card"
    //                             className="avatar-uploader"
    //                             showUploadList={false}
    //                             action="//jsonplaceholder.typicode.com/posts/"
    //                             beforeUpload={beforeUpload}
    //                             onChange={this.handleChange}
    //                         >
    //                             {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
    //                         </Upload>
    //                     </Description>
    //                 </DescriptionList>

    //             </Row>
    //         </Form>
    //     );
    // }

    render() {
        // const list = this.props.loan.data.list;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">上传</div>
        </div>
        );
       
        return (
            <PageHeaderLayout title="征信详情">
                <Row>
                    <Card
                        // title="负债情况核实"
                        bordered={false}
                    // style={{ marginBottom: 24 }} 
                    >
                        <Row style={{ marginTop: 20 }}>

                            <DescriptionList size="small" col="2">
                                <Description term="身份证正面照" >
                                <div className="clearfix">
                                    <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    >
                                    {fileList.length >= 2 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                                </Description>
                                {/* </DescriptionList> */}
                                {/* <DescriptionList size="small" col="2"> */}
                                <Description term="身份证反面照" >
                                {/* <div className="clearfix">
                                    <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    >
                                    {fileList.length >= 2 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div> */}
                                </Description>
                            </DescriptionList>
                        </Row>
                        <Row style={{ marginTop: 20 }}>

                            <DescriptionList size="small" col="2">
                                <Description term="客户签字照" >
                                {/* <div className="clearfix">
                                    <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    >
                                    {fileList.length >= 2 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div> */}
                                </Description>
                                {/* </DescriptionList> */}
                                {/* <DescriptionList size="small" col="2"> */}
                                <Description term="客户授权书">
                                {/* <div className="clearfix">
                                    <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    >
                                    {fileList.length >= 2 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div> */}
                                </Description>
                            </DescriptionList>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <Col span={2}>
                                征信意见：
                                
                            </Col>
                            <Col span={10}>
                            <TextArea rows={4} placeHolder="征信意见" style={{ marginBottom: 15 }} />
                            </Col>
                            
                        </Row>
                        <Row>
                            <Button style={{ marginTop: 20, marginLeft: 50 }} type="primary">提交</Button>
                        </Row>

                    </Card>
                </Row>
                {/* <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {/* {this.renderSimpleForm()} */}

                {/* </div>

                    </div>
                </Card> */} 

            </PageHeaderLayout>
        );
    }
}
