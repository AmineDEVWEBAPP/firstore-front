import Config from "../config/config"

export default class CheckoutServices {
    static baseurl = `${Config.apiurl}/checkout`

    static async start(payload) {
        const url = this.baseurl + '/start'
        const options = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(payload)
        }
        try {
            const res = await fetch(url, options)
            const data = await res.json()
            if (!res['ok']) return { 'status': 'failed', 'error': data['error'] }
            return data
        } catch (err) {
            console.error(err)
            return { 'status': 'failed', 'error': 'Inconnu error' }
        }
    }

}