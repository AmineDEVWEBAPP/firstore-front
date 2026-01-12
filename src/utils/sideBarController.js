export function hiddenSideBar() {
    const sideBar = document.getElementById('side-bar')
    const sideBarBg = document.getElementById('side-bar-bg')
    const sideBarContainer = document.getElementById('side-bar-container')
    sideBar.style.width = 0
    sideBar.style.padding = 0
    sideBarBg.style.backgroundColor = 'transparent'
    setTimeout(() => sideBarContainer.style.display = 'none', 300)
}

export function showSideBar() {
    const sideBar = document.getElementById('side-bar')
    const sideBarBg = document.getElementById('side-bar-bg')
    const sideBarContainer = document.getElementById('side-bar-container')
    sideBarContainer.style.display = 'flex'
    setTimeout(function () {
        sideBar.style.width = '400px'
        sideBar.style.padding = '16px'
        sideBarBg.style.backgroundColor = 'rgb(0,0,0,0.5)'
    }, 100)
}