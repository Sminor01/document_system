import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState} from "react";
import OrganizationService from "../../../api/services/organization-service";

export const OrganizationDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
        ...props
}) => {
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setOrganization(currentRecord);
        } else {
            setOrganization(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record = 
            currentRecord
                ? await OrganizationService.updateRecord({
                    id: currentRecord.id,
                    ...organization,
                })
                : await OrganizationService.createRecord(organization)
        onOk(record);
    }

    return (
        <Modal
        visible={visible}
        title={currentRecord ? 'Редактировать' : 'Создать'}
        onOk={onOkHandler}
        onCancel={onCancel}
        >
            <Space direction="vertical">
                <Space>
                    <Space style={{width: '100%'}}>
                        <Input
                            value={organization?.title || ''}
                            onChange={e => setOrganization({...organization, title: e.target.value})}
                            placeholder="Укажите название"
                            style={{ width: 225 }}
                        />
                    </Space>
                    <Space style={{width: '100%'}}>
                        <Input
                            value={organization?.yr_add || ''}
                            onChange={e => setOrganization({...organization, yr_add: e.target.value})}
                            placeholder="Укажите Юридический Адрес"
                            style={{ width: 225 }}
                        />
                    </Space>
                    <Space>
                        <Input
                            value={organization?.home_add || ''}
                            onChange={e => setOrganization({...organization, home_add: e.target.value})}
                            placeholder="Укажите Почтовый Адрес"
                            style={{ width: 225 }}
                        />
                    </Space>
                    <Space>

                        <Input
                            value={organization?.inn || ''}
                            onChange={e => setOrganization({...organization, inn: e.target.value})}
                            placeholder="Укажите ИНН"
                        />

                        <Input
                            value={organization?.kpp || ''}
                            onChange={e => setOrganization({...organization, kpp: e.target.value})}
                            placeholder="Укажите КПП"
                        />
                        <Input
                            value={organization?.ras_chet || ''}
                            onChange={e => setOrganization({...organization, ras_chet: e.target.value})}
                            placeholder="Рас. счёт"
                        />
                        <Input
                            value={organization?.kor_chet || ''}
                            onChange={e => setOrganization({...organization, kor_chet: e.target.value})}
                            placeholder="Кор. счёт"
                        />
                        <Input
                            value={organization?.bik || ''}
                            onChange={e => setOrganization({...organization, bik: e.target.value})}
                            placeholder="БИК"
                        />
                    </Space>
                </Space>
            </Space>
        </Modal>
    )
   
}