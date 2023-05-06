import { Space, Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from "react";
import IndividualService from "../../../api/services/individuals-service";
import OrganizationService from "../../../api/services/organization-service";
import ProxyHeaderService from "../../../api/services/proxy-header-service"
import { ProxyHeadersDialog } from "../../../components/dialogs/proxy-headers-dialog/ProxyHeadersDialog";
import { Navigate } from "react-router-dom";


const s = require('./style.module.css');

export const ProxyListView = ({
        ...props
}) => {
    const columns = [
        {
            title: 'Код',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Номер',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Дата выписки',
            dataIndex: 'dischargeDate',
            key: 'dischargeDate',
        }, 
        {
            title: 'Дата окончания',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Физ. лицо',
            individualId: 'individualId',
            render: (text, record) => individuals.find(it => it.id === record.individualId)?.lastName,
        },
        {
            title: 'Организация',
            organizationId: 'organizationId',
            render: (text, record) => organizations.find(it => it.id === record.organizationId)?.title,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <div onClick={() => updateRecordHandler(record)}>
                            <EditOutlined />
                        </div>
                        <div onClick={() => deleteRecordHandler(record.id)}>
                            <DeleteOutlined />
                        </div>
                    </Space>
                )
            }
        }
    ];


    const [list, setList] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [visible, setVisible] = useState(false);

    const [individuals, setIndividuals] = useState([]);
    const [organizations, setOrganizations] = useState([]);

    useEffect(async () => {
        const individuals = await IndividualService.getAllRecords();
        const organizations = await OrganizationService.getAllRecords();
        const list = await ProxyHeaderService.getAllRecords();
        setIndividuals(individuals);
        setOrganizations(organizations);
        setList(list);
        return () => setList([]);
    }, []);


    const createRecordHandler = () => {
        setCurrentRecord(null)
        setVisible(true);
    }

    const updateRecordHandler = (record) => {
        setCurrentRecord(record)
        setVisible(true)
    }

    const deleteRecordHandler = async(recordId) => {
        await ProxyHeaderService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
    }

    return (
        <div style={{padding: 16}}>
            <Table
                dataSource={list}
                columns={columns}
                onRow={(record, rowIndex) => ({
                    onDoubleClick: event => {
                        Navigate(`/proxy/${record.id}`)
                    },
                })}
             />
            <Button onClick={createRecordHandler}>  Создать </Button>
                <ProxyHeadersDialog
                    visible={visible}
                    onOk={(record) => {
                        currentRecord
                            ? setList(list.map(it => it.id === currentRecord.id
                                ? { ...record }
                                : it))
                            : setList([...list, record]);

                        setCurrentRecord(null);
                        setVisible(false);
                    }}
                    onCancel={() => setVisible(false)}
                    currentRecord={currentRecord}
                    individuals={individuals}
                    organizations={organizations}
                />
        </div>
    )
}