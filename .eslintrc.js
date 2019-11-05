module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "impliedStrict": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "notice",
        "@typescript-eslint"
    ],
    "rules": {
        "indent": "off", // note you must disable the base rule as it can report incorrect errors,
        "space-before-function-paren": ["error", "never"],
        "no-multi-spaces": "error",
        "no-trailing-spaces": "error",
        "keyword-spacing": "error",
        "space-before-blocks": "error",
        "notice/notice": [
            "error",
            {
                "mustMatch": "/*\n*  Copyright © 2016, Connected Travel, LLC – All Rights Reserved.",
                "template": "/*\n*  Copyright © 2016, Connected Travel, LLC – All Rights Reserved.\n*\n*  All information contained herein is property of Connected Travel, LLC including, but\n*  not limited to, technical and intellectual concepts which may be embodied within.\n*\n*  Dissemination or reproduction of this material is strictly forbidden unless prior written\n*  permission, via license, is obtained from Connected Travel, LLC. If permission is obtained,\n*  this notice, and any other such legal notices, must remain unaltered.\n*\n*/\n\n"
            }
        ],
        "@typescript-eslint/adjacent-overload-signatures": 2, // Require that member overloads be consecutive (adjacent-overload-signatures from TSLint)
        "@typescript-eslint/array-type": ["error", "array"], // Requires using either T[] or Array<T> for arrays (array-type from TSLint)
        "@typescript-eslint/await-thenable": true, // Disallow awaiting a value that is not a Promise (await-promise from TSLint)
        "@typescript-eslint/ban-types": 2, // Enforces that types will not to be used (ban-types from TSLint)
        "@typescript-eslint/ban-ts-ignore": 1, // Bans “// @ts-ignore” comments from being used (ban-ts-ignore from TSLint)
        //"@typescript-eslint/camelcase": 2, // Enforce camelCase naming convention
        "@typescript-eslint/class-name-casing": 2, // Require PascalCased class and interface names (class-name from TSLint)
        "@typescript-eslint/explicit-function-return-type": 2, // Require explicit return types on functions and class methods
        //"@typescript-eslint/explicit-member-accessibility": 2, // Require explicit accessibility modifiers on class properties and methods (member-access from TSLint)
        //"@typescript-eslint/generic-type-naming": 2, // Enforces naming of generic type variables
        "@typescript-eslint/indent": ["error", 4], // Enforce consistent indentation (indent from TSLint)
        //"@typescript-eslint/interface-name-prefix": 2, // Require that interface names be prefixed with I (interface-name from TSLint)
        "@typescript-eslint/member-delimiter-style": 2, // Require a specific member delimiter style for interfaces and type literals
        //"@typescript-eslint/member-naming": 2, // Enforces naming conventions for class members by visibility.
        //"@typescript-eslint/member-ordering": 2, // Require a consistent member declaration order (member-ordering from TSLint)
        //"@typescript-eslint/no-angle-bracket-type-assertion": 2, // Enforces the use of as Type assertions instead of <Type> assertions (no-angle-bracket-type-assertion from TSLint)
        "@typescript-eslint/no-array-constructor": 2, // Disallow generic Array constructors
        //"@typescript-eslint/no-empty-interface": 2, // Disallow the declaration of empty interfaces (no-empty-interface from TSLint)
        "@typescript-eslint/no-explicit-any": 1, // Disallow usage of the any type (no-any from TSLint)
        //"@typescript-eslint/no-extraneous-class": 2, // Forbids the use of classes as namespaces (no-unnecessary-class from TSLint)
        "@typescript-eslint/no-for-in-array": 2, // Disallow iterating over an array with a for-in loop (no-for-in-array from TSLint)
        //"@typescript-eslint/no-inferrable-types": 2, // Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean. (no-inferrable-types from TSLint)
        "@typescript-eslint/no-misused-new": 2, // Enforce valid definition of new and constructor. (no-misused-new from TSLint)
        "@typescript-eslint/no-namespace": 2, // Disallow the use of custom TypeScript modules and namespaces (no-namespace from TSLint)
        //"@typescript-eslint/no-non-null-assertion": 2, // Disallows non-null assertions using the ! postfix operator (no-non-null-assertion from TSLint)
        "@typescript-eslint/no-object-literal-type-assertion": 2, // Forbids an object literal to appear in a type assertion expression (no-object-literal-type-assertion from TSLint)
        //"@typescript-eslint/no-parameter-properties": 2, // Disallow the use of parameter properties in class constructors. (no-parameter-properties from TSLint)
        "@typescript-eslint/no-require-imports": 2, // Disallows invocation of require() (no-require-imports from TSLint)
        "@typescript-eslint/no-this-alias": 1, // Disallow aliasing this (no-this-assignment from TSLint)
        "@typescript-eslint/no-triple-slash-reference": 2, // Disallow /// <reference path="" /> comments (no-reference from TSLint)
        //"@typescript-eslint/no-type-alias": 2, // Disallow the use of type aliases (interface-over-type-literal from TSLint)
        "@typescript-eslint/no-unnecessary-qualifier": 2, // Warns when a namespace qualifier is unnecessary (no-unnecessary-qualifier from TSLint)
        "@typescript-eslint/no-unnecessary-type-assertion": 2, // Warns if a type assertion does not change the type of an expression (no-unnecessary-type-assertion from TSLint)
        "@typescript-eslint/no-unused-vars": 2, // Disallow unused variables (no-unused-variable from TSLint)
        "@typescript-eslint/no-use-before-define": ["error", { "functions": false, "classes": false, "typedefs": false }], // Disallow the use of variables before they are defined
        "@typescript-eslint/no-useless-constructor": 2, // Disallow unnecessary constructors
        "@typescript-eslint/no-var-requires": 2, // Disallows the use of require statements except in import statements (no-var-requires from TSLint)
        "@typescript-eslint/prefer-for-of": true, // Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used to access the array being iterated.
        //"@typescript-eslint/prefer-function-type": 2, // Use function types instead of interfaces with call signatures (callable-types from TSLint)
        "@typescript-eslint/prefer-interface": 2, // Prefer an interface declaration over a type literal (type T = { ... }) (interface-over-type-literal from TSLint)
        "@typescript-eslint/prefer-namespace-keyword": 2, // Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules. (no-internal-module from TSLint)
        "@typescript-eslint/promise-function-async": 2, // Requires any function or method that returns a Promise to be marked async. (promise-function-async from TSLint)
        "@typescript-eslint/restrict-plus-operands": 2, // When adding two variables, operands must both be of type number or of type string. (restrict-plus-operands from TSLint)
        "@typescript-eslint/type-annotation-spacing": 2, // Require consistent spacing around type annotations (typedef-whitespace from TSLint)
        "@typescript-eslint/unbound-method": true, // Enforces unbound methods are called with their expected scope. (no-unbound-method from TSLint)
        "@typescript-eslint/unified-signatures": 2, // Warns for any two overloads that could be unified into one. (unified-signatures from TSLint)
    }
};
