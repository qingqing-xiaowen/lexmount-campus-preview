// 当前为内部预览。真实参数只在本文件/正式部署配置中接入，不允许 URL 参数切换模式或接收地址。
export const eventConfig = Object.freeze({
  mode: 'preview',
  eventId: 'lexmount-real-task',
  rulesVersion: '2026-10-08-draft',
  endpoints: { registration: '', submission: '' },
  requestTimeoutMs: 12000,
  editUrlAllowedOrigins: [],
  help: {
    url: 'tech-activity-20261008.html#contact', email: 'support@lexmount.cn', reviewerAccess: '',
    // 当前为运营确认的永久二维码；改用临时码时设置 qrPermanent: false 并填写 qrExpiresAt。
    qrImage: 'tech-groupqr-20261008.png', qrPermanent: true, qrExpiresAt: null,
    qrExpiryLabel: '活动群二维码长期有效；如无法入群，请通过公司支持邮箱联系我们。'
  },
  studentOffer: {
    signupUrl: '', durationLabel: '约两个月 Pro',
    quota: '', startsAt: '', expiresAt: '', existingAccountPolicy: '', thirdPartyFees: ''
  },
  // 仅表达暂定安排，不用于自动开放报名。开始日的具体开放时刻尚待确认。
  schedule: { tentative: true, opensAt: '2026-10-12', registrationDeadline: '2026-10-31T23:59:00+08:00', submissionDeadline: '2026-10-31T23:59:00+08:00', reviewPeriod: '截稿后开展，具体安排另行通知', resultsAt: '', timezone: 'Asia/Shanghai' },
  notices: { senderEmail: '', resultsUrl: '' },
  release: { canonicalUrl: '', shareImageUrl: '', organizer: '' }
});
