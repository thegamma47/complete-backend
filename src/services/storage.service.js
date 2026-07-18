async function uploadFile(buffer) {
    console.log('Starting upload, buffer size:', buffer.length);

    const formData = new FormData();
    const blob = new Blob([buffer]);
    formData.append('file', blob, 'image.jpg');
    formData.append('fileName', 'image.jpg');

    const auth = Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString('base64');

    const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`
        },
        body: formData
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log('Upload succeeded:', result.url);
    return result;
}

module.exports = { uploadFile };






// const ImageKit = require('@imagekit/nodejs').default;

// const client = new ImageKit({
//   privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
// });

// async function uploadFile(buffer) {
//     console.log('Starting upload, buffer size:', buffer.length);
//     try {
//         const result = await Promise.race([
//             client.files.upload({
//                 file: buffer,
//                 fileName: 'image.jpg',
//             }),
//             new Promise((_, reject) => setTimeout(() => reject(new Error('Upload timed out after 15s')), 15000))
//         ]);
//         console.log('Upload succeeded');
//         return result;
//     } catch (err) {
//         console.error('Upload error:', err.message);
//         throw err;
//     }
// }

// module.exports = { uploadFile };
















// const ImageKit = require('@imagekit/nodejs').default;

// const client = new ImageKit({
//   privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted
// });

// async function uploadFile(buffer) {
//     console.log('Starting upload, buffer size:', buffer.length);
//     try {
//         const result = await client.files.upload({
//             file: buffer,
//             fileName: 'image.jpg',
//         });
//         console.log('Upload succeeded');
//         return result;
//     } catch (err) {
//         console.error('Upload error:', err);
//         throw err;
//     }
// }

// module.exports = {uploadFile};