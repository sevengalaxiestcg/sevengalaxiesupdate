const images = require.context('../images/cards', true);
const imageList = [];

export const cardsThumbs = () => {
    images.keys().forEach(image => {
        var keyArr = image.replace("./","").split("-");
        var key = keyArr[0] + " - " + keyArr[1];
        imageList.push({
            key: key,
            image: images(image)
        });
    });
    return imageList;
};