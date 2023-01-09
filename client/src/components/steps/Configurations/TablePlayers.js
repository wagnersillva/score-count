import React, { useState } from 'react';
import {Button, Form, Input, InputNumber, Popconfirm, Space, Table, Typography} from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Por favor, insira ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default function TablePlayers({ players, setPlayers }){
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const deletePlayer = (record) => setPlayers(players.filter( player => player.key !== record.key))

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...players];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setPlayers(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setPlayers(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const renderEditable = (record) => (
        <span>
            <Typography.Link
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
                <Button icon={ <CheckOutlined /> } type="text" />

            </Typography.Link>
            <Popconfirm title="Deseja Cancelar?" onConfirm={cancel}>
              <Button icon={ <CloseOutlined /> } type="text" danger />
            </Popconfirm>
          </span>
    );

    const renderOperation = (record) => (
        <Space>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                <Button disabled={editingKey !== ''} icon={ <EditOutlined /> } type="text" />
            </Typography.Link>
            <Popconfirm title="Deseja Excluir?" onConfirm={() => deletePlayer(record)}>
              <Button disabled={editingKey !== ''} icon={ <DeleteOutlined /> } danger type="text"  />
            </Popconfirm>
        </Space>
    )

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Ação',
            dataIndex: 'operation',
            width: "20%",
            render: (_, record) => isEditing(record) ? renderEditable(record) : renderOperation(record)
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false} style={{ marginBottom: 20 }}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={players}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
            />
        </Form>
    );
}