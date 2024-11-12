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

export function addSelectedIndexList(list: number[]) {
  useTimeBlockStore.setState(({ selectedIndexList }) => {
    return {
      selectedIndexList: [...new Set([...selectedIndexList, ...list])],
    }
  })
}

export function toggleSelectedIndexList(list: number[]) {
  useTimeBlockStore.setState(({ selectedIndexList }) => {
    // 遍历 list 中的每个元素，切换它在 selectedIndexList 中的状态
    const updatedList = [...selectedIndexList]

    list.forEach((item) => {
      const index = updatedList.indexOf(item)
      if (index > -1) {
        // 如果在 selectedIndexList 中，移除它
        updatedList.splice(index, 1)
      } else {
        // 如果不在 selectedIndexList 中，添加它
        updatedList.push(item)
      }
    })

    return { selectedIndexList: updatedList }
  })
}
