const OrganizationModel = require('../models/organization-model');

class OrganizationService {
    /** получить все записи из таблицы "organizations" */
    async getAllRecords() {
        const list = await OrganizationModel.findAll();
        return list;
    }

    /** создать запись в таблице "organizations" */
    async createRecord(payload) {
        const data = await OrganizationModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "organizations" */
    async updateRecord(payload) {
        let record = await OrganizationModel.findOne({ where: { id: payload.id } });
        record.title = payload?.title || record.title;
        record.inn = payload?.inn || record.inn;
        record.yr_add = payload?.yr_add || record.yr_add;
        record.home_add = payload?.home_add || record.home_add;
        record.kpp = payload?.kpp || record.kpp;
        record.ras_chet = payload?.ras_chet || record.ras_chet;
        record.kor_chet = payload?.kor_chet || record.kor_chet;
        record.bik = payload?.bik || record.bik;
        return await record.save();
    }

    /** удалить запись из таблицы "organizations" */
    async removeRecord(recordId) {
        const record = await OrganizationModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new OrganizationService();