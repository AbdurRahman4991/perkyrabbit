import React, { useState } from 'react';
import { Table } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Form, Modal, message, Input, Select, Pagination  } from 'antd';
import { useCreateEmplyeeMutation, useDeleteEmplyeeMutation, useGetAcivmentQuery, useGetDepartmentQuery, useGetEmplyeeQuery, useUpdateEmplyeeMutation } from '../../redux/serivce/productlslice';
import { CiCircleMinus } from 'react-icons/ci';
import Swal from 'sweetalert2'

const { Option } = Select;

const Employee = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [form] = Form.useForm();
    const [page, setPage]= useState(1);

    const { data: employees } = useGetEmplyeeQuery({ page });
    const { data: department } = useGetDepartmentQuery();
    const { data: achievement } = useGetAcivmentQuery();
    const [deleteEmployee] = useDeleteEmplyeeMutation();
    const [createEmployee] = useCreateEmplyeeMutation(); 
    const [updateEmployee] = useUpdateEmplyeeMutation();

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
                    <button onClick={() => openEditModal(record)} className='btn btn-success m-2'>Edit</button>
                    <button onClick={() => openDeleteModal(record)} className='btn btn-danger'>Delete</button>
                </div>
            ),
        },
    ];

    const dataSource = employees?.data?.data?.map((employee) => ({
        key: employee?.id,
        name: employee?.name,
        email: employee?.email,
        phone: employee?.phone,
        address: employee?.address,
        department_id: employee?.department?.name,
        achievement: employee.achievements?.[0]?.name || 'N/A',
    }));

    const openAddModal = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
    };

    const closeAddModal = () => setIsModalOpen(false);

    const openEditModal = (employee) => {
        setEditingEmployee(employee);
        form.setFieldsValue({
            ...employee,
            department_id: employee.department?.id,
            achievements: employee.achievements?.map((ach) => ({
                id: ach.id,
                date: ach.date,
            })),
        });
        setIsModalOpen(true);
    };

    const openDeleteModal = (employee) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this employee?',
            okText: 'Yes',
            okType: 'danger',
            onOk: async () => {
                try {
                    await deleteEmployee(employee.key).unwrap();
                    message.success('Employee deleted successfully!');
                } catch (error) {
                    message.error('Failed to delete employee. Please try again.');
                }
            },
        });
    };

    const handleSubmit = async (values) => {
        try {
            if (editingEmployee) {
                // Update employee
                await updateEmployee({ id: editingEmployee.key, ...values }).unwrap();
               // message.success('Employee updated successfully!');
                Swal.fire({
                    title: 'Employee Added!',
                    text: 'Employee updated successfully!.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                // Create new employee
                await createEmployee(values).unwrap();
               // message.success('Employee added successfully!');
                Swal.fire({
                    title: 'Employee Added!',
                    text: 'The employee has been added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            closeAddModal();
            form.resetFields();
        } catch (error) {
           // message.error('Failed to save employee. Please try again.');
           Swal.fire({
            
            text: 'Failed to save employee. Please try again.',
            
            confirmButtonText: 'OK'
        });
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
                        <Table columns={columns} dataSource={dataSource}  pagination={{ pageSize: 10 }}/>
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
                                    {department?.data?.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
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
                                                                rules={[{ required: true, message: 'Please select an achievement!' }]}
                                                                noStyle
                                                            >
                                                                <Select
                                                                    placeholder="Select Achievement"
                                                                    style={{ width: '30%' }}
                                                                >
                                                                    {achievement?.data?.map((ach) => (
                                                                        <Option key={ach.id} value={ach.id}>
                                                                            {ach.name}
                                                                        </Option>
                                                                    ))}
                                                                </Select>
                                                            </Form.Item>

                                                            <Form.Item
                                                                {...field}
                                                                name={[field.name, 'date']}
                                                                rules={[{ required: true, message: 'Please input the achievement date!' }]}
                                                                noStyle
                                                            >
                                                                <Input
                                                                    type="date"
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
