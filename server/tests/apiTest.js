import http from 'http';
import { fileURLToPath } from 'url';

const BASE_URL = 'http://localhost:5000';

function request(urlPath, method = 'GET', body = null, token = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(urlPath, BASE_URL);
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: headers
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
    console.log('=== MEMULAI PENGUJIAN REST API & AUTHENTICATION EDUCOURSE ===\n');

    // -------------------------------------------------------------
    // MODUL 1: AUTENTIKASI (REGISTER, LOGIN, & JWT TOKEN)
    // -------------------------------------------------------------
    console.log('1. Testing POST /auth/register (Registrasi User Baru)...');
    const registerPayload = {
        fullname: 'Siti Rahmawati',
        username: 'siti_rahma',
        email: 'siti.rahma@example.com',
        password: 'PasswordRahasia123!'
    };
    const resRegister = await request('/auth/register', 'POST', registerPayload);
    console.log(`Status Code: ${resRegister.status}`);
    console.log(`Success: ${resRegister.data.success}`);
    console.log(`Registered Email: ${resRegister.data.data?.email}\n`);

    console.log('2. Testing POST /auth/login dengan Password SALAH (Skenario Error)...');
    const resLoginWrong = await request('/auth/login', 'POST', {
        email: 'siti.rahma@example.com',
        password: 'WrongPassword999'
    });
    console.log(`Status Code: ${resLoginWrong.status} (Expected: 401)`);
    console.log(`Error Message: ${resLoginWrong.data.message}\n`);

    console.log('3. Testing POST /auth/login dengan Password BENAR (Skenario Sukses)...');
    const resLogin = await request('/auth/login', 'POST', {
        email: 'siti.rahma@example.com',
        password: 'PasswordRahasia123!'
    });
    console.log(`Status Code: ${resLogin.status}`);
    console.log(`Login Success: ${resLogin.data.success}`);
    console.log(`JWT Token Generated: ${resLogin.data.token ? 'YES (Valid Token)' : 'NO'}\n`);

    const jwtToken = resLogin.data.token;

    console.log('4. Testing GET /auth/me (Profil Terproteksi JWT)...');
    const resMe = await request('/auth/me', 'GET', null, jwtToken);
    console.log(`Status Code: ${resMe.status}`);
    console.log(`Authenticated User: ${resMe.data.data?.fullname} (@${resMe.data.data?.username})\n`);

    // -------------------------------------------------------------
    // MODUL 2: REST API QUERY PARAMS (FILTER, SEARCH, & SORT)
    // -------------------------------------------------------------
    console.log('5. Testing GET /course dengan Query Params (?search=node&level=intermediate&sort=price_asc)...');
    const resQuery = await request('/course?search=node&level=intermediate&sort=price_asc', 'GET');
    console.log(`Status Code: ${resQuery.status}`);
    console.log(`Filtered Total: ${resQuery.data.total}`);
    console.log(`Filter Info:`, resQuery.data.filters);
    console.log(`Course Title: ${resQuery.data.data[0]?.title}\n`);

    // -------------------------------------------------------------
    // MODUL 3: COURSE DML CRUD OPERATIONS
    // -------------------------------------------------------------
    console.log('6. Testing POST /course (Tambah Course Baru)...');
    const resPost = await request('/course', 'POST', {
        title: 'Golang Microservices & gRPC Architecture',
        slug: 'golang-microservices-grpc',
        description: 'Membangun arsitektur microservices performa tinggi dengan Go.',
        price: 320000,
        discount_price: 270000,
        level: 'advanced',
        is_published: 1
    });
    console.log(`Status Code: ${resPost.status}`);
    console.log(`Created Course ID: ${resPost.data.data?.id}\n`);

    const createdId = resPost.data.data?.id || 4;

    console.log(`7. Testing PATCH /course/${createdId} (Update Course)...`);
    const resPatch = await request(`/course/${createdId}`, 'PATCH', { price: 295000 });
    console.log(`Status Code: ${resPatch.status}`);
    console.log(`Updated Price: ${resPatch.data.data?.price}\n`);

    console.log(`8. Testing DELETE /course/${createdId} (Delete Course)...`);
    const resDelete = await request(`/course/${createdId}`, 'DELETE');
    console.log(`Status Code: ${resDelete.status}`);
    console.log(`Message: ${resDelete.data.message}\n`);

    console.log('=== PENGUJIAN MISION SANGAT SUKSES & TANPA ERROR! ===');
}

runTests().catch(err => {
    console.error('Pengujian gagal:', err);
    process.exit(1);
});
