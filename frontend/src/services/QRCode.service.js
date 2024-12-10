import createApiClient from "./api.service";

class QRService {
    constructor(baseUrl = "/api/qr") {
        this.api = createApiClient(baseUrl);
    }
    async genCode() {
        return (await this.api.post("/gencode")).data;
    }
    async delete() {
        return (await this.api.delete("/")).data;
    }
    async verify() {
        return (await this.api.post("/verify")).data
    }
    async confirm() {
        return (await this.api.get("/comfirm")).data
    }
}

export default new QRService();
