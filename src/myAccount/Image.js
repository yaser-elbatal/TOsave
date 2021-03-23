import AWS from 'aws-sdk';
const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
const bucketName = 'annat';
const digitalOceanSpaces = 'https://annat.fra1.digitaloceanspaces.com/';
const s3 = new AWS.S3({
	endpoint: spacesEndpoint,
	accessKeyId: '4EMRIRE5HSMPLFLSJC35',
	secretAccessKey: 'RTP65p9iBKLg9UnGEGEVGDrses2Z/4BCb9a7H2osc9c',
});
function urlToBlob(url) {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.onerror = reject;
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				resolve(xhr.response);
			}
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob'; // convert type
		xhr.send();
	});
}
export async function uploadAvatar(arrayOfPaths, callback) {
	let array = arrayOfPaths;
	console.log('Array That Comming', arrayOfPaths);
	let urlArray = [];
	for (let i = 0; i <= array.length - 1; i++) {
		let arr = array[i].split('/');
		const last = arr[arr.length - 1];
		const blob = await urlToBlob(array[i]);
		const params = {
			Body: blob,
			Bucket: `${bucketName}`,
			Key: last,
		};
		s3.putObject(params)
			.on('build', request => {
				request.httpRequest.headers.Host = `${digitalOceanSpaces}`;
				request.httpRequest.headers['Content-Length'] = array[i].size;
				request.httpRequest.headers['Content-Type'] = array[i].type;
				request.httpRequest.headers['x-amz-acl'] = 'public-read';
			})
			.send(err => {
				if (err) console.log(err);
				else {
					// If there is no error updating the editor with the imageUrl
					const imageUrl = `${digitalOceanSpaces}` + last;
					console.log('imageURL', imageUrl);
					urlArray.push(imageUrl);
					if (array.length == urlArray.length) {
						console.log('Images Array In Upload Images', urlArray);
						callback(urlArray);
					}
				}
			});
	}
}