// 引入 dayjs 库
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import {
  IBlockConfig,
  IBlockType,
  useTimeBlockStore,
} from '../store/useTimeBlock.ts'
dayjs.extend(duration)

export function blockType2Config(type: IBlockType) {
  return useTimeBlockStore.getState().blockConfigList.find((item) => {
    return item.type === type
  })!
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

interface ICurrentTime {
  nowIndex: number
  nowRatio: number
}
export function getCurrentTime(): ICurrentTime {
  // 获取当前时间
  const now = dayjs()

  // 获取当天零点的时间
  const startOfDay = now.startOf('day')

  // 计算从当天零点到当前时间的分钟数
  const minutesSinceStartOfDay = now.diff(startOfDay, 'minute')

  // 计算当前是第几个完整的半小时（整数部分）
  const nowIndex = Math.floor(minutesSinceStartOfDay / 30)

  // 计算当前半小时的小数百分比
  const nowRatio = parseFloat(((minutesSinceStartOfDay % 30) / 30).toFixed(1))

  return { nowIndex, nowRatio }
}

export function getCurrentBlockConfig(): IBlockConfig {
  const { blockTypeList, blockConfigList } = useTimeBlockStore.getState()
  const { nowIndex } = getCurrentTime()
  const blockType = blockTypeList[nowIndex]
  return blockConfigList.find((item) => item.type === blockType)!
}
