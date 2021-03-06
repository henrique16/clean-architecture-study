import { Patient } from "./domain/patient"
import { FA } from "./domain/fa"
import { FI } from "./domain/fi"
import { FT } from "./domain/ft"
import { EnumGender } from "./domain/enumGender"
import { getCalories } from "./builder/getCalories"
import { setFiles } from "./builder/setFiles"
import { getItems } from "./builder/getItems"
import { Item } from "./domain/item"

// const patient: Patient = new Patient()
// const fa: FA = new FA()
// const fi: FI = new FI()
// const ft: FT = new FT()
// patient.weight.value = 80.90
// patient.height.value = 165
// patient.age.value = 23
// patient.gender.value = EnumGender.male
// fa.movingWandering.include = true
// getCalories(patient, fa, fi, ft)
//     .then(calories => console.log(`use case getCalories: ${calories}`))
//     .catch(error => console.log(error))

// const dirPath: string = "path"
// setFiles(dirPath)
//     .then(() => console.log("use case setFiles ok"))
//     .catch(error => console.log(error))

getItems(new Item("A"), 20)
    .then(items => console.log(items))
    .catch(error => console.log(error))