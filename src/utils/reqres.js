import Config from "../config/config";

export default async function reqres(endPoint, method, payload) {
    const url = Config.apiurl + '/' + endPoint
    const options = {
        'method': method.toUpperCase(),
        'credentials': 'include',
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    if (payload) options['body'] = JSON.stringify(payload)
    try {
        const res = await fetch(url, options)
        let data = null
        try {
            data = await res.json()
        } catch (e) {
            data = null
        }
        if (!res.ok)
            return { 'status': 'failed', 'error': data['error'] }
        return data ? data : res
    } catch (err) {
        console.error(err)
        return { 'status': 'failed', 'error': 'Inconnu error' }
    }
}