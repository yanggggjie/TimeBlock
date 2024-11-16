import React from 'react'
import Time from './Time.tsx'
import { Button } from '@mui/material'
import { twMerge } from 'tailwind-merge'
import { useTimeBlockStore } from '../../store/useTimeBlock.ts'
import CheckSVG from './check.svg?react'
import { getCurrentTime } from '../util.ts'
import { motion } from 'framer-motion'
import Tooltip from '@mui/material/Tooltip'
import dayjs from 'dayjs'
interface Props {}

export default function TimeBlock({}: Props) {
  const { blockTypeList, blockConfigList, selectedIndexList } =
    useTimeBlockStore()
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
  const currentTime = getCurrentTime()

  return (
    <>
      {blockTypeList.map((blockType, index) => {
        const config = blockConfigList.find((item) => {
          return item.type === blockType
        })!
        const isSelected = selectedIndexList.includes(index)

        return (
          <React.Fragment key={index}>
            <Time index={index}></Time>
            <div className={'relative w-full'}>
              <Button
                key={`block-${index}`}
                onClick={() => handleBlockClick(index)} // 添加点击事件
                className={twMerge(
                  'w-full h-[25px] block-item cursor-pointer', // 将宽度设置为100%使其充满网格单元格
                  isSelected && 'ring-2 ring-[#b0daf4]',
                )}
                sx={{
                  borderRadius: 0,
                }}
                style={{
                  background: isSelected ? '#b0daf4' : config.color,
                }}
              />
              {isSelected && (
                <CheckSVG
                  className={'absolute z-10 bottom-0 right-0'}
                ></CheckSVG>
              )}
              {currentTime.nowIndex === index && (
                <Tooltip title={`${dayjs().format('HH:mm')}`} arrow={true}>
                  <motion.div
                    className={'h-[25px]  absolute z-20 flex flex-row'}
                    style={{
                      top: 0,
                      left: `${currentTime.nowRatio * 100}%`,
                    }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 3, // 控制每次闪烁的时间
                      repeat: Infinity, // 无限重复闪烁
                    }}
                  >
                    <div className={'w-[1.5px] h-full bg-white'}></div>
                    <div className={'w-[3px] h-full bg-black'}></div>
                    <div className={'w-[1.5px] h-full bg-white'}></div>
                  </motion.div>
                </Tooltip>
              )}
            </div>
          </React.Fragment>
        )
      })}
    </>
  )
}
