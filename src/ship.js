const Ship = (length) => {
    let hitCount = 0;

    const hit = () => {
        hitCount++;
    }

    const isSunk = () => {
        return (length==hitCount);
    }

    return {
        hit,
        isSunk
    }
};

module.exports = Ship;