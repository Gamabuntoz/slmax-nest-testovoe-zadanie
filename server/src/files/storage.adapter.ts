import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3StorageAdapter {
  s3Client: S3Client;
  bucketName = process.env.S3_BUCKET_NAME;
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.S3_REGION,
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        secretAccessKey: process.env.S3_SECRET_KEY,
        accessKeyId: process.env.S3_KEY_ID,
      },
    });
  }

  async sendFile(userId: number, buffer: Buffer, fileType: string) {
    const extension = fileType.split('/')[1];
    const key = `content/users/${userId}/${Date.now()}.${extension}`;
    const bucketParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: fileType,
    };
    const command = new PutObjectCommand(bucketParams);
    try {
      const uploadResult: PutObjectCommandOutput = await this.s3Client.send(
        command,
      );
      return {
        url: `http://${this.bucketName}.storage.yandexcloud.net/${key}`,
      };
    } catch (exception) {
      console.error('exception', exception);
      throw exception;
    }
  }
}
