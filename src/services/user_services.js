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

    static async news() {
        const url = `${this.baseurl}/news`
        const options = {
            'method': 'GET'
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) return { 'status': 'failed' }
            const data = await res.json()
            return data
        } catch (err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }

    static async delete(id) {
        const url = `${this.baseurl}/${id}`
        const options = {
            'method': 'DELETE'
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                const data = await res.json()
                return { 'status': 'failed', 'error': data['error'] }
            }
            return { 'status': 'success' }
        } catch (err) {
            console.error(err)
            return { 'status': 'failed', 'error': 'Inconnu error' }
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
            const res = await fetch(this.baseurl, options)
            if (!res.ok) {
                const data = await res.json()
                return { 'status': 'failed', 'error': data['error'] }
            }
            return { 'status': 'success' }
        } catch (err) {
            console.error(err)
            return { 'status': 'failed', 'error': 'Inconnu error' }
        }
    }

    static async findById(id) {
        const url = `${this.baseurl}/${id}`
        const options = {
            'method': 'GET'
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                const data = await res.json()
                return { 'status': 'failed', 'error': data['error'] }
            }
            const data = await res.json()
            return data
        } catch (err) {
            console.error(err)
            return { 'status': 'failed', 'error': 'Inconnu error' }
        }
    }

    static async update(id, payload) {
        const options = {
            'method': 'PUT',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(payload)
        }
        const url = `${this.baseurl}/${id}`
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                const data = await res.json()
                return { 'status': 'failed', 'error': data['error'] }
            }
            return { 'status': 'success' }
        } catch (err) {
            console.error(err)
            return { 'status': 'failed', 'error': 'Inconnu error' }
        }
    }

    static async sendEmail(id) {
        const options = {
            'method': 'POST'
        }
        const url = `${this.baseurl}/${id}/notice/email`
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                const data = await res.json()
                return { 'status': 'failed', 'error': data['error'] }
            }
            return { 'status': 'success' }
        } catch (err) {
            console.error(err)
            return { 'status': 'failed', 'error': 'Inconnu error' }
        }
    }
}