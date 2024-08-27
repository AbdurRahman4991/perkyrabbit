import React, { useState } from 'react';
import { Table } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
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
        dataIndex: 'phone',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Achievement',
        dataIndex: 'achievement',
        render: (text) => text || 'N/A', // Assuming some employees might not have achievements
    },
    {
        title: 'Action',
        dataIndex: 'action',
        render: (_, record) => (
            <div>
                <button className='btn btn-success m-2'>Edit</button>
                <button className='btn btn-danger'>Delete</button>
            </div>
        ),
    }
];

const Employee = () => {
    const { data: employees } = useGetEmplyeeQuery()
    console.log(employees);

    // Mapping API data to match Ant Design's expected format
    const dataSource = employees?.data?.data?.map((employee) => ({
        key: employee.id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        address: employee.address,
        achievement: employee.achievements?.[0]?.name || 'N/A', // If you have this field in the data
    }));

    return (
        <div>
            <Container className='mt-5'>
                <Row>
                    <Col md={9} lg={9} sm={12} className="m-auto">
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Employee;
