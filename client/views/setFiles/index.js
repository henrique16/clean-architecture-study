function setFilesClick() {
    const dirPathElement = document.getElementById("dirPath")
    const dirPath = dirPathElement.value
    setFiles(dirPath)
        .then(msg => alert(msg))
        .catch(() => alert("verifique se o caminho do diretório está correto"))
}

async function setFiles(dirPath) {
    try {
        const url = "/setFiles"
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dirPath: dirPath })
        })
        const json = await response.json()
        if (response.status !== 200) throw `${json.error}`
        return Promise.resolve(json.msg)
    }
    catch (error) {
        return Promise.reject(error)
    }
}