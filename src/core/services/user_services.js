import Config from "../config/config";

export default class UserServices {
    static baseurl = `${Config.apiurl}/users`
    static async getUsers() {
        const options = {
            'method': 'GET'
        }
        try {
            const res = await fetch(this.baseurl, options)
            if (!res.ok) return { 'status': 'failed' }
            const data = await res.json()
            return data
        } catch (err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }
}