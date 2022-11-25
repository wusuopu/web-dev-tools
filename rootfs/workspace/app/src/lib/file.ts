import _ from "lodash";
import { saveAs } from 'file-saver';

type IReadType = 'text' | 'dataURL' | 'bin' | 'buffer'

export default {
  read (file, type: IReadType = 'buffer') {
    const reader = new FileReader()
    return new Promise((resolve) => {
      reader.onload = function(evt) {
        resolve(evt?.target?.result)
      };
      switch (type) {
        case 'bin':
          reader.readAsBinaryString(file)
          break;
        case 'text':
          reader.readAsText(file)
          break;
        case 'dataURL':
          reader.readAsDataURL(file)
          break;
        default:
          reader.readAsArrayBuffer(file)
          break;
      }
    })
  },
  save (data, filename: string, type = 'text/plain;charset=utf-8') {
    filename = filename.replace(/\//g, '-')   // 文件名中不能饮食斜线
    if (data instanceof Blob) {
      // blob
      saveAs(data, filename)
    } else if (_.isString(data)) {
      let file = new File([data], filename, { type })
      saveAs(file)
    } else {
      // ArrayBuffer
      let blob = new Blob([data], { type })
      saveAs(blob, filename)
    }
  },
}
