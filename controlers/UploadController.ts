import express from "express";
import cloudinary from "../core/cloudinary";
import UploadFileModel, { IUploadFile, IUploadFileDocument } from "../models/UploadFile";

class UploadController {
  create = (req: express.Request, res: express.Response): void => {
    const file: any = req.file;

    cloudinary.v2.uploader
      .upload_stream(
        { resource_type: "auto" },
        (
          error: cloudinary.UploadApiErrorResponse | undefined,
          result: cloudinary.UploadApiResponse | undefined
        ) => {
          if (error || !result) {
            return res.status(500).json({
              status: "error",
              message: error || "upload error",
            });
          }

          const fileData: Pick<
            cloudinary.UploadApiResponse,
            "filename" | "size" | "ext" | "url" 
          > = {
            filename: result.original_filename,
            size: result.bytes,
            ext: result.format,
            url: result.url,
          };

          const uploadFile: IUploadFileDocument = new UploadFileModel(fileData);

          uploadFile
            .save()
            .then((fileObj: IUploadFile) => {
              res.json({
                status: "success",
                file: fileObj,
              });
            })
            .catch((err: any) => {
              res.json({
                status: "error",
                message: err,
              });
            });
        }
      )
      .end(file.buffer);
  };

  delete = (req: express.Request, res: express.Response): void => {
    const fileId: string = req.user;
    UploadFileModel.deleteOne({ _id: fileId }, function (err: any) {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err,
        });
      }
      res.json({
        status: "success",
      });
    });
  };
}

export default UploadController;
