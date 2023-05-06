import React, { useEffect, useState } from "react";
import ProductService from "../../api/services/product-service";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons"
import {Space,Table} from "antd"
import { ProductsDialog } from "../../components/dialogs/products-dialog/ProductsDialog";
import { Button } from "antd/es/radio";

const s = require('./style.module.css');

    export const ProductsView = ({
        ...props
    }) => {
        const s = require('./style.module.css');

        const deleteRecordHandler = async (recordId) => {
            await ProductService.removeRecord(recordId);
            setList(list.filter(it => it.id !== recordId));
        }


        const createRecordHandler = () => {
            setCurrentRecord(null)
            setVisible(true);
        }

        const [currentRecord, setCurrentRecord] = useState(null);
        const [visible, setVisible] = useState(false);

    
        const updateRecordHandler = (record) => { 
            setCurrentRecord(record)
            setVisible(true)
        }
    

        const [list, setList] = useState([]);
        
        const columns = [
            {
                title: 'Код',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Наименование',
                dataIndex: 'title',
                key: 'title',
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
        

        /**
         * в момент, когда компонент отрисован,
         * вызывается запрос на получение списка товаров
         */
        useEffect(async () => {
            /**
             * запрос - это асинхронная функция
             */
            const list = await ProductService.getAllRecords();
            /** 
             * после того, как список получен, 
             * устанавливаем его в локальное состояние 
             */
            setList(list);
            /**
             * когда компонент будет демонтирован со страницы,
             * очищаем локальное состояние
             */
            return () => setList([]);
        }, [])
        return (
           
            
            <div style={{ padding: 16 }}>
                <Table dataSource={list} columns={columns} />
                <Button onClick={createRecordHandler}>
                    Создать
                </Button>
                <ProductsDialog
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
                />
            </div>

        )
    }
