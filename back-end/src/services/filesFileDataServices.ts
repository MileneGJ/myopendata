import * as filesFileDataRepository from '../repositories/filesFileDataRepository'

export async function updateLinks(dataId: number, fileId: number) {
    const link = await verifyLinkExists(dataId)
    if (!link) {
        await filesFileDataRepository.createLink(dataId, fileId)
    }
}

async function verifyLinkExists(dataId: number) {
    return await filesFileDataRepository.findByDataId(dataId)
}

async function verifyLinkExistsByFile(fileId: number) {
    return await filesFileDataRepository.findByFileId(fileId)
}

async function verifyLinkExistsByUser(userId: number) {
    return await filesFileDataRepository.findByUserId(userId)
}

export async function deleteLinkFromData(dataId: number) {
    const foundData = await verifyLinkExists(dataId)
    if(foundData) {
    await filesFileDataRepository.deleteByDataId(dataId)
    }
}

export async function deleteLinkFromFile(fileId: number) {
    const foundData = await verifyLinkExistsByFile(fileId)
    if(foundData.length>0) {
    await filesFileDataRepository.deleteByFileId(fileId)
    }
}

export async function deleteLinkFromFileFromUser(userId: number) {
    const foundData = await verifyLinkExistsByUser(userId)
    if(foundData.length>0) {
    await filesFileDataRepository.deleteByFileByUser(userId)
}
}
