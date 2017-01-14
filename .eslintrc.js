module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": ["warn"],
        "max-len": ["warn", 80, {"ignoreUrls": true}],
        "quote-props": ["error", "consistent-as-needed"],
        "space-before-function-paren": [
          "error", {
            "anonymous": "never",
            "named": "always",
            "asyncArrow": "ignore",
          },
        ],
        "prefer-const": ["warn"],
        "no-var": ["warn"],
        "no-unused-vars": [
          "warn",
          {
            "vars": "all",
            "args": "after-used",
          },
        ],
        "space-before-function-paren": [
          "error", {
            "anonymous": "never",
            "named": "always",
            "asyncArrow": "ignore",
          },
        ],
        "no-undef": ["warn"],
        "comma-dangle": ["error", "always-multiline"],
        "indent": [
          "error",
          4,
          {
            "MemberExpression": 1,
            "SwitchCase": 1,
          },
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
