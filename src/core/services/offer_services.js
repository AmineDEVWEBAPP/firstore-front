import Config from "../config/config";

export default class OfferServices {
    static baseUrl = `${Config.apiurl}/offers`
    static async get() {
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

    static async delete(id) {
        const url = `${this.baseUrl}/${id}`
        const options = {
            'method': 'DELETE'
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) return { 'status': 'failed' }
            return { 'status': 'success' }
        } catch (err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }
}