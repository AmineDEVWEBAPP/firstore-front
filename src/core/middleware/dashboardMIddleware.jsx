export default function DashboardMiddleware({ children }) {
    const isLogin = localStorage.getItem('isLogin')
    if (!isLogin) return toLogin()
        console.log(document.getElementsByName('head'))
    return (<>{children}</>)
}

function toLogin() {
    history.replaceState(null, null, '/dashboard/login')
    location.reload()
}