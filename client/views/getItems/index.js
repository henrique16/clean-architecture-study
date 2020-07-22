const _data = { item: null, quantity: null }
const _debug = true
var _items = null
var _pageIndex = null

function setQuantity(event) {
    const element = event.target
    const quantity = parseInt(element.value)
    if (!quantity) element.value = ""
    _data.quantity = quantity
    _debug && console.log(_data)
    exec()
}

function setItem(event) {
    const element = event.target
    const selected = element.options[element.selectedIndex]
    const item = selected.id
    if (item === "") _data.item = null
    else _data.item = item
    _debug && console.log(_data)
    exec()
}

async function exec() {
    if (checkData()) {
        getItems()
            .then(items => {
                _items = items
                renderItems(0)
            })
    }
    removeWarning()
}

function checkData() {
    var response = true
    for (let key in _data) {
        const value = _data[key]
        if (!value) {
            const element = document.getElementById(key)
            if (element) element.style.border = "solid 1px red"
            response = false
        }
    }
    return response
}

function removeWarning() {
    for (let key in _data) {
        const value = _data[key]
        if (value) {
            const element = document.getElementById(key)
            element.style.removeProperty("border")
        }
    }
}

async function getItems() {
    try {
        const item = { name: _data.item }
        const url = `/getItems/${JSON.stringify(item)}/${_data.quantity}`
        const response = await fetch(url, { method: "GET" })
        const json = await response.json()
        if (response.status !== 200) throw `${json.error}`
        return Promise.resolve(json.items)
    }
    catch (error) {
        return Promise.reject(error)
    }
}

function renderItems(pageIndex) {
    const items = _items[pageIndex]
    if (!items) return
    _pageIndex = pageIndex
    const contentElement = document.getElementById("content")
    var html = `<div id="page${pageIndex}">`
    for (let item of items) {
        html += `<div>${item.name}</div>`
    }
    html += (
        `   <input type="submit" value="previous" onclick="previous()">
            <input type="submit" value="next" onclick="next()">
        </div>`
    )
    removeElement(document.getElementById(`page${pageIndex}`))
    contentElement.innerHTML = html
}

function removeElement(element) {
    if (element) element.remove()
}

function previous() {
    const pageIndex = _pageIndex - 1
    renderItems(pageIndex)
}

function next() {
    const pageIndex = _pageIndex + 1
    renderItems(pageIndex)
}