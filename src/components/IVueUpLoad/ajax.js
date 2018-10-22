// https://github.com/ElemeFE/element/blob/dev/packages/upload/src/ajax.js

function getError (uploadUrl, option, xhr) {
      const msg = `fail to post ${uploadUrl} ${xhr.status}`;

      const error = new Error(msg);
      error.status = xhr.status;
      error.methods = 'post';
      error.url = uploadUrl;
      return error;
}

function getBody (xhr) {
      const text = xhr.responseText || xhr.response;

      if (!text) {
            return text;
      }

      try {
            return JSON.parse(text);
      }
      catch (e) {
            return text;
      }
}


export default function upload (option) {
      if (typeof XMLHttpRequest === 'undefined') {
            return;
      }

      const xhr = new XMLHttpRequest();
      const uploadUrl = option.uploadUrl;

      if (xhr.upload) {
            // 数据传输进行中
            xhr.upload.onprogress = function progress (e) {
                  if (e.total > 0) {
                        // 操作处理的当前字节数 / 操作将处理的总字节数 * 100
                        e.percent = e.loaded / e.total * 100;
                  }
                  option.onProgress(e);
            }
      }

      const formData = new FormData();

      // 是否有上传时附带的额外参数
      if (option.data) {
            Object.keys(option.data).map((key) => {
                  formData.append(key, option.data[key]);
            })
      }

      formData.append(option.filename, option.file);

      // 处理操作时发生错误时调用的回调处理程序
      xhr.onerror = function error (e) {
            option.onError(e);
      }

      // 上传成功完成
      xhr.onload = function onload () {
            if (xhr.status < 200 || xhr.status >= 300) {
                  return option.onError(getError(uploadUrl, option, xhr), getBody(xhr));
            }
            option.onSuccess(getBody(xhr));
      }

      xhr.open('post', uploadUrl, true);

      // 是否支持cookie
      if (option.withCredentials && 'withCredentials' in xhr) {
            xhr.withCredentials = true;
      }

      // 设置请求头
      const headers = option.headers || {};
      for (let item in headers) {
            if (headers.hasOwnProperty(item) && headers[item] !== null) {
                  xhr.setRequestHeader(item, headers[item]);
            }
      }

      xhr.send(formData);
}