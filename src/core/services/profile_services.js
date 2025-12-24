import Config from "../config/config";

export default class ProfileServices {
    static baseUrl = `${Config.apiurl}/profiles`
    static async getProfiles() {
        const options = {
            'method': 'GET'
        }
        try {
            const res = await fetch(this.baseUrl, options)
            if (!res.ok) return { 'status': 'failed' }
            const data = await res.json()
            return data
        } catch (err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }
}