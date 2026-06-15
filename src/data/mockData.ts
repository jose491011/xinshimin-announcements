// ============================================================
// 型別定義 Type Definitions
// ============================================================

export type AnnouncementCategory =
  | '會議公告'
  | '決議公告'
  | '財務公告'
  | '修繕公告'
  | '環境公告'
  | '停車公告'
  | '安全公告'
  | '一般通知';

export type AnnouncementStatus =
  | '草稿'
  | '已發布'
  | '進行中'
  | '異議期間'
  | '已完成'
  | '已結案'
  | '已撤回';

export type WorkProgressType =
  | '修繕工程'
  | '設備檢修'
  | '行政作業'
  | '會議決議追蹤'
  | '環境改善'
  | '財務作業'
  | '停車管理'
  | '其他事項';

export type WorkProgressStatus =
  | '規劃中'
  | '待安排'
  | '招標中'
  | '施工中'
  | '檢測中'
  | '驗收中'
  | '進行中'
  | '已完成'
  | '暫停'
  | '延期';

export interface Announcement {
  id: string;
  notice_number: string;
  title: string;
  category: AnnouncementCategory;
  status: AnnouncementStatus;
  published_date: string; // YYYY/MM/DD
  summary: string;
  keywords: string[];
  pdf_url: string;
  next_step: string;
  completion_record: string;
  last_updated_at: string;
}

export interface WorkProgress {
  id: string;
  project_name: string;
  project_type: WorkProgressType;
  status: WorkProgressStatus;
  stages: string[];
  current_stage: string;
  progress_percentage: number;
  estimated_completion_date: string; // YYYY/MM/DD
  responsible_party: string;
  description: string;
  next_step: string;
  last_updated_at: string;
}

// ============================================================
// 假資料 Mock Data
// ============================================================

export const announcements: Announcement[] = [
  {
    id: 'ann-001',
    notice_number: '新市民社區-115-06-009',
    title: '區分所有權人會議通知已投放信箱',
    category: '會議公告',
    status: '已發布',
    published_date: '2026/06/09',
    summary:
      '區分所有權人會議通知已投放至各住戶信箱，外地區權人另以郵寄方式寄出。請各住戶留意信箱中的書面通知，並確認參加出席或委託代理人出席。',
    keywords: ['區分所有權人會議', '信箱投放', '會議通知', '郵寄'],
    pdf_url: '/sample/meeting-notice.pdf',
    next_step: '請各區權人留意信箱及郵寄通知，確認出席意願並填寫委託書（如需委託）。',
    completion_record: '已於 2026/06/09 完成信箱投放與郵寄作業，合計發送 158 份。',
    last_updated_at: '2026/06/09 14:00',
  },
  {
    id: 'ann-002',
    notice_number: '新市民社區-115-06-008',
    title: '景觀池請勿投入石頭、煙蒂及垃圾',
    category: '環境公告',
    status: '進行中',
    published_date: '2026/06/08',
    summary:
      '為維護景觀池整潔與過濾設備正常運作，請勿投入石頭、煙蒂及垃圾。景觀池過濾系統因異物堵塞已造成設備損耗，請全體住戶共同維護社區公共環境。',
    keywords: ['景觀池', '環境維護', '禁止投擲', '過濾設備'],
    pdf_url: '/sample/pond-notice.pdf',
    next_step: '管委會將持續觀察景觀池狀況，並加強公告提醒，必要時將安裝警示標示。',
    completion_record: '尚未結案，持續宣導中。',
    last_updated_at: '2026/06/08 10:30',
  },
  {
    id: 'ann-003',
    notice_number: '新市民社區-115-06-007',
    title: '下半年度車位登記通知',
    category: '停車公告',
    status: '異議期間',
    published_date: '2026/06/07',
    summary:
      '下半年度車位登記作業已公告，請符合資格住戶於期限內辦理登記。本次登記依管理規約第 18 條規定辦理，異議期間內歡迎提出意見。',
    keywords: ['車位登記', '下半年度', '停車管理', '登記期限'],
    pdf_url: '/sample/parking-notice.pdf',
    next_step: '異議期間內可至管委會提出書面意見，截止日期為 2026/06/21。',
    completion_record: '登記程序尚在進行中，預計於 2026/06/30 完成抽籤。',
    last_updated_at: '2026/06/07 09:00',
  },
  {
    id: 'ann-004',
    notice_number: '新市民社區-115-06-006',
    title: '第六屆第十次例會決議公告',
    category: '決議公告',
    status: '已完成',
    published_date: '2026/06/06',
    summary:
      '第六屆第十次管理委員會例會決議事項公告。本次例會討論並通過外牆修繕工程追加預算、景觀池改善方案及下半年停車位抽籤辦法等三項重要議案。',
    keywords: ['例會', '決議', '管理委員會', '第六屆', '第十次'],
    pdf_url: '/sample/meeting-resolution.pdf',
    next_step: '相關決議已完成公告並進入執行追蹤，各項決議執行狀況將於下次例會報告。',
    completion_record: '已完成公告程序，公告期間自 2026/06/06 起至 2026/06/20 止。',
    last_updated_at: '2026/06/06 18:00',
  },
];

export const workProgressList: WorkProgress[] = [
  {
    id: 'wp-001',
    project_name: '外牆修繕工程',
    project_type: '修繕工程',
    status: '施工中',
    stages: ['規劃', '招標', '施工', '驗收', '完成'],
    current_stage: '施工',
    progress_percentage: 60,
    estimated_completion_date: '2026/08/15',
    responsible_party: '管委會與外牆修繕廠商',
    description:
      '外牆修繕工程目前進入施工階段，持續依排程施作。本工程包含外牆防水處理、磁磚修補及裂縫填補，預計涵蓋 A、B、C、D 四棟建築。',
    next_step: '持續追蹤施工品質並安排階段性檢查，下次進度報告預計於 2026/06/20 提出。',
    last_updated_at: '2026/06/10 18:00',
  },
  {
    id: 'wp-002',
    project_name: '消防設備檢修',
    project_type: '設備檢修',
    status: '待安排',
    stages: ['規劃', '執行', '測試', '改善', '完成'],
    current_stage: '執行',
    progress_percentage: 35,
    estimated_completion_date: '2026/07/20',
    responsible_party: '消防設備維護廠商',
    description:
      '消防設備檢修已排入作業計畫，等待廠商進場執行。本次檢修項目包含各樓層偵煙器、灑水頭及緊急廣播系統功能測試。',
    next_step: '確認廠商進場日期，並公告住戶於進場期間注意相關事項，預計進場日期 2026/06/25。',
    last_updated_at: '2026/06/10 16:30',
  },
  {
    id: 'wp-003',
    project_name: '景觀池改善',
    project_type: '環境改善',
    status: '進行中',
    stages: ['規劃', '施工', '驗收', '完成'],
    current_stage: '施工',
    progress_percentage: 50,
    estimated_completion_date: '2026/09/30',
    responsible_party: '管委會與景觀維護廠商',
    description:
      '景觀池改善作業進行中，包含清潔、設備檢查及保護措施設置。本次改善計畫同步評估更換過濾系統，提升景觀池長期維護效能。',
    next_step: '完成清潔後進行設備檢查，並提出後續維護建議方案供管委會審議。',
    last_updated_at: '2026/06/09 17:20',
  },
];

// ============================================================
// 輔助函式 Utility Functions
// ============================================================

export function getAnnouncementById(id: string): Announcement | undefined {
  return announcements.find((a) => a.id === id);
}

export function getWorkProgressById(id: string): WorkProgress | undefined {
  return workProgressList.find((w) => w.id === id);
}

export function searchAnnouncements(keyword: string): Announcement[] {
  const q = keyword.toLowerCase();
  return announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.keywords.some((k) => k.toLowerCase().includes(q))
  );
}

export function getAnnouncementsByCategory(category: AnnouncementCategory): Announcement[] {
  return announcements.filter((a) => a.category === category);
}

export function getAnnouncementsByStatus(status: AnnouncementStatus): Announcement[] {
  return announcements.filter((a) => a.status === status);
}

export const ALL_CATEGORIES: AnnouncementCategory[] = [
  '會議公告',
  '決議公告',
  '財務公告',
  '修繕公告',
  '環境公告',
  '停車公告',
  '安全公告',
  '一般通知',
];

export const ALL_STATUSES: AnnouncementStatus[] = [
  '草稿',
  '已發布',
  '進行中',
  '異議期間',
  '已完成',
  '已結案',
  '已撤回',
];
