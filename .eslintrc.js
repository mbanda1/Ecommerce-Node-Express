module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "standard",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-fallthrough": 2,
        "no-unreachable": 2,
        "no-cond-assign": 2,
        "no-console": 2,
        "valid-typeof": 2,
        "no-func-assign": 2,
        "no-extra-semi": 2, //cool
       
        "no-undef": 2,
        "no-empty": 2,
        "no-case-declarations": 0,
        "no-mixed-spaces-and-tabs": 0,
        "no-useless-escape": 2,

        "no-empty-function":1,
        "no-redeclare":2,
        "no-unused-vars":1,
        "prefer-promise-reject-errors":0,
        "no-constant-condition":0,
        "no-unused-expressions":0,
        
    }
};