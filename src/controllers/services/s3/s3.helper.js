require('dotenv').config()
const fs = require('fs')
const AWSs3 = require('aws-sdk/clients/s3')

const s3 = new AWSs3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// uploads a file to s3 bucket
export function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}

// downloads a file from s3 by his name
export function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME
  }

  return s3.getObject(downloadParams).createReadStream()
}