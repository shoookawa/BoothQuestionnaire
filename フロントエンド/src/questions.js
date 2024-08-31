const questions = [
  {
    label: '出店形態',
    name: 'format',
    type: 'list',
    options: ['模擬店', '屋外物販', '教室出店', '福島出店'],
    required: true
  },
  {
    label: '出店番号',
    name: 'number',
    type: 'number',
    required: true,
    min: 1,
    max: 100
  },
  {
    label: '満足度',
    name: 'satisfaction',
    type: 'radio',
    options: ['非常に満足', 'やや満足', 'どちらともいえない', 'やや不満', '非常に不満'],
    required: true
  },
  {
    label: '実行委員会の対応の良さ',
    name: 'support',
    type: 'radio',
    options: ['非常に満足', 'やや満足', 'どちらともいえない', 'やや不満', '非常に不満'],
    required: true
  },
  {
    label: '出店募集をどこで知ったか',
    name: 'publicity',
    type: 'radio',
    options: ['HP', 'ポスター', 'SNS', 'その他'],
    required: true
  },
  {
    label: '祭り当日不満に思ったこと',
    name: 'unsatisfied',
    type: 'textarea',
    required: true
  },
  {
    label: 'ゴミの分別方法について不満があれば記入お願いします',
    name: 'garbage',
    type: 'textarea',
    required: true
  },
  {
    label: '意見・感想',
    name: 'comment',
    type: 'textarea',
    required: true
  }
];


export default questions;