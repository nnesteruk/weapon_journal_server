export const DOCUMENTS_CATEGORIES = [
  { key: "contract", label: "Договор" },
  { key: "answer", label: "Ответ" },
  { key: "identification", label: "Идентификация" },
  { key: "act_identification", label: "Акт идентификации" },
  { key: "act_selections", label: "Акт выбора" },
  { key: "ref_for_test", label: "Передача на тест" },
  { key: "decision", label: "Решение" },
  { key: "act_complete_work", label: "Акт выполненных работ" },
  { key: "program_asp_or_po", label: "Программа АСП или ПО" },
  { key: "notification", label: "Уведомление" },
  { key: "refusal", label: "Отказ" },
] as const;

export type DocumentCategory = (typeof DOCUMENTS_CATEGORIES)[number]["key"];
