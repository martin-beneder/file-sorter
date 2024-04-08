function subscriptionmodel(id: number) {
    if (id === 1) {
        return { maxfiles: 5, };
    }
    if (id === 2) {
        return { maxfiles: 15, };
    }
    if (id === 3) {
        return { maxfiles: 50, };
    }

    return { maxfiles: 0, };

}


export { subscriptionmodel };