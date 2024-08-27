
import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import {Container, Row, Col} from 'react-bootstrap';
import { useGetEmplyeeQuery } from '../../redux/serivce/productlslice';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Phone',
        dataIndex:'phone',

    },

    {
        title: 'Address',
        dataIndex: 'address',
        
    },
    {
        title:'Achievement',
        dataIndex:'achievement',
    },
    {
        title:'Action',
        dataIndex:'action',
        render: (text) => 
        {
            return(
                <div>
                    <button className='btn btn-success m-2'>Edit</button>
                    <button className='btn btn-danger'> Delete</button>
                </div>
            )
        }

    }

];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sydney No. 1 Lake Park',
    },
];



const Emplyee = () => {
    const { data: employees} = useGetEmplyeeQuery();
    console.log(employees);

    const [selectionType, setSelectionType] = useState('checkbox');
    return (
        <div>
            <Container className='mt-5'>
                <Row>
                    <Col md={9} lg={9} sm={12} className="m-auto" >
                        <Table
                            columns={columns}
                            dataSource={data}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );

};
export default Emplyee;