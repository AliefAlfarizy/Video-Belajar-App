import http from 'http';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:5000';

function request(urlPath, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(urlPath, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data });
                }
            });
        });

        req.on('error', reject);

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runTests() {
    console.log('=== MEMULAI PENGUJIAN REST API EDUCOURSE ===\n');

    // 1. Test GET /course
    console.log('1. Testing GET /course ...');
    const resGet = await request('/course', 'GET');
    console.log(`Status: ${resGet.status}`);
    console.log(`Total items: ${resGet.data.total}`);
    console.log(`Success: ${resGet.data.success}\n`);

    // 2. Test GET /course/:id
    console.log('2. Testing GET /course/1 ...');
    const resGetOne = await request('/course/1', 'GET');
    console.log(`Status: ${resGetOne.status}`);
    console.log(`Title: ${resGetOne.data.data?.title}\n`);

    // 3. Test POST /course (INSERT DML)
    console.log('3. Testing POST /course (Tambah Course Baru) ...');
    const newCoursePayload = {
        title: 'Vue.js 3 & Vite Frontend Engineering',
        slug: 'vuejs-3-vite-frontend',
        description: 'Kuasai Vue.js 3 Composition API, Pinia, dan Vite.',
        price: 220000,
        discount_price: 180000,
        level: 'beginner',
        is_published: 1
    };
    const resPost = await request('/course', 'POST', newCoursePayload);
    console.log(`Status: ${resPost.status}`);
    console.log(`Created ID: ${resPost.data.data?.id}`);
    console.log(`Created Title: ${resPost.data.data?.title}\n`);

    const createdId = resPost.data.data?.id || 4;

    // 4. Test PATCH /course/:id (UPDATE DML)
    console.log(`4. Testing PATCH /course/${createdId} (Update Course) ...`);
    const updatePayload = {
        price: 195000,
        level: 'intermediate'
    };
    const resPatch = await request(`/course/${createdId}`, 'PATCH', updatePayload);
    console.log(`Status: ${resPatch.status}`);
    console.log(`Updated Level: ${resPatch.data.data?.level}`);
    console.log(`Updated Price: ${resPatch.data.data?.price}\n`);

    // 5. Test DELETE /course/:id (DELETE DML)
    console.log(`5. Testing DELETE /course/${createdId} (Hapus Course) ...`);
    const resDelete = await request(`/course/${createdId}`, 'DELETE');
    console.log(`Status: ${resDelete.status}`);
    console.log(`Message: ${resDelete.data.message}\n`);

    console.log('=== PENGUJIAN REST API SELESAI DENGAN SUKSES! ===');
}

runTests().catch(err => {
    console.error('Pengujian gagal dengan error:', err);
    process.exit(1);
});
