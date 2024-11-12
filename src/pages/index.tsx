import React, { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTimeBlockStore } from '../store/useTimeBlock.ts'
import BlockConfig from './_BlockConfig/BlockConfig.tsx'
import Summary from './_Summary/Summary.tsx'
import { Button } from '@mui/material'
import Time from './Block/Time.tsx'

interface Props {}

export default function Index({}: Props) {
  const { blockTypeList, selectedIndexList, blockConfigList } =
    useTimeBlockStore()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleBlockClick = (index: number) => {
    useTimeBlockStore.setState(({ selectedIndexList }) => {
      if (selectedIndexList.includes(index)) {
        return {
          selectedIndexList: selectedIndexList.filter((item) => {
            return item !== index
          }),
        }
      }

      return {
        selectedIndexList: [...selectedIndexList, index],
      }
    })
  }

  return (
    <div className="flex flex-row items-center">
      <div className={'flex-[2]'}>
        <Summary></Summary>
      </div>
      <div
        className="max-w-[430px] min-w-[430px] flex-[2] grid grid-cols-3 place-items-center gap-y-[8px] font-mono"
        ref={containerRef}
      >
        {blockTypeList.map((blockType, index) => {
          const config = blockConfigList.find((item) => {
            return item.type === blockType
          })!
          const isSelected = selectedIndexList.includes(index)

          return (
            <React.Fragment key={index}>
              <Time index={index}></Time>
              <Button
                key={`block-${index}`}
                onClick={() => handleBlockClick(index)} // 添加点击事件
                className={twMerge(
                  'w-[120px] h-[20px] block-item cursor-pointer', // 添加 cursor-pointer 提升用户体验
                  isSelected && 'ring-4 ring-[#3d74cd]',
                )}
                sx={{
                  borderRadius: 0,
                }}
                style={{
                  background: config.color,
                }}
              ></Button>
            </React.Fragment>
          )
        })}
      </div>
      <div className={'flex-1'}>
        <BlockConfig></BlockConfig>
      </div>
    </div>
  )
}
