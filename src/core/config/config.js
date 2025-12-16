export default class Config {
    env = import.meta.env['VITE_BASEURL']
    baseurl = this.env
    apiurl = `${this.baseurl}/api/v1`
}