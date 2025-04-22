import { ChunkUploader } from '../ts';

// 模拟文件上传的后端接口
const mockApi = {
  // 初始化上传任务
  initTask: async () => {
    console.log('初始化上传任务:');
    return { taskId: 'task_' + Date.now() };
  },

  // 上传分块
  uploadChunk: async (params: { taskId: string; chunkIndex: number; chunk: Blob }) => {
    console.log(`上传分块 ${params.chunkIndex}, 大小: ${params.chunk.size} bytes`);
    // 模拟上传延迟
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { success: true };
  },

  // 合并分块
  mergeChunks: async (params: { taskId: string; totalChunks: number }) => {
    console.log('合并分块:', params);
    return { success: true, fileUrl: `https://example.com/files/${params.taskId}` };
  },
};

// 创建上传器实例
const uploader = new ChunkUploader({
  chunkSize: 1 * 1024 * 1024, // 1MB，方便测试
  concurrentChunks: 3, // 同时上传3个分块
  initTask: mockApi.initTask,
  uploadChunk: mockApi.uploadChunk,
  mergeChunks: mockApi.mergeChunks,
});

// 创建测试文件
const createTestFile = (sizeInMB: number, fileName: string = 'test.txt'): File => {
  const content = new Array(sizeInMB * 1024 * 1024).fill('A').join('');
  return new File([content], fileName, { type: 'text/plain' });
};

// 测试上传
async function testUpload() {
  try {
    // 创建一个 5MB 的测试文件
    const testFile = createTestFile(5, 'test.txt');
    console.log(`开始上传文件: ${testFile.name}, 大小: ${testFile.size} bytes`);

    const fileUrl = await uploader.upload(testFile, {
      onProgress: (progress) => {
        console.log(`文件1上传进度：${progress}%`);
      },
    });
    console.log('上传成功，文件地址：', fileUrl);

    // 测试连续上传多个文件
    const testFile2 = createTestFile(2, 'test2.txt');
    console.log(`开始上传第二个文件: ${testFile2.name}, 大小: ${testFile2.size} bytes`);

    const fileUrl2 = await uploader.upload(testFile2, {
      onProgress: (progress) => {
        console.log(`文件2上传进度：${progress}%`);
      },
    });
    console.log('第二个文件上传成功，文件地址：', fileUrl2);
  } catch (error) {
    console.error('上传失败：', error);
  }
}

// 运行测试
testUpload();
