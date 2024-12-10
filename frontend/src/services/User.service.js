import createApiClient from "./api.service";

class QRService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }
    async getUser(id) {
        return (await this.api.get(`/getUser/${id}`)).data
    }
}

export default new QRService();
