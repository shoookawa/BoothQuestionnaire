const questions = [
  {
    label: '出店形態',
    name: 'format',
    type: 'list',
    options: ['模擬店', '屋外物販', '教室出店', '福島出店'],
    required: true
  },
  {
    label: 'Q1. 応募から祭り当日までの満足度',
    name: 'satisfaction',
    type: 'radio',
    options: ['とても満足', 'やや満足', 'どちらともいえない', 'やや不満', 'とても不満'],
    required: true
  },
  {
    label: 'Q2. 前問で答えた理由について、具体的に教えて下さい',
    name: 'reason_satisfaction',
    type: 'textarea',
    required: false
  },
  {
    label: 'Q3. 実行委員会の対応の良さ',
    name: 'support',
    type: 'radio',
    options: ['とても満足', 'やや満足', 'どちらともいえない', 'やや不満', 'とても不満'],
    required: true
  },
  {
    label: 'Q4. 前問で答えた理由について、具体的に教えて下さい',
    name: 'reason_support',
    type: 'textarea',
    required: false
  },
  {
    label: 'Q5. 出店募集をどこで知りましたか',
    name: 'advertisement',
    type: 'radio',
    options: ['HP', '学内ポスター', '京田辺市の掲示板', 'SNS', 'その他'],
    required: true
  },
  {
    label: 'Q6. 前問で「その他」を選んだ方は、具体的に教えて下さい',
    name: 'other_advertisement',
    type: 'textarea',
    required: false
  },
  {
    label: 'Q7. 出店しようと決めたきっかけ・経緯',
    name: 'opportunity',
    type: 'textarea',
    required: true
  },
  {
    label: 'Q8. 祭り当日不満に思ったこと',
    name: 'dissatisfaction',
    type: 'textarea',
    required: true
  },
  {
    label: 'Q9. ゴミの分別方法について不満に思ったこと',
    name: 'garbage',
    type: 'textarea',
    required: true
  },
  {
    label: 'Q10. 差し支えなければ、売上金額を教えてください',
    name: 'amount',
    type: 'list',
    options: ['答えたくない', '～10万', '10万～20万', '20万～30万', '30万～40万', '40万～50万', '50万～'],
    required: true
  },
  {
    label: 'Q11. 来年も出店したいかどうか',
    name: 'nextyear',
    type: 'radio',
    options: ['出店したい', 'きっかけがあれば出店したい', 'どちらともいえない', 'あまり出店したくない', '出店しない'],
    required: true
  },
  {
    label: 'Q12. 前問で答えた理由について、具体的に教えて下さい',
    name: 'reason_nextyear',
    type: 'textarea',
    required: false
  },
  {
    label: '意見・感想',
    name: 'comment',
    type: 'textarea',
    required: true
  }
];


export default questions;