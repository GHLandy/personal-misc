interface UploadChunkOptions {
  chunkSize?: number; // 分块大小(bytes)，默认 5MB
  concurrentChunks?: number; // 并发上传的分块数量，默认 5
  // 三个接口的请求函数
  initTask: () => Promise<InitTaskResponse>;
  uploadChunk: (params: UploadChunkParams) => Promise<unknown>;
  mergeChunks: (params: MergeChunksParams) => Promise<unknown>;
}

interface UploadChunkParams {
  taskId: string;
  chunk: Blob;
  chunkIndex: number;
}

interface MergeChunksParams {
  taskId: string;
  totalChunks: number;
}

// 接口返回类型根据实际后端接口定义
interface InitTaskResponse {
  taskId: string;
}

interface UploadOptions {
  initTaskParams?: unknown;
  onProgress?: (progress: number) => void;
}

/**
 * 文件分块上传类
 */
export class ChunkUploader {
  private static DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  private static DEFAULT_CONCURRENT_CHUNKS = 5; // 默认并发数

  private readonly chunkSize: number;
  private readonly concurrentChunks: number;
  private readonly initTask: (params: unknown) => Promise<InitTaskResponse>;
  private readonly uploadChunk: (params: UploadChunkParams) => Promise<unknown>;
  private readonly mergeChunks: (params: MergeChunksParams) => Promise<unknown>;

  constructor(options: UploadChunkOptions) {
    this.chunkSize = options.chunkSize || ChunkUploader.DEFAULT_CHUNK_SIZE;
    this.concurrentChunks = options.concurrentChunks || ChunkUploader.DEFAULT_CONCURRENT_CHUNKS;
    this.initTask = options.initTask;
    this.uploadChunk = options.uploadChunk;
    this.mergeChunks = options.mergeChunks;
  }

  /**
   * 开始上传文件
   * @param file 要上传的文件
   * @param options 上传分片前 initTask 需要的参数
   * @param options.initTaskParams 上传分片前 initTask 需要的参数
   * @param options.onProgress 上传分片进度回调
   * @returns 上传成功后的文件 URL
   */
  public async upload(file: File, options?: UploadOptions): Promise<unknown> {
    // 1. 先创建分片
    const chunks = this.createChunks(file);

    // 2. 初始化上传任务
    const initResponse = await this.initTask(options?.initTaskParams ?? {});
    const taskId = initResponse.taskId;

    let uploadedChunks = 0;

    function updateProgress(progress: number) {
      if (options?.onProgress) {
        options.onProgress(Number((progress * 100).toFixed(2)));
      }
    }

    // 3. 分组上传所有分块
    for (let i = 0; i < chunks.length; i += this.concurrentChunks) {
      const chunkGroup = chunks.slice(i, i + this.concurrentChunks);
      const groupPromises = chunkGroup.map(async (chunk, groupIndex) => {
        const chunkIndex = i + groupIndex;
        await this.uploadChunk({ taskId, chunk, chunkIndex });
        console.log(`Chunk ${chunkIndex} success`, chunk);
        uploadedChunks++;
        const rate = uploadedChunks !== chunks.length ? uploadedChunks / chunks.length : 0.9999;
        updateProgress(rate);
      });

      await Promise.all(groupPromises);
    }

    // 4. 合并分块
    const mergeResponse = await this.mergeChunks({
      taskId,
      totalChunks: chunks.length,
    });

    updateProgress(1);
    return mergeResponse;
  }

  /**
   * 将文件分割成块
   */
  private createChunks(file: File): Blob[] {
    const chunks: Blob[] = [];
    let start = 0;

    while (start < file.size) {
      const end = Math.min(start + this.chunkSize, file.size);
      const chunk = file.slice(start, end);
      chunks.push(chunk);
      start = end;
    }

    return chunks;
  }
}
