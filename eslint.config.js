import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,

    // TypeScript recommended config
    ...tseslint.configs.recommended.map((cfg) => ({
        ...cfg,
        rules: {
            ...cfg.rules,
            '@typescript-eslint/no-unused-vars': 'error',
            'no-unused-vars': 'off',
        },
    })),

    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
            },
        },
    },
];
