import React, { useState } from 'react';
import { Table } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Form, Modal, message, Input, Select } from 'antd';
import { useCreateEmplyeeMutation, useGetAcivmentQuery, useGetDepartmentQuery, useGetEmplyeeQuery } from '../../redux/serivce/productlslice';
import { CiCircleMinus } from 'react-icons/ci';
const { Option } = Select;

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
        title: 'Department',
        dataIndex: 'department_id',
    },
    {
        title: 'Achievement',
        dataIndex: 'achievement',
        render: (text) => text || 'N/A',
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
    },
];

const Employee = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Define the form instance
    const { data: employees } = useGetEmplyeeQuery();
    const {data: department} = useGetDepartmentQuery();
    const {dat: achievement} = useGetAcivmentQuery();
    console.log(employees)
    const { data: createEmployee } = useCreateEmplyeeMutation();
    // Define the mutation hook

    // Mapping API data to match Ant Design's expected format
    const dataSource = employees?.data?.data?.map((employee) => ({
        key: employee?.id,
        name: employee?.name,
        email: employee?.email,
        phone: employee?.phone,
        address: employee?.address,
        department_id: employee?.department?.name,
        achievement: employee.achievements?.[0]?.name || 'N/A',
    }));

    const openAddModal = () => setIsModalOpen(true);
    const closeAddModal = () => setIsModalOpen(false);

    const handleSubmit = async (values) => {
        try {
            await createEmployee(values).unwrap(); // Unwrap the result to handle errors
            message.success('Employee added successfully!');
            closeAddModal();
            form.resetFields(); // Reset form fields
        } catch (error) {
            message.error('Failed to add employee. Please try again.');
        }
    };

    return (
        <div>
            <Container className='mt-5'>
                <Row>
                    <Col md={9} lg={9} sm={12} className="m-auto">
                        <Button type="primary" onClick={openAddModal} className="mb-3">
                            Add Employee
                        </Button>
                        <Table columns={columns} dataSource={dataSource} />
                    </Col>
                </Row>
            </Container>

            <Modal open={isModalOpen} onCancel={closeAddModal} footer={null}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#E8F6FE]">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please input the employee name!' }]}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: 'Please input the email!' }]}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Phone"
                                rules={[{ required: true, message: 'Please input the phone!' }]}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="department_id"
                                label="Department"
                                rules={[{ required: true, message: 'Please select a department!' }]}
                            >
                                <Select style={{ width: '100%' }}>
                                    <Option value="1">HR</Option>
                                    <Option value="2">Engineering</Option>
                                    <Option value="3">Sales</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: 'Please input the address!' }]}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="achievements"
                                label="Achievements"
                                rules={[{ required: true, message: 'Please input at least one achievement!' }]}
                            >
                                <Form.List name="achievements">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <div key={field.key} style={{ marginBottom: '8px' }}>
                                                    <Form.Item
                                                        label={`Achievement ${index + 1}`}
                                                        required={false}
                                                    >
                                                        <Input.Group compact>
                                                            <Form.Item
                                                                {...field}
                                                                name={[field.name, 'id']}
                                                                rules={[{ required: true, message: 'Please input achievement ID!' }]}
                                                                noStyle
                                                            >
                                                                <Input
                                                                    placeholder="Achievement ID"
                                                                    style={{ width: '30%' }}
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...field}
                                                                name={[field.name, 'date']}
                                                                rules={[{ required: true, message: 'Please input the achievement date!' }]}
                                                                noStyle
                                                            >
                                                                <Input
                                                                    placeholder="Achievement Date"
                                                                    style={{ width: '65%' }}
                                                                />
                                                            </Form.Item>
                                                            {fields.length > 1 && (
                                                                <CiCircleMinus
                                                                    size={24}
                                                                    className="cursor-pointer text-[#D7263D] ml-2"
                                                                    onClick={() => remove(field.name)}
                                                                />
                                                            )}
                                                        </Input.Group>
                                                    </Form.Item>
                                                </div>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{ width: '100%' }}
                                                >
                                                    Add Achievement
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                            <center>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="mt-[50px] w-[138px] h-[49px] bg-[#1D75F2] text-2xl text-white font-medium"
                                >
                                    Submit
                                </Button>
                            </center>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Employee;
