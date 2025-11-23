const { pool } = require('./db');
const fs = require('fs');

async function createTable() {
    try {
        const sql = fs.readFileSync('./create-table.sql', 'utf8');
        await pool.query(sql);
        console.log('✅ Table created successfully!');
        process.exit(0);
    } catch (error) {
        if (error.code === '42P07') {
            console.log('ℹ️  Table already exists');
            process.exit(0);
        }
        console.error('❌ Error creating table:', error);
        process.exit(1);
    }
}

createTable();
