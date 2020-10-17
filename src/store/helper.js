import dayjs from "dayjs";

export function CalDate() {
  return dayjs().format("YYYY-MM-DD");
}
