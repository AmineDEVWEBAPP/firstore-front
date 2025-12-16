export default class AdminServices {
    static async login(email, password) {
        const url = '/api/v1/admin/login'
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
}