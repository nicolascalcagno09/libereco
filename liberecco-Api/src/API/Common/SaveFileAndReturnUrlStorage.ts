const fs = require('fs')
const path = require("path");
const mime = require('mime');

export async function saveFileAndReturnUrlStorage(file, entity,title) {
    const tempPath = file.path;
    const extension = mime.getExtension(file.type);        // ⇨ 'txt'
    const path2 = path.file;

    let entityName = entity.constructor.name.replace(/^\w/, c => c.toLowerCase());;
    let fileName = entityName + entity.getId()+"_"+title + "." + extension;

    const targetPath = process.env.PWD + "/lib_uploads/" + fileName;
    if (!fs.existsSync(process.env.PWD + "/lib_uploads/")) {
        fs.mkdirSync(process.env.PWD + "/lib_uploads/");
    }
    await fs.copyFileSync(tempPath, targetPath);

    let saveUrl = process.env.IMAGE_URL + "/uploads/" + fileName;
    return saveUrl;
}

export default saveFileAndReturnUrlStorage;