import React from 'react'
import { twMerge } from 'tailwind-merge'
import { IBlockType, useTimeBlockStore } from '../../store/useTimeBlock.ts'
import HorizonBar from './HorizonBar.tsx'
import SimplePie from './SimplePie.tsx'
interface Props {}
export interface IChartDataItem {
  value: number
  name: string
  color: string
}
export default function Summary({}: Props) {
  const { blockTypeList, blockConfigList } = useTimeBlockStore()

  // count type
  const map = new Map()
  blockTypeList.forEach((blockType) => {
    map.set(blockType, (map.get(blockType) || 0) + 1)
  })
  const blockTypeCount: { type: IBlockType; count: number }[] = Array.from(
    map,
    ([type, count]) => ({ type, count }),
  )

  const chartData = blockTypeCount.map((item) => {
    const itemConfig = blockConfigList.find((it) => {
      return item.type === it.type
    })!
    return {
      value: (item.count * 30) / 60,
      name: itemConfig.title,
      color: itemConfig.color,
      type: itemConfig.type,
    }
  })

  const gray = chartData.find((item) => {
    return item.type === 'gray'
  })!
  const chartDataWithGray = chartData.filter((item) => {
    return item.type !== 'gray'
  })

  const sortedData = chartDataWithGray
    .sort((a, b) => {
      return b.value - a.value
    })
    .concat(gray)

  console.log(sortedData)

  return (
    <div className={twMerge('fixed top-1/2 -translate-y-1/2 left-0 w-[400px]')}>
      <SimplePie data={chartData}></SimplePie>
      <HorizonBar data={sortedData}></HorizonBar>
    </div>
  )
}
