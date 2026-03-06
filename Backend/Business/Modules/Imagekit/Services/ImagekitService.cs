using System.Net;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

using Imagekit.Sdk;

using Imagekit.Models;

using Business.Interfaces;

using Business.Modules.Imagekit.Options;

using Business.Modules.Imagekit.Models;

namespace Business.Modules.Imagekit.Services;

public class ImagekitService(IOptions<ImagekitOption> option) : IService
{
    private readonly ImagekitClient imagekitClient = new(option.Value.PublicKey, option.Value.PrivateKey, option.Value.UrlEndPoint);

    public async Task<ImagekitModel?> UploadFileAsync(IFormFile file, string path)
    {
        try
        {
            using var memoryStream = new MemoryStream();

            await file.CopyToAsync(memoryStream);

            var fileBytes = memoryStream.ToArray();

            var newFile = await imagekitClient.UploadAsync(new FileCreateRequest
            {
                useUniqueFileName = true,
                folder = path,
                fileName = file.FileName,
                file = fileBytes
            });

            return new ImagekitModel
            {
                Id = newFile.fileId,
                Url = newFile.url
            };
        }
        catch
        {
            return null;
        }
    }

    public async Task<bool> DeleteFileAsync(string FileId) => (await imagekitClient.DeleteFileAsync(FileId)).HttpStatusCode == (int)HttpStatusCode.NoContent;
    public async Task<bool> DeleteFolderAsync(string folderPath) => (await imagekitClient.DeleteFolderAsync(new DeleteFolderRequest
    {
        folderPath = folderPath
    })).HttpStatusCode == (int)HttpStatusCode.NoContent;
}