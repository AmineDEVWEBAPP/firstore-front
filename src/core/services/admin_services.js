import Config from "../config/config"

export default class AdminServices {
    static baseurl = `${Config.apiurl}/admin`

    static async login(email, password) {
        const url = `${this.baseurl}/login`
        const options = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                'email': email,
                'password': password
            })
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) return { 'status': 'failed' }
            const data = await res.json()
            return data
        } catch (e) {
            console.error(e)
            return { 'status': 'failed' }
        }
    }

    static async logged() {
        const url = `${this.baseurl}/logged`
        const options = {
            'method': 'POST'
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) return false
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    static async get() {
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