import { ElNotification } from 'element-plus'
import { read, utils, readFile } from 'xlsx'
import { WorkSheet, WorkBook } from 'xlsx'

export const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'AA',
  'AB',
  'AC',
  'AD',
  'AE',
  'AF',
  'AG',
  'AH',
  'AI',
  'AJ',
  'AK',
  'AL',
  'AN',
  'AM',
  'AO',
  'AP',
  'AQ',
  'AR',
  'AS',
  'AT',
  'AU',
  'AV',
  'AW',
  'AX',
  'AY',
  'AZ',
  'BA',
  'BB',
  'BC',
  'BD',
  'BE',
  'BF',
  'BG',
  'BH',
  'BI',
  'BJ',
  'BK',
  'BL',
  'BN',
  'BM',
  'BO',
  'BP',
  'BQ',
  'BR',
  'BS',
  'BT',
  'BU',
  'BV',
  'BW',
  'BX',
  'BY',
  'BZ',
  'CA',
  'CB',
  'CC',
  'CD',
  'CE',
  'CF',
  'CG',
  'CH',
  'CI',
  'CJ',
  'CK',
  'CL',
  'CN',
  'CM',
  'CO',
  'CP',
  'CQ',
  'CR',
  'CS',
  'CT',
  'CU',
  'CV',
  'CW',
  'CX',
  'CY',
  'CZ',
  'DA',
  'DB',
  'DC',
  'DD',
  'DE',
  'DF',
  'DG',
  'DH',
  'DI',
  'DJ',
  'DK',
  'DL',
  'DN',
  'DM',
  'DO',
  'DP',
  'DQ',
  'DR',
  'DS',
  'DT',
  'DU',
  'DV',
  'DW',
  'DX',
  'DY',
  'DZ',
  'EA',
  'EB',
  'EC',
  'ED',
  'EE',
  'EF',
  'EG',
  'EH',
  'EI',
  'EJ',
  'EK',
  'EL',
  'EN',
  'EM',
  'EO',
  'EP',
  'EQ',
  'ER',
  'ES',
  'ET',
  'EU',
  'EV',
  'EW',
  'EX',
  'EY',
  'EZ',
  'FA',
  'FB',
  'FC',
  'FD',
  'FE',
  'FF',
  'FG',
  'FH',
  'FI',
  'FJ',
  'FK',
  'FL',
  'FN',
  'FM',
  'FO',
  'FP',
  'FQ',
  'FR',
  'FS',
  'FT',
  'FU',
  'FV',
  'FW',
  'FX',
  'FY',
  'FZ',
  'GA',
  'GB',
  'GC',
  'GD',
  'GE',
  'GF',
  'GG',
  'GH',
  'GI',
  'GJ',
  'GK',
  'GL',
  'GN',
  'GM',
  'GO',
  'GP',
  'GQ',
  'GR',
  'GS',
  'GT',
  'GU',
  'GV',
  'GW',
  'GX',
  'GY',
  'GZ',
  'HA',
  'HB',
  'HC',
  'HD',
  'HE',
  'HF',
  'HG',
  'HH',
  'HI',
  'HJ',
  'HK',
  'HL',
  'HN',
  'HM',
  'HO',
  'HP',
  'HQ',
  'HR',
  'HS',
  'HT',
  'HU',
  'HV',
  'HW',
  'HX',
  'HY',
  'HZ',
  'IA',
  'IB',
  'IC',
  'ID',
  'IE',
  'IF',
  'IG',
  'IH',
  'II',
  'IJ',
  'IK',
  'IL',
  'IN',
  'IM',
  'IO',
  'IP',
  'IQ',
  'IR',
  'IS',
  'IT',
  'IU',
  'IV',
  'IW',
  'IX',
  'IY',
  'IZ',
  'JA',
  'JB',
  'JC',
  'JD',
  'JE',
  'JF',
  'JG',
  'JH',
  'JI',
  'JJ',
  'JK',
  'JL',
  'JN',
  'JM',
  'JO',
  'JP',
  'JQ',
  'JR',
  'JS',
  'JT',
  'JU',
  'JV',
  'JW',
  'JX',
  'JY',
  'JZ',
  'KA',
  'KB',
  'KC',
  'KD',
  'KE',
  'KF',
  'KG',
  'KH',
  'KI',
  'KJ',
  'KK',
  'KL',
  'KN',
  'KM',
  'KO',
  'KP',
  'KQ',
  'KR',
  'KS',
  'KT',
  'KU',
  'KV',
  'KW',
  'KX',
  'KY',
  'KZ',
  'LA',
  'LB',
  'LC',
  'LD',
  'LE',
  'LF',
  'LG',
  'LH',
  'LI',
  'LJ',
  'LK',
  'LL',
  'LN',
  'LM',
  'LO',
  'LP',
  'LQ',
  'LR',
  'LS',
  'LT',
  'LU',
  'LV',
  'LW',
  'LX',
  'LY',
  'LZ',
  'NA',
  'NB',
  'NC',
  'ND',
  'NE',
  'NF',
  'NG',
  'NH',
  'NI',
  'NJ',
  'NK',
  'NL',
  'NN',
  'NM',
  'NO',
  'NP',
  'NQ',
  'NR',
  'NS',
  'NT',
  'NU',
  'NV',
  'NW',
  'NX',
  'NY',
  'NZ',
  'MA',
  'MB',
  'MC',
  'MD',
  'ME',
  'MF',
  'MG',
  'MH',
  'MI',
  'MJ',
  'MK',
  'ML',
  'MN',
  'MM',
  'MO',
  'MP',
  'MQ',
  'MR',
  'MS',
  'MT',
  'MU',
  'MV',
  'MW',
  'MX',
  'MY',
  'MZ',
  'OA',
  'OB',
  'OC',
  'OD',
  'OE',
  'OF',
  'OG',
  'OH',
  'OI',
  'OJ',
  'OK',
  'OL',
  'ON',
  'OM',
  'OO',
  'OP',
  'OQ',
  'OR',
  'OS',
  'OT',
  'OU',
  'OV',
  'OW',
  'OX',
  'OY',
  'OZ',
  'PA',
  'PB',
  'PC',
  'PD',
  'PE',
  'PF',
  'PG',
  'PH',
  'PI',
  'PJ',
  'PK',
  'PL',
  'PN',
  'PM',
  'PO',
  'PP',
  'PQ',
  'PR',
  'PS',
  'PT',
  'PU',
  'PV',
  'PW',
  'PX',
  'PY',
  'PZ',
  'QA',
  'QB',
  'QC',
  'QD',
  'QE',
  'QF',
  'QG',
  'QH',
  'QI',
  'QJ',
  'QK',
  'QL',
  'QN',
  'QM',
  'QO',
  'QP',
  'QQ',
  'QR',
  'QS',
  'QT',
  'QU',
  'QV',
  'QW',
  'QX',
  'QY',
  'QZ',
  'RA',
  'RB',
  'RC',
  'RD',
  'RE',
  'RF',
  'RG',
  'RH',
  'RI',
  'RJ',
  'RK',
  'RL',
  'RN',
  'RM',
  'RO',
  'RP',
  'RQ',
  'RR',
  'RS',
  'RT',
  'RU',
  'RV',
  'RW',
  'RX',
  'RY',
  'RZ',
  'SA',
  'SB',
  'SC',
  'SD',
  'SE',
  'SF',
  'SG',
  'SH',
  'SI',
  'SJ',
  'SK',
  'SL',
  'SN',
  'SM',
  'SO',
  'SP',
  'SQ',
  'SR',
  'SS',
  'ST',
  'SU',
  'SV',
  'SW',
  'SX',
  'SY',
  'SZ',
  'TA',
  'TB',
  'TC',
  'TD',
  'TE',
  'TF',
  'TG',
  'TH',
  'TI',
  'TJ',
  'TK',
  'TL',
  'TN',
  'TM',
  'TO',
  'TP',
  'TQ',
  'TR',
  'TS',
  'TT',
  'TU',
  'TV',
  'TW',
  'TX',
  'TY',
  'TZ',
  'UA',
  'UB',
  'UC',
  'UD',
  'UE',
  'UF',
  'UG',
  'UH',
  'UI',
  'UJ',
  'UK',
  'UL',
  'UN',
  'UM',
  'UO',
  'UP',
  'UQ',
  'UR',
  'US',
  'UT',
  'UU',
  'UV',
  'UW',
  'UX',
  'UY',
  'UZ',
  'VA',
  'VB',
  'VC',
  'VD',
  'VE',
  'VF',
  'VG',
  'VH',
  'VI',
  'VJ',
  'VK',
  'VL',
  'VN',
  'VM',
  'VO',
  'VP',
  'VQ',
  'VR',
  'VS',
  'VT',
  'VU',
  'VV',
  'VW',
  'VX',
  'VY',
  'VZ',
  'WA',
  'WB',
  'WC',
  'WD',
  'WE',
  'WF',
  'WG',
  'WH',
  'WI',
  'WJ',
  'WK',
  'WL',
  'WN',
  'WM',
  'WO',
  'WP',
  'WQ',
  'WR',
  'WS',
  'WT',
  'WU',
  'WV',
  'WW',
  'WX',
  'WY',
  'WZ',
  'XA',
  'XB',
  'XC',
  'XD',
  'XE',
  'XF',
  'XG',
  'XH',
  'XI',
  'XJ',
  'XK',
  'XL',
  'XN',
  'XM',
  'XO',
  'XP',
  'XQ',
  'XR',
  'XS',
  'XT',
  'XU',
  'XV',
  'XW',
  'XX',
  'XY',
  'XZ',
  'YA',
  'YB',
  'YC',
  'YD',
  'YE',
  'YF',
  'YG',
  'YH',
  'YI',
  'YJ',
  'YK',
  'YL',
  'YN',
  'YM',
  'YO',
  'YP',
  'YQ',
  'YR',
  'YS',
  'YT',
  'YU',
  'YV',
  'YW',
  'YX',
  'YY',
  'YZ',
  'ZA',
  'ZB',
  'ZC',
  'ZD',
  'ZE',
  'ZF',
  'ZG',
  'ZH',
  'ZI',
  'ZJ',
  'ZK',
  'ZL',
  'ZN',
  'ZM',
  'ZO',
  'ZP',
  'ZQ',
  'ZR',
  'ZS',
  'ZT',
  'ZU',
  'ZV',
  'ZW',
  'ZX',
  'ZY',
  'ZZ'
]

/** excel的行列范围 */
export function rangeFromRef(ref) {
  const list = ref.split(':')
  return [
    list[0]?.replace(/[0-9]/g, ''),
    parseInt(list[0]?.replace(/[A-Z]/g, '')),
    list[1]?.replace(/[0-9]/g, ''),
    parseInt(list[1]?.replace(/[A-Z]/g, ''))
  ]
}

/** excel的行列范围（数字） */
export function rangeNumberFromRef(ref: string) {
  const list = ref.split(':')
  let min = alphabet.indexOf(list[0]?.replace(/[0-9]/g, ''))
  let max = alphabet.indexOf(list[1]?.replace(/[0-9]/g, ''))
  if (min < 0) min = 0
  if (max < 0) max = 200
  return [min, Math.min(parseInt(list[0]?.replace(/[A-Z]/g, '')), 60000), max, Math.min(parseInt(list[1]?.replace(/[A-Z]/g, '')), 60000)]
}

/**
 * 去掉excel空行空列，之后的ref
 * @param sheet
 * @returns
 */
export function handleExcelRef(sheet: WorkSheet) {
  const [start, end] = sheet['!ref']?.split(':') ?? []
  const colArr = Object.keys(sheet).filter((key) => !key.startsWith('!'))
  const chatArr = Array.from(new Set(colArr.map((item) => item.replace(/[0-9]/g, '')))).sort((a, b) => utils.decode_col(a) - utils.decode_col(b))
  const maxChar = chatArr[chatArr.length - 1]?.replace(/[0-9]/g, '')
  // let maxRow = Math.max(...colArr.map(key => Number(key.replace(/[A-Z]/g, "")) || 0))

  const maxRowArr = colArr.map((key) => Number(key.replace(/[A-Z]/g, '')) || 0)
  let maxRow = 0
  for (const item of maxRowArr) {
    if (item > maxRow) maxRow = item
  }

  return `${start}:${maxChar}${maxRow}`
}

/**
 * 计算excel 列 的范围
 * @param sheet
 * @returns
 */
export function rangColExcel(sheet: WorkSheet) {
  const ref = handleExcelRef(sheet)
  const [start, end] = ref.split(':')
  const startChar = start.replace(/[0-9]/g, '')
  const endChar = end.replace(/[0-9]/g, '')
  const minCol = alphabet.findIndex((item) => item == startChar)
  const maxCol = alphabet.findIndex((item) => item == endChar)
  if (minCol < 0 || maxCol < 0) {
    ElNotification({
      title: '失败',
      message: '表头太长，暂不支持',
      type: 'error'
    })
    return [0, 200]
  }
  return [minCol, maxCol]
}

/**
 * 计算excel 行 的范围
 * @param sheet
 * @returns
 */
export function rangRowExcel(sheet: WorkSheet) {
  const ref = handleExcelRef(sheet)
  const [start, end] = ref.split(':')
  const minRow = start.replace(/[A-Z]/g, '')
  const maxRow = end.replace(/[A-Z]/g, '')
  return [minRow, maxRow]
}

// // 将workbook装化成blob对象
// export function workbook2blob(workbook: WorkBook) {
//   // 生成excel的配置项
//   let wopts: WritingOptions = {
//     // 要生成的文件类型
//     bookType: 'xlsx',
//     // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
//     bookSST: false,
//     // 二进制类型
//     type: 'binary'
//   }
//   var wbout = write(workbook, wopts)
//   var blob = new Blob([s2ab(wbout)], {
//     type: 'application/octet-stream'
//   })
//   return blob
// }

// // 将字符串转ArrayBuffer
// function s2ab(s: string) {
//   var buf = new ArrayBuffer(s.length)
//   var view = new Uint8Array(buf)
//   for (var i = 0; i != s.length; ++i) {
//     view[i] = s.charCodeAt(i) & 0xff
//   }
//   return buf
// }

// // 将blob对象创建bloburl，然后用a标签实现弹出下载框
// export function openDownloadDialog(blobParams: string | Blob | MediaSource, fileName: string) {
//   let blob = ''
//   if (typeof blobParams == 'object' && blobParams instanceof Blob) {
//     blob = URL.createObjectURL(blobParams) // 创建blob地址
//   }
//   var aLink = document.createElement('a')
//   aLink.href = blob
//   // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
//   aLink.download = fileName || ''
//   var event
//   if (window.MouseEvent) event = new MouseEvent('click')
//   //   移动端
//   else {
//     event = document.createEvent('MouseEvents')
//     event.initMouseEvent(
//       'click',
//       true,
//       false,
//       window,
//       0,
//       0,
//       0,
//       0,
//       0,
//       false,
//       false,
//       false,
//       false,
//       0,
//       null
//     )
//   }
//   aLink.dispatchEvent(event)
//   URL.revokeObjectURL(blob)
// }

/** 读取excel文件 */
export async function loadExcelFromFile(file: any): Promise<WorkBook> {
  // const _XLSX = require('xlsx')
  // console.warn(XLSX)
  return new Promise((r, e) => {
    try {
      const workbook = readFile(file.path)
      // 取第一张表的内容
      r(workbook)
    } catch (error) {
      console.warn('转为用FileReader读取', error)
      const reader = new FileReader()
      reader.onload = function (e) {
        const data = new Uint8Array(e.target?.result as any)
        const workbook = read(data, {
          type: 'array'
        })
        // 取第一张表的内容
        r(workbook)
        // r({} as any)
      }
      reader.readAsArrayBuffer(file)
    }
  })
}

/**
 * 读取网络文件
 * @param filePath 文件路径
 */
export function readerFilePath(filePath: string): Promise<XMLHttpRequest> {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', filePath)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status == 200) {
        return resolve(this)
      }
      return reject(this)
    }
    xhr.send()
  })
}
