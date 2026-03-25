import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    // Ignore folders
    globalIgnores(['node_modules', 'dist', 'build', 'coverage']),

    {
        files: ['**/*.js'],

        extends: [
            js.configs.recommended,
            prettier, // keep ALWAYS at end
        ],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module', // change to 'commonjs' if not using ES modules
            globals: {
                ...globals.node, // Node.js globals (process, __dirname, etc.)
            },
        },

        plugins: {
            prettier: prettierPlugin,
        },

        rules: {
            /* ========================
         🔹 GENERAL BEST PRACTICES
      ======================== */
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': 'off', // allow console in backend
            'no-debugger': 'warn',

            /* ========================
         🔹 CODE QUALITY
      ======================== */
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
            'no-var': 'error',
            'prefer-const': 'error',

            /* ========================
         🔹 NODE / EXPRESS STYLE
      ======================== */
            'consistent-return': 'error',
            'no-process-exit': 'warn',

            /* ========================
         🔹 ASYNC / PROMISE
      ======================== */
            'no-async-promise-executor': 'error',
            'require-await': 'warn',

            /* ========================
         🔹 IMPORT STYLE
      ======================== */
            'no-duplicate-imports': 'error',

            /* ========================
         🔹 PRETTIER INTEGRATION
      ======================== */
            'prettier/prettier': 'error',
        },
    },
]);
