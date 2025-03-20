module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['features/step_definitions/*.ts', 'features/support/*.ts'],
        format: ['progress-bar', 'html:cucumber-report.html'],
        formatOptions: { snippetInterface: 'async-await' },
        language: 'de',
        timeout: 60000  // Increase timeout to 60 seconds
    }
}; 