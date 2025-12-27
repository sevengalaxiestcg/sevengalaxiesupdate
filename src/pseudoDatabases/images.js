const images = require.context('../images/cards', true);
var imageList = [];

export const cardsThumbs = () => {
    if (!imageList || !imageList.length) {
        const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

        const keys = images.keys();
        keys.forEach(image => {
            const keyArr = image.replace("./","").replace(".png","").split("-");
            const isBSide = keyArr.includes("B") && keyArr[keyArr.length - 1] == "B";
            var key = isBSide ? `${keyArr[keyArr.length - 2]}-${keyArr[keyArr.length - 1]}` : keyArr[keyArr.length - 1];
            key = key.replace("cod","");
            const isEvolution = keyArr.includes("Ev");
            imageList.push({
                key: key,
                image: images(image),
                isEvolution: isEvolution
            });
        });
        imageList = imageList.sort((a, b) => {
            const strList = [a.key, b.key].sort(collator.compare);
            if (strList[0] === a.key) return -1;
            return 1
        });
    }
    return imageList;
};