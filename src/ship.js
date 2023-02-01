const Ship = (type, length) => {
    let hitCount = 0;

    const hit = () => {
        hitCount++;
    }

    const isSunk = () => {
        return (length==hitCount);
    }

    return {
        get hitCount() {
            return hitCount;
        },
        get type() {
            return type;
        },
        get length() {
            return length;
        },
        hit,
        isSunk
    }
};

module.exports = Ship;