import AWS from 'aws-sdk';

/**
 * Digital Ocean Spaces Connection
 */

const spacesEndpoint = new AWS.Endpoint('https://annat.fra1.digitaloceanspaces.com/');
export default new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: '4EMRIRE5HSMPLFLSJC35',
    secretAccessKey: 'RTP65p9iBKLg9UnGEGEVGDrses2Z/4BCb9a7H2osc9c'
});