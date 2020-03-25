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