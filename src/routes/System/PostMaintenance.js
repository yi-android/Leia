import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
    Row, Col, Card, Form, Input,
    Select, Icon, Button, Dropdown, Menu,
    InputNumber, DatePicker, Modal, message,
    Badge, Divider, Tag, Table, Popconfirm
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './PostMaintenance.less';

const FormItem = Form.Item;
const { Option } = Select;
/*
  组织架构维护-岗位维护界面
*/
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const branch = [branchSon, branchSon, '已上线', '异常'];
const branchSon = ['支行1', '支行2'];


const data = [];
for (let i = 0; i < 4; i++) {
    data.push({
        key: i.toString(),
        postname: `岗位 ${i}`,
        describe: `这是岗位描述，哈哈哈 ${i}`,
        role: `角色 ${i}`,
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
const children = [];
for (let i = 2; i < 6; i++) {
    children.push(<Option key={i.toString(6) + i}>{i.toString(6) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

const CreateForm = Form.create()((props) => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            title="新增员工"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
           
        </Modal>
    );
});

@connect(({ rule, loading }) => ({
    rule,
    loading: loading.models.rule,
}))
@Form.create()
export default class PostMaintenance extends PureComponent {
    state = {
        modalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
    };
    // title: '岗位名称',
    //     // className: 'column-money',
    //     dataIndex: 'postname',
    //   }, {
    //     title: '描述',
    //     dataIndex: 'describe',
    //   }, {
    //     title: '角色',
    //     dataIndex: 'role',
    //   }];
    constructor(props) {
        super(props);
        this.columns1 = [{
            title: '岗位名称',
            dataIndex: 'postname',
            width: '33%',
            render: (text, record) => this.renderColumns(text, record, 'postname'),
        }, {
            title: '描述',
            dataIndex: 'describe',
            width: '33%',
            render: (text, record) => this.renderColumns(text, record, 'describe'),
        }, {
            title: '角色',
            dataIndex: 'role',
            width: '33%',
            render: (text, record) => {

                { this.renderColumns(text, record, 'role') }
                return (
                <span>
                    {text}
                <p style={{textAlign:'right'}}>
                    <Icon type="search" />
                    <a href="/#/system/role-list">详情</a>
                </p>
                    
                </span>);
            },
        // }, {
        //     title: 'operation',
        //     dataIndex: 'operation',
        //     render: (text, record) => {
        //         const { editable } = record;
        //         return (
        //             <div className="editable-row-operations">
        //                 {
        //                     editable ?
        //                         <span>
        //                             <a onClick={() => this.save(record.key)}>保存</a>
        //                             <Popconfirm title="确定要取消?" onConfirm={() => this.cancel(record.key)}>
        //                                 <a style={{ marginLeft: 20 }}>取消</a>
        //                             </Popconfirm>
        //                         </span>
        //                         : <a onClick={() => this.edit(record.key)}>修改</a>
        //                 }
        //             </div>
        //         );
        //     },
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

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'rule/fetch',
        });
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'rule/fetch',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'rule/fetch',
            payload: {},
        });
    }

    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    }

    handleMenuClick = (e) => {
        const { dispatch } = this.props;
        // const { selectedRows } = this.state;

        if (!selectedRows) return;

        switch (e.key) {
            case 'remove':
                dispatch({
                    type: 'rule/remove',
                    payload: {
                        no: selectedRows.map(row => row.no).join(','),
                    },
                    callback: () => {
                        this.setState({
                            selectedRows: [],
                        });
                    },
                });
                break;
            default:
                break;
        }
    }

    handleSelectRows = (rows) => {
        this.setState({
            selectedRows: rows,
        });
    }

    handleSearch = (e) => {
        e.preventDefault();

        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'rule/fetch',
                payload: values,
            });
        });
    }

    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
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

    handleAdd = (fields) => {
        this.props.dispatch({
            type: 'rule/add',
            payload: {
                description: fields.desc,
            },
        });

        message.success('添加成功');
        this.setState({
            modalVisible: false,
        });
    }



    render() {
        const { rule: { data1 }, loading } = this.props;
        const { selectedRows, modalVisible } = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };

        return (
            <PageHeaderLayout title="岗位维护">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {/* {this.renderForm()} */}
                        </div>
                        <div className={styles.tableListOperator}>
                            {/* <Button icon="plus" type="primary" onClick={() => this.newMember}>
                                新增
                            </Button> */}
                            <Button
                                style={{ width: '10%', marginTop: 16, marginBottom: 8 }}
                                type="primary"
                                onClick={this.newMember}
                                icon="plus">
                                新增
                            </Button>
                        </div>
                        <Table
                            bordered
                            dataSource={this.state.data}
                            columns={this.columns1}
                        />
                        {/* <Table
                            columns={columns1}
                            dataSource={data1}
                            bordered
                            // title={() => 'Header'}
                            // footer={() => 'Footer'}
                        /> */}
                        {/* <StandardTable
                            selectedRows={selectedRows}
                            //   loading={loading}
                            // data={data}
                            // columns={columns}
                            onSelectRow={this.handleSelectRows}
                            // onChange={this.handleStandardTableChange}
                        /> */}
                    </div>
                </Card>
                <CreateForm
                    {...parentMethods}
                    modalVisible={modalVisible}
                />
            </PageHeaderLayout>
        );
    }
}
