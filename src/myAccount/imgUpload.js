import AWS from 'aws-sdk';
const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
const bucketName = 'annat';
const digitalOceanSpaces = 'https://annat.fra1.digitaloceanspaces.com/';
const s3 = new AWS.S3({
	endpoint: spacesEndpoint,
	accessKeyId: '4EMRIRE5HSMPLFLSJC35',
	secretAccessKey: 'RTP65p9iBKLg9UnGEGEVGDrses2Z/4BCb9a7H2osc9c',
});

export default (file, callback) => {
	if (file) {
		const blob = file;
		const params = {
			Body: blob,
			Bucket: `${bucketName}`,
			Key: blob.name
		};
		// Sending the file to the Spaces
		s3.putObject(params)
			.on('build', request => {
				request.httpRequest.headers.Host = `${digitalOceanSpaces}`;
				request.httpRequest.headers['Content-Length'] = blob.size;
				request.httpRequest.headers['Content-Type'] = blob.type;
				request.httpRequest.headers['x-amz-acl'] = 'public-read';
				// request.httpRequest.headers['Access-Control-Allow-Origin'] = '*';
				// request.httpRequest.headers["Access-Control-Request-Method"] = "GET,PUT,POST,HEAD,DELETE";
			})
			.send((err) => {
				if (err) console.log(err);
				else {
					// If there is no error updating the editor with the imageUrl
					const imageUrl = `${digitalOceanSpaces}` + blob.name
					callback(imageUrl, blob.name)
				}
			});
	}
};