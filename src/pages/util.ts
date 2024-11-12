// 引入 dayjs 库
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { IBlockType, useTimeBlockStore } from '../store/useTimeBlock.ts'
dayjs.extend(duration)

export function convertMinutesToHoursMinutes(minutes: number) {
  const time = dayjs.duration(minutes, 'minutes')
  const hours = Math.floor(time.asHours())
  const mins = time.minutes()
  return `${hours}小时${mins}分`
}

export function blockType2Config(type: IBlockType) {
  return useTimeBlockStore.getState().blockConfigList.find((item) => {
    return item.type === type
  })!
}
