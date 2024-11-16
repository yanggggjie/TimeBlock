import React, { useEffect, useState } from 'react'
import BlockConfig from './_BlockConfig/BlockConfig.tsx'
import Summary from './_Summary/Summary.tsx'
import TimeBlock from './_TimeBlock/TimeBlock.tsx'
import { getCurrentBlockConfig } from './util.ts'
import dayjs from 'dayjs'
import { useTimeBlockStore } from '../store/useTimeBlock.ts'
import { FormControlLabel, Switch } from '@mui/material'
import { twMerge } from 'tailwind-merge'

interface Props {}

export default function Index({}: Props) {
  const [showSummary, setShowSummary] = useState(true)
  const { blockTypeList } = useTimeBlockStore()
  const currentBlockConfig = getCurrentBlockConfig()
  const [currentTimeHHmm, setCurrentTimeHHmm] = useState(
    dayjs().format('HH:mm'),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeHHmm(dayjs().format('HH:mm'))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [currentTimeHHmm, blockTypeList])

  return (
    <div className={'h-screen w-screen overflow-y-auto'}>
      <div className="relative h-full flex flex-row items-center">
        <div className={'fixed top-0 left-0 z-20'}>
          <FormControlLabel
            control={
              <Switch
                value={showSummary}
                onChange={(e) => setShowSummary(e.target.checked)}
                defaultChecked
              />
            }
            label="显示统计"
          />
        </div>
        {showSummary && (
          <div className={'w-[400px]'}>
            <Summary></Summary>
          </div>
        )}
        <div className="flex-[2] h-full flex flex-col">
          <div className={'flex flex-row py-[4px]'}>
            <div className={'w-[128px]'}></div>
            <div className={'flex-1 flex flex-row items-center justify-center'}>
              现在是
              <div className={'font-mono'}>{currentTimeHHmm}</div>
              <div
                className={'text-white font-bold px-[10px] rounded mx-[2px]'}
                style={{
                  background: currentBlockConfig.color,
                  color: 'white',
                }}
              >
                {currentBlockConfig.title}
              </div>
              时间
            </div>
          </div>

          <div
            className={twMerge(
              'grid grid-cols-[130px_1fr_1fr]  gap-x-[10px] gap-y-[5px] place-items-center font-mono',
              'flex-1 grid-rows-[repeat(auto-fill, 1fr)]',
            )}
          >
            <TimeBlock></TimeBlock>
          </div>
        </div>
        <div className={'w-[130px]'}>
          <BlockConfig></BlockConfig>
        </div>
      </div>
    </div>
  )
}
