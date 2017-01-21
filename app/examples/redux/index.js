const exampleMap = {
    ex1: require('./ex1').default,
    ex2: require('./ex2').default,
    ex3: require('./ex3').default,
};

const Examples = {
    run: function(name) {
        return exampleMap[name]();
    },
};

export default Examples;
