
import { odsAPIOpenRoutes, odsBase, localStoreKeys } from "../odsApi";
import axios from "axios";

export const uploadSingleImage = async (imageBinary) => {
    const token = localStorage.getItem(localStoreKeys.token);
    try {
        const routeUpload = odsAPIOpenRoutes.uploadSingleImage;

        let imgUrl = null;
        if (imageBinary) {
            let formData = new FormData();
            formData.append('image', imageBinary);
            const resImg = await axios.post(`${odsBase}${routeUpload}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': token,
                }
            });
            console.log(`update avatar img:`);
            console.log(resImg);
            imgUrl = resImg.data.data.url;
            return imgUrl;
        }
    } catch (error) {
        console.error(`Host update campaign image error: ${error}`);
        return false;
    }
}

export const validateImageFile = (file) => {
    if (!file) {
        return null;
    }
    let msg = {};
    const acceptedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 3.1 * 1048576; //3 MB
    
    //Validate image
    if (acceptedTypes.indexOf(file.type) < 0) {
        msg.image = 'Chỉ nhận file ảnh .png hoặc .jpeg';
    } else if (file.size > maxSize) {
        msg.image = 'Ảnh không quá 3 MB';
    }
    if (Object.keys(msg).length === 0) {
        msg = null;
    }
    return msg;
}