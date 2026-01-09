import Config from "../../config/config";

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

    static async update(id, payload) {
        const url = `${this.baseUrl}/${id}`
        const options = {
            'method': 'PATCH',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(payload)
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

    static async create(payload) {
        const options = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(payload)
        }
        try {
            const res = await fetch(this.baseUrl, options)
            if (!res.ok) return { 'status': 'failed' }
            return { 'status': 'success' }
        } catch (err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }
}