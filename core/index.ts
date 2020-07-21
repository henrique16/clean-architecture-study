import { Patient } from "./domain/patient"
import { FA } from "./domain/fa"
import { FI } from "./domain/fi"
import { FT } from "./domain/ft"
import { getCalories } from "./builder/getCalories"
import { setFiles } from "./builder/setFiles"
import { deleteSavedMedia } from "./builder/deleteSavedMedia"
import _express from "express"
import _bodyParser from "body-parser"
import _config from "./config/index"

function init() {
    const port = _config.app.port
    const app = _express()
    app.use(_express.static(__dirname))
    app.use(_bodyParser.json())
    app.set("view engine", "ejs")
    app.set("views", `${__dirname}/client/views`)
    
    //#region HOME
    app.get("/", (req, res, next) => {
        res.status(200).sendfile(`${__dirname}/client/views/index.html`)
    })
    //#endregion
    
    //#region GET CALORIES
    app.get("/getCalories", (req, res, next) => {
        res.status(200).render(`getCalories/index.ejs`, {
            patient: new Patient(),
            fa: new FA(),
            fi: new FI(),
            ft: new FT()
        })
    })
    app.post("/getCalories", (req, res, next) => {
        const patient: Patient = req.body.patient
        const fa: FA = req.body.fa
        const fi: FI = req.body.fi
        const ft: FT = req.body.ft
        getCalories(patient, fa, fi, ft)
            .then(calories => res.status(200).send({ calories: calories }))
            .catch(error => res.status(500).send({ error: error }))
    })
    //#endregion
    
    //#region SET FILES
    app.get("/setFiles", (req, res, next) => {
        res.status(200).sendFile(`${__dirname}/client/views/setFiles/index.html`)
    })
    
    app.post("/setFiles", async (req, res, next) => {
        const dirPath: string = req.body.dirPath
        setFiles(dirPath)
            .then(() => res.status(200).send({ msg: "succeflly upload" }))
            .catch(error => { 
                console.error(error)
                res.status(500).send({ error: "error" })
            })
    })
    //#endregion
    
    //#region DELETE SAVED MEDIA
    app.get("/deleteSavedMedia", (req, res, next) => {
        res.status(200).sendfile(`${__dirname}/client/views/deleteSavedMedia/index.html`)
    })
    
    app.delete("/deleteSavedMedia", (req, res, next) => {
        const path: string = req.body.path
        deleteSavedMedia(path)
            .then(() => res.status(200).send({ msg: "sucefully delete" }))
            .catch(error => {
                console.log(error)
                res.status(500).send({ error: "error" })
            })
    })
    //#endregion
    
    app.listen(port, () => console.log(port))
}

init()