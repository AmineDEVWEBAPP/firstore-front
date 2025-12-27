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

    static async delete(id) {
        const url = `${this.baseUrl}/${id}`
        const options = {
            'method': 'DELETE'
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) return { 'status': 'failed' }
            return { 'status': 'success' }
        } catch (e) {
            console.error(e)
            return { 'status': 'failed' }
        }
    }

    static async create(data) {
        const options = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(data)
        }
        try {
            const res = await fetch(this.baseUrl, options)
            if (!res.ok) return { 'status': 'failed' }
            const data = await res.json()
            return { 'status': 'success', 'account': data }
        } catch (e) {
            console.error(e)
            return { 'status': 'failed' }
        }
    }
}