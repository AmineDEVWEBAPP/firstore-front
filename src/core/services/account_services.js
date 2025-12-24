import Config from "../config/config";

export default class AccountServices {
    static baseUrl = `${Config.apiurl}/accounts`
    static async getAccounts() {
        const options = {
            'method': 'GET'
        }
        try {
            const res = await fetch(this.baseUrl, options)
            if (!res.ok) return { 'status': 'failed' }
            const data = await res.json()
            return data
        } catch (e) {
            console.error(e)
            return { 'status': 'failed' }
        }
    }
}