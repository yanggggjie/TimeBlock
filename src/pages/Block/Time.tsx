import React from 'react'
import { useTimeBlockStore } from '../../store/useTimeBlock.ts'
import { blockType2Config } from '../util.ts'
interface Props {
  index: number
}

export default function Time({ index }: Props) {
  const grayColor = blockType2Config('gray').color
  return (
    <>
      {index % 2 === 0 && (
        <div key={`time-${index}`} style={{ color: grayColor }}>
          <LeftTime index={index}></LeftTime>
          <RightTime index={index}></RightTime>
        </div>
      )}
    </>
  )
}

function LeftTime({ index }: { index: number }) {
  const { blockTypeList, blockConfigList } = useTimeBlockStore()
  const color = blockType2Config(blockTypeList[index]).color
  return (
    <span
      style={{
        color,
      }}
    >
      {(index / 2).toString().padStart(2, '0')}:00 -
    </span>
  )
}

function RightTime({ index }: { index: number }) {
  const { blockTypeList, blockConfigList } = useTimeBlockStore()
  const color = blockType2Config(blockTypeList[index + 1]).color
  return (
    <span
      style={{
        color,
      }}
    >
      - {(index / 2 + 1).toString().padStart(2, '0')}:00
    </span>
  )
}
