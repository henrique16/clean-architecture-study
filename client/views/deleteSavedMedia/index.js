function deleteSavedMediaClick() {
    const pathElement = document.getElementById("dirPath")
    const path = pathElement.value
    deleteSavedMedia(path)
        .then(msg => alert(msg))
        .catch(() => alert("verifique se o caminho do diretório está correto"))
}

async function deleteSavedMedia(path) {
    try {
        const url = "/deleteSavedMedia"
        const response = await fetch(url, { 
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: path })
        })
        const json = await response.json()
        if (response.status !== 200) throw `${json.error}`
        return Promise.resolve(json.msg)
    }
    catch (error) {
        return Promise.reject(error)
    }
}