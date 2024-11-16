import React from 'react'
import { useTimeBlockStore } from '../../store/useTimeBlock.ts'
import { blockType2Config, toggleSelectedIndexList } from '../util.ts'
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
          <Mid index={index}></Mid>
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
    <button
      style={{
        color,
      }}
      onClick={() => {
        toggleSelectedIndexList([index])
      }}
    >
      {(index / 2).toString().padStart(2, '0')}:00
    </button>
  )
}

function Mid({ index }: { index: number }) {
  const { blockTypeList, blockConfigList } = useTimeBlockStore()
  const leftColor = blockType2Config(blockTypeList[index]).color
  const rightColor = blockType2Config(blockTypeList[index + 1]).color
  return (
    <button
      className={'px-[6px]'}
      onClick={() => {
        const index1 = index
        const index2 = index1 + 1
        useTimeBlockStore.setState(({ selectedIndexList }) => {
          const hasIndex1 = selectedIndexList.includes(index1)
          const hasIndex2 = selectedIndexList.includes(index2)

          if (hasIndex1 && hasIndex2) {
            // 如果两个都在 selectedIndexList 中，移除它们
            return {
              selectedIndexList: selectedIndexList.filter(
                (index) => index !== index1 && index !== index2,
              ),
            }
          } else {
            // 如果两个都不在，或者其中一个在，则添加它们
            return {
              selectedIndexList: [
                ...new Set([...selectedIndexList, index1, index2]),
              ],
            }
          }
        })
      }}
    >
      <span
        style={{
          color: leftColor,
        }}
      >
        -
      </span>
      <span
        style={{
          color: rightColor,
        }}
      >
        -
      </span>
    </button>
  )
}

function RightTime({ index }: { index: number }) {
  const { blockTypeList, blockConfigList } = useTimeBlockStore()
  const color = blockType2Config(blockTypeList[index + 1]).color
  return (
    <button
      style={{
        color,
      }}
      onClick={() => {
        toggleSelectedIndexList([index + 1])
      }}
    >
      {(index / 2 + 1).toString().padStart(2, '0')}:00
    </button>
  )
}
